import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { ServiceProvider } from "@shared/schema";
import ServiceCard from "@/components/services/service-card";
import ServiceSearch from "@/components/services/service-search";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, List, Map as MapIcon } from "lucide-react";

export default function ServicesPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  const [city, setCity] = useState(searchParams.get("city") || "Amsterdam");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { data: services, isLoading, error } = useQuery<ServiceProvider[]>({
    queryKey: [`/api/services?city=${city}&category=${category}`],
  });

  useEffect(() => {
    // Update the URL with the current search parameters
    const params = new URLSearchParams();
    params.set("city", city);
    if (category !== "all") {
      params.set("category", category);
    }
    setLocation(`/services?${params.toString()}`);
  }, [city, category, setLocation]);

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load services. Please try again.",
      variant: "destructive",
    });
  }

  const handleSearch = (city: string, category: string) => {
    setCity(city);
    setCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="font-poppins text-2xl font-semibold mb-2">
          Find Pet Services in {city}
        </h2>
        <p className="text-gray-600">
          Discover pet-friendly services, vets, groomers, and more in your city
        </p>
      </div>

      <ServiceSearch initialCity={city} initialCategory={category} onSearch={handleSearch} />

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* View Mode and Results Count */}
          <div className="flex justify-between items-center my-6">
            <div className="font-poppins font-medium">
              <span className="text-gray-800">{services?.length || 0}</span>{" "}
              <span className="text-gray-600">services found</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="flex items-center"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                className="flex items-center"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services && services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No services found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => handleSearch(city, "all")}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <p className="text-gray-500">Map view is coming soon!</p>
              <p className="text-sm text-gray-400 mt-2">
                We're working on adding an interactive map to help you locate services in your area.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
