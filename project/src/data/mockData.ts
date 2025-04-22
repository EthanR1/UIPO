import { IPAsset, Order, PortfolioAsset, MarketStats, ChartData } from '../types';

export const mockAssets: IPAsset[] = [
  {
    id: 'mit-quantum',
    symbol: 'MITQ',
    name: 'MIT Quantum Computing Patent Portfolio',
    university: 'Massachusetts Institute of Technology',
    researchField: 'Quantum Computing',
    description: 'Revolutionary quantum computing architecture with potential applications in cryptography and drug discovery.',
    participationType: 'tokenized',
    price: 156.42,
    change24h: 2.41,
    volume24h: 2365000,
    marketCap: 15640000,
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=150',
    milestones: [
      {
        id: 'patent-1',
        title: 'Core Architecture Patent',
        description: 'Patent filing for the core quantum computing architecture',
        date: Date.now() - 7776000000, // 90 days ago
        achieved: true,
        type: 'patent'
      },
      {
        id: 'comm-1',
        title: 'Industry Partnership',
        description: 'Strategic partnership with major tech company',
        date: Date.now() + 7776000000, // 90 days in future
        achieved: false,
        type: 'commercialization'
      }
    ],
    metrics: {
      patentCount: 3,
      citationCount: 145,
      commercializationScore: 78,
      marketSentiment: 85,
      expertRating: 92
    }
  },
  {
    id: 'stanford-ai',
    symbol: 'STAI',
    name: 'Stanford AI Research Portfolio',
    university: 'Stanford University',
    researchField: 'Artificial Intelligence',
    description: 'Advanced machine learning algorithms for natural language processing and computer vision.',
    participationType: 'convertible',
    price: 89.75,
    change24h: 3.62,
    volume24h: 1843500,
    marketCap: 8975000,
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=150',
    milestones: [
      {
        id: 'pub-1',
        title: 'Nature Publication',
        description: 'Research published in Nature journal',
        date: Date.now() - 2592000000, // 30 days ago
        achieved: true,
        type: 'publication'
      }
    ],
    metrics: {
      patentCount: 2,
      citationCount: 89,
      commercializationScore: 65,
      marketSentiment: 72,
      expertRating: 88
    }
  }
];

export const mockPortfolioAssets: PortfolioAsset[] = [
  {
    assetId: 'mit-quantum',
    symbol: 'MITQ',
    name: 'MIT Quantum Computing Patent Portfolio',
    amount: 50,
    valueUSD: 7821,
    allocation: 65,
    participationType: 'tokenized'
  },
  {
    assetId: 'stanford-ai',
    symbol: 'STAI',
    name: 'Stanford AI Research Portfolio',
    amount: 45,
    valueUSD: 4038.75,
    allocation: 35,
    participationType: 'convertible'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    assetId: 'mit-quantum',
    type: 'buy',
    price: 155.20,
    amount: 10,
    total: 1552,
    timestamp: Date.now() - 86400000 * 2,
    status: 'filled'
  },
  {
    id: 'ord-002',
    assetId: 'stanford-ai',
    type: 'buy',
    price: 88.50,
    amount: 15,
    total: 1327.50,
    timestamp: Date.now() - 86400000,
    status: 'filled'
  }
];

export const mockMarketStats: MarketStats = {
  totalMarketCap: 24615000,
  totalVolume24h: 4208500,
  topGainer: {
    id: 'stanford-ai',
    symbol: 'STAI',
    name: 'Stanford AI Research Portfolio',
    change24h: 3.62
  },
  topLoser: {
    id: 'mit-quantum',
    symbol: 'MITQ',
    name: 'MIT Quantum Computing Patent Portfolio',
    change24h: 2.41
  }
};

export const generateChartData = (days: number = 30): ChartData[] => {
  const data: ChartData[] = [];
  const now = Date.now();
  let price = 100;
  let sentiment = 75;
  let rating = 80;
  
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 0.8;
    price = Math.max(0.1, price * (1 + change));
    sentiment = Math.min(100, Math.max(0, sentiment + (Math.random() - 0.5) * 5));
    rating = Math.min(100, Math.max(0, rating + (Math.random() - 0.5) * 3));
    
    data.push({
      timestamp: now - (i * 86400000),
      price: price,
      marketSentiment: sentiment,
      expertRating: rating
    });
  }
  
  return data;
};

export const mockChartData = generateChartData();

export const mockOrderBook = {
  asks: [
    { price: 156.65, amount: 85 },
    { price: 156.60, amount: 120 },
    { price: 156.58, amount: 50 },
    { price: 156.55, amount: 180 },
    { price: 156.52, amount: 110 }
  ],
  bids: [
    { price: 156.48, amount: 75 },
    { price: 156.45, amount: 150 },
    { price: 156.43, amount: 95 },
    { price: 156.40, amount: 125 },
    { price: 156.38, amount: 200 }
  ]
};