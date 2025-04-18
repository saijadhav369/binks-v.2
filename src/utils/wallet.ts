import { toast } from "../hooks/use-toast";

// Define the wallet types we support
export enum WalletType {
  METAMASK = 'metamask',
  PHANTOM = 'phantom'
}

// Interface for common wallet structure
export interface WalletInfo {
  address: string;
  type: WalletType;
  balance?: string;
  chainId?: string | number;
  name?: string;
  role?: string; // Added role property
}

// Check if MetaMask is available in the browser
export const isMetaMaskAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
    typeof window.ethereum !== 'undefined' && 
    window.ethereum.isMetaMask;
};

// Check if Phantom is available in the browser
export const isPhantomAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
    typeof window.solana !== 'undefined' && 
    window.solana?.isPhantom;
};

// Connect to MetaMask
export const connectMetaMask = async (): Promise<WalletInfo | null> => {
  if (!isMetaMaskAvailable()) {
    toast({
      title: "MetaMask not found",
      description: "Please install MetaMask extension and refresh this page.",
      variant: "destructive"
    });
    window.open('https://metamask.io/download/', '_blank');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      
      // Get the chain ID
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      // Get ETH balance (optional)
      const balance = await window.ethereum.request({ 
        method: 'eth_getBalance',
        params: [address, 'latest'] 
      });

      // Convert balance from wei to ETH
      const ethBalance = balance ? 
        (parseInt(balance, 16) / 1e18).toFixed(4) : 
        undefined;

      // Save wallet info to localStorage
      const walletInfo: WalletInfo = {
        address,
        type: WalletType.METAMASK,
        balance: ethBalance,
        chainId,
        name: "User" // Set a default name
      };
      
      localStorage.setItem('walletInfo', JSON.stringify(walletInfo));
      
      return walletInfo;
    }
    return null;
  } catch (error) {
    console.error('Failed to connect to MetaMask', error);
    toast({
      title: "Connection Failed",
      description: "Could not connect to MetaMask. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};

// Connect to Phantom
export const connectPhantom = async (): Promise<WalletInfo | null> => {
  if (!isPhantomAvailable()) {
    toast({
      title: "Phantom not found",
      description: "Please install Phantom wallet extension and refresh this page.",
      variant: "destructive"
    });
    window.open('https://phantom.app/download', '_blank');
    return null;
  }

  try {
    const { publicKey } = await window.solana.connect();
    
    if (publicKey) {
      const address = publicKey.toString();
      
      // Save wallet info to localStorage
      const walletInfo: WalletInfo = {
        address,
        type: WalletType.PHANTOM,
        name: "User" // Set a default name
      };
      
      localStorage.setItem('walletInfo', JSON.stringify(walletInfo));
      
      return walletInfo;
    }
    return null;
  } catch (error) {
    console.error('Failed to connect to Phantom', error);
    toast({
      title: "Connection Failed",
      description: "Could not connect to Phantom. Please try again.",
      variant: "destructive"
    });
    return null;
  }
};

// Get wallet info from localStorage
export const getWalletInfo = (): WalletInfo | null => {
  const walletInfoStr = localStorage.getItem('walletInfo');
  if (!walletInfoStr) return null;
  
  try {
    return JSON.parse(walletInfoStr) as WalletInfo;
  } catch {
    return null;
  }
};

// Disconnect wallet
export const disconnectWallet = (): void => {
  localStorage.removeItem('walletInfo');
  
  // If connected to Phantom, disconnect from it too
  if (isPhantomAvailable() && window.solana?.isConnected) {
    window.solana.disconnect();
  }
  
  // Note: MetaMask doesn't have a disconnect method
};

// Format address for display (0x1234...5678)
export const formatAddress = (address: string): string => {
  if (!address) return '';
  
  return address.length > 10
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : address;
};

// Add types for window object
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      isConnected: boolean;
    };
  }
}
