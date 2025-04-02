import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from "wouter";
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const [_, setLocation] = useLocation();
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 10,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your pet care experience?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of pet owners who've already made PawConnect an essential part of their pet care routine
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold" 
              onClick={() => setLocation("/auth")}
            >
              Get Started Today
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold"
              onClick={() => setLocation("/about")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction; 