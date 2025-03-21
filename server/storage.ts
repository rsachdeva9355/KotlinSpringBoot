import { users, type User, type InsertUser, pets, type Pet, type InsertPet, serviceProviders, type ServiceProvider, type InsertServiceProvider, cityInformation, type CityInfo, type InsertCityInfo, perplexityServices, type PerplexityService, type InsertPerplexityService, perplexityPetCare, type PerplexityPetCare, type InsertPerplexityPetCare } from "@shared/schema";
import { db } from "./db";
import { eq, and, SQL } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { Pool } from "@neondatabase/serverless";

// Create PostgreSQL session store
const PostgresSessionStore = connectPg(session);

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
  
  // Perplexity API data methods
  getPerplexityService(city: string, category: string): Promise<PerplexityService | undefined>;
  createPerplexityService(service: InsertPerplexityService): Promise<PerplexityService>;
  updatePerplexityService(city: string, category: string, content: string): Promise<PerplexityService | undefined>;
  
  getPerplexityPetCare(topic: string, city: string): Promise<PerplexityPetCare | undefined>;
  createPerplexityPetCare(petCare: InsertPerplexityPetCare): Promise<PerplexityPetCare>;
  updatePerplexityPetCare(topic: string, city: string, content: string): Promise<PerplexityPetCare | undefined>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    // Create session store connected to our database
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL must be set");
    }
    
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
      tableName: 'session'
    });
    
    // Seed initial data if needed
    this.initializeData();
  }

  private async initializeData() {
    try {
      // Check if we already have service providers in the database
      const existingProviders = await db.select().from(serviceProviders).limit(1);
      
      // If no providers exist, seed the database
      if (existingProviders.length === 0) {
        // Add sample service providers
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

        for (const provider of sampleProviders) {
          await this.createServiceProvider(provider);
        }

        // Add sample city information
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

        for (const info of cityInfoData) {
          await this.createCityInfo(info);
        }
      }
    } catch (error) {
      console.error("Error seeding initial data:", error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users)
        .values(insertUser)
        .returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    try {
      const [updatedUser] = await db.update(users)
        .set(updates)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Pet methods
  async getPet(id: number): Promise<Pet | undefined> {
    try {
      const [pet] = await db.select().from(pets).where(eq(pets.id, id));
      return pet;
    } catch (error) {
      console.error("Error fetching pet:", error);
      throw error;
    }
  }

  async getPetsByUserId(userId: number): Promise<Pet[]> {
    try {
      return await db.select().from(pets).where(eq(pets.userId, userId));
    } catch (error) {
      console.error("Error fetching pets by user id:", error);
      throw error;
    }
  }

  async createPet(insertPet: InsertPet): Promise<Pet> {
    try {
      const [pet] = await db.insert(pets)
        .values(insertPet)
        .returning();
      return pet;
    } catch (error) {
      console.error("Error creating pet:", error);
      throw error;
    }
  }

  async updatePet(id: number, updates: Partial<Pet>): Promise<Pet | undefined> {
    try {
      const [updatedPet] = await db.update(pets)
        .set(updates)
        .where(eq(pets.id, id))
        .returning();
      return updatedPet;
    } catch (error) {
      console.error("Error updating pet:", error);
      throw error;
    }
  }

  async deletePet(id: number): Promise<boolean> {
    try {
      const result = await db.delete(pets).where(eq(pets.id, id));
      return true; // In Drizzle with PostgreSQL, no error means success
    } catch (error) {
      console.error("Error deleting pet:", error);
      throw error;
    }
  }

  // Service Provider methods
  async getServiceProvider(id: number): Promise<ServiceProvider | undefined> {
    try {
      const [provider] = await db.select().from(serviceProviders).where(eq(serviceProviders.id, id));
      return provider;
    } catch (error) {
      console.error("Error fetching service provider:", error);
      throw error;
    }
  }

  async getServiceProviders(city: string, category?: string): Promise<ServiceProvider[]> {
    try {
      let query = db.select().from(serviceProviders).where(
        eq(serviceProviders.city, city)
      );

      if (category && category !== "all") {
        query = db.select().from(serviceProviders).where(
          and(
            eq(serviceProviders.city, city),
            eq(serviceProviders.category, category)
          )
        );
      }

      return await query;
    } catch (error) {
      console.error("Error fetching service providers:", error);
      throw error;
    }
  }

  async createServiceProvider(insertProvider: InsertServiceProvider): Promise<ServiceProvider> {
    try {
      const [provider] = await db.insert(serviceProviders)
        .values(insertProvider)
        .returning();
      return provider;
    } catch (error) {
      console.error("Error creating service provider:", error);
      throw error;
    }
  }

  // City Information methods
  async getCityInfo(id: number): Promise<CityInfo | undefined> {
    try {
      const [info] = await db.select().from(cityInformation).where(eq(cityInformation.id, id));
      return info;
    } catch (error) {
      console.error("Error fetching city info:", error);
      throw error;
    }
  }

  async getCityInfoByCity(city: string, category?: string): Promise<CityInfo[]> {
    try {
      let query = db.select().from(cityInformation).where(
        eq(cityInformation.city, city)
      );

      if (category) {
        query = db.select().from(cityInformation).where(
          and(
            eq(cityInformation.city, city),
            eq(cityInformation.category, category)
          )
        );
      }

      return await query;
    } catch (error) {
      console.error("Error fetching city information:", error);
      throw error;
    }
  }

  async createCityInfo(insertInfo: InsertCityInfo): Promise<CityInfo> {
    try {
      const [info] = await db.insert(cityInformation)
        .values(insertInfo)
        .returning();
      return info;
    } catch (error) {
      console.error("Error creating city information:", error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const storage = new DatabaseStorage();
