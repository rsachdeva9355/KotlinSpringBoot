import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BreedGuideCard } from "@/components/education/breed-guides/BreedGuideCard";
import { BreedGuideDetail } from "@/components/education/breed-guides/BreedGuideDetail";
import { BreedSelector } from "@/components/education/breed-guides/BreedSelector";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

// Mock data - Replace with actual API call
const mockBreeds = [
  {
    value: "golden-retriever",
    label: "Golden Retriever",
    breed: "Golden Retriever",
    species: "dog" as const,
    characteristics: ["Friendly", "Intelligent", "Devoted"],
    careInstructions: [
      "Regular exercise needed - at least 1 hour daily",
      "Brush coat 2-3 times per week",
      "Regular vet check-ups recommended"
    ],
    healthConcerns: [
      "Hip dysplasia",
      "Eye problems",
      "Heart issues"
    ],
    exerciseNeeds: "High - requires daily walks and play sessions",
    groomingNeeds: "Moderate to High - regular brushing and occasional professional grooming"
  },
  // Add more breeds here
];

export default function BreedGuidesPage() {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<'all' | 'dog' | 'cat' | 'other'>('all');
  const [detailBreed, setDetailBreed] = useState<string | null>(null);

  // Replace with actual API call
  const { data: breeds, isLoading } = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => mockBreeds,
  });

  const selectedBreedData = breeds?.find(breed => breed.value === (detailBreed || selectedBreed));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Breed Care Guides</h1>
        <p className="text-gray-600">
          Comprehensive care information for different pet breeds
        </p>
      </div>

      <div className="mb-8">
        <BreedSelector
          breeds={breeds || []}
          selectedBreed={selectedBreed}
          onSelect={setSelectedBreed}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds
            ?.filter(breed => selectedSpecies === 'all' || breed.species === selectedSpecies)
            .map((breed) => (
              <BreedGuideCard
                key={breed.value}
                {...breed}
                onClick={() => setDetailBreed(breed.value)}
              />
            ))}
        </div>
      )}

      <Dialog open={!!detailBreed} onOpenChange={(open) => !open && setDetailBreed(null)}>
        <DialogContent className="max-w-3xl">
          {selectedBreedData && (
            <BreedGuideDetail {...selectedBreedData} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 