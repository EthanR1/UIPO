export interface IPAsset {
  id: string;
  symbol: string;
  name: string;
  university: string;
  researchField: string;
  description: string;
  participationType: 'tokenized' | 'equity' | 'convertible';
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  imageUrl: string;
  milestones: Milestone[];
  metrics: ResearchMetrics;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: number;
  achieved: boolean;
  type: 'patent' | 'publication' | 'commercialization' | 'regulatory';
}

export interface ResearchMetrics {
  patentCount: number;
  citationCount: number;
  commercializationScore: number; // 0-100
  marketSentiment: number; // 0-100
  expertRating: number; // 0-100
}

export interface Order {
  id: string;
  assetId: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  timestamp: number;
  status: 'open' | 'filled' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'investor' | 'researcher' | 'university';
  portfolio: Portfolio;
}

export interface Portfolio {
  assets: PortfolioAsset[];
  totalValue: number;
  change24h: number;
}

export interface PortfolioAsset {
  assetId: string;
  symbol: string;
  name: string;
  amount: number;
  valueUSD: number;
  allocation: number;
  participationType: 'tokenized' | 'equity' | 'convertible';
}

export interface ChartData {
  timestamp: number;
  price: number;
  marketSentiment?: number;
  expertRating?: number;
}

export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  topGainer: Pick<IPAsset, 'id' | 'symbol' | 'name' | 'change24h'>;
  topLoser: Pick<IPAsset, 'id' | 'symbol' | 'name' | 'change24h'>;
}

export interface PredictionMarket {
  assetId: string;
  predictions: Prediction[];
}

export interface Prediction {
  id: string;
  userId: string;
  type: 'milestone' | 'valuation' | 'commercialization';
  target: number;
  confidence: number; // 0-100
  timestamp: number;
}