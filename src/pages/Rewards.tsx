
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Coins,
  Info,
  Weight,
  Leaf,
  Calculator,
  Calendar,
  Wallet,
  ArrowDown
} from "lucide-react";

const Rewards = () => {
  const navigate = useNavigate();
  const { walletInfo, isConnected } = useWallet();
  
  // Sample data for reward history
  const rewardHistory = [
    { id: 1, date: '2025-04-16', wasteType: 'Plastic', weight: 1.2, tokens: 9.6 },
    { id: 2, date: '2025-04-14', wasteType: 'Metal', weight: 2.3, tokens: 34.5 },
    { id: 3, date: '2025-04-12', wasteType: 'Glass', weight: 0.9, tokens: 10.8 },
    { id: 4, date: '2025-04-08', wasteType: 'E-waste', weight: 0.4, tokens: 12.0 },
    { id: 5, date: '2025-04-05', wasteType: 'Paper', weight: 1.8, tokens: 10.8 },
    { id: 6, date: '2025-04-02', wasteType: 'Organic', weight: 3.5, tokens: 14.0 },
    { id: 7, date: '2025-03-28', wasteType: 'Plastic', weight: 2.0, tokens: 16.0 },
  ];
  
  // Sample data for material multipliers
  const materialMultipliers = [
    { material: 'Plastic', multiplier: 0.8, color: '#4CAF50' },
    { material: 'Paper', multiplier: 0.6, color: '#8BC34A' },
    { material: 'Glass', multiplier: 1.2, color: '#2196F3' },
    { material: 'Metal', multiplier: 1.5, color: '#9E9E9E' },
    { material: 'Organic', multiplier: 0.4, color: '#795548' },
    { material: 'E-waste', multiplier: 3.0, color: '#FF5722' },
  ];
  
  // Sample data for environmental factors
  const environmentalFactors = [
    { name: 'Earth Week', description: '1.2x boost for Glass', startDate: 'April 20, 2025', endDate: 'April 27, 2025', factor: 1.2, materials: ['Glass'] },
    { name: 'Plastic-Free July', description: '1.5x boost for Plastic', startDate: 'July 1, 2025', endDate: 'July 31, 2025', factor: 1.5, materials: ['Plastic'] },
    { name: 'E-waste Drive', description: '2.0x boost for E-waste', startDate: 'May 15, 2025', endDate: 'May 30, 2025', factor: 2.0, materials: ['E-waste'] },
  ];
  
  // Calculate total tokens earned
  const totalTokens = rewardHistory.reduce((sum, item) => sum + item.tokens, 0);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-4 md:p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Rewards</h1>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Track your BINK earnings, reward history, and discover how your waste disposal efforts make a difference.
        </p>
        
        <Card className="bg-[#2f2f2f] border-[#4CAF50]/30 transition-all hover:border-[#4CAF50] hover:shadow-lg hover:shadow-[#4CAF50]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl flex items-center">
              <Coins className="w-6 h-6 text-[#4CAF50] mr-2" />
              Total Rewards Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-white">{totalTokens.toFixed(1)}</span>
              <span className="ml-2 text-xl text-[#4CAF50]">BINK</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Earned from {rewardHistory.length} disposal activities
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Reward Formula Breakdown */}
      <div className="max-w-7xl mx-auto my-12 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calculator className="w-5 h-5 text-[#4CAF50] mr-2" />
          How are Rewards Calculated?
        </h2>
        
        <div className="bg-[#2f2f2f] p-4 md:p-6 rounded-lg mb-8 border border-[#4CAF50]/20">
          <p className="text-lg md:text-xl font-mono text-center my-4 px-2 py-3 bg-[#242424] rounded-md">
            Reward = BaseRate × MaterialMultiplier × Weight × EnvironmentalFactor
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Base Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">10 <span className="text-sm text-gray-400">tokens/kg</span></div>
                <p className="text-sm text-gray-400 mt-2">Standard rate for all materials</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Material Multiplier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1.5 text-sm">
                  {materialMultipliers.map((material) => (
                    <div key={material.material} className="flex justify-between items-center">
                      <span>{material.material}</span>
                      <span className="font-mono">{material.multiplier}x</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Weight className="h-6 w-6 text-[#4CAF50] mr-2" />
                  <div className="text-sm">
                    <p>Measured in kilograms</p>
                    <p className="text-gray-400">Tracked per disposal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Environmental Factor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Leaf className="h-6 w-6 text-[#4CAF50] mr-2" />
                  <div className="text-sm">
                    <p>1.0x to 2.0x boost</p>
                    <p className="text-gray-400">Based on campaigns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Reward History Table */}
      <div className="max-w-7xl mx-auto my-12 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="w-5 h-5 text-[#4CAF50] mr-2" />
          Reward History
        </h2>
        
        <Card className="bg-[#242424] border-[#4CAF50]/20">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#4CAF50]/20 hover:bg-[#2a2a2a]">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Waste Type</TableHead>
                  <TableHead className="text-gray-300">Weight (kg)</TableHead>
                  <TableHead className="text-gray-300">Tokens Earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rewardHistory.map((record) => (
                  <TableRow 
                    key={record.id} 
                    className="border-b border-[#333333] transition-colors hover:bg-[#2a2a2a]"
                  >
                    <TableCell className="text-gray-200">{record.date}</TableCell>
                    <TableCell className="text-gray-200">{record.wasteType}</TableCell>
                    <TableCell className="text-gray-200">{record.weight.toFixed(1)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-[#4CAF50] font-medium">{record.tokens.toFixed(1)}</span>
                        <Coins className="h-4 w-4 text-[#4CAF50] ml-1" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" className="text-[#4CAF50] border-[#4CAF50]/30 hover:bg-[#4CAF50]/10">
                <ArrowDown className="h-4 w-4 mr-1" /> Load More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Environmental Factor Tracker */}
      <div className="max-w-7xl mx-auto my-12 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Leaf className="w-5 h-5 text-[#4CAF50] mr-2" />
          Environmental Factor Tracker
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {environmentalFactors.map((factor) => (
            <Card key={factor.name} className="bg-[#2f2f2f] border-[#4CAF50]/20 hover:border-[#4CAF50]/50 transition-all">
              <CardHeader>
                <CardTitle className="text-lg text-white">{factor.name}</CardTitle>
                <CardDescription className="text-gray-300">
                  {factor.startDate} - {factor.endDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-[#4CAF50]">{factor.factor}x</span>
                  <span className="ml-2 text-gray-300">boost</span>
                </div>
                <p className="text-sm text-gray-400">
                  Applies to: {factor.materials.join(', ')}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {factor.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Claim / Withdraw Tokens */}
      <div className="max-w-7xl mx-auto my-12 flex justify-center animate-fade-in">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button 
                  disabled 
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 opacity-75"
                >
                  <Wallet className="h-5 w-5" />
                  Claim My BINK Tokens
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#333] text-white border-[#4CAF50]/30">
              <p>Coming Soon!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Rewards;
