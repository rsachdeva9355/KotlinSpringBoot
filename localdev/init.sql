-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create pets table
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(255),
    age INTEGER,
    gender VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create service_providers table
CREATE TABLE service_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    opening_hours TEXT,
    rating DECIMAL(3,2),
    review_count INTEGER,
    image_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create city_information table
CREATE TABLE city_information (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    source VARCHAR(255),
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create perplexity_services table
CREATE TABLE perplexity_services (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(city, category)
);

-- Create perplexity_pet_care table
CREATE TABLE perplexity_pet_care (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(topic, city)
);

-- Create indexes for better query performance
CREATE INDEX idx_service_providers_city ON service_providers(city);
CREATE INDEX idx_service_providers_category ON service_providers(category);
CREATE INDEX idx_city_information_city ON city_information(city);
CREATE INDEX idx_city_information_category ON city_information(category);
CREATE INDEX idx_perplexity_services_city ON perplexity_services(city);
CREATE INDEX idx_perplexity_services_category ON perplexity_services(category);
CREATE INDEX idx_perplexity_pet_care_topic ON perplexity_pet_care(topic);
CREATE INDEX idx_perplexity_pet_care_city ON perplexity_pet_care(city);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
    BEFORE UPDATE ON pets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_providers_updated_at
    BEFORE UPDATE ON service_providers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_city_information_updated_at
    BEFORE UPDATE ON city_information
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 