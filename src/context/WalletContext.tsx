
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletInfo, getWalletInfo, disconnectWallet } from '../utils/wallet';
import { useNavigate } from 'react-router-dom';
import { toast } from "../hooks/use-toast";

interface WalletContextType {
  walletInfo: WalletInfo | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: (connectFunction: () => Promise<WalletInfo | null>) => Promise<boolean>;
  disconnectUserWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  // On mount, check if user was previously connected
  useEffect(() => {
    const savedWalletInfo = getWalletInfo();
    if (savedWalletInfo) {
      setWalletInfo(savedWalletInfo);
    }
  }, []);

  // Connect wallet handler
  const connectWallet = async (connectFunction: () => Promise<WalletInfo | null>): Promise<boolean> => {
    setIsConnecting(true);

    try {
      const info = await connectFunction();
      
      if (info) {
        setWalletInfo(info);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully!",
        });
        navigate('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect your wallet. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet handler
  const disconnectUserWallet = () => {
    disconnectWallet();
    setWalletInfo(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
    navigate('/');
  };

  const value = {
    walletInfo,
    isConnected: !!walletInfo,
    isConnecting,
    connectWallet,
    disconnectUserWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

// Custom hook for using the wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
