# 🌿 Hedge Gardening And Van Services - Professional Landscaping Services Website

A modern, full-featured landscaping business website built with Next.js 15, featuring dynamic content management, testimonial system, Instagram integration, and an admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38bdf8)

## ✨ Features

### Public Features

- **🏠 Home Page** - Hero section with animated banner and call-to-action buttons
- **👥 About Section** - "Who We Are" with animated image galleries
- **🛠️ Services Showcase** - Interactive service cards with hover effects and animations
- **🎨 Portfolio Gallery** - Filterable work portfolio with category navigation
- **⭐ Testimonials** - Dynamic testimonial slider with auto-play functionality
- **📸 Instagram Feed** - Live Instagram post integration
- **📞 Contact Page** - Contact information with embedded Google Maps
- **📱 Responsive Design** - Fully responsive across all devices
- **🎭 Animations** - Smooth Framer Motion animations throughout

### Admin Features

- **🔐 Secure Authentication** - JWT-based admin login system
- **📊 Admin Dashboard** - Comprehensive testimonial management
- **✅ Testimonial Approval** - Review and approve customer testimonials
- **🗑️ Content Management** - Delete inappropriate testimonials
- **🔍 Filtering System** - Filter by all, approved, or pending testimonials
- **📄 Pagination** - Efficient data display with pagination
- **🔔 Toast Notifications** - Real-time feedback for admin actions

## 🚀 Tech Stack

### Frontend

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe development
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.545.0** - Icon library

### Backend & Database

- **TypeORM 0.3.27** - ORM for database management
- **MySQL2 3.15.2** - Database driver
- **JWT (jsonwebtoken 9.0.2)** - Authentication

### Additional Libraries

- **React Hot Toast 2.6.0** - Toast notifications
- **Reflect Metadata 0.2.2** - TypeORM metadata support

## 📁 Project Structure

```
landscaper/
├── app/
│   ├── (public-pages)/          # Public routes
│   │   ├── about/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── home/
│   │   ├── services/
│   │   └── testimonials/
│   ├── admin/                   # Admin routes
│   │   ├── login/
│   │   └── page.tsx            # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication
│   │   ├── instagram/          # Instagram feed
│   │   └── testimonials/       # Testimonial CRUD
│   ├── layout.tsx
│   └── page.tsx                # Home page
├── components/                  # Reusable components
│   ├── Footer.tsx
│   ├── InstagramFeed.tsx
│   ├── Navbar.tsx
│   ├── TestimonialForm.tsx
│   └── WhoAreWe.tsx
├── section/                     # Page sections
│   ├── Footer.tsx
│   ├── service.tsx
│   ├── Testimonial.tsx
│   ├── WhyChooseUs.tsx
│   └── WorkPortfolio.tsx
├── lib/
│   ├── db.ts                   # Database configuration
│   └── entities/
│       └── Testimonial.ts      # Testimonial entity
├── types/                       # TypeScript types
├── public/                      # Static assets
└── middleware.ts               # Auth middleware
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MySQL database
- Instagram Business Account (optional, for Instagram feed)

### 1. Clone the Repository

```bash
git clone https://gitlab.com/pradeepmoktan765/landscaping.git
cd landscaper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=landscaper_db

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Credentials
ADMIN_USER=admin
ADMIN_PASS=your_secure_password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Instagram API (Optional)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_USER_ID=your_instagram_user_id
```

### 4. Database Setup

The application uses TypeORM with automatic synchronization. The database tables will be created automatically when you first run the application.

**Important:** Make sure your MySQL database exists:

```sql
CREATE DATABASE landscaper_db;
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

### 6. Build for Production

```bash
npm run build
npm start
```

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Use credentials from your `.env.local` file:
   - Username: Value of `ADMIN_USERNAME`
   - Password: Value of `ADMIN_PASSWORD`
3. Access the admin dashboard at `/admin`

## 📝 API Endpoints

### Testimonials

- `GET /api/testimonials` - Get all approved testimonials
- `GET /api/testimonials/all` - Get all testimonials (admin)
- `GET /api/testimonials/all?approved=true` - Get approved testimonials
- `POST /api/testimonials` - Submit new testimonial
- `PATCH /api/testimonials` - Approve testimonial (admin)
- `DELETE /api/testimonials/[id]` - Delete testimonial (admin)

### Authentication

- `POST /api/auth` - Admin login
- `GET /api/auth` - Check authentication status

### Instagram

- `GET /api/instagram` - Fetch Instagram posts

## 🎨 Key Features Implementation

### Testimonial System

- Public submission form
- Admin approval workflow
- Auto-rotating testimonial slider
- Star ratings display
- Timestamp tracking

### Admin Dashboard

- Secure JWT authentication
- Filter testimonials by status
- Paginated table view
- Approve/delete actions
- Real-time toast notifications
- Responsive design

### Animations

- Framer Motion for smooth transitions
- Scroll-triggered animations
- Hover effects on cards
- Page transitions

## 🔧 Configuration

### Database Configuration

Edit `lib/db.ts` to modify database settings.

### Styling

Tailwind configuration is in `tailwind.config.ts`.

### Middleware

Authentication middleware is in `middleware.ts`.

## 📦 Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🚀 Deploying to cPanel

This project can be deployed to cPanel hosting with Node.js support. See the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

### Quick Deploy Steps

1. **Build the deployment package:**
   ```bash
   ./build-deploy.sh
   ```

2. **Upload `landscaper-deploy.zip` to cPanel**

3. **Setup database in cPanel MySQL Databases**

4. **Create `.env.production` with your database credentials**

5. **Setup Node.js app in cPanel**

6. **Install dependencies and start:**
   ```bash
   npm install --production
   node server.js
   ```

For detailed step-by-step instructions, troubleshooting, and maintenance tips, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Ensure your hosting platform supports:

- Node.js 18+
- MySQL database
- Environment variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Developed by [MarichiTech AI](https://www.marichitechai.com/)

## 📞 Support

For support, please contact the development team.

---

**Note:** Remember to keep your `.env.local` file secure and never commit it to version control.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
