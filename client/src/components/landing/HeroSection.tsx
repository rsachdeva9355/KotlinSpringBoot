import React, { useEffect, useState } from 'react';
import { useLocation } from "wouter";
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Sample images for different cities - replace with actual images
const cityImages = {
  amsterdam: '/images/amsterdam-pets.jpg',
  dublin: '/images/dublin-pets.jpg',
  calgary: '/images/calgary-pets.jpg',
  default: '/images/default-pets.jpg'
};

const HeroSection = () => {
  const [_, setLocation] = useLocation();
  const [pawPositions, setPawPositions] = useState<{ x: number; y: number; rotation: number; scale: number; delay: number }[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
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

  // Get the correct hero image based on selected city
  const heroImage = selectedCity ? cityImages[selectedCity as keyof typeof cityImages] : cityImages.default;
  
  // Dynamic city name for the subheading
  const cityName = selectedCity ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1) : 'your city';

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: selectedCity ? `url(${heroImage})` : `url(/images/hero-bg.jpg)`, // Use first choice if city selected, otherwise fallback
          filter: 'brightness(0.85)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
      
      {/* Floating Paw Prints */}
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
          PawConnect: Your Local Pet Community
        </motion.h1>
        
        <motion.p 
          className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find local pet services, connect with nearby pet owners, and access {cityName}'s best pet resources in one place
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold"
            onClick={() => setLocation("/auth")}
          >
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
            <ChevronDown className="ml-2 h-4 w-4" />
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