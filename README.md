<div align="center">
  <h1>💰 Finance Control</h1>
  <p><strong>A modern, full-stack financial management application</strong></p>
  
  <p>
    <img alt="Version" src="https://img.shields.io/badge/version-1.4.0-blue.svg?cacheSeconds=2592000" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg" />
    <img alt="React" src="https://img.shields.io/badge/react-18.2.0-blue.svg" />
    <img alt="Recharts" src="https://img.shields.io/badge/recharts-2.15.4-orange.svg" />
  </p>
</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Docker Setup](#docker-setup)
  - [Services](#services)
  - [Quick Start with Docker](#quick-start-with-docker)
  - [Development Workflow](#development-workflow)
  - [Accessing the Applications](#accessing-the-applications)
  - [Troubleshooting](#troubleshooting)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

Finance Control is a comprehensive financial management application built with modern web technologies. It provides users with an intuitive interface to track their personal finances, monitor real-time Bitcoin prices, and manage transactions with detailed analytics.

### Key Highlights

- **Full-Stack Application**: Complete frontend and backend implementation
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Real-time Data**: Live Bitcoin price tracking across multiple currencies
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Docker Support**: Containerized deployment for easy setup

## ✨ Features

### 🔐 Authentication & Security

- User registration and login with email/password via Supabase Auth
- JWT-based authentication with refresh tokens
- Secure password hashing handled by Supabase
- Protected routes and middleware
- Rate limiting and CORS protection
- Row Level Security (RLS) for database access control

### 💳 Financial Management

- Create, read, update, and delete transactions
- Transaction categorization and filtering
- Real-time balance calculations
- Transaction history with detailed analytics
- Credit card expense tracking (demo purposes)

### 📊 Analytics & Insights

- Transaction summary with visual charts using Recharts
- Interactive area charts for balance trends
- Pie charts for expense categorization breakdown
- Monthly/yearly financial reports with data visualization
- Real-time Bitcoin price monitoring (EUR, USD, BRL)

### 🎨 User Experience

- Responsive design for all devices
- Modern and intuitive interface
- Loading animations with Lottie
- Modal components with accessibility features
- Dark/light theme support

## 🏗️ Architecture

This project follows **Micro Frontend Architecture** with **Clean Architecture** principles:

### Project Structure

```
/
├── backend/                  # Backend API and services
│   ├── src/                  # Source code
│   ├── config/               # Configuration files
│   ├── migrations/           # Database migrations
│   └── Dockerfile.backend    # Backend container
├── frontend/                 # Frontend modules (micro frontends)
│   ├── web/                 # Web module
│   │   ├── src/              # Web-specific components
│   │   ├── public/           # Web public assets
│   │   └── package.json      # Web dependencies
│   ├── mobile/            # Mobile module
│   │   ├── src/              # Mobile components
│   │   ├── public/           # Mobile public assets
│   │   └── package.json      # Mobile dependencies
│   └── Dockerfile.frontend   # Frontend container
├── shared/                   # Shared code between modules
│   ├── types/                # TypeScript types
│   ├── constants/            # Shared constants
│   ├── utils/                # Utility functions
│   └── lib/                  # Internal libraries
└── docker-compose.yml        # Multi-container setup
```

### Micro Frontend Benefits

- **Independent Development**: Each module can be developed separately
- **Technology Flexibility**: Different modules can use different versions
- **Scalable Teams**: Teams can work on different modules independently
- **Deployment Independence**: Modules can be deployed separately
- **Code Isolation**: Reduces coupling between different features

### Backend Architecture

```
backend/src/
├── application/         # Application layer
│   ├── services/       # Application services
│   ├── use-cases/      # Business use cases
│   └── validators/     # Input validation
├── domain/             # Domain layer
│   └── entities/       # Business entities
├── infrastructure/     # Infrastructure layer
│   └── repositories/   # Data access implementations
├── presentation/       # Presentation layer
│   └── controllers/    # HTTP controllers
└── config/            # Configuration and dependencies
```

## 🛠️ Tech Stack

### Frontend

- **React 18.2.0** - UI library with hooks and context
- **TypeScript** - Type-safe JavaScript
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **Recharts** - Responsive charting library for data visualization
- **Framer Motion** - Animation library
- **React Modal** - Accessible modal components
- **Lottie React** - Animation rendering

### Backend

- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web application framework
- **Supabase** - Backend-as-a-Service with authentication and database
- **PostgreSQL** - Relational database (via Supabase)
- **JWT** - JSON Web Tokens for authentication
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### DevOps & Tools

- **Docker & Docker Compose** - Containerization
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **Git** - Version control

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (version 15 or higher)
- **Docker** and **Docker Compose** (optional, for containerized setup)
- **Git**

## 🚀 Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+ (with psql client)
- Docker and Docker Compose
- Git

### Quick Setup (Recommended)

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/finance-control.git
   cd finance-control
   ```

2. **Run the setup script**

   ```bash
   # Make the script executable
   chmod +x ./scripts/setup-project.sh

   # Run the setup script
   ./scripts/setup-project.sh
   ```

   This script will:

   - Check all system requirements
   - Install all dependencies
   - Set up environment files
   - Configure Supabase
   - Prepare the project for development

   > **Note:** If you encounter any issues during setup:
   >
   > - For npm installation errors, the script will automatically try with `--legacy-peer-deps`
   > - If Supabase fails to start due to ports already in use, the script will attempt to use alternative ports
   > - See the [Troubleshooting](#troubleshooting) section for more solutions
   > - If you already have Supabase running locally, you may see port conflicts. Use `supabase stop` before running the setup script

3. **Start the project**
   ```bash
   # Start all services
   ./scripts/start-local.sh
   ```

### Manual Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/finance-control.git
   cd finance-control
   ```

2. **Install all dependencies**

   ```bash
   # Install root dependencies and all workspace dependencies
   npm install

   # Install dependencies for all modules
   npm run install:all
   ```

3. **Environment setup**

   ```bash
   # Copy environment files
   cp .env.example .env
   cp apps/backend/.env.example apps/backend/.env

   # Configure your database and JWT settings in apps/backend/.env
   ```

4. **Supabase setup**

   ```bash
   # Run the Supabase setup script
   ./scripts/setup-supabase.sh
   ```

   This script will:

   - Install Supabase CLI (if needed)
   - Start Supabase locally
   - Apply the SQL schema to the database
   - Configure the necessary environment variables

   After setup, you can access Supabase Studio at http://localhost:54323

   Alternatively, you can configure manually:

   ```bash
   # Install Supabase CLI (if you don't have it yet)
   # macOS
   brew install supabase/tap/supabase

   # Linux
   curl -s https://raw.githubusercontent.com/supabase/cli/main/install.sh | bash

   # Start Supabase locally
   supabase start

   # Apply SQL schema to Supabase
   ./apps/backend/scripts/update-supabase-schema.sh

   # Or manually via psql
   psql -U postgres -d postgres -h localhost -p 54322 -f apps/backend/supabase/migrations/supabase-schema.sql
   ```

5. **Start development servers**

   ```bash
   # Start all services in development mode
   npm run dev

   # Or start individual modules:
   npm run dev:web      # Web module only
   npm run dev:mobile   # Mobile module only
   npm run dev:backend   # Backend only
   ```

### Docker Development

```bash
# Start all services (web, mobile, backend, database)
docker-compose up -d

# View logs
docker-compose logs -f

# Start specific services
docker-compose up frontend-web backend db

# Stop services
docker-compose down
```

Alternatively, you can use the Docker Compose files in the infra directory:

```bash
# Navigate to the infrastructure directory
cd infra/docker

# Start all services
docker-compose -f docker-compose.yml up -d

# Start with database
docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d

# Stop services
docker-compose -f docker-compose.yml -f docker-compose.db.yml down
```

### Module-Specific Development

```bash
# Work on web module
cd frontend/web
npm run dev

# Work on mobile module
cd frontend/mobile
npm run dev

# Work on shared components
cd shared
npm run build
```

The application will be available at:

- **Web Module**: http://localhost:3000
- **Mobile Module**: http://localhost:3001
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

## 📖 Usage

### Getting Started

1. **Access the application** at http://localhost:3000
2. **Create an account** using the signup form
3. **Login** with your credentials
4. **Start managing your finances**:
   - Add income and expense transactions
   - View your transaction history
   - Monitor your balance and analytics
   - Check real-time Bitcoin prices

### API Endpoints

#### Authentication

- `POST /api/auth/signup` - User registration (integrated with Supabase Auth)
- `POST /api/auth/token` - User login (integrated with Supabase Auth)
- `POST /api/auth/logout` - User logout (integrated with Supabase Auth)
- `POST /api/auth/refresh` - Refresh access token (integrated with Supabase Auth)
- `GET /api/auth/user` - Get current user (integrated with Supabase Auth)

#### Transactions

- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

#### Health Check

- `GET /api/health` - API health status

## 🐳 Docker Setup

The project includes a complete Docker setup for easy deployment and development.

### Services

- **Frontend Web**: React application for web (port 3000)
- **Frontend Mobile**: React application for mobile (port 3003)
- **Backend**: Node.js API integrated with Supabase (port 3002, mapped to 3001 internally)
- **Database**: PostgreSQL 15 (port 5432)
- **Supabase**: External service for authentication and database (configured via environment variables)

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/your-username/finance-control.git
cd finance-control

# Copy the environment file
cp .env.example .env

# Start all services using Docker Compose
docker-compose up -d

# Or use the convenience script
./scripts/start-local.sh

# Check service status
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Stop all services
docker-compose down

# Or use the cleanup script
./scripts/cleanup.sh
```

### Development Workflow

```bash
# Rebuild after code changes
docker-compose build
docker-compose up -d

# Start specific modules
docker-compose up -d frontend-web backend db
docker-compose up -d frontend-mobile backend db

# Access database directly
docker-compose exec db psql -U postgres -d finance_control

# Install dependencies in containers
docker-compose exec frontend-web npm install [package-name]
docker-compose exec frontend-mobile npm install [package-name]
docker-compose exec backend npm install [package-name]

# Service-specific logs
docker-compose logs -f db
docker-compose logs -f backend
docker-compose logs -f frontend-web
docker-compose logs -f frontend-mobile
```

### Accessing the Applications

After starting the services, you can access:

- **Auth Frontend**: http://localhost:3000
- **Dashboard Frontend**: http://localhost:3003
- **Backend API**: http://localhost:3002
- **Database**: localhost:5432 (PostgreSQL)

### Troubleshooting

#### Problem: Services don't start

```bash
# Check logs
docker-compose logs

# Check if ports are available
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
```

#### Problem: Database doesn't connect

```bash
# Check if PostgreSQL is running
docker-compose ps db

# Test connection
docker-compose exec db pg_isready -U postgres
```

#### Problem: Frontend doesn't load

```bash
# Check frontend logs
docker-compose logs frontend-web
docker-compose logs frontend-mobile

# Rebuild frontend
docker-compose build --no-cache frontend-web
docker-compose up -d frontend-web
```

#### Problem: Missing dependencies (e.g., 'recharts')

```bash
# Check for missing dependencies in logs
docker-compose logs frontend-web

# Install missing dependency inside container
docker-compose exec frontend-web npm install recharts

# Or add to package.json and rebuild
# 1. Add the dependency to package.json
# 2. Rebuild the container
docker-compose build frontend-web
docker-compose up -d frontend-web
```

#### Problem: CORS error

- Check if allowed origins are correctly configured in the `CORS_ORIGIN` variable
- If using Supabase, check if Kong is running: `docker-compose ps kong`
- Check the configuration in `supabase/kong.yml`

#### Problem: Supabase connection error

- Check if Supabase is running: `supabase status`
- Check if environment variables `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_ANON_KEY` are correctly configured
- Run the Supabase setup script: `./scripts/setup-supabase.sh`
- Try restarting Supabase: `supabase stop && supabase start`
- Check Supabase logs: `supabase logs`
- Check if the SQL schema was correctly applied: `psql -U postgres -d postgres -h localhost -p 54322 -c "\dt"`

#### Problem: Supabase ports already in use

- Check which processes are using the Supabase ports:
  ```bash
  # Check ports 54321, 54322, 54323
  lsof -i :54321 -i :54322 -i :54323
  ```
- Stop existing Supabase instances:
  ```bash
  supabase stop
  ```
- If ports are still in use, you can kill the processes:
  ```bash
  # Replace PID with the process ID from lsof command
  kill -9 PID
  ```
- Create a custom configuration with different ports:
  ```bash
  mkdir -p ./supabase
  cat > ./supabase/config.toml << EOF
  [api]
  port = 54321
  [db]
  port = 54323
  [studio]
  port = 54334
  EOF
  ```
- Start Supabase with the custom configuration:
  ```bash
  supabase start
  ```

#### Problem: npm errors during installation

- Clear npm cache: `npm cache clean --force`
- Try installing with legacy peer dependencies: `npm install --legacy-peer-deps`
- If you see `Cannot read properties of undefined (reading 'extraneous')` error:
  ```bash
  # Try with these flags
  npm install --no-fund --no-audit --legacy-peer-deps
  ```
- Check your Node.js version: `node -v` (should be 18+)
- Delete node_modules and package-lock.json and try again:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for Node.js version compatibility: `node -v` (should be v18+)
- Try using the setup script: `./scripts/setup-project.sh`

#### Problem: Port already in use

```bash
# Check which process is using the port (e.g., 3000)
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use the script to clear ports
./scripts/start-local.sh
```

#### Problem: Docker container fails to start

```bash
# Check Docker logs
docker logs finance_frontend_web
docker logs finance_backend

# Check Docker container status
docker ps -a

# Restart Docker
docker-compose down
docker-compose up -d
```

#### Problem: Scripts not executable

```bash
# Make scripts executable
chmod +x ./scripts/*.sh

# Run the script
./scripts/setup-project.sh
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
npm test

# Backend tests
cd backend
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Testing individual components and functions
- **Integration Tests**: Testing API endpoints and database interactions
- **E2E Tests**: End-to-end user flow testing

## 🎨 Design System

### Typography

- **Font Family**: Montserrat (400, 500, 600, 700)

### Color Palette

| Color          | Hex Code               | Usage               |
| -------------- | ---------------------- | ------------------- |
| Primary        | `#FFE664` to `#FA8341` | Buttons, highlights |
| Secondary      | `#F0F2F5`              | Backgrounds         |
| Text Primary   | `#363F5F`              | Main text           |
| Text Secondary | `#969CB2`              | Secondary text      |
| Success        | `#12A454`              | Positive actions    |
| Error          | `#E52E4D`              | Error states        |
| Warning        | `#FF872C`              | Warning states      |

### Screens Figma

##### UI Design Login

![login](https://user-images.githubusercontent.com/27157739/183252681-fac1930f-d5c8-4b09-b6a8-c7f19826650c.png)

##### UI Design Desktop

![new Início](https://user-images.githubusercontent.com/27157739/188340669-f1b5d6bc-4ecc-47e2-8c8b-1eb203abc1ba.jpg)

#### UI Design Mobile

- Login and Home
  ![Home - Login](https://user-images.githubusercontent.com/27157739/188341075-5cb9c3ea-a951-46f2-9bf6-00d4e03146b2.png)

- Transaction and User
  ![User](https://user-images.githubusercontent.com/27157739/188341083-6ee0ad6a-fae3-4e76-8401-bfa99e9d933e.png)

- F.A.Q and Version
  ![dev](https://user-images.githubusercontent.com/27157739/188341090-9db8e896-fc3c-4413-a2e9-bbc156acff88.png)

#### Interface elements

##### Modal Component with hover and focus active

![Modal](https://user-images.githubusercontent.com/27157739/181994924-ae62eec5-4feb-48aa-8008-72e878b46b5b.png)

##### Navigation Component

![nav](https://user-images.githubusercontent.com/27157739/181994926-85dc86fb-e730-4279-9064-791d656e8fca.png)

## 🚀 Deployment

### 🔒 Production Preparation

**IMPORTANT**: Before deploying, run the security check:

```bash
# Run the security check script
./security-check.sh
```

### Security Checklist

- [ ] All sensitive variables are in `.env` files (not committed)
- [ ] JWT_SECRET has at least 32 characters and is unique
- [ ] Database passwords are strong and unique
- [ ] NODE_ENV is set to 'production'
- [ ] CORS is configured only for authorized domains
- [ ] HTTPS is configured

### Production Configuration

1. **Configure production environment variables:**

```bash
# For Docker
cp .env.docker.example .env.docker
# Edit .env.docker with your production settings

# For traditional deployment
cp .env.production.example .env.production
# Edit .env.production with your settings
```

2. **Generate secure secrets:**

```bash
# JWT Secret (at least 32 characters)
openssl rand -base64 32

# Strong database password
openssl rand -base64 24
```

### Production Build

```bash
# Build frontend
npm run build

# Build backend (if applicable)
cd backend
npm run build
```

### Docker Deployment

```bash
# Configure environment variables
cp .env.docker.example .env.docker
# Edit .env.docker with your settings

# Run with production configuration
docker-compose --env-file .env.docker up -d
```

## 🔧 Environment Variables

### Security & Configuration

This project uses a secure configuration approach:

- **Sensitive data** is stored in `.env` files (git-ignored)
- **Configuration templates** are provided in `.env.example` files
- **Shared configuration** is managed in the `backend/config/` directory

### Backend Configuration

Copy and configure the backend environment:

```bash
cp backend/.env.example backend/.env
```

**Backend (.env)**

```env
# Supabase Configuration
SUPABASE_URL=http://localhost:54323
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ANON_KEY=your-supabase-anon-key

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Modules

Each frontend module can have its own environment configuration:

```bash
# Auth module
cp frontend/web/.env.example frontend/web/.env

# Dashboard module
cp frontend/mobile/.env.example frontend/mobile/.env
```

### Production Environment Variables

Make sure to set the following environment variables in production:

**Frontend**

- `REACT_APP_API_URL`: Backend API URL

**Backend**

- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to 'production'
- `PORT`: Server port (default: 3001)
- `CORS_ORIGIN`: URLs allowed for CORS (e.g.: https://your-domain.com)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Adson Santos**

- LinkedIn: [@adson-santos](https://www.linkedin.com/in/adson-santos-72ba75140/)
- Instagram: [@adson.san.dev](https://instagram.com/adson.san.dev)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Inspired by modern financial management applications
- Built with love for the developer community

## 📊 Project Status

### ✅ Completed Features

- User authentication and authorization with Supabase Auth
- Transaction CRUD operations
- Data visualization with Recharts (area charts, pie charts)
- Real-time Bitcoin price tracking
- Responsive design
- Docker containerization with troubleshooting documentation
- Clean architecture implementation
- Complete integration with Supabase for authentication and database
- Row Level Security (RLS) for database access control

### 🚧 In Progress

- Advanced analytics mobile with additional chart types
- Export functionality for reports and data
- Mobile app development
- Additional payment integrations

### 📋 Planned Features

- Multi-currency support
- Budget planning tools
- Financial goal tracking
- Social features
- AI-powered insights

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/your-username">Adson Santos</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
