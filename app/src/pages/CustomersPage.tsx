import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { getPublicCustomers } from '@/admin/adminStore';
import type { Customer } from '@/admin/adminStore';
import { useDocumentTitle } from '@/hooks/use-document-title';

// Placeholder customer data (brukes som fallback hvis ingen admin-kunder finnes)
const defaultCustomers = [
  {
    id: '1',
    name: 'Bergen Frikirke',
    location: 'Bergen',
    template: 'Lyset',
    quote: 'En fantastisk løsning som har forenklet hverdagen vår betraktelig.',
    image: '/images/white-church-valley.jpg',
    since: '2026',
    website: '#',
    visible: 1,
  },
  {
    id: '2',
    name: 'Sarpsborg Menighet',
    location: 'Sarpsborg',
    template: 'Håpet',
    quote: 'Vipps-integrasjonen alene er verdt prisen. Anbefales!',
    image: '/images/stave-church.jpg',
    since: '2026',
    website: '#',
    visible: 1,
  },
  {
    id: '3',
    name: 'Stavanger Baptistmenighet',
    location: 'Stavanger',
    template: 'Kilden',
    quote: 'Vi gikk fra WordPress på en ettermiddag. Utrolig enkelt!',
    image: '/images/church-interior.jpg',
    since: '2026',
    website: '#',
    visible: 1,
  },
  {
    id: '4',
    name: 'Tromsø Misjonskirke',
    location: 'Tromsø',
    template: 'Lyset',
    quote: 'Endelig en løsning som er skreddersydd for norske menigheter.',
    image: '/images/fjord-landscape.jpg',
    since: '2026',
    website: '#',
    visible: 1,
  },
  {
    id: '5',
    name: 'Kristiansand Frikirke',
    location: 'Kristiansand',
    template: 'Håpet',
    quote: 'Supporten er fantastisk og løsningen er superbrukervennlig.',
    image: '/images/hero-church.jpg',
    since: '2026',
    website: '#',
    visible: 1,
  },
  {
    id: '6',
    name: 'Trondheim Menighet',
    location: 'Trondheim',
    template: 'Kilden',
    quote: 'Vi sparer timer hver uke på administrasjon.',
    image: '/images/church-service.jpg',
    since: '2026',
    website: '#',
    visible: 1,
  },
];

// Map pin positions (approximate x,y in a 300x800 SVG of Norway)
const cityPins: { name: string; x: number; y: number }[] = [
  { name: 'Tromso', x: 130, y: 175 },
  { name: 'Trondheim', x: 105, y: 400 },
  { name: 'Bergen', x: 42, y: 530 },
  { name: 'Stavanger', x: 48, y: 600 },
  { name: 'Kristiansand', x: 90, y: 660 },
  { name: 'Sarpsborg', x: 162, y: 635 },
];

export function CustomersPage() {
  useDocumentTitle('Kunder');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const apiCustomers = await getPublicCustomers();
        setCustomers(apiCustomers.length > 0 ? apiCustomers : defaultCustomers);
      } catch {
        setCustomers(defaultCustomers);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Menigheter som har tatt steget
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Fra sma forsamlinger til store menigheter — se hvem som bruker Menighetsportalen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Customer Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-6 w-48 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                    <div className="h-16 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="card overflow-hidden group"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={customer.image}
                      alt={customer.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-medium bg-[#2D5A4A]/10 text-[#2D5A4A] rounded-full">
                        {customer.template}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#636363]">
                        <Calendar className="w-3 h-3" />
                        Kunde siden {customer.since}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-1">
                      {customer.name}
                    </h3>

                    <p className="flex items-center gap-1 text-sm text-[#636363] mb-4">
                      <MapPin className="w-4 h-4" />
                      {customer.location}
                    </p>

                    <blockquote className="text-[#4A4A4A] italic mb-4">
                      "{customer.quote}"
                    </blockquote>

                    <a
                      href={customer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#2D5A4A] hover:underline"
                    >
                      Besok nettside
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Fra nord til sor
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Menighetsportalen brukes av menigheter over hele Norge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card p-8 max-w-2xl mx-auto"
          >
            <div className="flex justify-center">
              <svg viewBox="0 0 300 720" className="w-full max-w-sm" aria-label="Kart over Norge med menighetenes plasseringer">
                {/* Norway outline — simplified but recognizable */}
                <path
                  d="
                    M 160 20
                    C 175 15, 195 20, 210 35
                    C 225 50, 235 70, 240 90
                    C 245 110, 240 130, 230 150
                    C 220 170, 210 185, 200 200
                    C 190 215, 185 230, 180 250
                    C 175 270, 168 290, 162 310
                    C 158 330, 152 350, 148 370
                    C 145 390, 140 410, 140 430
                    C 140 450, 145 470, 150 490
                    C 155 510, 160 530, 165 550
                    C 170 565, 173 580, 175 595
                    C 177 610, 178 625, 175 640
                    C 172 655, 165 665, 155 675
                    C 145 685, 135 690, 120 690
                    L 100 680
                    C 85 670, 75 660, 70 645
                    C 62 625, 55 610, 50 595
                    C 42 575, 35 555, 30 535
                    C 25 515, 22 495, 25 475
                    C 28 455, 35 435, 40 415
                    C 48 395, 55 380, 58 360
                    C 62 340, 58 320, 52 300
                    C 45 280, 38 260, 35 240
                    C 32 220, 40 200, 50 185
                    C 60 170, 65 155, 75 140
                    C 85 125, 90 110, 100 95
                    C 108 80, 115 65, 125 50
                    C 135 35, 145 25, 160 20
                    Z
                  "
                  fill="#2D5A4A"
                  opacity="0.12"
                  stroke="#2D5A4A"
                  strokeWidth="1.5"
                />

                {/* City pins */}
                {cityPins.map((city) => (
                  <g key={city.name}>
                    {/* Pin shadow */}
                    <circle cx={city.x} cy={city.y + 2} r="8" fill="#000" opacity="0.08" />
                    {/* Pin circle */}
                    <circle cx={city.x} cy={city.y} r="7" fill="#2D5A4A" stroke="white" strokeWidth="2.5" />
                    {/* City label */}
                    <text
                      x={city.x + 14}
                      y={city.y + 4}
                      fontSize="13"
                      fontWeight="500"
                      fill="#1A1A1A"
                      fontFamily="Inter, system-ui, sans-serif"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Bli en av oss"
        subtitle="Prøv Menighetsportalen gratis i 2 måneder. Ingen forpliktelser."
        buttonText="Prøv gratis nå"
        buttonHref="/prov-gratis"
        variant="dark"
      />
    </div>
  );
}
