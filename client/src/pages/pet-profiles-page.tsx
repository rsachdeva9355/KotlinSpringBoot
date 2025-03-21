import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PetCard from "@/components/pets/pet-card";
import PetForm from "@/components/pets/pet-form";
import { Pet } from "@shared/schema";

export default function PetProfilesPage() {
  const { toast } = useToast();
  const [addPetDialogOpen, setAddPetDialogOpen] = useState(false);
  const [editPetDialogOpen, setEditPetDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);

  const { data: pets, isLoading, error } = useQuery<Pet[]>({
    queryKey: ["/api/pets"],
  });

  const handleAddPet = () => {
    setCurrentPet(null);
    setAddPetDialogOpen(true);
  };

  const handleEditPet = (pet: Pet) => {
    setCurrentPet(pet);
    setEditPetDialogOpen(true);
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load pets. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-poppins text-2xl font-semibold">My Pets</h2>
        <Button
          onClick={handleAddPet}
          className="flex items-center"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Pet
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets && pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onEdit={() => handleEditPet(pet)} />
          ))}

          {/* Add Pet Card */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-64 p-8 cursor-pointer hover:border-primary"
            onClick={handleAddPet}
          >
            <Plus className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="font-poppins text-lg font-medium text-gray-600 text-center">
              Add another pet
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              Click to add a new pet to your profile
            </p>
          </div>
        </div>
      )}

      {/* Add Pet Dialog */}
      <Dialog open={addPetDialogOpen} onOpenChange={setAddPetDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Pet</DialogTitle>
          </DialogHeader>
          <PetForm onSuccess={() => setAddPetDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Pet Dialog */}
      <Dialog open={editPetDialogOpen} onOpenChange={setEditPetDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Pet</DialogTitle>
          </DialogHeader>
          {currentPet && (
            <PetForm 
              pet={currentPet} 
              onSuccess={() => setEditPetDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
