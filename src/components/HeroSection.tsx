import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWallet } from "@/context/WalletContext";
import { connectMetaMask, connectPhantom } from "@/utils/wallet";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeroSection = () => {
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const isMobile = useIsMobile();
  const { connectWallet, isConnected, isConnecting } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setInitialAnimation(false);
      
      setLogoAnimationComplete(true);
      
      setTimeout(() => {
        setContentVisible(true);
      }, 600);
    }, 2000);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative bg-[#323232] py-6 md:py-12">
      {initialAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#323232]">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 bg-[#323232] border-4 border-[#4CAF50] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(76,175,80,0.6)] animate-pop-in overflow-hidden">
            <div className="z-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#4CAF50]">BINKS</h1>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 text-center">
        <div 
          className={`mx-auto w-28 h-28 sm:w-32 sm:h-32 bg-[#323232] border-4 border-[#4CAF50] rounded-full flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden transition-all duration-700 ${
            logoAnimationComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4CAF50]">BINKS</h1>
          </div>
        </div>
        
        <div className={`transition-all duration-1000 ease-out transform ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
            <span className="block">The Smart Dustbin</span>
            <span className="block text-[#4CAF50]">That Rewards You</span>
          </h1>
          <p className="mt-3 sm:mt-4 max-w-lg mx-auto text-base sm:text-lg text-gray-300">
            Meet BINKS – the smart dustbin that rewards you for responsible waste disposal! 
            Our ML-powered system weighs, identifies, and sorts trash while you earn rewards 
            based on our tokenomics.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              className="w-full sm:w-auto text-sm px-4 py-2 bg-[#4CAF50] hover:bg-[#3e8e41] transition-all duration-300 text-white rounded-full shadow-md hover:shadow-lg btn-hover-effect" 
              size="sm"
              onClick={() => {
                handleScrollToSection('video');
              }}
            >
              How It Works
            </Button>
            
            {isConnected ? (
              <Button 
                className="w-full sm:w-auto mt-3 sm:mt-0 text-sm px-4 py-2 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 transition-all duration-300 rounded-full shadow-md hover:shadow-lg btn-hover-effect" 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="w-full sm:w-auto mt-3 sm:mt-0 text-sm px-4 py-2 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 transition-all duration-300 rounded-full shadow-md hover:shadow-lg btn-hover-effect" 
                    variant="outline" 
                    size="sm"
                    disabled={isConnecting}
                  >
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#242424] border border-[#4CAF50]/20 p-2">
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-[#3e8e41]/10 text-white rounded px-3 py-2 flex items-center gap-2"
                    onClick={() => connectWallet(connectMetaMask)}
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask" 
                      className="w-5 h-5" 
                    />
                    Connect MetaMask
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-[#3e8e41]/10 text-white rounded px-3 py-2 flex items-center gap-2 mt-1"
                    onClick={() => connectWallet(connectPhantom)}
                  >
                    <img 
                      src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F2005246188-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MRboRWyJqWEAFjTUYEV%252Favatar-1613380783789.png%3Falt%3Dmedia%26token%3D63d7cd17-598d-4ded-be5e-60fe0af90123" 
                      alt="Phantom" 
                      className="w-5 h-5 rounded-full" 
                    />
                    Connect Phantom
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button 
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#4CAF50] hover:bg-[#3e8e41] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group transform hover:-translate-y-1 btn-hover-effect"
          onClick={() => {
            console.log("Chatbot button clicked");
          }}
        >
          <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
