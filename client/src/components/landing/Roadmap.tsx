import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Lock, RotateCw, MapPin, Flag, CalendarDays, Dog, Cat } from 'lucide-react';
import { cn } from '@/lib/utils';

// Roadmap phase types
type PhaseStatus = 'completed' | 'current' | 'upcoming';

interface RoadmapPhase {
  title: string;
  date: string;
  status: PhaseStatus;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
}

const Roadmap = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Roadmap data
  const roadmapPhases: RoadmapPhase[] = [
    {
      title: "Community Launch",
      date: "Q2 2024",
      status: "completed",
      description: "Initial release focused on core social features and city-specific communities.",
      features: [
        "City-based community hubs",
        "Pet owner profiles",
        "Basic discussion forums",
        "Service provider directory"
      ],
      icon: Flag
    },
    {
      title: "Enhanced Engagement",
      date: "Q3 2024",
      status: "current",
      description: "Building tools to strengthen connections between pet owners in local communities.",
      features: [
        "Pet playdates & meetups",
        "Event calendar integration",
        "Local pet news & alerts",
        "Advanced search filters"
      ],
      icon: CalendarDays
    },
    {
      title: "Full Platform Expansion",
      date: "Q4 2024",
      status: "upcoming",
      description: "Expanding our platform with powerful tools for pet owners and service providers.",
      features: [
        "Mobile app for iOS & Android",
        "Marketplace for pet services",
        "Pet health tracking tools",
        "Premium membership options"
      ],
      icon: MapPin
    }
  ];

  // Helper function to get status icon
  const getStatusIcon = (status: PhaseStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5" />;
      case 'current':
        return <RotateCw className="w-5 h-5 animate-spin-slow" />;
      case 'upcoming':
        return <Lock className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Helper function to get status styles
  const getStatusStyles = (status: PhaseStatus) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-700 border-green-300";
      case 'current':
        return "bg-blue-100 text-blue-700 border-blue-300";
      case 'upcoming':
        return "bg-gray-100 text-gray-500 border-gray-300";
      default:
        return "";
    }
  };

  return (
    <section 
      ref={ref} 
      className="py-24 bg-muted/40 relative overflow-hidden"
      aria-labelledby="roadmap-heading"
      id="roadmap"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 opacity-5">
        <Dog className="w-52 h-52" />
      </div>
      <div className="absolute -bottom-10 -right-10 opacity-5 transform -rotate-12">
        <Cat className="w-52 h-52" />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-3xl font-bold mb-4" 
            id="roadmap-heading"
          >
            Our Roadmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're continuously improving PawConnect with new features and enhancements based on community feedback
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
          
          {/* Roadmap phases */}
          <div className="space-y-12 relative">
            {roadmapPhases.map((phase, index) => (
              <motion.div 
                key={index}
                className={cn(
                  "relative z-10",
                  index % 2 === 0 ? "md:pr-12 lg:pr-16 md:text-right md:ml-auto md:mr-[50%]" : "md:pl-12 lg:pl-16 md:mr-auto md:ml-[50%]"
                )}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                style={{ maxWidth: 'calc(50% - 20px)' }}
              >
                {/* Circle connector for desktop */}
                <div className={cn(
                  "hidden md:flex w-10 h-10 rounded-full bg-background border-2 border-primary items-center justify-center absolute top-0",
                  index % 2 === 0 ? "left-[calc(100%+20px)]" : "right-[calc(100%+20px)]"
                )}>
                  <phase.icon className="w-5 h-5 text-primary" />
                </div>
                
                {/* Phase card */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  {/* Mobile header with icon - only shown on mobile */}
                  <div className="flex items-center mb-4 md:hidden">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <phase.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                  </div>
                  
                  {/* Desktop header - hidden on mobile */}
                  <h3 className="text-xl font-bold mb-2 hidden md:block">{phase.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-sm text-muted-foreground">{phase.date}</span>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      getStatusStyles(phase.status)
                    )}>
                      {getStatusIcon(phase.status)}
                      <span className="ml-1.5">
                        {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                      </span>
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{phase.description}</p>
                  
                  <ul className="space-y-2">
                    {phase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 