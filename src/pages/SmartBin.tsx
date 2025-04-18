
import React, { useState } from 'react';
import { Camera, Scale, Loader2, Award, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Simulated API call
const identifyWaste = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    type: "Plastic",
    confidence: 92,
    suggestedWeight: 0.34
  };
};

// Calculate reward based on weight and type
const calculateReward = (weight: number, wasteType: string) => {
  const baseRate = wasteType === "Plastic" ? 40 : 30; // BINK per kg
  return parseFloat((weight * baseRate).toFixed(2));
};

const SmartBin = () => {
  const [scanning, setScanning] = useState(false);
  const [wasteInfo, setWasteInfo] = useState<any>(null);
  const [weight, setWeight] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleScan = async () => {
    setScanning(true);
    try {
      const result = await identifyWaste();
      setWasteInfo(result);
      setWeight(result.suggestedWeight);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to identify waste",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  const handleConfirm = async () => {
    if (!wasteInfo) return;
    
    setProcessing(true);
    try {
      // Simulate blockchain transaction and Supabase insert
      await new Promise(resolve => setTimeout(resolve, 2000));
      const rewardAmount = calculateReward(weight, wasteInfo.type);
      
      toast({
        title: "Success!",
        description: `You earned ${rewardAmount} BINK tokens!`,
      });
      
      // Reset state
      setWasteInfo(null);
      setWeight(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process transaction",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Smart Bin</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white">Smart Bin Scanner</h1>
        <p className="mt-2 text-gray-400">Scan and dispose waste to earn BINK tokens</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Scanner Section */}
        <Card className="bg-[#242424] border-[#32CD32]/20">
          <CardHeader>
            <CardTitle className="text-white">Camera Scanner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Feed Placeholder */}
            <motion.div 
              className="aspect-video bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#32CD32]/20 overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center space-y-4">
                <Camera className="h-16 w-16 text-[#32CD32] mx-auto" />
                <p className="text-gray-400">Camera feed will appear here</p>
              </div>
            </motion.div>

            {/* Scan Button */}
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button 
                className="w-full bg-[#32CD32] hover:bg-[#32CD32]/90 text-white font-medium"
                onClick={handleScan}
                disabled={scanning}
              >
                {scanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Scan Waste
                  </>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Waste Details Section */}
        <Card className={cn(
          "bg-[#242424] border-[#32CD32]/20",
          !wasteInfo && "opacity-50"
        )}>
          <CardHeader>
            <CardTitle className="text-white">Waste Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Waste Type and Confidence */}
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Waste Type:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-[#32CD32]" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Identified type of waste material
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="text-white font-medium">
                    {wasteInfo?.type || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Confidence:</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-[#32CD32]" />
                        </TooltipTrigger>
                        <TooltipContent>
                          ML model confidence in waste identification
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="text-white font-medium">
                    {wasteInfo ? `${wasteInfo.confidence}%` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-gray-400 flex items-center gap-2">
                    Weight (kg)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-[#32CD32]" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Enter the weight of your waste in kilograms
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Scale className="h-4 w-4 text-[#32CD32]" />
                </div>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  disabled={!wasteInfo}
                  className="bg-[#1a1a1a] border-[#32CD32]/20 text-white"
                />
              </div>

              {/* Preview Reward */}
              {wasteInfo && weight > 0 && (
                <div className="p-4 bg-[#1a1a1a] rounded-xl border border-[#32CD32]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Estimated Reward:</span>
                    <span className="text-[#32CD32] font-bold">
                      {calculateReward(weight, wasteInfo.type)} BINK
                    </span>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full bg-[#32CD32] hover:bg-[#32CD32]/90 text-white font-medium"
                  onClick={handleConfirm}
                  disabled={!wasteInfo || processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Award className="mr-2 h-4 w-4" />
                      Confirm & Claim Reward
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartBin;
