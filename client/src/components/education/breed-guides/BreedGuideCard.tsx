import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PawPrint, Activity, Heart, Scissors } from "lucide-react";

interface BreedGuideCardProps {
  breed: string;
  species: 'dog' | 'cat' | 'other';
  characteristics: string[];
  exerciseNeeds: string;
  groomingNeeds: string;
  onClick: () => void;
}

export function BreedGuideCard({
  breed,
  species,
  characteristics,
  exerciseNeeds,
  groomingNeeds,
  onClick,
}: BreedGuideCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{breed}</CardTitle>
            <CardDescription className="mt-1 capitalize">{species}</CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {species}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {characteristics.map((trait, index) => (
              <Badge key={index} variant="secondary">
                {trait}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm">Exercise: {exerciseNeeds}</span>
            </div>
            <div className="flex items-center gap-2">
              <Scissors className="h-4 w-4 text-primary" />
              <span className="text-sm">Grooming: {groomingNeeds}</span>
            </div>
          </div>

          <Button onClick={onClick} className="w-full">
            View Full Guide
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 