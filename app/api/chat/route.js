import { THINKING_MODES, DEFAULT_MODE, CLAUDE_MODEL } from "../../../lib/config";

export async function POST(req) {
  try {
    const { messages, mode } = await req.json();

    const chosenMode = THINKING_MODES[mode] ? mode : DEFAULT_MODE;
    const modeConfig = THINKING_MODES[chosenMode];

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        {
          error:
            "ANTHROPIC_API_KEY belum di-set di environment variables Vercel. Tambahin dulu di Project Settings > Environment Variables.",
        },
        { status: 500 }
      );
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: modeConfig.maxTokens,
        temperature: modeConfig.temperature,
        system: modeConfig.system,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      return Response.json(
        { error: `Gagal manggil Claude API: ${errText}` },
        { status: anthropicRes.status }
      );
    }

    const data = await anthropicRes.json();
    const textBlock = data.content?.find((c) => c.type === "text");

    return Response.json({
      reply: textBlock?.text ?? "(Dikzy AI tidak memberikan respon teks)",
      mode: chosenMode,
    });
  } catch (err) {
    return Response.json(
      { error: `Terjadi kesalahan server: ${err.message}` },
      { status: 500 }
    );
  }
}
