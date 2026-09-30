// Site-wide settings shared by the app and server routes (RSS, sitemap).
export const site = {
  name: 'Michel Carlos',
  role: 'Software Engineer',
  url: 'https://micheldpcarlos.com',
  description: 'Software engineer, frontend specialist. Notes on Vue, browser extensions, and building for the web.',
  author: 'Michel Carlos',
  nav: [
    { label: 'Blog', to: '/blog' },
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
  ],
  socials: [
    { label: 'GitHub', icon: 'simple-icons:github', href: 'https://github.com/micheldpcarlos' },
    { label: 'Instagram', icon: 'simple-icons:instagram', href: 'https://www.instagram.com/micheldpcarlos/' },
  ],
  copyrightSince: 2024,
} as const
