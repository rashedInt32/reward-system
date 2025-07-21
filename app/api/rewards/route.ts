export async function generateRewardName(actionType: string): Promise<string> {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilgpt2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Generate a creative name for a digital reward token related to ${actionType}`,
          parameters: { max_length: 20 },
        }),
      },
    );
    const { generated_text } = await response.json();
    return generated_text?.trim() || `Default ${actionType} Token`;
  } catch (error) {
    console.error("AI generation failed:", error);
    const fallbacks = {
      checkin: "Quantum Shard",
      video: "Nebula Badge",
      code: "Aether Token",
      wallet: "Cosmic Vault",
    };
    return fallbacks[actionType as keyof typeof fallbacks] || "Generic Token";
  }
}

export async function generateRewardIcon(name: string): Promise<string> {
  try {
    // Placeholder for Craiyon/Stable Diffusion API
    // For simplicity, use static icons as a fallback
    return `/icons/${name.toLowerCase().replace(/\s+/g, "-")}.png`;
  } catch (error) {
    console.error("Icon generation failed:", error);
    const fallbacks = {
      checkin: "/icons/quantum-shard.png",
      video: "/icons/nebula-badge.png",
      code: "/icons/aether-token.png",
    };
    return (
      fallbacks[
        name.toLowerCase().includes("shard")
          ? "checkin"
          : name.toLowerCase().includes("badge")
            ? "video"
            : "code"
      ] || "/icons/generic.png"
    );
  }
}
