import Replicate from "replicate";

console.log("Testing Replicate connection...");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

console.log("Client created successfully");