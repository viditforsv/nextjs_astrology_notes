# Vedic Astrology Notes

A comprehensive documentation site for Vedic Astrology built with Next.js and Nextra.

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Authentication Setup

This site uses NextAuth v5 with Google OAuth authentication.

**Environment Variables:**
Create a `.env.local` file with:
```env
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_USERS=user1@example.com,user2@example.com
```

Get Google OAuth credentials from: https://console.cloud.google.com/apis/credentials

### Development

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - you'll be redirected to sign in.

### Build

To create a production build:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
.
├── pages/              # Documentation pages (MDX files)
│   ├── _meta.json     # Navigation configuration
│   ├── index.mdx      # Homepage
│   ├── fundamentals.mdx
│   ├── planets/       # Planets section
│   ├── signs/         # Signs section
│   ├── houses.mdx
│   ├── nakshatras.mdx
│   ├── yogas.mdx
│   └── dashas.mdx
├── theme.config.tsx   # Nextra theme configuration
├── next.config.js     # Next.js configuration
└── package.json
```

## Adding New Content

1. Create new `.mdx` files in the `pages/` directory
2. Update `_meta.json` to add them to navigation
3. Use standard Markdown with MDX enhancements

## Technologies Used

- **Next.js**: React framework for production
- **Nextra**: Next.js static site generator for documentation
- **NextAuth v5**: Authentication for Next.js with Google OAuth
- **TypeScript**: Type-safe JavaScript
- **MDX**: Markdown with JSX support

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `AUTH_SECRET` (generate a random secret, e.g., `openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID` (from Google Cloud Console)
   - `GOOGLE_CLIENT_SECRET` (from Google Cloud Console)
   - `ALLOWED_USERS` (comma-separated list of authorized email addresses)
5. Deploy!

## Customization

Edit `theme.config.tsx` to customize:
- Logo and branding
- Navigation
- Footer
- SEO settings
- Color scheme

## License

This is a personal documentation project.

