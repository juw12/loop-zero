# AI Review Responder

A demo Next.js app that generates professional, empathetic replies to customer reviews using an LLM.

## What it does

Paste a customer review (positive or negative) and get back a polished response that:

- Acknowledges the customer's experience
- Apologizes sincerely for negative feedback
- Mentions a concrete fix or improvement
- Invites the customer back

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
