# Vedic Astrology Notes

A comprehensive documentation site for Vedic Astrology built with Next.js and Nextra.

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Authentication Setup

This site uses NextAuth with Vercel KV for session storage and credential-based authentication.

**Default Login:**
- Username: `admin`
- Password: `admin123`

You can change these in `.env.local`:
```env
AUTH_USERNAME=your-username
AUTH_PASSWORD=your-password
NEXTAUTH_SECRET=your-secret-key-here
```

**For Vercel KV (Production):**
Add these environment variables in Vercel:
- `KV_REST_API_URL` - Your Vercel KV REST API URL
- `KV_REST_API_TOKEN` - Your Vercel KV REST API token

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
- **NextAuth**: Authentication for Next.js
- **Vercel KV**: Redis-based session storage
- **TypeScript**: Type-safe JavaScript
- **MDX**: Markdown with JSX support

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Create a Vercel KV database in your Vercel project dashboard
4. Add environment variables in Vercel project settings:
   - `NEXTAUTH_SECRET` (generate a random secret, e.g., `openssl rand -base64 32`)
   - `AUTH_USERNAME` (your username)
   - `AUTH_PASSWORD` (your password)
   - `KV_REST_API_URL` (automatically added when you create KV database)
   - `KV_REST_API_TOKEN` (automatically added when you create KV database)
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

