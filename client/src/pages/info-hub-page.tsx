import { useQuery } from "@tanstack/react-query";
import { getCachedCityInfo, CityInfo } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useParams } from "wouter";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import PerplexityServiceResults from "@/components/services/perplexity-service-results";

export default function InfoHubPage() {
  const { city } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAIServices, setShowAIServices] = useState(true);

  const { data: cityInfo, isLoading } = useQuery<CityInfo[]>({
    queryKey: ["cityInfo", city],
    queryFn: () => getCachedCityInfo(city || ""),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours (replaces cacheTime)
  });

  // Filter results based on category
  const filteredResults = cityInfo?.filter((info) => {
    if (selectedCategory === "all") {
      return info.category !== "Services powered by AI";
    }
    return info.category === selectedCategory;
  });

  // Get AI-powered results
  const aiResults = cityInfo?.find(
    (info) => info.category === "Services powered by AI"
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pet Information for {city}</h1>
        <p className="text-gray-600">
          Everything you need to know about pet regulations, resources, and services in {city}
        </p>
      </div>

      {/* Regular Services */}
      <div className="mb-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Available Services</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAIServices(!showAIServices)}
          >
            {showAIServices ? "Hide AI Services" : "Show AI Services"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResults?.map((info) => (
            <Card key={info.id} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{info.content}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Source: {info.source}</p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI-Powered Services */}
      {showAIServices && aiResults && (
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">AI-Powered Services</h2>
            <p className="text-sm text-muted-foreground">
              Generated using advanced AI to provide comprehensive service information
            </p>
          </div>
          <PerplexityServiceResults city={city || ""} category={selectedCategory} />
        </div>
      )}
    </div>
  );
}
