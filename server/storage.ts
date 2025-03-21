import { users, type User, type InsertUser, pets, type Pet, type InsertPet, serviceProviders, type ServiceProvider, type InsertServiceProvider, cityInformation, type CityInfo, type InsertCityInfo } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

// Modify the interface with all CRUD methods we need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  // Pet methods
  getPet(id: number): Promise<Pet | undefined>;
  getPetsByUserId(userId: number): Promise<Pet[]>;
  createPet(pet: InsertPet): Promise<Pet>;
  updatePet(id: number, pet: Partial<Pet>): Promise<Pet | undefined>;
  deletePet(id: number): Promise<boolean>;

  // Service Provider methods
  getServiceProvider(id: number): Promise<ServiceProvider | undefined>;
  getServiceProviders(city: string, category?: string): Promise<ServiceProvider[]>;
  createServiceProvider(provider: InsertServiceProvider): Promise<ServiceProvider>;

  // City Information methods
  getCityInfo(id: number): Promise<CityInfo | undefined>;
  getCityInfoByCity(city: string, category?: string): Promise<CityInfo[]>;
  createCityInfo(info: InsertCityInfo): Promise<CityInfo>;

  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pets: Map<number, Pet>;
  private serviceProviders: Map<number, ServiceProvider>;
  private cityInfo: Map<number, CityInfo>;
  private userIdCounter: number;
  private petIdCounter: number;
  private serviceProviderIdCounter: number;
  private cityInfoIdCounter: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.pets = new Map();
    this.serviceProviders = new Map();
    this.cityInfo = new Map();
    this.userIdCounter = 1;
    this.petIdCounter = 1;
    this.serviceProviderIdCounter = 1;
    this.cityInfoIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add some sample service providers for each city
    const sampleProviders = [
      {
        name: "Amsterdam Pet Clinic",
        category: "Veterinarian",
        address: "Herengracht 123, 1015",
        city: "Amsterdam",
        phone: "+31 20 123 4567",
        openingHours: "09:00 - 18:00",
        description: "Full-service veterinary clinic in central Amsterdam",
        rating: 45, // 4.5 stars
        reviewCount: 48,
        imageUrl: "https://images.unsplash.com/photo-1595776613215-fe04b78de7d0"
      },
      {
        name: "Pawsome Grooming",
        category: "Pet Groomer",
        address: "Prinsengracht 456, 1016",
        city: "Amsterdam",
        phone: "+31 20 456 7890",
        openingHours: "10:00 - 17:00",
        description: "Professional grooming services for dogs and cats",
        rating: 40, // 4.0 stars
        reviewCount: 32,
        imageUrl: "https://images.unsplash.com/photo-1581888227599-779811939961"
      },
      {
        name: "Vondelpark Dog Run",
        category: "Dog Park",
        address: "Vondelpark, 1071",
        city: "Amsterdam",
        openingHours: "Open 24 hours",
        description: "Large off-leash area for dogs in Amsterdam's famous park",
        rating: 49, // 4.9 stars
        reviewCount: 87,
        imageUrl: "https://images.unsplash.com/photo-1541599484646-3a8705171833"
      },
      {
        name: "Dublin Veterinary Hospital",
        category: "Veterinarian",
        address: "O'Connell Street 45, D01",
        city: "Dublin",
        phone: "+353 1 234 5678",
        openingHours: "08:30 - 19:00",
        description: "Comprehensive veterinary care for all pets",
        rating: 47, // 4.7 stars
        reviewCount: 63,
        imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7"
      },
      {
        name: "Calgary Pet Supply",
        category: "Pet Shop",
        address: "17 Avenue SW 450, T2S",
        city: "Calgary",
        phone: "+1 403 123 4567",
        openingHours: "10:00 - 20:00",
        description: "Premium pet food and supplies for all animals",
        rating: 43, // 4.3 stars
        reviewCount: 51,
        imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
      }
    ];

    sampleProviders.forEach(provider => {
      this.createServiceProvider(provider);
    });

    // Add some city information
    const cityInfoData = [
      {
        city: "Amsterdam",
        category: "Pet Regulations",
        title: "Dog Leash Laws in Amsterdam",
        content: "Dogs must be kept on a leash in most public areas of Amsterdam, including streets and parks. There are designated off-leash areas in some parks like Vondelpark.",
        source: "City of Amsterdam Official Website",
        imageUrl: "https://images.unsplash.com/photo-1625489238848-71d0df1f2899"
      },
      {
        city: "Amsterdam",
        category: "Pet-Friendly Spaces",
        title: "Amsterdam Dog Parks Guide",
        content: "Amsterdam has several dog-friendly parks with designated off-leash areas. The most popular include Vondelpark, Westerpark, and Amstelpark.",
        source: "Amsterdam Tourist Board",
        imageUrl: "https://images.unsplash.com/photo-1625489238848-71d0df1f2899"
      },
      {
        city: "Dublin",
        category: "Pet Healthcare",
        title: "Veterinary Services in Dublin",
        content: "Dublin offers numerous veterinary clinics and emergency pet hospitals throughout the city. Most are open Monday through Saturday with emergency services available 24/7.",
        source: "Dublin Pet Owners Association",
        imageUrl: "https://images.unsplash.com/photo-1584863231364-2edc166de576"
      },
      {
        city: "Calgary",
        category: "Pet Regulations",
        title: "Pet Licensing in Calgary",
        content: "All dogs and cats over 3 months of age must be licensed in Calgary. Licenses can be obtained online through the City of Calgary website or at any registry office.",
        source: "City of Calgary Animal Services",
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
      }
    ];

    cityInfoData.forEach(info => {
      this.createCityInfo(info);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Pet methods
  async getPet(id: number): Promise<Pet | undefined> {
    return this.pets.get(id);
  }

  async getPetsByUserId(userId: number): Promise<Pet[]> {
    return Array.from(this.pets.values()).filter(
      (pet) => pet.userId === userId,
    );
  }

  async createPet(insertPet: InsertPet): Promise<Pet> {
    const id = this.petIdCounter++;
    const pet: Pet = { ...insertPet, id, createdAt: new Date() };
    this.pets.set(id, pet);
    return pet;
  }

  async updatePet(id: number, updates: Partial<Pet>): Promise<Pet | undefined> {
    const pet = await this.getPet(id);
    if (!pet) return undefined;

    const updatedPet = { ...pet, ...updates };
    this.pets.set(id, updatedPet);
    return updatedPet;
  }

  async deletePet(id: number): Promise<boolean> {
    return this.pets.delete(id);
  }

  // Service Provider methods
  async getServiceProvider(id: number): Promise<ServiceProvider | undefined> {
    return this.serviceProviders.get(id);
  }

  async getServiceProviders(city: string, category?: string): Promise<ServiceProvider[]> {
    let providers = Array.from(this.serviceProviders.values()).filter(
      (provider) => provider.city.toLowerCase() === city.toLowerCase()
    );

    if (category && category !== "all") {
      providers = providers.filter(
        (provider) => provider.category.toLowerCase() === category.toLowerCase()
      );
    }

    return providers;
  }

  async createServiceProvider(insertProvider: InsertServiceProvider): Promise<ServiceProvider> {
    const id = this.serviceProviderIdCounter++;
    const provider: ServiceProvider = { ...insertProvider, id, createdAt: new Date() };
    this.serviceProviders.set(id, provider);
    return provider;
  }

  // City Information methods
  async getCityInfo(id: number): Promise<CityInfo | undefined> {
    return this.cityInfo.get(id);
  }

  async getCityInfoByCity(city: string, category?: string): Promise<CityInfo[]> {
    let info = Array.from(this.cityInfo.values()).filter(
      (info) => info.city.toLowerCase() === city.toLowerCase()
    );

    if (category) {
      info = info.filter(
        (info) => info.category.toLowerCase() === category.toLowerCase()
      );
    }

    return info;
  }

  async createCityInfo(insertInfo: InsertCityInfo): Promise<CityInfo> {
    const id = this.cityInfoIdCounter++;
    const info: CityInfo = { ...insertInfo, id, updatedAt: new Date() };
    this.cityInfo.set(id, info);
    return info;
  }
}

export const storage = new MemStorage();
