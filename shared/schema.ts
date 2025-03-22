import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  location: text("location").notNull(),
  bio: text("bio"),
  profilePicture: text("profile_picture"),
  showEmail: boolean("show_email").default(false),
  showPhone: boolean("show_phone").default(false),
  publicProfile: boolean("public_profile").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});

// Pet schema
export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  breed: text("breed"),
  age: integer("age"),
  ageUnit: text("age_unit").default("years"),
  gender: text("gender"),
  weight: integer("weight"),
  description: text("description"),
  profilePicture: text("profile_picture"),
  healthInfo: jsonb("health_info"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPetSchema = createInsertSchema(pets).omit({
  id: true,
  createdAt: true
});

// Service Provider schema
export const serviceProviders = pgTable("service_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  phone: text("phone"),
  website: text("website"),
  openingHours: text("opening_hours"),
  description: text("description"),
  imageUrl: text("image_url"),
  rating: integer("rating"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertServiceProviderSchema = createInsertSchema(serviceProviders).omit({
  id: true,
  createdAt: true
});

// City Information schema
export const cityInformation = pgTable("city_information", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  source: text("source"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCityInfoSchema = createInsertSchema(cityInformation).omit({
  id: true,
  updatedAt: true
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Pet = typeof pets.$inferSelect;
export type InsertPet = z.infer<typeof insertPetSchema>;

export type ServiceProvider = typeof serviceProviders.$inferSelect;
export type InsertServiceProvider = z.infer<typeof insertServiceProviderSchema>;

export type CityInfo = typeof cityInformation.$inferSelect;
export type InsertCityInfo = z.infer<typeof insertCityInfoSchema>;

export type PetEventType = 
  | 'vet'
  | 'grooming'
  | 'medication'
  | 'vaccination'
  | 'training'
  | 'exercise'
  | 'feeding'
  | 'other';

export interface PetEvent {
  id: string;
  petId: string;
  type: PetEventType;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isAllDay: boolean;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  reminder?: {
    enabled: boolean;
    timing: number; // minutes before event
    type: 'push' | 'email' | 'both';
  };
  color?: string;
  completed?: boolean;
  notes?: string;
}

export const EVENT_TYPE_CONFIG: Record<PetEventType, { label: string; color: string; icon: string }> = {
  vet: { 
    label: 'Veterinary',
    color: '#ef4444', // red
    icon: 'stethoscope'
  },
  grooming: {
    label: 'Grooming',
    color: '#8b5cf6', // purple
    icon: 'scissors'
  },
  medication: {
    label: 'Medication',
    color: '#3b82f6', // blue
    icon: 'pill'
  },
  vaccination: {
    label: 'Vaccination',
    color: '#10b981', // green
    icon: 'syringe'
  },
  training: {
    label: 'Training',
    color: '#f59e0b', // amber
    icon: 'target'
  },
  exercise: {
    label: 'Exercise',
    color: '#ec4899', // pink
    icon: 'activity'
  },
  feeding: {
    label: 'Feeding',
    color: '#6366f1', // indigo
    icon: 'bowl'
  },
  other: {
    label: 'Other',
    color: '#64748b', // slate
    icon: 'more-horizontal'
  }
};
