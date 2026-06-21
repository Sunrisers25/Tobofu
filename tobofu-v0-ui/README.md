# Tobofu - Premium AI-Powered Matrimonial Platform

A stunning, modern matrimonial platform built with Next.js, React, Tailwind CSS, and Framer Motion. Featuring beautiful UI/UX with glassmorphism, smooth animations, and a Tinder-style swipe interface.

## Features

- **Landing Page**: Hero section with features, testimonials, and success stories
- **Authentication**: Beautiful login and registration pages with form validation
- **Discover/Swipe Interface**: Tinder-style card swiping with compatibility scores
- **Matches Grid**: Beautiful grid view of all matches with detailed profiles
- **Messaging**: Real-time chat interface with conversation management
- **Dashboard**: Activity overview with stats and recent notifications
- **Responsive Design**: Mobile-first approach, works on all devices
- **Animations**: Smooth Framer Motion transitions and micro-interactions
- **Premium Design System**: Rose gold, deep plum, and coral pink color scheme

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Package Manager**: pnpm

## Project Structure

```
app/
├── (auth)/                    # Authentication routes
│   ├── login/page.tsx
│   └── register/page.tsx
├── (app)/                     # App routes (dashboard)
│   ├── discover/page.tsx      # Swipe interface
│   ├── matches/page.tsx       # Matches grid
│   ├── messages/page.tsx      # Messaging
│   └── dashboard/page.tsx     # Dashboard
├── globals.css               # Design tokens and utilities
└── page.tsx                  # Landing page

components/
├── sections/                  # Landing page sections
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── TestimonialSection.tsx
│   ├── SuccessStoriesSection.tsx
│   └── CTASection.tsx
├── common/                    # Shared components
│   ├── Navbar.tsx
│   └── Footer.tsx

lib/
├── animations.ts             # Framer Motion variants
├── types.ts                  # TypeScript interfaces
├── sampleData.ts            # Mock data for UI
└── utils.ts                 # Utility functions
```

## Pages Included

### Landing Page
- Hero section with call-to-action
- Features showcase
- Testimonials carousel
- Success stories gallery
- Footer with links

### Authentication
- Login page with email/password and Google Sign-In
- Registration page with validation
- Responsive design with smooth animations

### App Pages
- **Discover**: Tinder-style swipe cards with compatibility scoring
- **Matches**: Grid view of matched profiles
- **Messages**: Chat interface with conversation list
- **Dashboard**: Stats, activity feed, profile completion

## Color Scheme

- **Primary**: Rose Gold (#D4A574) - Premium, romantic
- **Secondary**: Deep Plum (#4A3F5C) - Sophisticated
- **Accent**: Coral Pink (#FF6B6B) - Energy and matches
- **Background**: Off-white (#FAF9F7) - Light theme
- **Dark Background**: Deep Navy (#1A1A2E) - Dark theme

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## Key Components

### HeroSection
Large, engaging hero with statistics and CTAs with smooth animations.

### ProfileCard
Beautiful profile cards with gradient overlays, compatibility badges, and tags.

### SwipeInterface
Tinder-style swipe functionality with smooth animations and direction-based card exits.

### ChatInterface
Responsive messaging UI with conversation list and message bubbles.

### Dashboard
Activity overview with stats cards, profile completion meter, and notification feed.

## Animations

- Page transitions with Framer Motion
- Smooth card hover effects with elevation
- Swipe card animations with direction handling
- Staggered container animations
- Loading skeleton with shimmer effect
- Typing indicator animation

## Customization

All colors are defined as CSS custom properties in `globals.css`. You can customize:
- Color scheme
- Border radius
- Shadows (premium-shadow, premium-shadow-lg)
- Animations and transitions

## Design Inspiration

This project follows premium SaaS design principles with:
- Glassmorphism effects
- Soft shadows and gradients
- Smooth micro-interactions
- Clear visual hierarchy
- Accessible color contrasts
- Mobile-first responsive design

## Notes

- This is a frontend-only implementation
- All data uses sample/mock data from `lib/sampleData.ts`
- Backend integration can be added by modifying API calls
- Authentication is UI-only and requires backend implementation
- Messages are simulated with local state

## Future Enhancements

- Backend API integration
- Real-time messaging with WebSockets
- User authentication and session management
- Database persistence
- Profile setup wizard
- Photo upload functionality
- Advanced filters and search
- Notifications system
- Dark mode toggle

---

Built with love for modern matrimonial connections. Open source and ready for customization!
