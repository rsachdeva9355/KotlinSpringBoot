import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface ServiceSearchProps {
  initialCity: string;
  initialCategory: string;
  onSearch: (city: string, category: string) => void;
}

export default function ServiceSearch({ initialCity, initialCategory, onSearch }: ServiceSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city, category);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search for services..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Veterinarian">Veterinarians</SelectItem>
                <SelectItem value="Pet Groomer">Pet Groomers</SelectItem>
                <SelectItem value="Dog Park">Dog Parks</SelectItem>
                <SelectItem value="Pet Shop">Pet Shops</SelectItem>
                <SelectItem value="Pet Boarding">Pet Boarding</SelectItem>
                <SelectItem value="Pet Trainer">Pet Trainers</SelectItem>
                <SelectItem value="Pet-Friendly Cafe">Pet-Friendly Cafes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Amsterdam">Amsterdam</SelectItem>
                <SelectItem value="Dublin">Dublin</SelectItem>
                <SelectItem value="Calgary">Calgary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-4 flex justify-end mt-4 md:mt-0">
            <Button type="submit" className="w-full md:w-auto">
              Find Services
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
