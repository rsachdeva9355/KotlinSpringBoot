import React from 'react';
import { useLocation } from 'wouter';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const [, setLocation] = useLocation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 py-12 mt-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="space-y-4">
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 font-bold text-2xl"
            >
              <span className="text-primary">Paw</span>
              <span>Connect</span>
            </button>
            <p className="text-muted-foreground text-sm">
              Building a community of pet lovers to make pet care easier and more enjoyable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Site</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#feature-voting" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Vote on Features
                </a>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setLocation('/login')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLocation('/register')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 text-center text-muted-foreground text-sm">
          <p>© {currentYear} PawConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 