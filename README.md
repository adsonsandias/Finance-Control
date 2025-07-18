<div align="center">
  <h1>💰 Finance Control</h1>
  <p><strong>A modern, full-stack financial management application</strong></p>
  
  <p>
    <img alt="Version" src="https://img.shields.io/badge/version-1.3.0-blue.svg?cacheSeconds=2592000" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg" />
    <img alt="React" src="https://img.shields.io/badge/react-18.2.0-blue.svg" />
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
- User registration and login with email/password
- JWT-based authentication with refresh tokens
- Secure password hashing with bcryptjs
- Protected routes and middleware
- Rate limiting and CORS protection

### 💳 Financial Management
- Create, read, update, and delete transactions
- Transaction categorization and filtering
- Real-time balance calculations
- Transaction history with detailed analytics
- Credit card expense tracking (demo purposes)

### 📊 Analytics & Insights
- Transaction summary with visual charts
- Monthly/yearly financial reports
- Expense categorization breakdown
- Real-time Bitcoin price monitoring (EUR, USD, BRL)

### 🎨 User Experience
- Responsive design for all devices
- Modern and intuitive interface
- Loading animations with Lottie
- Modal components with accessibility features
- Dark/light theme support

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

### Frontend Architecture
```
src/
├── application/          # Application layer (use cases, services)
│   ├── hooks/           # Custom React hooks
│   └── services/        # Application services
├── domain/              # Domain layer (entities, repositories)
│   ├── entities/        # Business entities
│   ├── repositories/    # Repository interfaces
│   └── use-cases/       # Business use cases
├── infrastructure/      # Infrastructure layer (API, storage)
│   ├── api/            # API clients and repositories
│   └── storage/        # Local storage utilities
├── presentation/        # Presentation layer (UI components)
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts
│   └── pages/          # Page components
└── shared/             # Shared utilities and constants
```

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
- **Framer Motion** - Animation library
- **React Modal** - Accessible modal components
- **Lottie React** - Animation rendering

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
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

### Option 1: Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/finance-control.git
   cd finance-control
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb finance_control
   
   # Run database migrations
   psql -d finance_control -f supabase/init.sql
   ```

5. **Configure environment variables**
   
   **Frontend (.env)**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
   
   **Backend (backend/.env)**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials
   ```

6. **Start the development servers**
   
   **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend**
   ```bash
   npm start
   ```

### Option 2: Docker Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/finance-control.git
   cd finance-control
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
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
- `POST /api/auth/signup` - User registration
- `POST /api/auth/token` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/user` - Get current user

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

- **Frontend**: React application (port 3000)
- **Backend**: Node.js API (port 3001)
- **Database**: PostgreSQL 15 (port 5432)

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/your-username/finance-control.git
cd finance-control

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development with Docker

For development with hot reload:

```bash
# Start in development mode
docker-compose -f docker-compose.yml up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Database: localhost:5432
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

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | `#FFE664` to `#FA8341` | Buttons, highlights |
| Secondary | `#F0F2F5` | Backgrounds |
| Text Primary | `#363F5F` | Main text |
| Text Secondary | `#969CB2` | Secondary text |
| Success | `#12A454` | Positive actions |
| Error | `#E52E4D` | Error states |
| Warning | `#FF872C` | Warning states |



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

### Production Build

```bash
# Build frontend
npm run build

# Build backend (if applicable)
cd backend
npm run build
```

### Environment Variables

Make sure to set the following environment variables in production:

**Frontend**
- `REACT_APP_API_URL`: Backend API URL

**Backend**
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to 'production'
- `PORT`: Server port (default: 3001)

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
- User authentication and authorization
- Transaction CRUD operations
- Real-time Bitcoin price tracking
- Responsive design
- Docker containerization
- Clean architecture implementation

### 🚧 In Progress
- Advanced analytics dashboard
- Export functionality
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

