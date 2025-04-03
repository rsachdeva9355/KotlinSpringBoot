import React from 'react';
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ValueProposition from "@/components/landing/ValueProposition";
import Roadmap from "@/components/landing/Roadmap";
import FeedbackSection from "@/components/landing/FeedbackSection";
import FeatureVoting from "@/components/landing/FeatureVoting";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

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
      <Header />
      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        <HeroSection />
        <ValueProposition />
        <Roadmap />
        <FeedbackSection />
        <FeatureVoting />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
