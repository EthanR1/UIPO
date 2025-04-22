import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockPortfolioAssets } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would validate credentials with an API
    if (email && password) {
      setUser({
        id: 'user-123',
        name: 'Demo User',
        email,
        portfolio: {
          assets: mockPortfolioAssets,
          totalValue: mockPortfolioAssets.reduce((sum, asset) => sum + asset.valueUSD, 0),
          change24h: 2.34
        }
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};