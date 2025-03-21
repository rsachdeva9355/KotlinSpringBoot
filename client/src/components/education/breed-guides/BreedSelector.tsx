import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface BreedOption {
  value: string;
  label: string;
  species: 'dog' | 'cat' | 'other';
}

interface BreedSelectorProps {
  breeds: BreedOption[];
  selectedBreed: string;
  onSelect: (value: string) => void;
  selectedSpecies: 'all' | 'dog' | 'cat' | 'other';
  onSpeciesChange: (species: 'all' | 'dog' | 'cat' | 'other') => void;
}

export function BreedSelector({
  breeds,
  selectedBreed,
  onSelect,
  selectedSpecies,
  onSpeciesChange,
}: BreedSelectorProps) {
  const [open, setOpen] = useState(false);

  const filteredBreeds = selectedSpecies === 'all' 
    ? breeds 
    : breeds.filter(breed => breed.species === selectedSpecies);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['all', 'dog', 'cat', 'other'] as const).map((species) => (
          <Badge
            key={species}
            variant={selectedSpecies === species ? "default" : "outline"}
            className="cursor-pointer capitalize"
            onClick={() => onSpeciesChange(species)}
          >
            {species}
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedBreed
              ? breeds.find((breed) => breed.value === selectedBreed)?.label
              : "Select breed..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search breeds..." />
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup>
              {filteredBreeds.map((breed) => (
                <CommandItem
                  key={breed.value}
                  value={breed.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBreed === breed.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {breed.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
} 