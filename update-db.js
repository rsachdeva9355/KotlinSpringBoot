import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './server/db.ts';

console.log('Starting database schema push...');

const main = async () => {
  try {
    await db.execute(`
      -- Create tables if they don't exist
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        location TEXT NOT NULL,
        bio TEXT,
        profile_picture TEXT,
        show_email BOOLEAN DEFAULT FALSE,
        show_phone BOOLEAN DEFAULT FALSE,
        public_profile BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        breed TEXT,
        age INTEGER,
        age_unit TEXT DEFAULT 'years',
        gender TEXT,
        weight INTEGER,
        description TEXT,
        profile_picture TEXT,
        health_info JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS service_providers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        phone TEXT,
        website TEXT,
        opening_hours TEXT,
        description TEXT,
        image_url TEXT,
        rating INTEGER,
        review_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS city_information (
        id SERIAL PRIMARY KEY,
        city TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        source TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS perplexity_services (
        id SERIAL PRIMARY KEY,
        city TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW(),
        CONSTRAINT perplexity_services_city_category_unique UNIQUE (city, category)
      );

      CREATE TABLE IF NOT EXISTS perplexity_pet_care (
        id SERIAL PRIMARY KEY,
        topic TEXT NOT NULL,
        city TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT NOW(),
        CONSTRAINT perplexity_pet_care_topic_city_unique UNIQUE (topic, city)
      );
    `);
    console.log('All database tables created successfully!');
  } catch (error) {
    console.error('Error creating database tables:', error);
  } finally {
    process.exit(0);
  }
};

main();