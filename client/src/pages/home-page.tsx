import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  PawPrint, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Users, 
  Heart,
  ChevronRight,
  Check
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to dashboard if user is logged in
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const features = [
    {
      title: "Pet Profiles",
      description: "Create detailed profiles for your pets with health records, care schedules, and more.",
      icon: <PawPrint className="h-8 w-8 text-primary" />,
      action: () => setLocation("/pets")
    },
    {
      title: "Care Calendar",
      description: "Track vet visits, grooming appointments, medications, and other important pet care events.",
      icon: <Calendar className="h-8 w-8 text-secondary" />,
      action: () => setLocation("/calendar")
    },
    {
      title: "Educational Hub",
      description: "Access comprehensive guides on pet care, training resources, and expert advice.",
      icon: <GraduationCap className="h-8 w-8 text-accent-dark" />,
      action: () => setLocation("/education")
    }
  ];

  const benefits = [
    {
      title: "Community Connection",
      description: "Connect with other pet owners, share experiences, and get advice.",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: "Service Directory",
      description: "Find trusted veterinarians, groomers, trainers, and other pet services.",
      icon: <MapPin className="h-6 w-6 text-secondary" />
    },
    {
      title: "Health Tracking",
      description: "Monitor your pet's health metrics, medications, and wellness over time.",
      icon: <Heart className="h-6 w-6 text-accent-dark" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Complete Pet Care Companion
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Manage your pet's health, schedule care activities, and access expert resources
              all in one place. Join our community of pet lovers today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="font-medium"
                onClick={() => setLocation("/register")}
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-medium"
                onClick={() => setLocation("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need For Your Pet
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and features designed to make pet care easier and more organized.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-primary"
                      onClick={feature.action}
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose PawConnect?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of pet owners who trust PawConnect for their pet care needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-background rounded-full shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join PawConnect today and experience a better way to manage your pet's care needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="font-medium"
            onClick={() => setLocation("/register")}
          >
            Get Started Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
