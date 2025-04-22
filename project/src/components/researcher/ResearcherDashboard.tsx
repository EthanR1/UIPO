import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FileText, TrendingUp, Users, Bell } from 'lucide-react';
import { mockAssets } from '../../data/mockData';
import { formatCurrency, formatPercentage, getChangeColorClass } from '../../utils/formatters';

const ResearcherDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Researcher Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your research portfolio</p>
        </div>
        <Button variant="primary" className="bg-black hover:bg-gray-900 text-white">
          Add New Research
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
              <h3 className="text-xl font-bold mt-1">$2.4M</h3>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <TrendingUp className="text-black dark:text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Patents</p>
              <h3 className="text-xl font-bold mt-1">12</h3>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <FileText className="text-black dark:text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Investors</p>
              <h3 className="text-xl font-bold mt-1">156</h3>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <Users className="text-black dark:text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Updates</p>
              <h3 className="text-xl font-bold mt-1">3</h3>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <Bell className="text-black dark:text-white" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Research Portfolio */}
      <Card>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Your Research Portfolio</h2>
          <div className="space-y-4">
            {mockAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={asset.imageUrl}
                    alt={asset.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{asset.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(asset.price)}</div>
                  <div className={`text-sm ${getChangeColorClass(asset.change24h)}`}>
                    {formatPercentage(asset.change24h)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResearcherDashboard;