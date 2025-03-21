import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";
import { fetchPerplexityPetCare } from "@/lib/perplexityApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PerplexityInfoResultsProps {
  topic: string;
  city?: string;
}

export default function PerplexityInfoResults({ topic, city }: PerplexityInfoResultsProps) {
  const [showDefaultResults, setShowDefaultResults] = useState(false);

  // When the topic or city changes, reset to show perplexity results
  useEffect(() => {
    setShowDefaultResults(false);
  }, [topic, city]);

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/perplexity/pet-care`, topic, city],
    queryFn: () => fetchPerplexityPetCare(topic, city),
    enabled: !showDefaultResults && !!topic,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (showDefaultResults || !topic) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-gray-600">
          Looking up information about {topic}
          {city ? ` in ${city}` : ""}...
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
          We couldn't fetch information at this time.
          <Button 
            variant="link" 
            onClick={() => setShowDefaultResults(true)}
            className="p-0 h-auto font-normal ml-2"
          >
            Show available information instead
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
              <h3 className="text-lg font-semibold mb-1">Information powered by AI</h3>
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