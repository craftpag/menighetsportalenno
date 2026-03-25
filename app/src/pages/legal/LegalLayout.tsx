import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useDocumentTitle } from '@/hooks/use-document-title';

const legalNav = [
  { label: 'Kjøpsvilkår', href: '/vilkar' },
  { label: 'Personvern', href: '/personvern' },
  { label: 'Informasjonskapsler', href: '/informasjonskapsler' },
  { label: 'Angrerett og retur', href: '/angrerett' },
  { label: 'Donasjonsvilkår', href: '/donasjonsvilkar' },
  { label: 'Bruksvilkår', href: '/bruksvilkar' },
];

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
  currentPath: string;
}

export function LegalLayout({ title, lastUpdated, children, currentPath }: LegalLayoutProps) {
  useDocumentTitle(title);

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] font-serif mb-4">
              {title}
            </h1>
            <p className="text-[#4A4A4A]">Sist oppdatert: {lastUpdated}</p>
          </motion.div>

          {/* Nav */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {legalNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                  currentPath === item.href
                    ? 'bg-[#2D5A4A] text-white'
                    : 'bg-white text-[#4A4A4A] hover:bg-[#2D5A4A]/10 border border-[#E5E2DD]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl prose prose-lg prose-headings:font-serif prose-headings:text-[#1A1A1A] prose-p:text-[#4A4A4A] prose-li:text-[#4A4A4A] prose-a:text-[#2D5A4A] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1A1A1A] prose-table:text-sm"
          >
            {children}
          </motion.div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="py-8 bg-[#FAF9F7] border-t border-[#E5E2DD]">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors ${
                  currentPath === item.href
                    ? 'text-[#1A1A1A] font-medium'
                    : 'text-[#4A4A4A] hover:text-[#2D5A4A]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-[#4A4A4A] mt-4">
            © 2026 Menighetsportalen · Gaulin Gruppen, org.nr. 928 584 542
          </p>
        </div>
      </section>
    </div>
  );
}
