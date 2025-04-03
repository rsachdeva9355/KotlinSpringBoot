import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/hooks/use-city';
import { Lightbulb, Search, CheckCircle, Dog, Cat, Fish, Bird, ThumbsUp, Heart, User, Calendar, Map, Star, Bell, MessageCircle, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const { selectedCity } = useCity();
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
  const isInView = useInView(ref, { once: true });

  const handleUpvote = (id: number) => {
    const updatedFeatures = features.map(feature =>
      feature.id === id ? { ...feature, votes: feature.votes + 1, voted: true } : feature
    );
    setFeatures(updatedFeatures);
    
    // Show toast notification (fallback to alert)
    alert("Vote recorded! Thanks for helping us prioritize our roadmap.");
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
    
    // Show toast notification (fallback to alert)
    alert("Feature suggested! Thanks for your suggestion! Other users can now vote on it.");
    
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

  // Define accent colors based on city
  const accentClass = cn(
    selectedCity === 'Amsterdam' && 'text-amsterdam',
    selectedCity === 'Dublin' && 'text-dublin',
    selectedCity === 'Calgary' && 'text-calgary',
    !selectedCity && 'text-primary'
  );
  
  const accentBgClass = cn(
    selectedCity === 'Amsterdam' && 'bg-amsterdam',
    selectedCity === 'Dublin' && 'bg-dublin',
    selectedCity === 'Calgary' && 'bg-calgary',
    !selectedCity && 'bg-primary'
  );

  // Get icon component based on name
  const getIconComponent = (iconName: string, className: string) => {
    const iconMap = {
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
    
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Lightbulb;
    return <IconComponent className={className} />;
  };

  // Get random pet icon for decorative elements
  const getRandomPetIcon = (size: number, className: string) => {
    const icons = [Dog, Cat, Bird, Fish];
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
    return <RandomIcon className={`w-${size} h-${size} ${className}`} />;
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
    <section ref={ref} className="py-24 bg-white relative overflow-hidden" aria-labelledby="feature-voting-title" id="feature-voting">
      {/* Decorative pet silhouettes */}
      <div className="absolute top-0 right-0 opacity-5 transform rotate-12">
        <Cat className="w-48 h-48" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 transform -rotate-12">
        <Dog className="w-56 h-56" />
      </div>
      
      {/* Background pattern with paw prints */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {getRandomPetIcon(8, "opacity-20")}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="feature-voting-title"
            className="text-3xl font-bold mb-4 relative inline-block font-heading"
          >
            Vote on Future Features
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"></div>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Help us shape the future of PawConnect by voting on features that matter most to you and your pets
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search box */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search features..."
              className="pl-10 bg-white border border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Sort and Suggest */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-500 whitespace-nowrap">Sort by:</label>
              <select
                id="sort"
                className="text-sm border border-gray-200 rounded-md px-2 py-1"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popular">Most Voted</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            
            <Button
              onClick={toggleAddingFeature}
              className="bg-primary text-white hover:bg-primary/90 gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              Suggest a Feature
            </Button>
          </div>
        </motion.div>
        
        {/* Feature suggestion form */}
        {isAddingFeature && (
          <motion.div
            className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Suggest a New Feature</h3>
            <form onSubmit={handleNewFeature} className="flex gap-4">
              <Input
                type="text"
                placeholder="Your feature idea..."
                className="flex-1"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="whitespace-nowrap bg-primary text-white hover:bg-primary/90"
              >
                Add Suggestion
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={toggleAddingFeature}
              >
                Cancel
              </Button>
            </form>
          </motion.div>
        )}
        
        {/* Category tabs */}
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="bg-gray-100 p-1 overflow-auto max-w-full flex snap-x scrollbar-hide">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-1.5 whitespace-nowrap"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedFeatures.length > 0 ? (
            sortedFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-full ${accentBgClass} bg-opacity-10 text-primary`}>
                          {getIconComponent(feature.icon, "h-5 w-5")}
                        </div>
                        <h3 className="font-medium text-lg">{feature.name}</h3>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm font-medium mr-2">
                          {feature.votes}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-sm">
                      {feature.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {feature.category.charAt(0).toUpperCase() + feature.category.slice(1)}
                      </span>
                      
                      <Button
                        size="sm"
                        variant={feature.voted ? "outline" : "default"}
                        onClick={() => handleUpvote(feature.id)}
                        disabled={feature.voted}
                        className={`${feature.voted ? 'border-green-500 text-green-500' : 'bg-primary text-white hover:bg-primary/90'} gap-2`}
                      >
                        {feature.voted ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Voted
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="h-4 w-4" />
                            Upvote
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <Lightbulb className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No features found</h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? "Try a different search term or category" 
                  : "Be the first to suggest a feature!"}
              </p>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-3xl font-bold text-primary mb-1">{features.length}</p>
            <p className="text-gray-600">Features Proposed</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-3xl font-bold text-primary mb-1">
              {features.reduce((sum, feature) => sum + feature.votes, 0)}
            </p>
            <p className="text-gray-600">Total Votes Cast</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-3xl font-bold text-primary mb-1">3</p>
            <p className="text-gray-600">Features In Development</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureVoting; 