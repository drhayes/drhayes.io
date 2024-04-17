// inspired (and taken) from ethan marcotte's blog post
// https://ethanmarcotte.com/wrote/blockin-bots/
const botUas = [
  'AdsBot-Google',
  'Amazonbot',
  'anthropic-ai',
  'Applebot',
  'AwarioRssBot',
  'AwarioSmartBot',
  'Bytespider',
  'CCBot',
  'ChatGPT',
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'cohere-ai',
  'DataForSeoBot',
  'Diffbot',
  'FacebookBot',
  'FacebookBot',
  'Google-Extended',
  'GPTBot',
  'ImagesiftBot',
  'magpie-crawler',
  'omgili',
  'Omgilibot',
  'peer39_crawler',
  'PerplexityBot',
  'YouBot'
];

export default async (request, context) => {
  const userAgent = request.headers.get('user-agent');

  const isBot = botUas.reduce((isBot, botUserAgent) => {
    if (isBot) {
      return isBot;
    }
    return userAgent.toLowerCase().includes(botUserAgent.toLowerCase());
  }, false);

  if (isBot) {
    console.log(`Blocked bot with user agent: ${userAgent}`);
    return new Response(null, { status: 401 });
  }

  return await context.next();
};

