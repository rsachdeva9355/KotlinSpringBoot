import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Info Hub", href: "/info" },
    { label: "My Pets", href: "/pets" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <div className="font-poppins font-bold text-2xl cursor-pointer">
                <span className="text-primary">Pet</span>
                <span className="text-secondary">Pals</span>
              </div>
            </Link>
          </div>
          
          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`font-poppins font-medium ${
                  location === item.href ? "text-primary" : "text-gray-600 hover:text-primary"
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" className="font-poppins font-medium">
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="default" 
                  className="font-poppins font-medium"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="font-poppins font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="default" className="font-poppins font-medium">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a 
                    className={`font-poppins py-2 ${
                      location === item.href ? "text-primary" : "text-gray-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/profile">
                    <a 
                      className="font-poppins py-2 text-gray-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </a>
                  </Link>
                  <Button 
                    variant="default" 
                    className="font-poppins font-medium w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <a 
                      className="font-poppins py-2 text-gray-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </a>
                  </Link>
                  <Link href="/auth">
                    <Button 
                      variant="default" 
                      className="font-poppins font-medium w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
