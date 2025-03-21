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

// Perplexity Service Results schema
export const perplexityServices = pgTable("perplexity_services", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  // Creating a unique constraint on city+category for faster lookups
  // and to prevent duplicate entries
}, (table) => {
  return {
    cityCategory: {
      name: "perplexity_services_city_category_unique",
      columns: [table.city, table.category]  
    }
  }
});

export const insertPerplexityServiceSchema = createInsertSchema(perplexityServices).omit({
  id: true,
  timestamp: true
});

// Perplexity Pet Care Information schema
export const perplexityPetCare = pgTable("perplexity_pet_care", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  city: text("city").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  // Creating a unique constraint on topic+city for faster lookups
  // and to prevent duplicate entries
}, (table) => {
  return {
    topicCity: {
      name: "perplexity_pet_care_topic_city_unique",
      columns: [table.topic, table.city]  
    }
  }
});

export const insertPerplexityPetCareSchema = createInsertSchema(perplexityPetCare).omit({
  id: true,
  timestamp: true
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

export type PerplexityService = typeof perplexityServices.$inferSelect;
export type InsertPerplexityService = z.infer<typeof insertPerplexityServiceSchema>;

export type PerplexityPetCare = typeof perplexityPetCare.$inferSelect;
export type InsertPerplexityPetCare = z.infer<typeof insertPerplexityPetCareSchema>;
