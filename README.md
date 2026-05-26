# Next.js Portfolio Website

This is a personal portfolio website built with **Next.js**, showcasing my skills, projects, blogs, and contact information. The site includes dynamic project pages with **Incremental Static Regeneration (ISR)**, a custom blog section, and a custom authentication system using **JWT**. The frontend communicates with a **separate backend API** built with Node.js, Express, and MongoDB (via Mongoose).

---

## Features

- **About Me:** Showcase personal information and skills.
- **Skills:** Display all technical skills with icons and descriptions.
- **Projects:** Dynamic project pages using ISR for up-to-date content.
- **Blog:** Dynamic blog section with the latest articles.
- **Contact:** A contact form to reach out directly.
- **Custom Authentication:** Login using credentials with **JWT**, without NextAuth.
- **Custom Fetch Function:** Simplifies API requests across the frontend.
- **UI Libraries:** Built with **shadcn/ui** components and **Magic UI** for enhanced styling.
- **Responsive Design:** Works seamlessly on mobile, tablet, and desktop.

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui, Magic UI
- **Backend:** Node.js, Express (separate repository)
- **Database:** MongoDB with **Mongoose**
- **Authentication:** JWT-based credentials authentication
- **Other Libraries:** `react-hook-form`, `lucide-react`, etc.

---

## Installation (Frontend)

Follow these steps to run the frontend locally:

1. **Clone the frontend repository:**

```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Create a .env file in the root directory and add your environment variables:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000  # URL of your backend API
Run the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open http://localhost:3000 with your browser to see the result.

Usage
Custom Fetch Function:
Use the centralized fetch function to make API calls easily:

ts
Copy code
import { fetchWithTag } from '@/utils/fetch';

const data = await fetchWithTag('/projects', { method: 'GET' });
Authentication:
Login using credentials. JWT tokens from the backend are stored securely for session management.

Dynamic ISR Projects:
Project pages are generated dynamically with Incremental Static Regeneration, allowing content to stay updated without a full rebuild.

Backend Setup
The backend is hosted separately and uses:

Node.js, Express

MongoDB with Mongoose

JWT for authentication

You need to clone and run the backend separately if you want to test locally. The frontend communicates with it via the API URL defined in .env.

Folder Structure (Frontend)
php
Copy code
├─ components/      # Reusable UI components (shadcn/ui & Magic UI)
├─ pages/           # Next.js pages
│  ├─ projects/     # Dynamic project pages (ISR)
│  ├─ blog/         # Dynamic blog pages
│  └─ api/          # API routes (frontend utilities only)
├─ utils/           # Custom fetch, helpers
├─ styles/          # Tailwind CSS & global styles
└─ public/          # Static assets
Deployment
This frontend can be deployed on Vercel. Connect your GitHub repository, and make sure the NEXT_PUBLIC_API_URL points to your deployed backend API.