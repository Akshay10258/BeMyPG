# BeMyPG - MERN Stack Web Application

A comprehensive web application that connects PG owners with potential tenants, simplifying the process of finding and managing paying guest accommodations.

🔗 **Live Demo**: [https://be-my-pg.vercel.app](https://be-my-pg.vercel.app)

## Overview

BeMyPG is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to streamline the process of finding and managing PG accommodations. The platform serves two distinct user types:

- **PG Seekers** - Find suitable accommodations based on location, amenities, and reviews
- **PG Owners** - List and manage their properties, handle reservations, and interact with potential tenants

## Features

### User Authentication
- Secure login/signup system with JWT authentication
- Role-based access control (Owner/User)

### For PG Seekers
- Browse PGs by city with advanced filtering options
- View detailed information about accommodations
- Real-time seat availability tracking
- Schedule visits to properties of interest
- Reserve rooms directly through the platform
- Leave ratings and reviews after stay
- View other user's reviews about the PG
- View the location of the PG on the map. (Pg address ->map)
- Track booking history and visit status
- Payment processing (dummy)

### For PG Owners
- Easy property listing with multiple image uploads
- Manage property details and availability
- Review and respond to visitor requests
- Accept or reject reservation requests
- View user reviews about their property
- Auto marking PG in the map (pg address -> coordinates using 3rd party api -> viewed on map)
### General Features
- Responsive, modern UI design that works across devices
- Real-time updates for availability and booking status
- Interactive FAQ section
- User profile management
- Location on Map - direct auto mapping of pg address.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Vercel

## Installation and Setup

1. Clone the repository
2. Install dependencies for backend and frontend
3. Set up environment variables
4. Run the application locally


---
