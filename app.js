const {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion,
  unloadModel
} = await import("@qvac/sdk");

console.log("Loading QVAC model...");

const modelId = await loadModel({
  modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  onProgress: (p) => {
    console.log(`Downloading: ${p.percentage.toFixed(0)}%`);
  }
});

console.log("Model loaded!");

const result = completion({
  modelId,
  history: [
    {
      role: "user",
      content: "Give me a short introduction to QVAC local AI."
    }
  ],
  stream: true
});

for await (const token of result.tokenStream) {
  process.stdout.write(token);
}

console.log("\n\nDone!");
await unloadModel({ modelId });