import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { Asset } from '../../types';
import { formatCurrency, formatPercentage, getChangeColorClass } from '../../utils/formatters';
import Card from '../ui/Card';

interface AssetCardProps {
  asset: Asset;
  compact?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, compact = false }) => {
  const { id, symbol, name, price, change24h, imageUrl } = asset;
  
  const isPositiveChange = change24h > 0;
  const changeColorClass = getChangeColorClass(change24h);
  
  if (compact) {
    return (
      <Link to={`/trade/${id}`}>
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <img src={imageUrl} alt={name} className="w-8 h-8 rounded-full mr-3" />
          <div className="flex-grow">
            <div className="flex justify-between">
              <span className="font-medium text-gray-900 dark:text-white">
                {symbol}
              </span>
              <span className="text-gray-900 dark:text-white">
                {formatCurrency(price)}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {name}
              </span>
              <span className={`text-xs flex items-center ${changeColorClass}`}>
                {isPositiveChange ? (
                  <ArrowUpRight size={12} className="mr-1" />
                ) : (
                  <ArrowDownRight size={12} className="mr-1" />
                )}
                {formatPercentage(change24h)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Card hoverable className="h-full">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {name} <span className="text-gray-500 dark:text-gray-400 text-sm">{symbol}</span>
              </h3>
              <div className={`text-sm flex items-center mt-1 ${changeColorClass}`}>
                {isPositiveChange ? (
                  <ArrowUpRight size={14} className="mr-1" />
                ) : (
                  <ArrowDownRight size={14} className="mr-1" />
                )}
                {formatPercentage(change24h)}
              </div>
            </div>
          </div>
          
          <TrendingUp 
            className={`${changeColorClass} opacity-40`} 
            size={28} 
          />
        </div>
        
        <div className="mt-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(price)}
          </div>
        </div>
        
        <div className="mt-5">
          <Link 
            to={`/trade/${id}`} 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center font-medium transition-colors"
          >
            Trade
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default AssetCard;