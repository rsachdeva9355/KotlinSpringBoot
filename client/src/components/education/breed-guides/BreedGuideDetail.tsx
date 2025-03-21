import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Scissors, AlertTriangle, Info } from "lucide-react";

interface BreedGuideDetailProps {
  breed: string;
  species: 'dog' | 'cat' | 'other';
  characteristics: string[];
  careInstructions: string[];
  healthConcerns: string[];
  exerciseNeeds: string;
  groomingNeeds: string;
}

export function BreedGuideDetail({
  breed,
  species,
  characteristics,
  careInstructions,
  healthConcerns,
  exerciseNeeds,
  groomingNeeds,
}: BreedGuideDetailProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-semibold">{breed}</CardTitle>
              <CardDescription className="mt-2 capitalize text-lg">
                {species}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {characteristics.map((trait, index) => (
              <Badge key={index} variant="secondary">
                {trait}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="care" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="care">Care Guide</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="grooming">Grooming</TabsTrigger>
        </TabsList>

        <TabsContent value="care">
          <Card>
            <CardHeader>
              <CardTitle>Daily Care Instructions</CardTitle>
              <CardDescription>Essential care guidelines for your {breed}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {careInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Health Concerns</CardTitle>
              <CardDescription>Common health issues to watch for</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {healthConcerns.map((concern, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Requirements</CardTitle>
              <CardDescription>Physical activity needs and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-primary mt-0.5" />
                <p>{exerciseNeeds}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grooming">
          <Card>
            <CardHeader>
              <CardTitle>Grooming Guide</CardTitle>
              <CardDescription>Grooming requirements and tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <Scissors className="h-5 w-5 text-primary mt-0.5" />
                <p>{groomingNeeds}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 