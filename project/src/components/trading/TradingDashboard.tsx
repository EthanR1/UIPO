import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Info, Clock, Award, FileText } from 'lucide-react';
import { mockAssets, mockChartData } from '../../data/mockData';
import { formatCurrency, formatPercentage, getChangeColorClass } from '../../utils/formatters';
import Button from '../ui/Button';
import Card from '../ui/Card';

const TradingDashboard: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState(mockAssets[0]);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const chartData = mockChartData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Asset List */}
      <div className="lg:col-span-3 space-y-4">
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">IP Assets</h2>
            <div className="space-y-2">
              {mockAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedAsset.id === asset.id
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{asset.symbol}</span>
                      <p className="text-sm text-gray-500">{asset.university}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(asset.price)}</div>
                      <div className={`text-sm ${getChangeColorClass(asset.change24h)}`}>
                        {formatPercentage(asset.change24h)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-9 space-y-6">
        {/* Asset Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {selectedAsset.name}
              <span className="text-gray-500 text-lg">({selectedAsset.symbol})</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{selectedAsset.university}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold">{formatCurrency(selectedAsset.price)}</div>
              <div className={`flex items-center ${getChangeColorClass(selectedAsset.change24h)}`}>
                {selectedAsset.change24h > 0 ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
                {formatPercentage(selectedAsset.change24h)}
              </div>
            </div>
            <Button variant="primary" size="lg" className="bg-black hover:bg-gray-900 text-white">
              Trade
            </Button>
          </div>
        </div>

        {/* Chart */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {(['1D', '1W', '1M', '3M', '1Y'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    timeframe === t
                      ? 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                  stroke="#9CA3AF"
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#000000"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Asset Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-black dark:text-white" size={20} />
              <h3 className="font-semibold">Research Metrics</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Patents</span>
                <span className="font-medium">{selectedAsset.metrics.patentCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Citations</span>
                <span className="font-medium">{selectedAsset.metrics.citationCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Market Score</span>
                <span className="font-medium">{selectedAsset.metrics.marketSentiment}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-black dark:text-white" size={20} />
              <h3 className="font-semibold">Upcoming Milestones</h3>
            </div>
            <div className="space-y-2">
              {selectedAsset.milestones
                .filter(m => !m.achieved)
                .slice(0, 3)
                .map(milestone => (
                  <div key={milestone.id} className="text-sm">
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {new Date(milestone.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="text-black dark:text-white" size={20} />
              <h3 className="font-semibold">Participation Type</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span className="capitalize">{selectedAsset.participationType}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedAsset.description}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;