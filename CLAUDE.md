# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ABJ Bom Jesus is a management system for "Associação Bom Jesus" - a shelter management application for tracking residents, products, rooms, and users. Built as a full-stack application with Node.js/Express backend and React frontend.

## Common Commands

### Backend Development
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build production code
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues automatically
npm run format       # Format code with Prettier
```

### Frontend Development  
```bash
cd frontend
npm start           # Start React development server
npm run build       # Build production bundle
npm test           # Run test suite
```

### Database Management
```bash
cd backend
make setup-database    # Complete database setup (create, migrate, seed)
make run-migrations   # Run database migrations only
make run-seeds       # Run seed data only
```

## Architecture

### Backend Structure
- **Framework**: Express.js with ES6 modules and Babel transpilation
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Pattern**: MVC architecture with separated concerns:
  - `controllers/` - Business logic handlers
  - `models/` - Sequelize data models (Users, Guests, Produtos, Quartos)
  - `routes/` - API endpoint definitions
  - `middlewares/` - Authentication and validation middleware

### Frontend Structure  
- **Framework**: React 19 with React Router DOM
- **State Management**: React Context API for user authentication state
- **Authentication**: Protected routes using `ProtectedRoute` component
- **Components**: Organized by feature modules (GerenciarHospedes, GerenciarProdutos, etc.)

### Database Schema
Core entities: Users (system admins), Guests (shelter residents), Produtos (inventory), Quartos (rooms). All models use automatic timestamps and snake_case field naming.

## Development Environment

- Backend runs on port 3001 by default
- Frontend connects to `http://localhost:3001`
- MySQL database with Docker Compose support
- Requires `.env` file with database credentials and API_PORT
- ESLint configuration with Prettier integration for code formatting

## Testing

Run tests with `npm test` in the frontend directory. Backend uses ESLint for code quality checks.