import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  const [, setLocation] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 font-bold text-xl"
            >
              <span className="text-primary">Paw</span>
              <span>Connect</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">Benefits</a>
            <a href="#roadmap" className="text-sm font-medium hover:text-primary transition-colors">Roadmap</a>
            <a href="#feature-voting" className="text-sm font-medium hover:text-primary transition-colors">Vote on Features</a>
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/login')}
              className="text-sm font-medium"
            >
              Login
            </Button>
            <Button 
              onClick={() => setLocation('/register')}
              className="text-sm font-medium"
            >
              Sign Up
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 