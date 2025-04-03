import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [pawPositions, setPawPositions] = useState<{ x: number; y: number; rotation: number; scale: number; delay: number }[]>([]);
  
  // Generate random paw positions for the floating animation
  useEffect(() => {
    const newPositions = Array.from({ length: 7 }).map(() => ({
      x: Math.random() * 100, // % for horizontal position
      y: Math.random() * 100, // % for vertical position
      rotation: Math.random() * 360, // rotation in degrees
      scale: 0.5 + Math.random() * 0.5, // scale between 0.5 and 1
      delay: Math.random() * 0.5, // delay for animation start
    }));
    
    setPawPositions(newPositions);
  }, []);

  // Default hero image
  const heroImage = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.85)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      
      {/* Pet-themed decorative elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-32 h-32 opacity-20 transform rotate-12 bg-white/20 rounded-full" />
        <div className="absolute bottom-[15%] left-[8%] w-40 h-40 opacity-15 transform -rotate-6 bg-white/15 rounded-full" />
        <div className="absolute top-[30%] left-[15%] w-16 h-16 opacity-20 transform rotate-45 bg-white/20 rounded-full" />
      </div>
      
      {/* Floating Paw Prints - using a different icon (ChevronDown) as a substitute since Paw is not available */}
      {pawPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute opacity-70"
          style={{ 
            left: `${pos.x}%`, 
            top: `${pos.y}%`,
            zIndex: 1
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0, pos.scale, pos.scale * 1.2],
            rotate: [0, pos.rotation],
            y: [0, -100],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5 + Math.random() * 5, 
            delay: pos.delay * 10,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="text-white/80 w-6 h-6 sm:w-8 sm:h-8" />
        </motion.div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h1 
          className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PawConnect: Your Local Pet Community, Connected
        </motion.h1>
        
        <motion.p 
          className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find local pet services, connect with nearby pet owners, and access your city's best pet resources in one place
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold"
            size="lg"
          >
            Join the Waitlist
          </Button>
          
          <Button
            variant="outline"
            className="w-full sm:w-auto border-white text-white hover:bg-white/20"
            size="lg"
          >
            Learn More
            <ChevronDown className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <p className="text-sm mb-2">Scroll to explore</p>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection; 