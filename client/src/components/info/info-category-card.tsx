import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface InfoCategoryCardProps {
  category: string;
  city: string;
}

export default function InfoCategoryCard({ category, city }: InfoCategoryCardProps) {
  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case "pet regulations":
        return (
          <span className="material-icons text-primary text-2xl mr-3">gavel</span>
        );
      case "pet-friendly spaces":
        return (
          <span className="material-icons text-secondary text-2xl mr-3">park</span>
        );
      case "pet healthcare":
        return (
          <span className="material-icons text-amber-500 text-2xl mr-3">medical_services</span>
        );
      default:
        return (
          <span className="material-icons text-gray-500 text-2xl mr-3">info</span>
        );
    }
  };

  const getCategoryDescription = () => {
    switch (category.toLowerCase()) {
      case "pet regulations":
        return `Learn about pet licensing, leash laws, and other regulations in ${city}.`;
      case "pet-friendly spaces":
        return `Discover parks, beaches, and public spaces where pets are welcome in ${city}.`;
      case "pet healthcare":
        return `Information about veterinary services, insurance, and emergency care options.`;
      default:
        return `Information about ${category} in ${city}.`;
    }
  };

  return (
    <Card className="hover:shadow-lg cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {getCategoryIcon()}
          <h3 className="font-poppins text-lg font-semibold">{category}</h3>
        </div>
        <p className="text-gray-600 mb-4">{getCategoryDescription()}</p>
        <button className="text-primary font-medium flex items-center">
          Learn More
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </CardContent>
    </Card>
  );
}
