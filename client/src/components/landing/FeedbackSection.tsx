import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Send, Cat, Dog, Bird, Fish, Rabbit, Heart, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const petTypes = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Fish",
  "Reptile",
  "Other"
];

const useCases = [
  "Finding local pet services",
  "Connecting with other pet owners",
  "Accessing pet-related information",
  "Organizing pet playdates",
  "Finding lost pets",
  "Other"
];

// Helper function to get pet icon by type
const getPetIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'dog': return <Dog className="w-5 h-5" />;
    case 'cat': return <Cat className="w-5 h-5" />;
    case 'bird': return <Bird className="w-5 h-5" />;
    case 'fish': return <Fish className="w-5 h-5" />;
    case 'rabbit': return <Rabbit className="w-5 h-5" />;
    default: return <PawPrint className="w-5 h-5" />;
  }
};

// Pet images for decoration
const petImages = [
  "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
];

const FeedbackSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    petType: [] as string[],
    features: '',
    useCase: '',
    customUseCase: '',
    privacy: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean, type: string) => {
    if (type === 'privacy') {
      setFormData(prev => ({ ...prev, privacy: checked }));
    } else {
      setFormData(prev => {
        const value = type;
        let petType = [...prev.petType];
        if (checked) {
          petType.push(value);
        } else {
          petType = petType.filter(item => item !== value);
        }
        return { ...prev, petType };
      });
    }
  };
  
  // Fix the event handler type for radio buttons
  const handleUseCaseChange = (value: string) => {
    setFormData(prev => ({ ...prev, useCase: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send data to a backend
    console.log("Feedback submitted:", formData);
    
    // Show success message
    toast({
      title: "Thank you for your feedback!",
      description: `We've added you to our waitlist and your feedback will help shape PawConnect in your city.`,
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      city: '',
      petType: [],
      features: '',
      useCase: '',
      customUseCase: '',
      privacy: false
    });
    
    // Show success animation
    setIsSubmitted(true);
    
    // Hide animation after a delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <section 
      ref={ref}
      className="py-16 relative overflow-hidden"
      aria-labelledby="feedback-section-title"
      id="feedback"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 transform rotate-12">
        <Cat className="w-full h-full text-primary" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 -rotate-12">
        <Dog className="w-full h-full text-primary" />
      </div>
      
      {/* Floating pet images */}
      {petImages.slice(0, 5).map((img, index) => (
        <motion.div
          key={`pet-float-${index}`}
          className="absolute hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.6,
            scale: 1,
            x: [0, Math.random() * 10 - 5, 0], 
            y: [0, Math.random() * 10 - 5, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 3, 
            repeat: Infinity,
            delay: index * 0.8 
          }}
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: index % 2 === 0 ? `${5 + Math.random() * 20}%` : undefined,
            right: index % 2 !== 0 ? `${5 + Math.random() * 20}%` : undefined,
            zIndex: 0
          }}
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg transform rotate-3 border-2 border-white/20">
            <img 
              src={img} 
              alt="Pet" 
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      ))}
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-primary/5 animate-pulse delay-300"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="feedback-section-title"
            className="text-3xl font-bold mb-4 relative inline-block"
          >
            Help us shape PawConnect
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/70"></div>
          </h2>
          <p className="text-muted-foreground text-lg">
            Your feedback will help us build the best pet community
          </p>
        </motion.div>
        
        {isSubmitted ? (
          <motion.div
            className="relative flex flex-col items-center justify-center py-16 bg-card border border-border rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl -z-10"></div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15, 
                delay: 0.2 
              }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
            </motion.div>
            <h3 className="text-green-600 font-semibold text-2xl mb-3">
              Thank you for your feedback!
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              We've added you to our waitlist and your feedback will help shape PawConnect in your city.
            </p>
            
            {/* Pet images floating around the success message */}
            <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10">
              <img 
                src={petImages[2]} 
                alt="Pet" 
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 opacity-10">
              <img 
                src={petImages[0]} 
                alt="Pet" 
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 shadow-md relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">Your City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="e.g. New York, London, Tokyo"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Pet Types */}
              <div className="space-y-3">
                <Label>What type of pets do you have?</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {petTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`pet-${type}`}
                        checked={formData.petType.includes(type)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(checked as boolean, type)
                        }
                      />
                      <Label 
                        htmlFor={`pet-${type}`}
                        className="flex items-center cursor-pointer text-sm"
                      >
                        <span className="mr-1.5">{getPetIcon(type)}</span>
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Feature Request */}
              <div className="space-y-2">
                <Label htmlFor="features">
                  What features would you like to see in a pet community app?
                </Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="Tell us what you'd like to see..."
                  value={formData.features}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
              
              {/* Use Cases */}
              <div className="space-y-3">
                <Label>What would be your primary use for PawConnect?</Label>
                <RadioGroup 
                  value={formData.useCase} 
                  onValueChange={handleUseCaseChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {useCases.map((useCase) => (
                    <div key={useCase} className="flex items-start space-x-2">
                      <RadioGroupItem id={`use-${useCase}`} value={useCase} />
                      <Label 
                        htmlFor={`use-${useCase}`}
                        className="cursor-pointer text-sm"
                      >
                        {useCase}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Display input for "Other" use case */}
              {formData.useCase === "Other" && (
                <div className="space-y-2">
                  <Label htmlFor="customUseCase">Please specify:</Label>
                  <Input
                    id="customUseCase"
                    name="customUseCase"
                    placeholder="Your specific use case..."
                    value={formData.customUseCase}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              {/* Privacy Checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="privacy"
                  checked={formData.privacy}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(checked as boolean, 'privacy')
                  }
                  required
                />
                <Label 
                  htmlFor="privacy"
                  className="text-sm text-muted-foreground"
                >
                  I agree to be contacted about PawConnect and understand my data will be used as described in the Privacy Policy.
                </Label>
              </div>
              
              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full md:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection; 