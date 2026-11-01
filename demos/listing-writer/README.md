# AI Listing Writer

A demo Next.js app that generates compelling real-estate listing descriptions using an LLM.

## What it does

Fill in a quick form (property type, beds, baths, location, key features) and get back a polished listing that:

- Highlights unique features
- Evokes lifestyle, not just specs
- Speaks in second person so the reader can picture themselves there
- Closes with a clear call to action

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your API key

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
LLM_PROVIDER=openai          # or "anthropic"
LLM_API_KEY=sk-your-key      # your actual API key
# LLM_MODEL=gpt-4o-mini      # optional, defaults per provider
```

### 3. Run

```bash
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable       | Required | Default                          | Description            |
| -------------- | -------- | -------------------------------- | ---------------------- |
| `LLM_PROVIDER` | Yes      | `openai`                         | `openai` or `anthropic` |
| `LLM_API_KEY`  | Yes      | —                                | Your provider API key  |
| `LLM_MODEL`    | No       | `gpt-4o-mini` / `claude-3-5-haiku-latest` | Model to use    |

## Deploy

Standard Next.js app — deploy to any Node.js host:

- **Vercel**: `npx vercel` (zero config)
- **Docker**: `next build` → `next start`
- **Any Node host**: `npm run build && npm start`

Set the env vars in your hosting platform's environment configuration.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Raw `fetch` for LLM API calls (no SDK wrapper)

## Variations to try

- Adjust the system prompt in `app/api/generate/route.ts` to change tone (luxury / family-friendly / investment / rental).
- Add fields like "year built", "floor", "square meters" to the form and include them in the user prompt.
- Swap to `claude-3-5-haiku-latest` for a more conversational listing voice.
