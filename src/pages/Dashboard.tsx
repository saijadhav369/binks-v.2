import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { formatAddress } from "@/utils/wallet";
import { 
  BarChart, 
  Calendar, 
  ChevronDown, 
  CircleUser, 
  Home, 
  LogOut, 
  Plus, 
  Recycle, 
  Target, 
  CoinsIcon,
  Flag,
  Users, 
  Trash2, 
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Area } from 'recharts';

const weeklyDisposalData = [
  { day: 'Mon', amount: 1.5 },
  { day: 'Tue', amount: 2.3 },
  { day: 'Wed', amount: 0.8 },
  { day: 'Thu', amount: 1.1 },
  { day: 'Fri', amount: 1.9 },
  { day: 'Sat', amount: 0.6 },
  { day: 'Sun', amount: 0.4 },
];

const recentDisposals = [
  { id: 1, timestamp: '2025-04-16 15:45', type: 'Plastic', weight: 1.2, tokens: 85 },
  { id: 2, timestamp: '2025-04-14 10:30', type: 'Metal', weight: 2.3, tokens: 120 },
  { id: 3, timestamp: '2025-04-10 09:15', type: 'Organic', weight: 0.8, tokens: 40 },
  { id: 4, timestamp: '2025-04-07 11:20', type: 'Glass', weight: 0.5, tokens: 60 },
  { id: 5, timestamp: '2025-04-05 14:10', type: 'Paper', weight: 1.8, tokens: 90 },
];

const initiatives = [
  { id: 1, name: 'Community Cleanup Drive', progress: 60, status: 'Active', description: 'Help clean up local parks and beaches' },
  { id: 2, name: 'Plastic-Free Challenge', progress: 35, status: 'Active', description: 'Reduce plastic usage for 30 days' },
  { id: 3, name: 'E-Waste Collection', progress: 100, status: 'Completed', description: 'Collect and properly dispose electronic waste' },
  { id: 4, name: 'Green Office Initiative', progress: 75, status: 'Active', description: 'Implement eco-friendly practices at work' },
];

const Dashboard = () => {
  const { walletInfo, isConnected, disconnectUserWallet } = useWallet();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const userName = walletInfo?.name || "User";
  const userInitials = userName.charAt(0).toUpperCase();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected || !walletInfo) {
    return null; // Will redirect from the useEffect
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }).format(date);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2a2a2a] border border-[#4CAF50]/20 p-3 rounded-md shadow-lg">
          <p className="text-white font-medium mb-1">{payload[0].payload.day}</p>
          <p className="text-[#4CAF50] font-mono">{payload[0].value} kg</p>
        </div>
      );
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'bg-[#4CAF50] text-white';
    if (status === 'Completed') return 'bg-blue-500 text-white';
    return 'bg-gray-500 text-white';
  };

  return (
    <div>
      <header className="bg-[#242424] border-b border-[#4CAF50]/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#323232] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mr-3">
              <h1 className="text-sm font-bold text-[#4CAF50]">BINKS</h1>
            </div>
            <h2 className="text-xl font-bold text-white hidden sm:block">Smart Bin</h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-[#2a2a2a] rounded-full pl-3 pr-1 py-1.5 border border-[#4CAF50]/20">
              <CoinsIcon className="h-4 w-4 text-[#4CAF50] mr-2" />
              <span className="text-gray-300 text-sm mr-2 hidden sm:inline">1,240 BINK</span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0 bg-[#323232] hover:bg-[#4CAF50]/20">
                    <Avatar className="h-8 w-8 border border-[#4CAF50]/30">
                      <AvatarFallback className="bg-[#4CAF50]/20 text-[#4CAF50]">{userInitials}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#2a2a2a] border-[#4CAF50]/20">
                  <div className="px-4 py-2 text-center">
                    <p className="text-white font-medium">{userName}</p>
                    <p className="text-gray-400 text-sm">{formatAddress(walletInfo.address)}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#4CAF50]/10" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]" onClick={() => setActiveTab("dashboard")}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>My Stats</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]" onClick={() => setActiveTab("initiatives")}>
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>My Initiatives</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#4CAF50]/10" />
                  <DropdownMenuItem onClick={disconnectUserWallet} className="cursor-pointer hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="space-y-6">
            <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Welcome back, {userName}!</CardTitle>
                <CardDescription className="text-gray-300">
                  Here's your BINKS activity summary.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-[#2f2f2f] border-[#4CAF50]/20 transition-all hover:border-[#4CAF50] hover:shadow-md hover:shadow-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Trash2 className="w-5 h-5 text-[#4CAF50] mr-2" />
                    Total Disposals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">32</p>
                  <p className="text-gray-400 text-sm">+5 this week</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2f2f2f] border-[#4CAF50]/20 transition-all hover:border-[#4CAF50] hover:shadow-md hover:shadow-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Target className="w-5 h-5 text-[#4CAF50] mr-2" />
                    Total Weight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">24.8 kg</p>
                  <p className="text-gray-400 text-sm">+3.2 kg this week</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2f2f2f] border-[#4CAF50]/20 transition-all hover:border-[#4CAF50] hover:shadow-md hover:shadow-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <CoinsIcon className="w-5 h-5 text-[#4CAF50] mr-2" />
                    BINK Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">1,240</p>
                  <p className="text-gray-400 text-sm">+120 this week</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#2f2f2f] border-[#4CAF50]/20 transition-all hover:border-[#4CAF50] hover:shadow-md hover:shadow-[#4CAF50]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Flag className="w-5 h-5 text-[#4CAF50] mr-2" />
                    Active Initiatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#4CAF50]">3</p>
                  <p className="text-gray-400 text-sm">Joined 1 new this week</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-white">Weekly Disposals</CardTitle>
                <CardDescription className="text-gray-300">
                  Your waste disposal activity for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer
                    config={{
                      disposals: {
                        label: "Disposals",
                        color: "#4CAF50"
                      }
                    }}
                  >
                    <AreaChart 
                      data={weeklyDisposalData} 
                      margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        stroke="#333333" 
                        strokeDasharray="3 3" 
                        vertical={false}
                      />
                      <XAxis 
                        dataKey="day" 
                        stroke="#888888"
                        axisLine={{ stroke: '#444444' }}
                        tickLine={{ stroke: '#444444' }}
                        tick={{ fill: '#AAAAAA', fontSize: 12 }}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis 
                        stroke="#888888"
                        axisLine={{ stroke: '#444444' }}
                        tickLine={{ stroke: '#444444' }}
                        tick={{ fill: '#AAAAAA', fontSize: 12 }}
                        tickFormatter={(value) => `${value} kg`}
                        domain={[0, 'auto']}
                        padding={{ top: 10 }}
                      />
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{ stroke: 'rgba(76, 175, 80, 0.3)', strokeWidth: 1 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        name="disposals"
                        stroke="#4CAF50"
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                        activeDot={{ r: 6, stroke: '#4CAF50', strokeWidth: 2, fill: '#FFFFFF' }}
                        animationDuration={1500}
                        isAnimationActive={true}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#242424] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Disposal Activity</CardTitle>
                <CardDescription className="text-gray-300">
                  Your latest waste disposal records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-left border-b border-[#4CAF50]/20">
                      <tr>
                        <th className="pb-2 text-sm font-medium text-gray-400">Timestamp</th>
                        <th className="pb-2 text-sm font-medium text-gray-400">Type</th>
                        <th className="pb-2 text-sm font-medium text-gray-400">Weight</th>
                        <th className="pb-2 text-sm font-medium text-gray-400">Tokens</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#323232]">
                      {recentDisposals.map((item) => (
                        <tr key={item.id} className="hover:bg-[#2a2a2a]">
                          <td className="py-3 text-sm text-gray-300">{formatDate(item.timestamp)}</td>
                          <td className="py-3">
                            <Badge variant="outline" className="bg-[#2a2a2a] text-[#4CAF50] border-[#4CAF50]/20">
                              {item.type}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm text-gray-300">{item.weight} kg</td>
                          <td className="py-3 text-sm font-medium text-[#4CAF50]">+{item.tokens}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="initiatives" className="space-y-6">
            <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-[#4CAF50]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">My Joined Initiatives</CardTitle>
                <CardDescription className="text-gray-300">
                  Active and completed community initiatives you've participated in
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initiatives.map((initiative) => (
                <Card key={initiative.id} className="bg-[#2f2f2f] border-[#4CAF50]/20 transition-all hover:border-[#4CAF50] hover:shadow-md hover:shadow-[#4CAF50]/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg">{initiative.name}</CardTitle>
                      <Badge className={getStatusColor(initiative.status)}>
                        {initiative.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      {initiative.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-[#4CAF50]">{initiative.progress}%</span>
                      </div>
                      <Progress value={initiative.progress} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
                onClick={() => navigate('/initiatives')}
              >
                <Plus className="mr-2 h-5 w-5" />
                Join New Initiative
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-[#242424] border-t border-[#4CAF50]/20 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#323232] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mr-2">
                <h1 className="text-xs font-bold text-[#4CAF50]">BINKS</h1>
              </div>
              <h2 className="text-lg font-bold text-white">Smart Bin</h2>
            </div>

            <p className="text-gray-400 text-sm text-center">
              BINKS Smart Bin © 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
