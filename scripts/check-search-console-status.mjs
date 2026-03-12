import { writeJson, writeText } from "./seo-utils.mjs";

const accessToken = process.env.GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN;
const property = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY;
const urls = process.argv.slice(2).filter((arg) => !arg.startsWith('--')).map((arg) => arg.trim()).filter(Boolean);

if (!accessToken || !property || !urls.length) {
  const message = {
    generatedAt: new Date().toISOString(),
    supported: false,
    reason: 'Provide GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN, GOOGLE_SEARCH_CONSOLE_PROPERTY, and one or more URLs to check.',
  };
  await writeJson('search-console-status.json', message);
  await writeText('search-console-status.md', '# Search Console Status\n\nProvide GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN, GOOGLE_SEARCH_CONSOLE_PROPERTY, and one or more URLs to check.\n');
  console.log(message.reason);
  process.exit(0);
}

const endpoint = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const results = [];
for (const inspectedUrl of urls) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inspectionUrl: inspectedUrl,
      siteUrl: property,
      languageCode: 'en-US',
    }),
  });

  const payload = await response.json();
  results.push({
    url: inspectedUrl,
    ok: response.ok,
    payload,
  });
}

await writeJson('search-console-status.json', {
  generatedAt: new Date().toISOString(),
  supported: true,
  property,
  results,
});
await writeText('search-console-status.md', ['# Search Console Status', '', ...results.map((result) => `- ${result.url}: ${result.ok ? 'checked' : 'failed'}`)].join('\n') + '\n');

console.log(`Checked ${results.length} URL inspection result(s).`);
