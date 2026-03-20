import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[#2D5A4A] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Hopp til hovedinnhold
      </a>
      <Header />
      <main id="main" className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
