import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Funksjoner', href: '/funksjoner' },
    { label: 'Maler', href: '/maler' },
    { label: 'Priser', href: '/priser' },
    { label: 'Veikart', href: '/veikart' },
  ],
  company: [
    { label: 'Om oss', href: '/om-oss' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Kjøpsvilkår', href: '/vilkar' },
    { label: 'Personvern', href: '/personvern' },
    { label: 'Informasjonskapsler', href: '/informasjonskapsler' },
    { label: 'Angrerett og retur', href: '/angrerett' },
    { label: 'Donasjonsvilkår', href: '/donasjonsvilkar' },
    { label: 'Bruksvilkår', href: '/bruksvilkar' },
  ],
  resources: [
    { label: 'Hjelpesenter', href: '/hjelp' },
    { label: 'Status', href: '/status' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#A0A0A0]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src="/images/Menighetsportalen Logo Hvitt.png" alt="Menighetsportalen" className="h-14" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Komplett nettsideløsning for norske menigheter. Bygget med hjerte for 
              menighetsarbeid og fokus på brukervennlighet.
            </p>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Org.nr.: 928 584 542
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hei@menighetsportalen.no" className="hover:text-white transition-colors">
                  hei@menighetsportalen.no
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+4745101331" className="hover:text-white transition-colors">
                  +47 451 01 331
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Gaulinveien 24, 1747 Skjeberg</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Produkt</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Selskap</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Ressurser</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Juridisk</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 Menighetsportalen - Alle rettigheter forbeholdt
          </p>
          <a href="https://www.designblokk.no/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            Tjenesten er levert av
            <img src="/images/Designblokk-Hvit-SVG.svg" alt="Designblokk" className="h-4 inline-block" />
          </a>
        </div>
      </div>
    </footer>
  );
}
