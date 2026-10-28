import { Outlet, Link, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import appCss from '../styles.css?url';
import { Button } from '@/components/ui/button';
export const Route = createRootRoute({
  head: () => ({ meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }], links: [{ rel: 'stylesheet', href: appCss }, { rel: 'icon', type: 'image/png', href: '/favicon.png' }, { rel: 'preconnect', href: 'https://fonts.googleapis.com' }, { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Great+Vibes&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap' }] }),
  shellComponent: ({ children }: { children: ReactNode }) => <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>,
  component: () => <Outlet />,
  notFoundComponent: () => <main className="mx-auto max-w-4xl px-5 py-32 text-center"><h1 className="text-6xl">Page not found</h1><Button asChild className="mt-8"><Link to="/">Return home</Link></Button></main>,
});
