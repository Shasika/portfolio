# Shasika Madhushan - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, showcasing professional experience, skills, and projects. Features dark/light mode, smooth animations, and a contact form with MongoDB integration.

## ✨ Features

- **Modern Design**: Clean, professional layout with magenta accent color (#d3318f)
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive**: Mobile-first design optimized for all devices
- **Smooth Animations**: Framer Motion for elegant transitions and micro-interactions
- **Contact Form**: MongoDB integration for message storage with rate limiting
- **SEO Optimized**: Comprehensive metadata, OpenGraph, and Twitter cards
- **Performance**: Lighthouse score ≥95 for Performance/SEO/Best Practices
- **Accessibility**: WCAG AA compliant with proper focus management

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MongoDB (for contact form)
- **Theme**: next-themes for dark/light mode
- **Font**: Inter (system fallback safe)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn
- MongoDB database (Atlas or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shasika-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**

   Edit `.env.local` with your MongoDB credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DB=portfolio
   ```

   **For MongoDB Atlas:**
   - Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster
   - Get connection string from "Connect" → "Connect your application"
   - Replace `<password>` with your database user password

   **For Local MongoDB:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/
   MONGODB_DB=portfolio
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

6. **Open in Browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/          # Contact form API endpoint
│   ├── globals.css           # Global styles & CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── AboutSection.tsx     # About section with achievements
│   ├── ContactSection.tsx   # Contact form & info
│   ├── ExperienceSection.tsx # Timeline of work experience
│   ├── Footer.tsx           # Site footer
│   ├── HeroSection.tsx      # Hero section with CTAs
│   ├── Navigation.tsx       # Sticky navigation header
│   ├── ProjectsSection.tsx  # Featured projects showcase
│   ├── SkillsSection.tsx    # Skills with chip components
│   ├── ThemeProvider.tsx    # Theme context provider
│   └── ThemeToggle.tsx      # Dark/light mode toggle
├── content/
│   └── site.ts              # Site content & data
└── lib/
    └── db.ts                # MongoDB connection utility
```

## 🎨 Customization

### Content Updates

Edit `src/content/site.ts` to update:
- Personal information
- Skills and experience
- Projects and achievements
- Contact details

### Styling

The design system uses CSS variables defined in `globals.css`:

```css
:root {
  --bg: 255 255 255;        /* Background */
  --fg: 15 23 42;           /* Foreground text */
  --surface: 248 250 252;   /* Card backgrounds */
  --primary: 211 49 143;    /* Accent color (magenta) */
  --border: 226 232 240;    /* Border color */
}
```

### Dark Mode Colors

```css
.dark {
  --bg: 11 18 32;           /* Dark background */
  --fg: 229 231 235;        /* Light text */
  --surface: 15 23 42;      /* Dark card backgrounds */
  /* Primary and border remain same */
}
```

## 📧 Contact Form

The contact form includes:
- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Validation**: Client and server-side validation
- **Storage**: Messages stored in MongoDB
- **Security**: Input sanitization and length limits

### Message Schema

```javascript
{
  name: String,
  email: String,
  message: String,
  ip: String,
  userAgent: String,
  createdAt: Date,
  read: Boolean
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab/Bitbucket
   - Import project in [Vercel](https://vercel.com)

2. **Environment Variables**
   - Add `MONGODB_URI` and `MONGODB_DB` in Vercel dashboard
   - Go to Project Settings → Environment Variables

3. **Deploy**
   - Vercel will automatically build and deploy
   - Custom domain can be added in Project Settings

### Other Platforms

For other platforms, ensure you:
- Set environment variables for MongoDB
- Build command: `npm run build`
- Start command: `npm run start`
- Node.js 18+ runtime

## 🔧 Development

### Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting (configure as needed)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📞 Support

If you have any questions or need help with setup:

- **Email**: shasikamadushan555@gmail.com
- **LinkedIn**: [Shasika Madhushan](https://www.linkedin.com/in/shasika-m)

---

**Built with ❤️ using Next.js & Tailwind CSS**

*Design inspiration referenced from [portfolio.academydsj.com](https://portfolio.academydsj.com/)*
