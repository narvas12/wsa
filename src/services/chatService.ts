import type { NewsArticle } from '../types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Get API keys and model from environment variables
const getConfig = () => ({
  openrouterApiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  openrouterModel: import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini',
  newsApiKey: import.meta.env.VITE_NEWS_API_KEY || '',
});

// System prompt for the forex assistant
const SYSTEM_PROMPT = `You are WallBot, the official AI assistant for Wallstreet Forex Academy based in Enugu, Nigeria. You are an expert forex trading assistant with comprehensive knowledge about:

1. **Currency Trading**: All major, minor, and exotic currency pairs
2. **Technical Analysis**: Chart patterns, indicators (RSI, MACD, Moving Averages, Bollinger Bands, etc.), candlestick patterns
3. **Fundamental Analysis**: Economic indicators, central bank policies, GDP, inflation, employment data
4. **Risk Management**: Position sizing, stop-loss strategies, risk-reward ratios
5. **Trading Psychology**: Emotional control, discipline, trading plans
6. **Market Sessions**: London, New York, Tokyo, Sydney sessions and their characteristics
7. **Trading Strategies**: Day trading, swing trading, scalping, position trading

**IMPORTANT RULES:**
- You ONLY answer questions related to forex trading, currency markets, and financial education
- If asked about topics outside forex (like cooking, sports, general knowledge, programming unrelated to trading), politely decline and redirect to forex topics
- Always be helpful, educational, and professional
- When providing market insights, mention that this is educational content, not financial advice
- Promote Wallstreet Forex Academy's courses when relevant
- Be conversational and encouraging to students learning forex

**About Wallstreet Forex Academy:**
- CEO: Chukwuma Cornelius Chibuike (15+ years trading experience)
- Secretary: Chukwuma Kamsi Cynthia
- Location: Enugu, Nigeria
- Courses: Forex Fundamentals, Technical Analysis Mastery, Professional Trading Program

When you receive news data, incorporate it naturally into your response about current market conditions.`;

// Check if a question is forex-related
const isForexRelated = (message: string): boolean => {
  const forexKeywords = [
    'forex', 'trading', 'currency', 'pair', 'eur', 'usd', 'gbp', 'jpy', 'ngn',
    'chart', 'technical', 'fundamental', 'analysis', 'indicator', 'rsi', 'macd',
    'moving average', 'candlestick', 'support', 'resistance', 'trend', 'breakout',
    'pip', 'lot', 'leverage', 'margin', 'spread', 'broker', 'exchange', 'market',
    'buy', 'sell', 'long', 'short', 'position', 'order', 'stop loss', 'tp', 'sl', 'take profit',
    'risk', 'reward', 'management', 'psychology', 'strategy', 'scalp', 'swing',
    'day trade', 'central bank', 'interest rate', 'inflation', 'gdp', 'employment',
    'economic', 'news', 'volatility', 'liquidity', 'session', 'london', 'new york',
    'tokyo', 'dollar', 'euro', 'pound', 'yen', 'naira', 'gold', 'xau', 'price',
    'action', 'pattern', 'fibonacci', 'elliott', 'wave', 'academy', 'course',
    'learn', 'study', 'wallstreet', 'trade', 'profit', 'loss', 'account', 'demo',
    'live', 'capital', 'investment', 'invest', 'money', 'financial', 'finance',
    'beginner', 'advanced', 'intermediate', 'strategy', 'plan', 'journal',
    'backtest', 'forward test', 'drawdown', 'equity', 'balance', 'hedge'
  ];

  const lowerMessage = message.toLowerCase();
  return forexKeywords.some(keyword => lowerMessage.includes(keyword));
};

// Fetch forex news from News API
export const fetchForexNews = async (): Promise<NewsArticle[]> => {
  const { newsApiKey } = getConfig();
  if (!newsApiKey) return [];

  try {
    const response = await fetch(
      `${NEWS_API_URL}?q=forex+OR+currency+OR+trading&language=en&sortBy=publishedAt&pageSize=5&apiKey=${newsApiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      urlToImage: article.urlToImage,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Format news for AI context
const formatNewsForContext = (news: NewsArticle[]): string => {
  if (news.length === 0) return '';
  
  return `\n\n**Latest Forex News (for context):**\n${news
    .map((article, i) => `${i + 1}. ${article.title} - ${article.source}`)
    .join('\n')}`;
};

// Check if API is configured
export const isApiConfigured = (): boolean => {
  const { openrouterApiKey } = getConfig();
  return Boolean(openrouterApiKey && openrouterApiKey.length > 0);
};

// Main chat function
export const sendMessage = async (
  message: string,
  conversationHistory: { role: string; content: string }[]
): Promise<string> => {
  const { openrouterApiKey, openrouterModel, newsApiKey } = getConfig();

  // Check if the message is forex-related
  if (!isForexRelated(message) && conversationHistory.length > 0) {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'how are you', 'what can you do', 'help'];
    const isGreeting = greetings.some(g => message.toLowerCase().includes(g));
    
    if (!isGreeting) {
      return `I appreciate your question, but I'm WallBot, a specialized forex trading assistant for Wallstreet Forex Academy. I can only help with forex-related topics like:

• Currency pair analysis (EUR/USD, GBP/USD, etc.)
• Technical and fundamental analysis
• Trading strategies and risk management
• Market news and insights
• Our academy's courses and programs

Is there anything about forex trading I can help you with today? 📈`;
    }
  }

  // If no API key, use simulated response
  if (!openrouterApiKey) {
    return getSimulatedResponse(message);
  }

  try {
    // Fetch news if asking about market conditions
    let newsContext = '';
    if (newsApiKey && (
      message.toLowerCase().includes('news') ||
      message.toLowerCase().includes('market') ||
      message.toLowerCase().includes('today') ||
      message.toLowerCase().includes('current')
    )) {
      const news = await fetchForexNews();
      newsContext = formatNewsForContext(news);
    }

    const systemPromptWithNews = SYSTEM_PROMPT + newsContext;

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouterApiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Wallstreet Forex Academy',
      },
      body: JSON.stringify({
        model: openrouterModel,
        messages: [
          { role: 'system', content: systemPromptWithNews },
          ...conversationHistory,
          { role: 'user', content: message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Simulated response for demo mode (when no API key is provided)
export const getSimulatedResponse = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerMessage = message.toLowerCase();

  // Check for non-forex topics
  if (!isForexRelated(message)) {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.some(g => lowerMessage.includes(g))) {
      return `Hello! 👋 Welcome to Wallstreet Forex Academy's AI assistant. I'm WallBot, your forex trading companion!

I'm here to help you with:
• Forex trading concepts and strategies
• Technical and fundamental analysis
• Market insights and news
• Information about our courses

What would you like to learn about today? 📈`;
    }

    return `I appreciate your question, but I'm WallBot, a specialized forex trading assistant. I can only help with forex-related topics.

Here are some things I can help you with:
• Currency pair analysis
• Trading strategies
• Technical indicators
• Risk management
• Our academy's programs

How can I assist you with forex trading? 📊`;
  }

  // Forex-related responses
  if (lowerMessage.includes('eur/usd') || lowerMessage.includes('eurusd')) {
    return `**EUR/USD Analysis** 📊

The EUR/USD is the most traded currency pair in the world, representing about 28% of daily forex volume.

**Key Points:**
• Current major support: 1.0800
• Current major resistance: 1.0950
• The pair is influenced by ECB and Fed monetary policies

**Trading Tips:**
1. Watch for ECB interest rate decisions
2. US Non-Farm Payrolls heavily impact this pair
3. London and New York session overlaps offer the best liquidity

Would you like to learn more about trading EUR/USD at our academy? We cover this pair extensively in our Technical Analysis Mastery course! 📚`;
  }

  if (lowerMessage.includes('strategy') || lowerMessage.includes('strategies')) {
    return `**Forex Trading Strategies** 🎯

Here are popular strategies we teach at Wallstreet Forex Academy:

**1. Trend Following**
• Identify the trend using moving averages
• Enter in the direction of the trend
• Best for: Patient traders

**2. Breakout Trading**
• Wait for price to break key levels
• Confirm with volume
• Best for: Active traders

**3. Support & Resistance**
• Buy at support, sell at resistance
• Use multiple timeframes
• Best for: All skill levels

**4. Price Action**
• Trade based on candlestick patterns
• No indicators needed
• Best for: Intermediate traders

Want to master these strategies? Our Professional Trading Program covers all of them in depth! 🚀`;
  }

  if (lowerMessage.includes('risk') || lowerMessage.includes('management')) {
    return `**Risk Management - The Key to Long-Term Success** ⚠️

At Wallstreet Forex Academy, we emphasize that risk management is MORE important than entry strategies.

**The Golden Rules:**
1. **Never risk more than 1-2%** of your account per trade
2. **Always use stop losses** - No exceptions!
3. **Risk-Reward Ratio:** Aim for at least 1:2 (risk $1 to make $2)
4. **Position Sizing Formula:**
   Position Size = (Account × Risk%) ÷ Stop Loss in Pips

**Example:**
• Account: $10,000
• Risk per trade: 1% ($100)
• Stop Loss: 50 pips
• Position Size: $100 ÷ 50 = $2/pip = 0.2 lots

This is covered extensively in all our courses. Would you like more details? 📈`;
  }

  if (lowerMessage.includes('course') || lowerMessage.includes('learn') || lowerMessage.includes('academy')) {
    return `**Wallstreet Forex Academy Courses** 🎓

We offer three comprehensive programs:

**1. Forex Fundamentals (₦150,000)**
• Duration: 4 weeks
• Perfect for: Complete beginners
• Learn: Basics, demo trading, market mechanics

**2. Technical Analysis Mastery (₦300,000)**
• Duration: 8 weeks
• Perfect for: Intermediate traders
• Learn: Chart patterns, indicators, live trading

**3. Professional Trading Program (₦500,000)**
• Duration: 12 weeks
• Perfect for: Serious traders
• Includes: 1-on-1 mentorship, funded account opportunity

**Our CEO, Chukwuma Cornelius Chibuike**, personally oversees all programs with 15+ years of experience.

Visit us in Enugu or contact us to enroll! 🚀`;
  }

  if (lowerMessage.includes('news') || lowerMessage.includes('market')) {
    return `**Current Market Insights** 📰

*Note: Configure your News API key in .env file for real-time news.*

**Key Factors Affecting Markets:**

1. **Central Bank Policies**
   • Fed, ECB, and BOJ decisions drive major pairs
   • Watch for rate decision announcements

2. **Economic Indicators**
   • Non-Farm Payrolls (USD)
   • CPI/Inflation data
   • GDP releases

3. **Geopolitical Events**
   • Trade tensions
   • Political elections
   • Global conflicts

**Pro Tip:** Use an economic calendar to track upcoming events!

Want to learn how to trade the news? Our Technical Analysis Mastery course covers this! 📈`;
  }

  // Default response
  return `Great question about forex trading! 📈

At Wallstreet Forex Academy, we believe in practical, hands-on education. Here's what I can help you with:

• **Analysis:** Technical and fundamental analysis techniques
• **Strategies:** Day trading, swing trading, scalping
• **Risk:** Position sizing and money management
• **Psychology:** Developing the right trading mindset
• **Courses:** Information about our programs

Our CEO, **Chukwuma Cornelius Chibuike**, has over 15 years of trading experience and has trained 5,000+ successful traders.

What specific aspect of forex trading would you like to explore? 🎯`;
};
