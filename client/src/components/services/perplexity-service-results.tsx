import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle, MapPin, Globe, Clock, Phone, Dog, StarIcon, Bookmark } from "lucide-react";
import { fetchPerplexityServices, type PerplexityServiceResponse, type ServiceProvider } from "@/lib/perplexityApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PerplexityServiceResultsProps {
  city: string;
  category?: string;
}

export default function PerplexityServiceResults({ city, category }: PerplexityServiceResultsProps) {
  const { data, isLoading, error } = useQuery<PerplexityServiceResponse>({
    queryKey: ["perplexityServices", city, category],
    queryFn: () => fetchPerplexityServices(city, category),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load AI-powered service results. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.content?.services?.length) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.content.services.map((service: ServiceProvider, index: number) => (
        <Card key={index} className="overflow-hidden">
          {service.imageUrl && (
            <div className="aspect-video relative">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {service.category}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            {service.rating && (
              <div className="flex items-center gap-1 mt-2">
                <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">
                  {service.rating}/50 ({service.reviewCount} reviews)
                </span>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{service.address}</span>
              </div>
              {service.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{service.phone}</span>
                </div>
              )}
              {service.website && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a
                    href={service.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              {service.openingHours && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.openingHours}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Dog className="h-4 w-4" />
                <span>{service.animals.join(", ")}</span>
              </div>
            </div>

            {service.description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {service.description}
              </p>
            )}

            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
              <Button className="flex-1">
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}