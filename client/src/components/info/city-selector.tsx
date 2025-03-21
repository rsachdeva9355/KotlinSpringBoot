import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const cities = [
    { id: "Amsterdam", name: "Amsterdam" },
    { id: "Dublin", name: "Dublin" },
    { id: "Calgary", name: "Calgary" },
  ];

  return (
    <Card className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-wrap gap-4">
        {cities.map((city) => (
          <Button
            key={city.id}
            variant={selectedCity === city.id ? "default" : "outline"}
            className="flex items-center"
            onClick={() => onCityChange(city.id)}
          >
            <MapPin className="h-4 w-4 mr-1" />
            {city.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}
