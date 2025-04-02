import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCity } from "@/hooks/use-city";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { selectedCity, setSelectedCity, cities } = useCity();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicNavItems = [
    { href: "/", label: "Home" },
    { href: "/info", label: "Info Hub" },
  ];

  const privateNavItems = [
    { href: "/pets", label: "My Pets" },
    { href: "/services", label: "Services" },
  ];

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <span className="text-2xl font-bold">PetPal</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {publicNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-gray-600 hover:text-gray-900">
                    {item.label}
                  </span>
                </Link>
              ))}
              {user && privateNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-gray-600 hover:text-gray-900">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {!isLoading && (
              <>
                {user ? (
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/profile")}
                  >
                    Profile
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/auth")}
                  >
                    Sign In
                  </Button>
                )}
              </>
            )}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {publicNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="block text-gray-600 hover:text-gray-900">
                    {item.label}
                  </span>
                </Link>
              ))}
              {user && privateNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="block text-gray-600 hover:text-gray-900">
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
