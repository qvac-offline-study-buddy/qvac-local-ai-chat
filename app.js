export function buildStudyPrompt(question, materials = "") {
  return `You are QVAC Study Buddy, a helpful local AI study assistant.

Study materials:
${materials || "No study materials provided."}

Student question:
${question}

Answer clearly and simply. Use the study materials when relevant.`;
}
