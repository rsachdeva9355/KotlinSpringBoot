import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/images/avatars/avatar-1.jpg", // Replace with actual image paths
    role: "Dog Owner",
    content: "PawConnect has completely transformed how I manage my dog's care. The calendar reminders ensure I never miss a vet appointment or medication dose. Highly recommended for busy pet parents!",
    rating: 5
  },
  {
    name: "Michael Chen",
    avatar: "/images/avatars/avatar-2.jpg",
    role: "Cat Owner",
    content: "I love being able to create detailed profiles for each of my three cats. The health tracking feature is excellent, and having all their records in one place makes vet visits so much easier.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    avatar: "/images/avatars/avatar-3.jpg",
    role: "Multiple Pet Owner",
    content: "As someone with both dogs and cats, the platform makes it easy to keep everything organized. The community features have connected me with other pet owners in my neighborhood too!",
    rating: 4
  }
];

const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section 
      ref={ref}
      className="py-20 bg-background" 
      aria-label="Testimonials section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            What Pet Owners Are Saying
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of satisfied pet owners who have transformed their pet care with PawConnect
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-card-foreground mb-6 italic">"{testimonial.content}"</p>
              
              {/* User */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 mr-3 overflow-hidden">
                  {/* This would be an actual image in production */}
                  <div className="w-full h-full flex items-center justify-center text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">15,000+</p>
            <p className="text-muted-foreground">Pet Profiles Created</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">4.8/5</p>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof; 