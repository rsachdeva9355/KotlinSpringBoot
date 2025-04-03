import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Calendar, Lightbulb, CheckCircle, Clock, Star, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const roadmapPhases = [
    {
      phase: "NOW",
      label: "LAUNCHING NOW",
      title: "The Essentials",
      icon: Rocket,
      badgeColor: "bg-green-600",
      features: [
        "Pet & Owner Profiles with Photo Galleries",
        "Local Service Provider Directory with Reviews",
        "Emergency Vet Locator Map",
        "City-Specific Pet Information Hub"
      ],
      status: "Available at Launch",
      statusColor: "text-green-600",
      featureIcon: CheckCircle,
      progress: 100
    },
    {
      phase: "NEXT",
      label: "COMING SOON",
      title: "Community Features",
      icon: Calendar,
      badgeColor: "bg-blue-600",
      features: [
        "Pet Playdate Matching Algorithm",
        "Local Events Calendar & Registration",
        "Pet-Friendly Location Finder",
        "In-App Messaging Between Owners"
      ],
      status: "Q2 2023",
      statusColor: "text-blue-600",
      featureIcon: Clock,
      progress: 40
    },
    {
      phase: "LATER",
      label: "ON THE HORIZON",
      title: "Advanced Features",
      icon: Lightbulb,
      badgeColor: "bg-orange-500",
      features: [
        "Health & Vaccination Tracking",
        "Local Loyalty Program with Pet Businesses",
        "Pet Sitter/Walker Marketplace",
        "Lost Pet Alert System"
      ],
      status: "Help us prioritize!",
      statusColor: "text-orange-500",
      featureIcon: Star,
      progress: 10
    }
  ];

  return (
    <section 
      id="roadmap"
      ref={ref}
      className="py-20 bg-background" 
      aria-label="Product roadmap section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Our Journey Together
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here's what we're building for your city's pet community
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0">
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
              className="min-w-[280px] md:min-w-0"
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${phase.badgeColor} text-white rounded-md px-3 py-1`}>
                      {phase.label}
                    </Badge>
                    <phase.icon className="w-10 h-10 text-muted-foreground/60" />
                  </div>
                  <CardTitle className="text-2xl">{phase.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {phase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <phase.featureIcon className="w-5 h-5 text-muted-foreground/70 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="flex flex-col items-start">
                  <div className={`${phase.statusColor} font-medium flex items-center`}>
                    {phase.status}
                    {phase.phase === "LATER" && (
                      <ChevronRight className="w-4 h-4 ml-1" />
                    )}
                  </div>
                  
                  {phase.phase === "NEXT" && (
                    <div className="w-full bg-muted rounded-full h-2 mt-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 