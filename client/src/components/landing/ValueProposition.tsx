import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MessageSquare, Search, MapPin, Calendar, HeartHandshake, Dog, Cat } from 'lucide-react';

// Feature item component
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

const Feature = ({ icon, title, description, index, inView }: FeatureProps) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 hover:bg-card/80 border border-border/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

const ValueProposition = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  // Feature data
  const features = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Connect with Pet Lovers",
      description: "Join a vibrant community of pet owners in your city to share experiences, advice, and create new friendships."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Discussion Forums",
      description: "Engage in conversations about pet care, training tips, and share adorable stories with fellow pet enthusiasts."
    },
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Find Local Services",
      description: "Discover top-rated vets, groomers, trainers, and pet stores recommended by pet owners in your neighborhood."
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Pet-Friendly Locations",
      description: "Explore parks, cafes, and establishments that welcome your furry companions with open arms."
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Pet Meetups",
      description: "Organize and join playdates, walks, and social events to help your pets make friends and stay active."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      title: "Support Network",
      description: "Find experienced pet owners who can offer guidance and support for all your pet parenting questions."
    }
  ];

  return (
    <section 
      ref={ref} 
      className="py-24 relative overflow-hidden"
      aria-labelledby="value-proposition-heading"
      id="benefits"
    >
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 opacity-5">
        <Dog className="w-64 h-64" />
      </div>
      <div className="absolute -top-16 -right-16 opacity-5 transform rotate-12">
        <Cat className="w-64 h-64" />
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
            id="value-proposition-heading"
          >
            Why Join Our Pet Community?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PawConnect brings together pet lovers to create a supportive community where you and your pets can thrive together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition; 