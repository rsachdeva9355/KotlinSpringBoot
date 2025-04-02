import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const phases = [
  {
    title: "Phase 1: Foundation",
    description: "Building the essential features that pet owners need",
    status: "complete",
    features: [
      "Pet profiles with health records",
      "Care calendar and reminders",
      "Basic educational resources",
      "User profiles and authentication"
    ]
  },
  {
    title: "Phase 2: Community",
    description: "Connecting pet owners with each other and local services",
    status: "in-progress",
    features: [
      "Local pet service directory",
      "Community forums and discussions",
      "Pet playdates and meetups",
      "Reviews and recommendations"
    ]
  },
  {
    title: "Phase 3: Advanced Features",
    description: "Expanding functionality with innovative tools",
    status: "upcoming",
    features: [
      "AI-powered pet health insights",
      "Virtual vet consultations",
      "Pet care marketplace",
      "Extended training resources"
    ]
  }
];

const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-amber-500';
      case 'upcoming':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <section 
      ref={ref}
      id="roadmap"
      className="py-20 relative bg-muted/50" 
      aria-label="Product roadmap"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Our Product Roadmap
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See what we've built so far and what's coming next as we continue to improve the platform
          </motion.p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border hidden md:block" />
          
          {phases.map((phase, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col md:flex-row gap-8 mb-16 last:mb-0 items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Center dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
              
              {/* Phase content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(phase.status)}`} />
                  <span className="text-sm font-medium capitalize">{phase.status}</span>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3">{phase.title}</h3>
                <p className="text-muted-foreground mb-4">{phase.description}</p>
                
                <ul className={`space-y-2 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                  {phase.features.map((feature, fIndex) => (
                    <li key={fIndex} className={`flex items-center ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Check className={`flex-shrink-0 w-5 h-5 text-green-500 ${index % 2 === 0 ? 'md:order-2 md:ml-2' : 'mr-2'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Empty div to maintain spacing */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 