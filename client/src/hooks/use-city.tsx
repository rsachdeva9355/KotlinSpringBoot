import { createContext, ReactNode, useContext, useState } from "react";

interface City {
  id: string;
  name: string;
}

interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cities: City[];
}

const CityContext = createContext<CityContextType | null>(null);

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState("Amsterdam");

  const cities: City[] = [
    { id: "Amsterdam", name: "Amsterdam" },
    { id: "Dublin", name: "Dublin" },
    { id: "Calgary", name: "Calgary" },
  ];

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, cities }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
} 