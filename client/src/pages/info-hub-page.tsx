import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CityInfo } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight, Clock } from "lucide-react";
import CitySelector from "@/components/info/city-selector";
import InfoCategoryCard from "@/components/info/info-category-card";

export default function InfoHubPage() {
  const { toast } = useToast();
  const [city, setCity] = useState("Amsterdam");
  
  const { data: cityInfo, isLoading, error } = useQuery<CityInfo[]>({
    queryKey: [`/api/info?city=${city}`],
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load city information. Please try again.",
      variant: "destructive",
    });
  }

  // Group city info by category
  const categories = cityInfo 
    ? Array.from(new Set(cityInfo.map(info => info.category)))
    : [];

  // Featured info is the first item in the list
  const featuredInfo = cityInfo && cityInfo.length > 0 ? cityInfo[0] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="font-poppins text-2xl font-semibold mb-2">
          {city} Pet Information Hub
        </h2>
        <p className="text-gray-600">
          Everything you need to know about pet regulations, resources, and services in {city}
        </p>
      </div>

      <CitySelector selectedCity={city} onCityChange={setCity} />

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Info Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
              <InfoCategoryCard key={index} category={category} city={city} />
            ))}
          </div>

          {/* Featured Info */}
          {featuredInfo && (
            <Card className="overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto bg-gray-200">
                  {featuredInfo.imageUrl ? (
                    <img 
                      src={featuredInfo.imageUrl} 
                      alt={featuredInfo.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
                <CardContent className="md:w-2/3 p-6">
                  <span className="inline-block px-3 py-1 bg-primary-light bg-opacity-20 text-primary rounded-full text-sm mb-3">
                    Featured Guide
                  </span>
                  <h3 className="font-poppins text-xl font-semibold mb-2">{featuredInfo.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredInfo.content}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span>Last updated: {new Date(featuredInfo.updatedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <button className="bg-primary text-white px-4 py-2 rounded-md inline-block hover:bg-primary-dark">
                    Read Full Guide
                  </button>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Recent Updates */}
          <h3 className="font-poppins text-xl font-semibold mb-4">Recent Updates</h3>
          <Card>
            <CardContent className="p-0 divide-y">
              {cityInfo && cityInfo.slice(0, 3).map((info, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs mr-3">
                      {info.category}
                    </span>
                    <h4 className="font-poppins font-medium">{info.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {info.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Posted: {new Date(info.updatedAt).toLocaleDateString()}
                    </span>
                    <button className="text-primary text-sm flex items-center">
                      Read more <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
