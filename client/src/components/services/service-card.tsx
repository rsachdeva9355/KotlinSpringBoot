import { ServiceProvider } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, Clock, MapPin, Phone, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: ServiceProvider;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const {
    name,
    category,
    address,
    phone,
    openingHours,
    rating,
    reviewCount,
    imageUrl,
  } = service;

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "veterinarian":
        return "bg-amber-100 text-amber-800";
      case "pet groomer":
        return "bg-green-100 text-green-800";
      case "dog park":
        return "bg-primary-light bg-opacity-20 text-primary";
      case "pet shop":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating / 10);
    const hasHalfStar = rating % 10 >= 5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
      <div className="relative h-40 bg-gray-200">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            No image available
          </div>
        )}
        <div className={`absolute top-0 left-0 px-2 py-1 rounded-br-md ${getCategoryColor(category)}`}>
          <span className="text-sm font-medium">{category}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-poppins text-lg font-semibold mb-1">{name}</h3>
        
        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {(rating / 10).toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        )}
        
        {/* Details */}
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{address}</span>
          </div>
          {openingHours && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <span>{openingHours}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span>{phone}</span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between">
          <Button 
            variant="link" 
            className="text-primary p-0 h-auto"
          >
            View Details
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-primary flex items-center space-x-1 p-0 h-auto"
          >
            <Bookmark className="h-4 w-4" />
            <span className="text-sm">Save</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
