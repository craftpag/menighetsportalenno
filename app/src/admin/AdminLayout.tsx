import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Users,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminLogin } from './AdminLogin';
import { isAdminAuthenticated, adminLogout, getStats } from './adminStore';

const navItems = [
  { label: 'Oversikt', href: '/admin', icon: LayoutDashboard },
  { label: 'Foresporsler', href: '/admin/foresposler', icon: Inbox },
  { label: 'Kunder', href: '/admin/kunder', icon: Users },
  { label: 'Innhold', href: '/admin/innhold', icon: FileText },
];

export function AdminLayout() {
  const [isAuth, setIsAuth] = useState(isAdminAuthenticated());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalNye, setTotalNye] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (!isAuth) return;
    (async () => {
      try {
        const stats = await getStats();
        setTotalNye(stats.nyeForesposler + stats.nyeMeldinger + stats.nyeForslag);
      } catch {
        // Ignorer feil ved statistikk-henting
      }
    })();
  }, [isAuth, location.pathname]);

  if (!isAuth) {
    return <AdminLogin onLogin={() => setIsAuth(true)} />;
  }

  const handleLogout = () => {
    adminLogout();
    setIsAuth(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F3F0] flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1A1A1A] text-white fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-serif text-lg font-semibold">Menighetsportalen</h1>
          <p className="text-xs text-white/50 mt-0.5">Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.href);
            const badge =
              item.href === '/admin/foresposler' && totalNye > 0 ? totalNye : null;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
                {badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Til nettsiden
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Logg ut
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — mobile */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] text-white transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-lg font-semibold">Menighetsportalen</h1>
            <p className="text-xs text-white/50 mt-0.5">Admin</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-white/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-[#E5E2DD] px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <span className="font-serif font-semibold text-[#1A1A1A]">Admin</span>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
