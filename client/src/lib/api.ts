export interface CityInfo {
  id: string;
  title: string;
  content: string;
  source?: string;
  imageUrl?: string;
  category: string;
  updatedAt: string;
}

// Use a hardcoded API URL for now
const API_BASE_URL = 'http://localhost:3001';

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache for city information
const cityInfoCache = new Map<string, CacheEntry<CityInfo[]>>();

export async function getCachedCityInfo(city: string): Promise<CityInfo[]> {
  const cacheKey = `cityInfo_${city}`;
  const cachedData = cityInfoCache.get(cacheKey);

  // Check if we have valid cached data
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  // If no valid cache, fetch new data
  const response = await fetch(`${API_BASE_URL}/api/info?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch city information');
  }

  const data = await response.json();

  // Cache the new data
  cityInfoCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

export async function getCityInfo(city: string): Promise<CityInfo[]> {
  const response = await fetch(`/api/info?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch city information');
  }
  return response.json();
} 