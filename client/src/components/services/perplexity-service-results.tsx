import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { fetchPerplexityServices } from "@/lib/perplexityApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PerplexityServiceResultsProps {
  city: string;
  category?: string;
}

export default function PerplexityServiceResults({ city, category }: PerplexityServiceResultsProps) {
  const [showDefaultResults, setShowDefaultResults] = useState(false);

  // When the category or city changes, reset to show perplexity results
  useEffect(() => {
    setShowDefaultResults(false);
  }, [city, category]);

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/perplexity/services`, city, category],
    queryFn: () => fetchPerplexityServices(city, category),
    enabled: !showDefaultResults,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (showDefaultResults) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-gray-600">
          Looking up real pet services in {city}
          {category && category !== "all" ? ` for ${category}` : ""}...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          We couldn't fetch real service data at this time.
          <Button 
            variant="link" 
            onClick={() => setShowDefaultResults(true)}
            className="p-0 h-auto font-normal ml-2"
          >
            Show available services instead
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-1">Services powered by AI</h3>
              <p className="text-sm text-gray-500">Fetched in real-time from Perplexity API</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDefaultResults(true)}
            >
              Show regular results
            </Button>
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, '<br />') }} />
          </div>

          <div className="mt-4 text-right">
            <p className="text-xs text-gray-400">
              Last updated: {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}