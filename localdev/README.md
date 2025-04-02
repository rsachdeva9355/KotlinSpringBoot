# Local Development Setup

This directory contains the Docker Compose configuration for running a local PostgreSQL database for development.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Start the database:
```bash
docker-compose up -d
```

2. The database will be available at:
   - Host: localhost
   - Port: 5432
   - Database: petfinder
   - Username: postgres
   - Password: postgres

3. The database will be automatically initialized with the required tables and indexes when first started.

4. To stop the database:
```bash
docker-compose down
```

5. To stop the database and remove all data:
```bash
docker-compose down -v
```

## Database Schema

The following tables are created:
- `users`: User accounts
- `pets`: Pet information
- `service_providers`: Pet service providers
- `city_information`: City-specific information
- `perplexity_services`: Cached Perplexity API service results
- `perplexity_pet_care`: Cached Perplexity API pet care information

## Environment Variables

Make sure to set the following environment variable in your application:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/petfinder
``` 