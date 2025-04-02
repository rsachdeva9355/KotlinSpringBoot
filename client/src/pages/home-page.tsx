import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import HeroSection from "@/components/landing/HeroSection";
import ValueProposition from "@/components/landing/ValueProposition";
import Roadmap from "@/components/landing/Roadmap";
import SocialProof from "@/components/landing/SocialProof";
import CallToAction from "@/components/landing/CallToAction";

export default function HomePage() {
  const { user } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to dashboard if user is logged in
    if (user) {
      setLocation("/profile");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValueProposition />
      <Roadmap />
      <SocialProof />
      <CallToAction />
    </div>
  );
}
