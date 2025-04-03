import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, Dog, Cat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CallToAction = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Please enter a valid email",
        description: "We need your email to add you to our waitlist",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this to your API
    console.log('Email submitted:', email);
    
    toast({
      title: "You're on the waitlist!",
      description: "We'll notify you when PawConnect launches in your city.",
    });
    
    setEmail('');
  };

  return (
    <section 
      ref={ref} 
      className="py-24 relative overflow-hidden bg-primary/5" 
      aria-labelledby="cta-heading"
      id="join-waitlist"
    >
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 opacity-5 transform rotate-12">
        <Dog className="w-56 h-56" />
      </div>
      <div className="absolute -bottom-12 -left-12 opacity-5 transform -rotate-12">
        <Cat className="w-56 h-56" />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl relative z-10">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Content */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" 
                id="cta-heading"
              >
                Ready to join our pet-loving community?
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6">
                Sign up for our waitlist today and be the first to know when we launch in your city. Connect with pet lovers near you and discover a world of resources for you and your furry friends.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Early access to new features",
                  "Exclusive community events",
                  "Connect with local pet owners",
                  "Special perks for early adopters"
                ].map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Form */}
            <motion.div 
              className="w-full lg:w-2/5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-background border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Join our waitlist</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Be the first to know when we launch in your city
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Join Waitlist
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By joining, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 