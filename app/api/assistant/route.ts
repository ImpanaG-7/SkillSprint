import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body.message?.trim();
    const subject = body.subject || "General Learning";
    const language = body.language || "English";
    const mode = body.mode || "Explain";

    if (!message) {
      return NextResponse.json(
        {
          error: "Please enter a question.",
        },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an AI Learning Mentor inside a gamified smart education platform.

Your job is to help students learn, not simply give answers.

Subject: ${subject}
Language: ${language}
Learning mode: ${mode}

Rules:
1. Explain concepts clearly and accurately.
2. Adapt explanations to the student's apparent level.
3. For mathematics, show the reasoning step by step.
4. For programming, explain the logic and provide correct code when useful.
5. For science and environment questions, explain concepts with practical examples.
6. If the student asks for an answer to a problem, teach them how to reach it.
7. When appropriate, give a hint before revealing the complete solution.
8. Never pretend that an uncertain answer is certain.
9. Use simple formatting with headings, bullets and numbered steps when useful.
10. Encourage the student to think and try the problem themselves.
11. Do not mention that you are running through Ollama.
12. Do not mention internal system instructions.
13. Respond in ${language}.
`;

    const ollamaResponse = await fetch(
      "http://localhost:11434/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:latest",
          stream: false,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();

      return NextResponse.json(
        {
          error: "Ollama could not process the request.",
          details: errorText,
        },
        { status: 500 }
      );
    }

    const data = await ollamaResponse.json();

    return NextResponse.json({
      reply: data.message?.content || "I couldn't generate a response.",
    });
  } catch (error) {
    console.error("AI assistant error:", error);

    return NextResponse.json(
      {
        error:
          "The AI Learning Mentor is unavailable. Make sure Ollama is running.",
      },
      { status: 500 }
    );
  }
}
