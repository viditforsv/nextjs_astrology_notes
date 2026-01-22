import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '📿 Vedic Astrology Notes',
  tagline: 'Comprehensive notes on Vedic Astrology',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://astrology.viditaggarwal.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',
  
  // GitHub pages deployment config.
  organizationName: 'viditvia',
  projectName: 'nextjs_astrology_notes',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          include: ['**/*.mdx'],
          exclude: ['**/*.md', '**/Astrology/**'],
          sidebarCollapsed: true,
          remarkPlugins: [
            [require('remark-math'), {}],
          ],
          rehypePlugins: [
            [require('rehype-katex'), {}],
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function(context, options) {
      return {
        name: 'sidebar-collapse-plugin',
        injectHtmlTags() {
          return {
            headTags: [],
            postBodyTags: [
              {
                tagName: 'script',
                innerHTML: `
                  (function() {
                    window.collapseAllSidebar = function() {
                      const items = document.querySelectorAll('.menu__list-item--collapsible:not(.menu__list-item--collapsed)');
                      console.log('Collapsing', items.length, 'items');
                      items.forEach((item) => {
                        const btn = item.querySelector('.menu__link--sublist');
                        if (btn) {
                          btn.click();
                        }
                      });
                    };
                    
                    window.expandAllSidebar = function() {
                      const items = document.querySelectorAll('.menu__list-item--collapsible.menu__list-item--collapsed');
                      console.log('Expanding', items.length, 'items');
                      items.forEach((item) => {
                        const btn = item.querySelector('.menu__link--sublist');
                        if (btn) {
                          btn.click();
                        }
                      });
                    };
                    
                    function injectCollapseControls() {
                      const menu = document.querySelector('.theme-doc-sidebar-menu');
                      
                      if (menu && !document.getElementById('sidebar-collapse-controls')) {
                        const controlsContainer = document.createElement('div');
                        controlsContainer.id = 'sidebar-collapse-controls';
                        controlsContainer.className = 'sidebar-collapse-controls';
                        
                        const collapseBtn = document.createElement('button');
                        collapseBtn.className = 'sidebar-collapse-btn';
                        collapseBtn.textContent = 'Collapse All';
                        collapseBtn.type = 'button';
                        collapseBtn.onclick = function(e) {
                          e.preventDefault();
                          e.stopPropagation();
                          window.collapseAllSidebar();
                        };
                        
                        const expandBtn = document.createElement('button');
                        expandBtn.className = 'sidebar-collapse-btn';
                        expandBtn.textContent = 'Expand All';
                        expandBtn.type = 'button';
                        expandBtn.onclick = function(e) {
                          e.preventDefault();
                          e.stopPropagation();
                          window.expandAllSidebar();
                        };
                        
                        controlsContainer.appendChild(collapseBtn);
                        controlsContainer.appendChild(expandBtn);
                        menu.parentNode.insertBefore(controlsContainer, menu);
                        console.log('Sidebar controls injected');
                      }
                    }
                    
                    function init() {
                      // Wait for sidebar to be ready
                      let attempts = 0;
                      const maxAttempts = 50;
                      const checkSidebar = setInterval(() => {
                        attempts++;
                        const menu = document.querySelector('.theme-doc-sidebar-menu');
                        const collapsibleItems = menu ? menu.querySelectorAll('.menu__list-item--collapsible') : [];
                        if (menu && collapsibleItems.length > 0) {
                          clearInterval(checkSidebar);
                          injectCollapseControls();
                        } else if (attempts >= maxAttempts) {
                          clearInterval(checkSidebar);
                          console.warn('Sidebar not found after', maxAttempts, 'attempts');
                        }
                      }, 100);
                    }
                    
                    // Try multiple initialization strategies
                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', init);
                    } else {
                      init();
                    }
                    
                    window.addEventListener('load', function() {
                      setTimeout(init, 100);
                    });
                    
                    // Watch for navigation changes (SPA routing)
                    const observer = new MutationObserver(() => {
                      if (!document.getElementById('sidebar-collapse-controls')) {
                        const menu = document.querySelector('.theme-doc-sidebar-menu');
                        if (menu && menu.querySelectorAll('.menu__list-item--collapsible').length > 0) {
                          setTimeout(injectCollapseControls, 300);
                        }
                      }
                    });
                    observer.observe(document.body, { childList: true, subtree: true });
                  })();
                `,
              },
            ],
          };
        },
      };
    },
    function(context, options) {
      return {
        name: 'process-polyfill-plugin',
        configureWebpack(config, isServer, utils) {
          if (!isServer) {
            const webpack = require('webpack');
            return {
              resolve: {
                fallback: {
                  process: require.resolve('process/browser'),
                },
              },
              plugins: [
                new webpack.ProvidePlugin({
                  process: 'process/browser',
                }),
              ],
            };
          }
          return {};
        },
      };
    },
  ],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap',
      type: 'text/css',
    },
  ],

  themeConfig: {
    navbar: {
      title: '📿 Vedic Astrology Notes',
      items: [
        {
          type: 'doc',
          docId: 'index',
          label: 'Home',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Core',
          position: 'left',
          items: [
            { type: 'doc', docId: 'grahas/index', label: 'Grahas (Planets)' },
            { type: 'doc', docId: 'rashis/index', label: 'Rashis (Signs)' },
            { type: 'doc', docId: 'bhavas/index', label: 'Bhavas (Houses)' },
            { type: 'doc', docId: 'nakshatras/index', label: 'Nakshatras' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Planets in Rashis',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'planets-in-rashis/sun-in-rashis/index',
              label: 'Sun',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/moon-in-rashis/index',
              label: 'Moon',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/mars-in-rashis/index',
              label: 'Mars',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/mercury-in-rashis/index',
              label: 'Mercury',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/jupiter-in-rashis/index',
              label: 'Jupiter',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/venus-in-rashis/index',
              label: 'Venus',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/saturn-in-rashis/index',
              label: 'Saturn',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/rahu-in-rashis/index',
              label: 'Rahu',
            },
            {
              type: 'doc',
              docId: 'planets-in-rashis/ketu-in-rashis/index',
              label: 'Ketu',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Nakshatras',
          position: 'left',
          items: [
            { type: 'doc', docId: 'nakshatras/index', label: 'Overview' },
            { type: 'doc', docId: 'nakshatras/find-my-nakshatra', label: 'Find My Nakshatra' },
            { type: 'doc', docId: 'nakshatras/ashwini', label: 'Ashwini' },
            { type: 'doc', docId: 'nakshatras/bharani', label: 'Bharani' },
            { type: 'doc', docId: 'nakshatras/krittika', label: 'Krittika' },
            { type: 'doc', docId: 'nakshatras/rohini', label: 'Rohini' },
            { type: 'doc', docId: 'nakshatras/mrigashira', label: 'Mrigashira' },
            { type: 'doc', docId: 'nakshatras/ardra', label: 'Ardra' },
            { type: 'doc', docId: 'nakshatras/punarvasu', label: 'Punarvasu' },
            { type: 'doc', docId: 'nakshatras/pushya', label: 'Pushya' },
            { type: 'doc', docId: 'nakshatras/ashlesha', label: 'Ashlesha' },
            { type: 'doc', docId: 'nakshatras/magha', label: 'Magha' },
            { type: 'doc', docId: 'nakshatras/purva-phalguni', label: 'Purva Phalguni' },
            { type: 'doc', docId: 'nakshatras/uttara-phalguni', label: 'Uttara Phalguni' },
            { type: 'doc', docId: 'nakshatras/hasta', label: 'Hasta' },
            { type: 'doc', docId: 'nakshatras/chitra', label: 'Chitra' },
            { type: 'doc', docId: 'nakshatras/swati', label: 'Swati' },
            { type: 'doc', docId: 'nakshatras/vishakha', label: 'Vishakha' },
            { type: 'doc', docId: 'nakshatras/anuradha', label: 'Anuradha' },
            { type: 'doc', docId: 'nakshatras/jyeshtha', label: 'Jyeshtha' },
            { type: 'doc', docId: 'nakshatras/mula', label: 'Mula' },
            { type: 'doc', docId: 'nakshatras/purva-ashadha', label: 'Purva Ashadha' },
            { type: 'doc', docId: 'nakshatras/uttara-ashadha', label: 'Uttara Ashadha' },
            { type: 'doc', docId: 'nakshatras/shravana', label: 'Shravana' },
            { type: 'doc', docId: 'nakshatras/dhanishtha', label: 'Dhanishtha' },
            { type: 'doc', docId: 'nakshatras/shatabhisha', label: 'Shatabhisha' },
            { type: 'doc', docId: 'nakshatras/purva-bhadrapada', label: 'Purva Bhadrapada' },
            { type: 'doc', docId: 'nakshatras/uttara-bhadrapada', label: 'Uttara Bhadrapada' },
            { type: 'doc', docId: 'nakshatras/revati', label: 'Revati' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Analysis',
          position: 'left',
          items: [
            { type: 'doc', docId: 'yogas/index', label: 'Yogas' },
            { type: 'doc', docId: 'dashas/index', label: 'Dashas' },
            { type: 'doc', docId: 'conjunctions', label: 'Conjunctions' },
            { type: 'doc', docId: 'domain-specific-astrology/index', label: 'Domain-Specific' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Reference',
          position: 'left',
          items: [
            { type: 'doc', docId: 'wiki/index', label: 'Wiki' },
            { type: 'doc', docId: 'BPHS/index', label: 'BPHS' },
            { type: 'doc', docId: 'mantras/index', label: 'Mantras' },
            { type: 'doc', docId: 'chanting/index', label: 'Chanting' },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Browse All',
        },
        {
          type: 'html',
          position: 'right',
          value: '<div id="auth-button-placeholder"></div>',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Vedic Astrology Documentation.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
