// QVAC Study Buddy application logic.
// This module turns a student's question and optional study material
// into a focused prompt for the locally loaded QVAC model.

export function buildStudyPrompt(question, materials = "") {
  const cleanQuestion = String(question).trim();
  const cleanMaterials = String(materials).trim();

  const materialSection = cleanMaterials
    ? `\n\nStudy material provided by the student:\n${cleanMaterials}`
    : "";

  return `You are QVAC Study Buddy, a local AI tutor.

Help the student understand the topic clearly and accurately.
Answer the student's question directly.
Use simple language, short paragraphs, and useful examples when appropriate.
If study material is provided, use it as context and do not invent details that contradict it.
Do not mention that you are a cloud service or ask the student to use another AI.

Student question:
${cleanQuestion}${materialSection}`;
}
