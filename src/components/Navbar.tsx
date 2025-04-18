
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Don't render the navbar if not on homepage
  if (!isHomePage) {
    return null;
  }

  useEffect(() => {
    // Delay the navbar appearance to happen after the logo animation
    // This ensures a clean sequential animation flow
    const timer = setTimeout(() => {
      setNavbarVisible(true);
    }, isHomePage ? 2600 : 0); // No delay on non-home pages
    
    return () => clearTimeout(timer);
  }, [isHomePage]);

  const handleScrollToSection = (id: string) => {
    if (isHomePage) {
      // If already on homepage, just scroll to section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to homepage with section hash
      navigate('/', { state: { scrollToId: id } });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full bg-[#2d2d2d] shadow-md z-50 transition-all duration-700 ease-out transform ${
      navbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }} className="flex-shrink-0 flex items-center">
              <span className="text-lg sm:text-xl font-bold text-white">BINKS</span>
            </a>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 md:space-x-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }} 
                className="text-white border-b-2 border-[#4CAF50] px-1 pt-1 text-sm font-medium transition-colors duration-200 hover:text-[#4CAF50]"
              >
                Home
              </a>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('services'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-all duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Services
              </a>
              <a 
                href="#tokenomics" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('tokenomics'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-all duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Tokenomics
              </a>
              <a 
                href="#incentives" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('gamification'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-all duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Incentives
              </a>
              <a 
                href="#franchise" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('franchise'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-all duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Franchise
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('about'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-all duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                About
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); handleScrollToSection('contact'); }} 
                className="text-gray-300 border-b-2 border-transparent px-1 pt-1 text-sm font-medium transition-all duration-200 hover:text-[#4CAF50] hover:border-[#4CAF50]"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#4CAF50]/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4CAF50] transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden animate-slide-in-from-top">
          <div className="pt-2 pb-3 space-y-1 bg-[#2d2d2d]">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }} 
              className="text-white border-l-4 border-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a 
              href="#services" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('services'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Services
            </a>
            <a 
              href="#tokenomics" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('tokenomics'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Tokenomics
            </a>
            <a 
              href="#incentives" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('gamification'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Incentives
            </a>
            <a 
              href="#franchise" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('franchise'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Franchise
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('about'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleScrollToSection('contact'); }} 
              className="text-gray-300 border-l-4 border-transparent hover:border-[#4CAF50] hover:text-[#4CAF50] block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
