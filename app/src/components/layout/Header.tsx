import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Funksjoner', href: '/funksjoner' },
  { label: 'Maler', href: '/maler' },
  { label: 'Priser', href: '/priser' },
  { label: 'Kunder', href: '/kunder' },
  { label: 'Veikart', href: '/veikart' },
  { label: 'Om oss', href: '/om-oss' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#FAF9F7]/90 backdrop-blur-md border-b border-[#E5E2DD] shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group">
            <img src="/images/Menighetsportalen Logo.png" alt="Menighetsportalen" className="h-14 transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-[#2D5A4A]'
                    : 'text-[#4A4A4A] hover:text-[#2D5A4A]'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 w-full h-0.5 bg-[#2D5A4A] transform origin-left transition-transform duration-200',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="btn-primary rounded-full">
              <Link to="/registrer">Prøv gratis</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-[#1A1A1A]" aria-label="Åpne meny">
                <Menu className="w-6 h-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#FAF9F7] border-l border-[#E5E2DD] p-0">
              <SheetTitle className="sr-only">Meny</SheetTitle>
              <div className="flex flex-col h-full px-6 pt-6 pb-8">
                <div className="mb-8 pr-8">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <img src="/images/Menighetsportalen Logo.png" alt="Menighetsportalen" className="h-14" />
                  </Link>
                </div>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-base font-medium py-3 px-3 rounded-lg transition-colors',
                        isActive(item.href)
                          ? 'text-[#2D5A4A] bg-[#2D5A4A]/10'
                          : 'text-[#4A4A4A] hover:text-[#2D5A4A] hover:bg-[#2D5A4A]/5'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6">
                  <Button asChild className="w-full btn-primary">
                    <Link to="/registrer" onClick={() => setIsOpen(false)}>Prøv gratis</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
