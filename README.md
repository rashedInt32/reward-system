
# Earn & Collect Reward System

## Tech Stack
- Next.js 14 (App Router, React Server Components)
- Tailwind CSS: Vibrant, gamified design
- Framer Motion: Reward animations
- Local Storage: Persistent rewards
- Geolocation/Video APIs: User actions
- Hugging Face: AI-generated reward names/icons

## Implementation
- **Location Check-in**: Geolocation API with Haversine formula, AI-generated “Starlight Coin” style rewards.
- **Video Watch**: HTML5 Video API for 15-second tracking, AI-generated “Quest Badge”.
- **Code Scan**: Text input for code validation, AI-generated “Mystic Token”.
- **Wallet**: Server-rendered page with Client Component for rewards, showing AI-generated names/icons, Wallet name edit option, super badge unlocked notification when earned 5 rewards.

- **Bonus**: 24-hour check-in cooldown, wallet name/avatar customization (AI-suggested names), progress bar, sound effects, toast notification.

## Demo
[Live Demo](https://reward-system-zeta.vercel.app/)

## AI Tools Used

- Reward Names: meta-llama/Llama-3.1-8B-Instruct (SambaNova) via Hugging Face generates unique names based on action type.

- Reward Icons: black-forest-labs/FLUX.1-dev creates 64x64 pixel icons as base64 URLs. Free tier limit reached; static icons (/images/icons/) used as fallback.

- Challenges: Hugging Face free limit causes 429 errors. Solutions: Upgrade to PRO, deploy FLUX.1-dev locally (transformers), or rely on static icons.


## Setup
```bash
npm install
npm run dev
Set NEXT_PUBLIC_HF_API_KEY in .env.local for AI features.
