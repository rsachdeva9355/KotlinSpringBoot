import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CallToAction = () => {
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Default background image
  const backgroundImage = "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
  
  const handleEarlyAccess = () => {
    toast({
      title: "You're on the list!",
      description: "We'll notify you when PawConnect launches in your city.",
      variant: "default",
    });
  };
  
  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden" 
      aria-label="Call to action section"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Join Your City's Pet Community Today
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be among the first to experience PawConnect when we launch
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={handleEarlyAccess}
              size="lg"
              className="px-10 py-6 text-lg font-medium"
            >
              Get Early Access
            </Button>
            
            <p className="flex items-center justify-center gap-2 mt-4 text-white/80 text-sm">
              <ChevronDown className="w-4 h-4" />
              Limited spots available for beta testers
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 