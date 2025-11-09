# Vedic Astrology Notes

A comprehensive documentation site for Vedic Astrology built with Next.js and Nextra.

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Authentication Setup

This site uses NextAuth with simple credential-based authentication.

**Default Login:**
- Username: `admin`
- Password: `admin123`

You can change these in `.env.local`:
```env
AUTH_USERNAME=your-username
AUTH_PASSWORD=your-password
```

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
- **TypeScript**: Type-safe JavaScript
- **MDX**: Markdown with JSX support

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `NEXTAUTH_SECRET` (copy from `.env.local`)
   - `AUTH_USERNAME` (your username)
   - `AUTH_PASSWORD` (your password)
4. Deploy!

## Customization

Edit `theme.config.tsx` to customize:
- Logo and branding
- Navigation
- Footer
- SEO settings
- Color scheme

## License

This is a personal documentation project.

