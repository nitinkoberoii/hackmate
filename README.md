# HackMate 🚀

A comprehensive hackathon management platform that connects developers, facilitates team formation, and provides skill assessment tools for collaborative coding projects.

## ✨ Core Features

### 🏆 Hackathon Management

- **Browse & Discover**: Explore featured hackathons with advanced filtering and search
- **Team Formation**: Find teammates based on skills, experience, and availability
- **Project Collaboration**: Manage team projects with real-time communication tools

### 👥 Team Management

- **Member Management**: Add, remove, and manage team members
- **Project Details**: Track project progress and milestones
- **Team Communication**: Built-in chat and collaboration tools

### 🧠 Skill Assessment

- **Interactive Quizzes**: Test your technical skills across various domains
- **GitHub Integration**: Connect your GitHub profile for skill verification
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Skill Radar Charts**: Visual representation of your skill strengths

### 👤 User Experience

- **Personal Dashboard**: Track achievements, active hackathons, and deadlines
- **Smart Recommendations**: Get personalized hackathon and teammate suggestions
- **Achievement System**: Earn badges and track your hackathon journey
- **Notification Center**: Stay updated with real-time alerts and invitations

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Declarative routing
- **Responsive Design** - Mobile-first approach with scrollable layouts

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (via Mongoose)
- **RESTful API** - Clean API architecture

### Authentication

- **JWT + httpOnly cookies** for secure authentication and session management

## 📋 Prerequisites

- **Node.js** (v16.x or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hackmate
```

### 2. Install Dependencies

#### Frontend Dependencies

```bash
npm install
# or
yarn install
```

#### Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the backend directory with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hackmate
JWT_SECRET=replace-with-a-long-random-string
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 4. Start the Backend Server

```bash
cd backend
npm start
# or
node server.js
```

**Backend Server**: http://localhost:5000

### Auth Endpoints

```
POST   /api/auth/register   # name,email,password → set cookie
POST   /api/auth/login      # email,password → set cookie
GET    /api/auth/me         # returns current user (auth required)
POST   /api/auth/logout     # clears cookie (auth required)
```

### 5. Start the Frontend Development Server

In a new terminal:

```bash
npm run dev
# or
yarn dev
```

**Frontend Server**: http://localhost:5173

## 📁 Project Structure

```
hackmate/
├── backend/                    # Backend server
│   ├── controllers/           # API controllers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   └── server.js             # Server entry point
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   └── ...              # Feature-specific components
│   ├── pages/               # Page components
│   │   ├── hackathon-browse/    # Hackathon discovery
│   │   ├── skill-assessment-quiz/ # Skill testing
│   │   ├── team-management/      # Team collaboration
│   │   ├── teammate-finder/      # Team formation
│   │   ├── user-dashboard/       # User overview
│   │   └── user-registration/    # User onboarding
│   ├── styles/              # Global styles and Tailwind
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   └── Routes.jsx           # Application routing
├── public/                  # Static assets
├── package.json             # Frontend dependencies
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🔧 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend

```bash
cd backend
npm start            # Start production server
npm run dev          # Start development server with nodemon
```

## 🌐 API Endpoints

The backend provides RESTful APIs for:

- **Hackathons**: CRUD operations for hackathon management
- **Users**: User registration, authentication, and profiles
- **Teams**: Team creation, management, and collaboration
- **Skills**: Skill assessment and verification

## 🎨 Design System

- **Color Palette**: Primary (#C778DD), gray, dark background, white
- **Responsive Layout**: Scrollable single-page design
- **Component Architecture**: Modular, reusable components
- **Mobile-First**: Optimized for all device sizes

## 📱 Key Pages

1. **Hackathon Browse** - Discover and filter hackathons
2. **Skill Assessment Quiz** - Test your technical skills
3. **Team Management** - Collaborate with your team
4. **Teammate Finder** - Find the perfect teammates
5. **User Dashboard** - Your hackathon journey overview
6. **User Registration** - Join the platform

## 🚀 Deployment

### Frontend

```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend

```bash
cd backend
npm start
# Deploy to your preferred hosting service (Heroku, AWS, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for the hackathon community
