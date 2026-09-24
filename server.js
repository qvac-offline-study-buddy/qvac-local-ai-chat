import http from "http";
import {
  loadModel,
  LLAMA_3_2_1B_INST_Q4_0,
  completion
} from "@qvac/sdk";

const PORT = 3000;

console.log("Loading QVAC model...");

const modelId = await loadModel({
  modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  onProgress: (p) => {
    console.log(`Loading: ${p.percentage.toFixed(0)}%`);
  }
});

console.log("QVAC model ready!");

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>QVAC Local AI</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; }
    textarea { width: 100%; height: 100px; margin: 10px 0; }
    button { padding: 12px 20px; }
    #output { white-space: pre-wrap; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>QVAC Local AI</h1>
  <p>AI inference running locally with Tether QVAC.</p>
  <textarea id="prompt">Tell me something interesting about AI.</textarea>
  <br>
  <button onclick="askAI()">Ask Local AI</button>
  <div id="output"></div>

  <script>
    async function askAI() {
      const output = document.getElementById("output");
      output.textContent = "Thinking locally...";
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          prompt: document.getElementById("prompt").value
        })
      });

      const data = await response.json();
      output.textContent = data.answer || data.error;
    }
  </script>
</body>
</html>
`;

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { prompt } = JSON.parse(body);

        const result = completion({
          modelId,
          history: [
            {
              role: "user",
              content: prompt
            }
          ],
          stream: true
        });

        let answer = "";

        for await (const token of result.tokenStream) {
          answer += token;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ answer }));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`QVAC Local AI running on port ${PORT}`);
});