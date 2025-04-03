import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Search, ThumbsUp, Heart, User, Calendar, Map, Star, Bell, MessageCircle, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define the structure of a feature
interface Feature {
  id: number;
  name: string;
  description: string;
  icon: string;
  votes: number;
  voted: boolean;
  category: string;
}

const FeatureVoting = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      name: "Mobile App",
      description: "Native iOS and Android apps for on-the-go access",
      icon: "Mobile",
      votes: 120,
      voted: false,
      category: "platform"
    },
    {
      id: 2,
      name: "Pet Profiles",
      description: "Create detailed profiles for your pets with photos and info",
      icon: "User",
      votes: 95,
      voted: false,
      category: "profile"
    },
    {
      id: 3,
      name: "Local Deals",
      description: "Discover exclusive deals from local pet stores and services",
      icon: "Percent",
      votes: 78,
      voted: false,
      category: "community"
    },
    {
      id: 4,
      name: "Pet Playdate Matching",
      description: "Find compatible playmates for your pet based on personality",
      icon: "Heart",
      votes: 67,
      voted: false,
      category: "community"
    },
    {
      id: 5,
      name: "Health Tracking",
      description: "Monitor vaccinations, medications, and vet appointments",
      icon: "Activity",
      votes: 55,
      voted: false,
      category: "health"
    },
    {
      id: 6,
      name: "Lost Pet Alerts",
      description: "Send instant notifications to nearby users about lost pets",
      icon: "Bell",
      votes: 89,
      voted: false,
      category: "safety"
    },
    {
      id: 7,
      name: "Pet-Friendly Map",
      description: "Interactive map of parks, cafes, and hotels that welcome pets",
      icon: "Map",
      votes: 72,
      voted: false,
      category: "community"
    },
    {
      id: 8,
      name: "Pet Sitter Marketplace",
      description: "Find and book trusted pet sitters in your neighborhood",
      icon: "Home",
      votes: 63,
      voted: false,
      category: "services"
    },
    {
      id: 9,
      name: "Training Resources",
      description: "Access to professional training videos and tips",
      icon: "Graduation",
      votes: 41,
      voted: false,
      category: "education"
    }
  ]);
  const [newFeature, setNewFeature] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('popular'); // 'popular' or 'newest'
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fix the useInView hook to properly get ref and inView
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const handleUpvote = (id: number) => {
    const updatedFeatures = features.map(feature =>
      feature.id === id ? { ...feature, votes: feature.votes + 1, voted: true } : feature
    );
    setFeatures(updatedFeatures);
    
    // Show toast notification
    toast({
      title: "Vote recorded!",
      description: "Thanks for helping us prioritize our roadmap.",
    });
  };

  const handleNewFeature = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newFeature.trim() === '') return;
    
    // Add new feature to the list
    const newFeatureObject = {
      id: features.length + 1,
      name: newFeature,
      description: "User suggested feature",
      icon: "Lightbulb",
      votes: 1,
      voted: true,
      category: "custom"
    };
    
    setFeatures([...features, newFeatureObject]);
    setNewFeature('');
    
    // Show toast notification
    toast({
      title: "Feature suggested!",
      description: "Thanks for your suggestion! Other users can now vote on it.",
    });
    
    setIsAddingFeature(false);
  };

  // Filter features based on search term and category
  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || feature.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedFeatures = [...filteredFeatures].sort((a, b) => {
    if (sortOrder === 'popular') {
      return b.votes - a.votes;
    } else {
      return b.id - a.id;
    }
  });

  const toggleAddingFeature = () => {
    setIsAddingFeature(!isAddingFeature);
  };

  // Get icon component based on name
  const getIconComponent = (iconName: string, className: string = "w-5 h-5") => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      "Mobile": Zap,
      "User": User,
      "Percent": Star,
      "Heart": Heart,
      "Activity": MessageCircle,
      "Bell": Bell,
      "Map": Map,
      "Home": Calendar,
      "Graduation": Lightbulb,
      "Lightbulb": Lightbulb
    };
    
    const IconComponent = iconMap[iconName] || Lightbulb;
    return <IconComponent className={className} />;
  };

  // Categories for tabs
  const categories = [
    { id: 'all', name: 'All Features', icon: Star },
    { id: 'community', name: 'Community', icon: Heart },
    { id: 'profile', name: 'Profiles', icon: User },
    { id: 'health', name: 'Pet Health', icon: MessageCircle },
    { id: 'services', name: 'Services', icon: Calendar },
    { id: 'safety', name: 'Safety', icon: Bell },
    { id: 'platform', name: 'Platform', icon: Zap },
    { id: 'education', name: 'Education', icon: Lightbulb },
    { id: 'custom', name: 'Your Ideas', icon: Lightbulb }
  ];

  return (
    <section ref={ref} className="py-24 bg-muted/10 relative overflow-hidden" aria-labelledby="feature-voting-title" id="feature-voting">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3 inline-flex items-center" id="feature-voting-title">
            <Lightbulb className="mr-2 w-8 h-8 text-primary" />
            Vote on Future Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us prioritize what we build next by voting on features that matter most to you
          </p>
        </motion.div>
        
        {/* Search and Sort Controls */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search features..."
              className="pl-10 max-w-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 items-center">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Button
              size="sm"
              variant={sortOrder === 'popular' ? 'default' : 'outline'}
              onClick={() => setSortOrder('popular')}
              className="px-3 py-1 h-auto text-sm"
            >
              Most Popular
            </Button>
            <Button
              size="sm"
              variant={sortOrder === 'newest' ? 'default' : 'outline'}
              onClick={() => setSortOrder('newest')}
              className="px-3 py-1 h-auto text-sm"
            >
              Newest
            </Button>
          </div>
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="mb-8" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4 overflow-x-auto">
              {categories.slice(0, 5).map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              {categories.slice(5).map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {getIconComponent(feature.icon, "w-5 h-5 text-primary")}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{feature.name}</h3>
                        <p className="text-xs text-muted-foreground">{feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-primary">{feature.votes}</span>
                      <span className="text-xs text-muted-foreground">votes</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  
                  <Button
                    variant={feature.voted ? "secondary" : "default"}
                    size="sm"
                    className="w-full"
                    onClick={() => !feature.voted && handleUpvote(feature.id)}
                    disabled={feature.voted}
                  >
                    {feature.voted ? (
                      <>
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Voted
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Upvote
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {/* Add your own feature card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.05 * sortedFeatures.length }}
          >
            <Card className="h-full border-dashed hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                {isAddingFeature ? (
                  <form onSubmit={handleNewFeature} className="w-full">
                    <h3 className="font-medium text-lg mb-4 text-center">Suggest a Feature</h3>
                    <Input
                      placeholder="Feature name"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="mb-4"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="w-full">Submit</Button>
                      <Button type="button" variant="outline" onClick={toggleAddingFeature}>Cancel</Button>
                    </div>
                  </form>
                ) : (
                  <Button 
                    variant="outline" 
                    className="border-dashed h-auto py-8 flex flex-col gap-3 hover:bg-primary/5"
                    onClick={toggleAddingFeature}
                  >
                    <Lightbulb className="w-10 h-10 opacity-80" />
                    <span className="text-lg font-medium">Suggest a Feature</span>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* "More Coming Soon" Section */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="max-w-lg w-full bg-primary/5 border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">More Features Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                We're constantly working on new features based on your feedback. Check back often to see what's new and vote on upcoming features.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureVoting; 