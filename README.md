# Blog Platform Frontend

A modern blog platform built with Next.js 14 that allows users to create, view and filter blog posts. Features a clean UI with authentication and responsive design.

## Features

- User Authentication (JWT with cookie-based sessions)
- Create and view blog posts
- Filter posts by author
- Responsive design
- Protected routes
- Modern UI with dark theme

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running
  ([Blog Platform API](https://github.com/HrithikKeshri10/blog-backend))

## Setup Instructions

1. Clone the repository:

```
git clone https://github.com/HrithikKeshri10/blog-frontend
cd blog-frontend
```

2. Install dependencies:

```
npm install
```

3. Create a .env.local file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3200
```

4. Start the application:

```
npm run dev
```

## Development Choices

### Authentication Strategy

JWT stored in HTTP-only cookies
Protected routes
Auth state management
Auto-redirect for authenticated routes

### User Interface

Clean, modern design
Responsive layout
Interactive components

### State Management

React hooks for local state
Auth state in components
Form handling
Error management

### Code Organization

Next.js app directory structure
Reusable components
Consistent styling with Tailwind
Clean separation of concerns

## Available Commands

- `npm install`: Install dependencies
- `npm run dev`: Start development server

## API Integration
The frontend integrates with these API endpoints:
### Authentication

POST /api/auth/signup: Register new user
POST /api/auth/login: User login
POST /api/auth/logout: User logout

### Posts

GET /api/posts: Get all posts
POST /api/post: Create new post
GET /api/posts?author=authorId: Filter posts by author

### Authentication Flow

User submits login credentials
Backend validates and sets JWT cookie
Frontend redirects to dashboard
Protected routes check for valid token
Logout clears cookie and redirects to home
