import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import Replicate from "replicate";

const ROOT = process.cwd();
const ENV_FILES = [".env.local", ".env"];

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return;

  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const separatorIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (!key || process.env[key]) continue;

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

for (const envFile of ENV_FILES) {
  loadEnvFile(path.join(ROOT, envFile));
}

const IMAGE_REGISTRY_PATH = path.join(ROOT, "src", "content", "article-images.json");
const LOG_PATH = path.join(ROOT, "content", "image-prompts", "generated-image-log.json");
const DEFAULT_DELAY_MS = Number(process.env.REPLICATE_IMAGE_DELAY_MS ?? process.env.OPENAI_IMAGE_DELAY_MS ?? "2500");
const DEFAULT_MAX_RETRIES = Number(process.env.REPLICATE_IMAGE_MAX_RETRIES ?? process.env.OPENAI_IMAGE_MAX_RETRIES ?? "3");
const DEFAULT_BACKOFF_MS = Number(process.env.REPLICATE_IMAGE_BACKOFF_MS ?? process.env.OPENAI_IMAGE_BACKOFF_MS ?? "4000");
const DEFAULT_BATCH_SIZE = Number(process.env.REPLICATE_IMAGE_BATCH_SIZE ?? process.env.OPENAI_IMAGE_BATCH_SIZE ?? "0");
const REPLICATE_MODEL = process.env.REPLICATE_IMAGE_MODEL ?? "black-forest-labs/flux-schnell";

function parseArgs(argv) {
  const options = {
    dryRun: false,
    limit: undefined,
    only: undefined,
    delayMs: DEFAULT_DELAY_MS,
    maxRetries: DEFAULT_MAX_RETRIES,
    retryBackoffMs: DEFAULT_BACKOFF_MS,
    batchSize: DEFAULT_BATCH_SIZE,
    startAfter: undefined,
  };

  for (const arg of argv) {
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("--limit=")) options.limit = Number(arg.slice("--limit=".length));
    else if (arg.startsWith("--only=")) {
      options.only = new Set(
        arg
          .slice("--only=".length)
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      );
    } else if (arg.startsWith("--delay-ms=")) {
      options.delayMs = Number(arg.slice("--delay-ms=".length));
    } else if (arg.startsWith("--max-retries=")) {
      options.maxRetries = Number(arg.slice("--max-retries=".length));
    } else if (arg.startsWith("--retry-backoff-ms=")) {
      options.retryBackoffMs = Number(arg.slice("--retry-backoff-ms=".length));
    } else if (arg.startsWith("--batch-size=")) {
      options.batchSize = Number(arg.slice("--batch-size=".length));
    } else if (arg.startsWith("--start-after=")) {
      options.startAfter = arg.slice("--start-after=".length).trim() || undefined;
    }
  }

  if (options.limit !== undefined && (!Number.isFinite(options.limit) || options.limit <= 0)) {
    throw new Error("--limit must be a positive number when provided.");
  }

  if (!Number.isFinite(options.delayMs) || options.delayMs < 0) {
    throw new Error("--delay-ms must be zero or a positive number.");
  }

  if (!Number.isFinite(options.maxRetries) || options.maxRetries < 1) {
    throw new Error("--max-retries must be at least 1.");
  }

  if (!Number.isFinite(options.retryBackoffMs) || options.retryBackoffMs < 0) {
    throw new Error("--retry-backoff-ms must be zero or a positive number.");
  }

  if (!Number.isFinite(options.batchSize) || options.batchSize < 0) {
    throw new Error("--batch-size must be zero or a positive number.");
  }

  return options;
}

function normalizePrompt(prompt) {
  const requiredClauses = [
    "Photorealistic premium food and drink photography.",
    "Square 1024x1024 composition.",
    "Accurate vessel, garnish, and liquid texture.",
    "Realistic lighting and natural reflections.",
    "Premium editorial styling with minimal clutter.",
    "No text, no logos, no surreal or fantasy styling.",
  ];

  const trimmed = String(prompt ?? "").trim();
  if (!trimmed) return "";

  const missing = requiredClauses.filter((clause) => !trimmed.toLowerCase().includes(clause.toLowerCase()));
  return [trimmed, ...missing].join(" ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toPublicRelativePath(imagePath) {
  if (!imagePath) throw new Error("Missing imagePath.");
  return imagePath.replace(/^\/+/, "");
}

function inferCategoryFromImagePath(imagePath) {
  const normalized = imagePath.replace(/\\/g, "/");
  if (normalized.includes("/images/coffee/")) return "coffee";
  if (normalized.includes("/images/cocktails/")) return "cocktails";
  return "unknown";
}

async function readJson(filePath) {
  const raw = await fsp.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function writeJson(filePath, value) {
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  await fsp.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function isRetryableError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return /(429|408|409|425|500|502|503|504|timed out|timeout|network|fetch failed|ECONNRESET|ETIMEDOUT|temporar|rate limit)/i.test(message);
}

function getOutputUrl(output) {
  if (typeof output === "string") return output;
  if (Array.isArray(output)) {
    for (const item of output) {
      if (typeof item === "string") return item;
      if (item?.url) return item.url;
      if (typeof item?.toString === "function") {
        const value = item.toString();
        if (value && /^https?:/i.test(value)) return value;
      }
    }
  }
  if (output?.url) return output.url;
  if (typeof output?.toString === "function") {
    const value = output.toString();
    if (value && /^https?:/i.test(value)) return value;
  }
  return null;
}

async function callReplicate({ replicate, prompt }) {
  return replicate.run(REPLICATE_MODEL, {
    input: {
      prompt: normalizePrompt(prompt),
      aspect_ratio: "1:1",
      num_outputs: 1,
      output_format: "jpg",
      output_quality: 90,
      go_fast: true,
      megapixels: "1",
      num_inference_steps: 4,
    },
  });
}

async function generateImageBytes({ replicate, prompt, maxRetries, retryBackoffMs }) {
  let attempt = 0;
  let lastError = null;

  while (attempt < maxRetries) {
    attempt += 1;

    try {
      const output = await callReplicate({ replicate, prompt });
      const url = getOutputUrl(output);
      if (!url) {
        throw new Error("Replicate output did not contain a downloadable image URL.");
      }

      const imageResponse = await fetch(url);
      if (!imageResponse.ok) {
        const details = await imageResponse.text();
        throw new Error(`Generated image download failed with ${imageResponse.status}: ${details}`);
      }

      return {
        bytes: Buffer.from(await imageResponse.arrayBuffer()),
        responsePrompt: normalizePrompt(prompt),
        attempts: attempt,
        outputUrl: url,
      };
    } catch (error) {
      lastError = error;
      const shouldRetry = attempt < maxRetries && isRetryableError(error);
      if (!shouldRetry) {
        break;
      }

      const backoff = retryBackoffMs * 2 ** (attempt - 1);
      await sleep(backoff);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function chunkEntries(entries, batchSize) {
  if (!batchSize || batchSize <= 0) return [entries];

  const batches = [];
  for (let index = 0; index < entries.length; index += batchSize) {
    batches.push(entries.slice(index, index + batchSize));
  }
  return batches;
}

async function fileExists(filePath) {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const registry = await readJson(IMAGE_REGISTRY_PATH);
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!options.dryRun && !apiToken) {
    throw new Error("REPLICATE_API_TOKEN is required unless you run with --dry-run. Add it to .env.local or your shell environment.");
  }

  const replicate = options.dryRun ? null : new Replicate({ auth: apiToken });

  let entries = Object.entries(registry).filter(([slug, entry]) => {
    if (options.only && !options.only.has(slug)) return false;
    return Boolean(entry?.imagePrompt);
  });

  if (options.startAfter) {
    const startIndex = entries.findIndex(([slug]) => slug === options.startAfter);
    if (startIndex >= 0) {
      entries = entries.slice(startIndex + 1);
    }
  }

  const batches = chunkEntries(entries, options.batchSize);
  const results = [];
  let generatedCount = 0;
  let skippedExistingCount = 0;
  let skippedMissingPromptCount = 0;
  let errorCount = 0;
  let processedCount = 0;

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
    const batch = batches[batchIndex];

    for (const [slug, entry] of batch) {
      const category = inferCategoryFromImagePath(entry.imagePath ?? "");
      const publicRelativePath = entry.imagePath ? toPublicRelativePath(entry.imagePath) : null;
      const absoluteImagePath = publicRelativePath ? path.join(ROOT, "public", publicRelativePath) : null;

      if (!entry.imagePrompt) {
        skippedMissingPromptCount += 1;
        results.push({ slug, status: "skipped-no-prompt" });
        continue;
      }

      if (!publicRelativePath || !absoluteImagePath || category === "unknown") {
        errorCount += 1;
        results.push({ slug, status: "error", error: "Missing or invalid imagePath/category." });
        continue;
      }

      if (await fileExists(absoluteImagePath)) {
        registry[slug] = {
          ...entry,
          imagePath: entry.imagePath,
          visualStatus: "image-ready",
        };
        skippedExistingCount += 1;
        results.push({ slug, category, status: "skipped-existing", imagePath: entry.imagePath });
        continue;
      }

      if (options.limit !== undefined && generatedCount >= options.limit) {
        results.push({ slug, category, status: "skipped-limit", imagePath: entry.imagePath });
        continue;
      }

      if (options.dryRun) {
        results.push({
          slug,
          category,
          status: "needs-generation",
          imagePath: entry.imagePath,
          promptPreview: normalizePrompt(entry.imagePrompt).slice(0, 180),
          batch: batchIndex + 1,
        });
        continue;
      }

      try {
        const { bytes, responsePrompt, attempts, outputUrl } = await generateImageBytes({
          replicate,
          prompt: entry.imagePrompt,
          maxRetries: options.maxRetries,
          retryBackoffMs: options.retryBackoffMs,
        });
        await fsp.mkdir(path.dirname(absoluteImagePath), { recursive: true });
        await fsp.writeFile(absoluteImagePath, bytes);

        registry[slug] = {
          ...entry,
          imagePath: entry.imagePath,
          visualStatus: "image-ready",
        };

        generatedCount += 1;
        processedCount += 1;
        results.push({
          slug,
          category,
          status: "generated",
          imagePath: entry.imagePath,
          revisedPrompt: responsePrompt,
          attempts,
          batch: batchIndex + 1,
          outputUrl,
        });

        if (options.delayMs > 0) {
          await sleep(options.delayMs);
        }
      } catch (error) {
        errorCount += 1;
        processedCount += 1;
        results.push({
          slug,
          category,
          status: "error",
          imagePath: entry.imagePath,
          attempts: options.maxRetries,
          batch: batchIndex + 1,
          error: error instanceof Error ? error.message : String(error),
        });

        if (options.delayMs > 0) {
          await sleep(options.delayMs);
        }
      }
    }
  }

  await writeJson(IMAGE_REGISTRY_PATH, registry);

  const logPayload = {
    generatedAt: new Date().toISOString(),
    provider: "replicate",
    model: REPLICATE_MODEL,
    dryRun: options.dryRun,
    delayMs: options.delayMs,
    maxRetries: options.maxRetries,
    retryBackoffMs: options.retryBackoffMs,
    batchSize: options.batchSize,
    startAfter: options.startAfter ?? null,
    totals: {
      scanned: entries.length,
      generated: generatedCount,
      processed: processedCount,
      skippedExisting: skippedExistingCount,
      skippedMissingPrompt: skippedMissingPromptCount,
      errors: errorCount,
      batches: batches.length,
    },
    results,
  };

  await writeJson(LOG_PATH, logPayload);

  console.log(`Scanned ${entries.length} recipe image entries across ${batches.length} batch(es).`);
  console.log(`Generated: ${generatedCount}`);
  console.log(`Skipped existing: ${skippedExistingCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Log written to ${path.relative(ROOT, LOG_PATH)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
