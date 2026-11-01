interface LLMOptions {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
}

interface LLMResponse {
  text: string;
}

export async function callLLM(options: LLMOptions): Promise<LLMResponse> {
  const provider = (process.env.LLM_PROVIDER || 'openai').toLowerCase();
  const apiKey = process.env.LLM_API_KEY;
  const defaultModel =
    provider === 'anthropic' ? 'claude-3-5-haiku-latest' : 'gpt-4o-mini';
  const model = process.env.LLM_MODEL || defaultModel;

  if (!apiKey) {
    throw new Error(
      'No API key configured. Add LLM_API_KEY to your .env.local file.'
    );
  }

  if (provider === 'openai') return callOpenAI(apiKey, model, options);
  if (provider === 'anthropic') return callAnthropic(apiKey, model, options);
  throw new Error(
    `Unsupported LLM_PROVIDER "${provider}". Use "openai" or "anthropic".`
  );
}

async function callOpenAI(
  apiKey: string,
  model: string,
  options: LLMOptions
): Promise<LLMResponse> {
  let res: Response;
  try {
    res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: options.system },
          { role: 'user', content: options.user },
        ],
        max_tokens: options.maxTokens ?? 500,
        temperature: options.temperature ?? 0.7,
      }),
    });
  } catch {
    throw new Error('Could not reach OpenAI. Check your internet connection.');
  }

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 401)
      throw new Error('Invalid API key. Double-check your LLM_API_KEY.');
    if (res.status === 429)
      throw new Error('Rate limit reached. Wait a moment and try again.');
    throw new Error(`OpenAI error (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string | undefined = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenAI.');
  return { text };
}

async function callAnthropic(
  apiKey: string,
  model: string,
  options: LLMOptions
): Promise<LLMResponse> {
  let res: Response;
  try {
    res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: options.maxTokens ?? 500,
        system: options.system,
        messages: [{ role: 'user', content: options.user }],
        temperature: options.temperature ?? 0.7,
      }),
    });
  } catch {
    throw new Error(
      'Could not reach Anthropic. Check your internet connection.'
    );
  }

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 401)
      throw new Error('Invalid API key. Double-check your LLM_API_KEY.');
    if (res.status === 429)
      throw new Error('Rate limit reached. Wait a moment and try again.');
    throw new Error(`Anthropic error (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const text: string | undefined = data.content?.[0]?.text;
  if (!text) throw new Error('Empty response from Anthropic.');
  return { text };
}
