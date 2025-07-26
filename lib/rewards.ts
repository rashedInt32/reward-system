import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.NEXT_PUBLIC_HF_API_KEY);

// This function generates a random wallet name based on the action type
export async function generateRewardName(actionType: string): Promise<string> {
  try {
    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      provider: "sambanova", // or together, fal-ai, replicate, cohere …
      messages: [
        {
          role: "user",
          content: `Generate a creative name for a digital reward token related to ${actionType}, just the name please, do not add any description or conversation text, just random reward name with Code | Checkin | Video | Wallet word at the end`,
        },
      ],
      max_tokens: 20,
      temperature: 0.5,
    });

    const walletName = response?.choices[0]?.message?.content?.trim();
    return walletName || `Default ${actionType} Token`;
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

// Random reward icon generator
export async function generateRewardIcon() {
  const randomNumber = Math.floor(Math.random() * 47) + 1;
  return `/images/icons/${randomNumber}.png`;
}

type HFTextToImageResponse = {
  data: { b64_json: string; url?: string | null }[];
  id?: string;
};

// This is a paid service, so ensure you have the correct API key and usage limits
export async function generateRewardIconByAI(name: string): Promise<string> {
  try {
    const response = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: `A 64x64 pixel shiny badge icon for a reward named ${name}, flat design, transparent background`,
      parameters: {
        negative_prompt: "blurry, low quality, distorted",
        width: 64,
        height: 64,
      },
    });

    const { data } = response as unknown as HFTextToImageResponse;

    if (
      !Array.isArray(data) ||
      data.length === 0 ||
      typeof data[0]?.b64_json !== "string"
    ) {
      console.error("Invalid API response structure:", data);
      throw new Error("Missing or invalid base64 image");
    }

    const base64 = data[0].b64_json.trim();

    // Optional: sanity check the base64 string length
    if (base64.length < 1000) {
      console.warn("Base64 string seems too short, something may be wrong");
    }

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error("FLUX.1 icon generation failed:", error);
    return "/images/icons/default.png";
  }
}
