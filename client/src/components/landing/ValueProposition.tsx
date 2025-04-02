import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MapPin, Compass } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Connect With Pet Lovers",
    description: "Build meaningful connections with other pet owners in your neighborhood. Share experiences, arrange playdates, and create a supportive community."
  },
  {
    icon: Compass,
    title: "Discover Local Services",
    description: "Find and review the best vets, groomers, trainers, and pet shops near you. All vetted and recommended by local pet owners in your community."
  },
  {
    icon: MapPin,
    title: "Local Knowledge & Resources",
    description: "Access city-specific pet information including pet-friendly locations, local regulations, emergency services, and community events."
  }
];

const ValueProposition = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section 
      ref={ref}
      id="features"
      className="py-20 relative overflow-hidden bg-muted/30" 
      aria-label="Value proposition section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
             backgroundSize: '24px 24px'
           }} 
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            The Complete Pet Care Platform
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to care for your pets and connect with your local pet community
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-6 relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" } 
                }
              }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              
              <p className="text-muted-foreground">{feature.description}</p>
              
              {/* Vertical Separator (only between columns, not after the last one) */}
              {index < features.length - 1 && (
                <div className="absolute right-0 top-1/2 h-2/3 transform -translate-y-1/2 w-px bg-border hidden md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition; 