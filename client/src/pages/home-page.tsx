import React from 'react';
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import HeroSection from "@/components/landing/HeroSection";
import ValueProposition from "@/components/landing/ValueProposition";
import Roadmap from "@/components/landing/Roadmap";
import FeedbackSection from "@/components/landing/FeedbackSection";
import CallToAction from "@/components/landing/CallToAction";

export default function HomePage() {
  const { user } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to dashboard if user is logged in
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <ValueProposition />
        <Roadmap />
        <FeedbackSection />
        <CallToAction />
      </main>
    </div>
  );
}
