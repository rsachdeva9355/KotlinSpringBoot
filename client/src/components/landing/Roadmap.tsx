import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Sparkles, Heart, PawPrint, MessageSquare, MapPin, Calendar, Shield } from 'lucide-react';

const features = [
  {
    title: "Your Pet's Digital Home",
    description: "Everything you need to keep your furry friend happy and healthy",
    icon: PawPrint,
    items: [
      "Create beautiful pet profiles with photos and health records",
      "Set up care reminders for feeding, walks, and vet visits",
      "Track your pet's growth and milestones",
      "Store important documents and medical history"
    ]
  },
  {
    title: "Connect & Share",
    description: "Join a community of pet lovers just like you",
    icon: MessageSquare,
    items: [
      "Find local pet playdates and meetups",
      "Share your pet's adventures and photos",
      "Get advice from experienced pet parents",
      "Join breed-specific groups and discussions"
    ]
  },
  {
    title: "Discover Local Gems",
    description: "Find the best pet-friendly spots in your city",
    icon: MapPin,
    items: [
      "Explore pet-friendly parks and cafes",
      "Find trusted vets and groomers",
      "Discover pet stores with great reviews",
      "Get real-time updates on pet events"
    ]
  },
  {
    title: "Smart Pet Care",
    description: "AI-powered features to make pet care easier",
    icon: Sparkles,
    items: [
      "Get personalized health insights for your pet",
      "Find the perfect food based on breed and age",
      "Track your pet's activity and behavior",
      "Get emergency vet recommendations"
    ]
  },
  {
    title: "Peace of Mind",
    description: "Keep your pet safe and secure",
    icon: Shield,
    items: [
      "Digital ID tags and microchip registration",
      "Emergency contact information",
      "Lost pet alerts in your area",
      "Pet insurance recommendations"
    ]
  },
  {
    title: "Fun & Games",
    description: "Make every day special for your pet",
    icon: Heart,
    items: [
      "Training tips and tricks",
      "Fun activities and games",
      "Pet-friendly travel guides",
      "Special deals and discounts"
    ]
  }
];

const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section 
      ref={ref}
      id="roadmap"
      className="py-20 relative bg-muted/50" 
      aria-label="Features and roadmap"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            A Peek Into Our Vision
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're building amazing features to make pet parenting easier and more fun!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 