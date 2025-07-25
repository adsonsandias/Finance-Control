# Micro Frontend Architecture Guide

## Overview

This project has been reorganized to follow a **Micro Frontend Architecture** pattern, providing better scalability, maintainability, and team independence.

## Project Structure

```
/
├── backend/                  # Backend API and services
│   ├── src/                  # Source code
│   ├── config/               # Configuration files
│   ├── migrations/           # Database migrations
│   └── Dockerfile.backend    # Backend container
├── frontend/                 # Frontend modules (micro frontends)
│   ├── auth/                 # Authentication module
│   │   ├── src/              # Auth-specific components
│   │   ├── public/           # Auth public assets
│   │   └── package.json      # Auth dependencies
│   ├── dashboard/            # Dashboard module
│   │   ├── src/              # Dashboard components
│   │   ├── public/           # Dashboard public assets
│   │   └── package.json      # Dashboard dependencies
│   └── Dockerfile.frontend   # Frontend container
├── shared/                   # Shared code between modules
│   ├── types/                # TypeScript types
│   ├── constants/            # Shared constants
│   ├── utils/                # Utility functions
│   └── lib/                  # Internal libraries
└── docker-compose.yml        # Multi-container setup
```

## Modules

### 1. Authentication Module (`frontend/auth/`)
- **Purpose**: User authentication and authorization
- **Port**: 3000
- **Features**:
  - Login/Signup pages
  - Password reset
  - User profile management
  - JWT token handling

### 2. Dashboard Module (`frontend/dashboard/`)
- **Purpose**: Main application dashboard
- **Port**: 3001
- **Features**:
  - Financial overview
  - Transaction management
  - Analytics and reports
  - Budget tracking

### 3. Shared Module (`shared/`)
- **Purpose**: Common code shared between modules
- **Contents**:
  - TypeScript types and interfaces
  - Utility functions
  - Constants and configuration
  - Dependency injection container

## Benefits

### 🚀 Independent Development
- Each module can be developed by different teams
- Different release cycles for each module
- Technology stack flexibility per module

### 🔧 Scalability
- Horizontal scaling of individual modules
- Better resource allocation
- Easier performance optimization

### 🛡️ Isolation
- Reduced coupling between features
- Fault isolation (one module failure doesn't affect others)
- Independent testing and deployment

### 👥 Team Organization
- Clear ownership boundaries
- Parallel development workflows
- Reduced merge conflicts

## Development Workflow

### Starting Development

```bash
# Install all dependencies
npm install

# Start all modules
npm run dev

# Or start individual modules
npm run dev:auth      # Auth module only
npm run dev:dashboard # Dashboard module only
npm run dev:backend   # Backend only
```

### Working on Specific Modules

```bash
# Work on authentication
cd frontend/auth
npm run dev

# Work on dashboard
cd frontend/dashboard
npm run dev

# Work on shared components
cd shared
npm run build
```

### Docker Development

```bash
# Start specific services
docker-compose up frontend-auth backend db
docker-compose up frontend-dashboard backend db

# Start all services
docker-compose up -d
```

## Module Communication

### Shared State
- Use the `shared` module for common types and utilities
- Implement state management per module (Redux, Zustand, etc.)
- Use backend API for data synchronization

### Inter-Module Navigation
- Each module runs on different ports
- Use environment variables for module URLs
- Implement routing strategies for seamless navigation

### Data Sharing
- Backend API serves as the single source of truth
- Use shared TypeScript types for consistency
- Implement proper error handling and loading states

## Security Considerations

### Environment Variables
- Each module has its own `.env` file
- Sensitive data is git-ignored
- Use `.env.example` files as templates

### Authentication
- JWT tokens are managed by the auth module
- Shared authentication state across modules
- Secure token storage and transmission

### CORS Configuration
- Backend configured to accept requests from all frontend modules
- Environment-specific CORS origins
- Proper security headers implementation

## Deployment Strategies

### Independent Deployment
- Each module can be deployed separately
- Use container orchestration (Docker Compose, Kubernetes)
- Implement proper health checks and monitoring

### CI/CD Pipeline
- Separate pipelines for each module
- Shared pipeline for common dependencies
- Automated testing and deployment

## Migration Notes

### From Monolithic Frontend
1. **Code Organization**: Moved from single `src/` to module-specific directories
2. **Dependencies**: Split dependencies between modules and shared
3. **Configuration**: Separate configuration per module
4. **Docker**: Updated to support multiple frontend services
5. **Development**: New scripts for module-specific development

### Import Updates
- Shared code now imported from `@shared/*` alias
- Module-specific imports remain relative
- Updated TypeScript configuration for path resolution

## Best Practices

### 📁 File Organization
- Keep module-specific code within module boundaries
- Use shared module for truly common functionality
- Maintain consistent folder structure across modules

### 🔄 Dependency Management
- Use workspace dependencies for shared packages
- Keep module dependencies minimal and focused
- Regular dependency updates and security audits

### 🧪 Testing
- Unit tests within each module
- Integration tests for module interactions
- End-to-end tests for complete user workflows

### 📝 Documentation
- Document module-specific features and APIs
- Maintain shared documentation for common patterns
- Keep architecture decisions recorded

## Future Enhancements

- **Module Federation**: Implement webpack module federation for runtime module loading
- **Micro Services**: Split backend into microservices aligned with frontend modules
- **State Management**: Implement cross-module state synchronization
- **Performance**: Add module-specific performance monitoring
- **Testing**: Implement comprehensive testing strategies for micro frontends