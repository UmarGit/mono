# Mono - Bionic Reading Editor

A minimalist text editor with bionic reading functionality. Bold the first portion of each word to improve reading speed and comprehension.

## Features

- **Bionic Reading** - Automatically bolds the first half of each word for improved reading comprehension
- **Customizable Typography** - Choose from Inter, Geist, System, Georgia, or Monospace fonts
- **Adjustable Font Size** - Range from 12px to 32px
- **Line Density Control** - Toggle between loose and dense line spacing
- **Dark/Light Mode** - Seamless theme switching
- **Auto-Save** - All text and preferences are automatically saved to browser localStorage
- **Export Functionality** - Download your text as a plain text file
- **Clean, Distraction-Free Interface** - Minimalist design with fade gradients
- **Fully Responsive** - Works great on mobile and desktop
- **Accessible** - Full ARIA label support and keyboard navigation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mono

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

This is used for metadata and SEO (Open Graph, sitemap, etc.). Defaults to `http://localhost:3000` in development.

## Project Structure

```
mono/
├── app/
│   ├── api/
│   │   └── health/          # Health check endpoint
│   ├── error.tsx            # Error boundary page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   ├── not-found.tsx        # 404 page
│   ├── page.tsx             # Main page
│   ├── robots.ts            # SEO robots configuration
│   └── sitemap.ts           # SEO sitemap
├── components/
│   └── pages/
│       ├── Editor.tsx       # Main editor component
│       └── StatusBar.tsx    # Control bar component
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Next.js Font Optimization (Geist, Geist Mono)

## Features in Detail

### Bionic Reading Algorithm

The editor transforms text in real-time by bolding the first half (rounded up) of each word. This technique has been shown to improve reading speed and focus.

### Persistent Storage

All content and user preferences (font, size, density, theme) are automatically saved to browser localStorage and restored on next visit.

### Modern Browser APIs

- Uses the Clipboard API for paste operations (no deprecated execCommand)
- Implements proper ARIA attributes for accessibility
- Includes security headers for production deployment

## API Endpoints

### Health Check

```
GET /api/health
```

Returns service status and timestamp. Useful for monitoring and uptime checks.

## Deployment

### Vercel (Recommended)

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Setup

1. Set `NEXT_PUBLIC_BASE_URL` in your deployment environment
2. Ensure Node.js 18+ is available
3. Run `npm run build` to verify production build

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Security

The app includes production-ready security headers:
- Strict Transport Security (HSTS)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME type sniffing protection)
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.
