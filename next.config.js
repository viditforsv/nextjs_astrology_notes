const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
})

module.exports = withNextra({
  // Exclude backup folders from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/backup_*/**',
        '**/pages_backup*/**',
        '**/.next/**',
      ],
    }
    return config
  },
})

