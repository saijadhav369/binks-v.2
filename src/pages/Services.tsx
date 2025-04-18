
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Scale,
  Coins,
  Link,
  BarChart3,
  Target
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Services = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "ML Waste Detection",
      description: "Classifies recyclable vs non-recyclable in real-time."
    },
    {
      icon: Scale,
      title: "Automated Weighing",
      description: "Measures waste weight instantly via internal sensors."
    },
    {
      icon: Coins,
      title: "Token Reward Engine",
      description: "Distribute BINK tokens fairly based on waste type and weight."
    },
    {
      icon: Link,
      title: "Blockchain Integration",
      description: "All transactions recorded on-chain with full transparency."
    },
    {
      icon: BarChart3,
      title: "Live Dashboard",
      description: "Track your impact, rewards, and history."
    },
    {
      icon: Target,
      title: "Initiatives System",
      description: "Get bonus rewards by participating in green campaigns."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-4 md:p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Waste, Smarter Tech</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore the features powering the BINKS ecosystem.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-[#2f2f2f] border-[#4CAF50]/20 hover:border-[#4CAF50]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#4CAF50]/20 animate-fade-in"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-[#4CAF50]" />
                </div>
                <CardTitle className="text-xl text-white mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto text-center space-y-4 md:space-y-0 md:space-x-4 animate-fade-in">
        <Button 
          onClick={() => navigate('/rewards')}
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-[#4CAF50]/20 transition-all duration-300"
        >
          Check out our Reward Formula
        </Button>
        <Button 
          onClick={() => navigate('/initiatives')}
          variant="outline"
          className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Join a Green Initiative
        </Button>
      </div>
    </div>
  );
};

export default Services;
