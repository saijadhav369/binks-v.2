
import React, { useEffect, useState } from 'react';
import { ArrowRight, Coins, Leaf, BadgeDollarSign, Globe, Recycle, Gift, Circle, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useNavigate } from 'react-router-dom';
import { ChartContainer } from "@/components/ui/chart";

const Tokenomics = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({
    hero: false,
    formula: false,
    multipliers: false,
    distribution: false,
    impact: false,
    cta: false
  });

  // Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Material multipliers data
  const materialMultipliers = [
    { name: 'Plastic', multiplier: '0.8x', icon: Recycle, description: 'Common but harmful to environment' },
    { name: 'Paper', multiplier: '0.6x', icon: Recycle, description: 'Easily recyclable, lower impact' },
    { name: 'Glass', multiplier: '1.2x', icon: Recycle, description: 'High reuse value' },
    { name: 'Metal', multiplier: '1.5x', icon: Recycle, description: 'Valuable, high energy savings' },
    { name: 'Organic', multiplier: '0.4x', icon: Leaf, description: 'Compostable, natural decay' },
    { name: 'E-waste', multiplier: '3.0x', icon: Coins, description: 'High-value components, highest impact' },
  ];

  // Token distribution data for pie chart
  const distributionData = [
    { name: 'Rewards Pool', value: 50, color: '#4CAF50' },
    { name: 'Development', value: 20, color: '#81C784' },
    { name: 'Partnerships', value: 15, color: '#66BB6A' },
    { name: 'Treasury', value: 10, color: '#A5D6A7' },
    { name: 'Community', value: 5, color: '#C8E6C9' },
  ];

  // Token impact data
  const impactItems = [
    { title: 'Encourages recycling', description: 'Incentivizes sustainable behavior through rewards', icon: Recycle },
    { title: 'Environmental impact', description: 'Each token represents a reduced carbon footprint', icon: Leaf },
    { title: 'Future rewards', description: 'Tokens can be exchanged for eco-friendly products', icon: Gift },
    { title: 'Blockchain verified', description: 'Transparent and secure transaction ledger', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] pb-12">
      {/* Hero Section */}
      <section 
        id="hero" 
        className={`animate-on-scroll px-6 py-16 md:py-24 transition-all duration-1000 ease-out transform ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#32CD32]/30 shadow-[0_0_15px_rgba(50,205,50,0.25)]">
              <Coins className="w-10 h-10 md:w-12 md:h-12 text-[#32CD32]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Understanding BINK Tokenomics</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Discover how rewards are calculated and why your actions matter.</p>
        </div>
      </section>

      {/* Reward Formula Card */}
      <section 
        id="formula" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-100 transform ${
          isVisible.formula ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Card className="max-w-5xl mx-auto bg-[#1a1a1a] border-[#32CD32]/20 shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Reward Formula</CardTitle>
            <CardDescription className="text-gray-400">How your eco-actions convert to tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-[#121212] rounded-lg border border-[#32CD32]/10 mb-6">
              <p className="text-center text-xl font-mono text-[#32CD32] md:text-2xl">
                Reward = BaseRate × MaterialMultiplier × Weight × EnvironmentalFactor
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-[#121212] p-4 rounded-lg border border-[#32CD32]/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">BaseRate</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-[#1a1a1a] border-[#32CD32]/20">
                      <p className="text-sm text-gray-300">The baseline token reward per kilogram of waste. Currently set at 10 tokens/kg.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="text-[#32CD32] font-mono">10 tokens/kg</p>
              </div>
              
              <div className="bg-[#121212] p-4 rounded-lg border border-[#32CD32]/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">MaterialMultiplier</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-[#1a1a1a] border-[#32CD32]/20">
                      <p className="text-sm text-gray-300">Different materials have different environmental impacts and recycling values, affecting reward calculation.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="text-[#32CD32] font-mono">0.4x - 3.0x</p>
              </div>
              
              <div className="bg-[#121212] p-4 rounded-lg border border-[#32CD32]/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">Weight</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-[#1a1a1a] border-[#32CD32]/20">
                      <p className="text-sm text-gray-300">The measured weight of your recycled materials in kilograms.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="text-[#32CD32] font-mono">Weight in kg</p>
              </div>
              
              <div className="bg-[#121212] p-4 rounded-lg border border-[#32CD32]/10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">EnvironmentalFactor</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-[#1a1a1a] border-[#32CD32]/20">
                      <p className="text-sm text-gray-300">A dynamic multiplier adjusting for current environmental priorities. Currently set at 1.0x but can increase during special initiatives.</p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="text-[#32CD32] font-mono">1.0x (dynamic)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Material Multiplier Grid */}
      <section 
        id="multipliers" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-200 transform ${
          isVisible.multipliers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Material Multipliers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materialMultipliers.map((material, index) => (
              <Card 
                key={index} 
                className="bg-[#1a1a1a] border-[#32CD32]/20 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(50,205,50,0.2)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center mr-4 border border-[#32CD32]/20">
                      <material.icon className="w-6 h-6 text-[#32CD32]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-white font-medium">{material.name}</h3>
                      <p className="text-gray-400 text-sm">{material.description}</p>
                    </div>
                  </div>
                  <div className="bg-[#121212] p-3 rounded-md border border-[#32CD32]/10 text-center">
                    <p className="text-[#32CD32] text-xl font-mono">{material.multiplier}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Token Distribution Chart */}
      <section 
        id="distribution" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-300 transform ${
          isVisible.distribution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <Card className="max-w-5xl mx-auto bg-[#1a1a1a] border-[#32CD32]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Token Distribution</CardTitle>
            <CardDescription className="text-gray-400">How BINK tokens are allocated in the ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ChartContainer
                config={{
                  ...distributionData.reduce((acc, item) => ({ 
                    ...acc, 
                    [item.name]: { theme: { dark: item.color } } 
                  }), {})
                }}
                className="w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#121212] border border-[#32CD32]/20 p-3 rounded-lg shadow-lg">
                              <p className="text-white font-medium">{data.name}</p>
                              <p className="text-[#32CD32]">{data.value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why BINK Tokens Matter */}
      <section 
        id="impact" 
        className={`animate-on-scroll px-6 mb-16 transition-all duration-1000 ease-out delay-400 transform ${
          isVisible.impact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why BINK Tokens Matter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {impactItems.map((item, index) => (
              <Card 
                key={index} 
                className="bg-[#1a1a1a] border-[#32CD32]/20 shadow-lg hover:shadow-[0_0_15px_rgba(50,205,50,0.2)] transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#121212] rounded-lg flex items-center justify-center mr-4 border border-[#32CD32]/20">
                      <item.icon className="w-6 h-6 text-[#32CD32]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-white font-medium">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section 
        id="cta" 
        className={`animate-on-scroll px-6 transition-all duration-1000 ease-out delay-500 transform ${
          isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Button 
            onClick={() => navigate('/smart-bin')} 
            className="bg-[#32CD32] hover:bg-[#32CD32]/80 text-white text-lg px-6 py-6"
          >
            Start Disposing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Tokenomics;
