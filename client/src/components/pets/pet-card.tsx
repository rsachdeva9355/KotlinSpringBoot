import { useState } from "react";
import { Pet } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Cake, Info, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PetCardProps {
  pet: Pet;
  onEdit: () => void;
}

export default function PetCard({ pet, onEdit }: PetCardProps) {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getPetTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "dog":
        return "bg-amber-100 text-amber-800";
      case "cat":
        return "bg-primary-light bg-opacity-20 text-primary";
      case "bird":
        return "bg-blue-100 text-blue-800";
      case "rabbit":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGenderIcon = (gender: string | null | undefined) => {
    if (!gender) return null;
    return gender.toLowerCase() === "male" ? (
      <span className="material-icons text-gray-400 mr-2 text-sm">male</span>
    ) : (
      <span className="material-icons text-gray-400 mr-2 text-sm">female</span>
    );
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiRequest("DELETE", `/api/pets/${pet.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({
        title: "Pet removed",
        description: `${pet.name} has been removed from your pets.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete pet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const getPetPicture = () => {
    if (pet.profilePicture) {
      return <img src={pet.profilePicture} alt={pet.name} className="w-full h-full object-cover" />;
    }
    
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
        <Info size={48} />
      </div>
    );
  };

  const formatAge = () => {
    if (!pet.age) return "Age unknown";
    return `${pet.age} ${pet.ageUnit || "years"} old`;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-gray-200">
        {getPetPicture()}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-2 right-2 p-2 bg-white shadow-md text-gray-600 hover:text-primary"
          onClick={onEdit}
        >
          <Pencil size={16} />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-poppins text-xl font-semibold">{pet.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${getPetTypeColor(pet.type)}`}>
            {pet.type}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {pet.breed && (
            <div className="flex items-center">
              <span className="material-icons text-gray-400 mr-2 text-sm">pets</span>
              <span>{pet.breed}</span>
            </div>
          )}
          <div className="flex items-center">
            <Cake size={16} className="text-gray-400 mr-2" />
            <span>{formatAge()}</span>
          </div>
          {pet.gender && (
            <div className="flex items-center">
              {getGenderIcon(pet.gender)}
              <span>{pet.gender}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button 
            variant="link" 
            className="text-primary p-0 h-auto"
            onClick={onEdit}
          >
            View Profile
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil size={16} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {pet.name}'s profile. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
