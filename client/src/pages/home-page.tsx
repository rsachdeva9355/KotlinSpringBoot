import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin, Heart, Info } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to profile page if user is logged in
    if (user) {
      setLocation("/profile");
    }
  }, [user, setLocation]);

  const features = [
    {
      title: "Create Pet Profiles",
      description: "Build detailed profiles for all your pets with photos, health information, and more.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      action: () => setLocation("/pets")
    },
    {
      title: "Find Local Pet Services",
      description: "Discover veterinarians, groomers, pet shops, and more in your city.",
      icon: <MapPin className="h-8 w-8 text-secondary" />,
      action: () => setLocation("/services")
    },
    {
      title: "City-Specific Pet Info",
      description: "Get regulations, resources, and pet-friendly locations specific to your city.",
      icon: <Info className="h-8 w-8 text-accent-dark" />,
      action: () => setLocation("/info")
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
            Connect, Discover, Care with <span className="text-primary">Pet</span><span className="text-secondary">Pals</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            The complete platform for pet owners in Amsterdam, Dublin, and Calgary to manage pets, 
            find local services, and access city-specific pet information.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="font-poppins font-medium"
              onClick={() => setLocation("/profile")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-poppins font-medium"
              onClick={() => setLocation("/services")}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins text-3xl font-semibold text-center mb-12">
            Everything You Need For Your Pets
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-gray-50 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="font-poppins text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-primary"
                      onClick={feature.action}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins text-3xl font-semibold text-center mb-4">
            Serving These Cities
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            PetPals is currently available in these cities with local services and city-specific pet information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Amsterdam", "Dublin", "Calgary"].map((city, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-poppins text-xl font-semibold mb-4">{city}</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-center justify-center">
                    <Check size={18} className="text-green-500 mr-2" />
                    <span>Local Pet Services</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check size={18} className="text-green-500 mr-2" />
                    <span>City Pet Regulations</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check size={18} className="text-green-500 mr-2" />
                    <span>Pet-Friendly Locations</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setLocation(`/services?city=${city}`)}
                >
                  Explore {city}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
