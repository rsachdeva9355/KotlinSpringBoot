import { apiRequest } from "./queryClient";

export interface ServiceProvider {
  name: string;
  category: string;
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  description?: string;
  animals: string[];
}

export interface PerplexityServiceResponse {
  city: string;
  category: string;
  content: {
    services: ServiceProvider[];
  };
  timestamp: string;
}

export interface PerplexityInfoResponse {
  topic: string;
  city: string;
  content: string;
  timestamp: string;
}

/**
 * Fetch services for a specific city and category from the Perplexity API
 * @param city The city to get services for
 * @param category Optional category to filter services
 * @returns Promise with the service data
 */
export async function fetchPerplexityServices(
  city: string,
  category?: string
): Promise<PerplexityServiceResponse> {
  let url = `/api/perplexity/services?city=${encodeURIComponent(city)}`;
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }

  const response = await apiRequest("GET", url);
  return await response.json();
}

/**
 * Fetch pet care information for a specific topic and optionally city-specific
 * @param topic The care topic to search for
 * @param city Optional city for location-specific information
 * @returns Promise with the information data
 */
export async function fetchPerplexityPetCare(
  topic: string,
  city?: string
): Promise<PerplexityInfoResponse> {
  let url = `/api/perplexity/pet-care?topic=${encodeURIComponent(topic)}`;
  if (city) {
    url += `&city=${encodeURIComponent(city)}`;
  }

  const response = await apiRequest("GET", url);
  return await response.json();
}