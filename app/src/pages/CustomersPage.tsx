import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { CTASection } from '@/components/sections/CTASection';
import { getPublicCustomers } from '@/admin/adminStore';
import type { Customer } from '@/admin/adminStore';
import { useDocumentTitle } from '@/hooks/use-document-title';

const NORWAY_TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

export function CustomersPage() {
  useDocumentTitle('Kunder');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const apiCustomers = await getPublicCustomers();
        setCustomers(apiCustomers);
      } catch {
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Bygg markører fra kunder med koordinater (satt av backend via geokoding)
  const markers = customers
    .filter((c) => c.lat && c.lon)
    .reduce((acc, c) => {
      if (!acc.find((m) => m.name === c.location)) {
        acc.push({ name: c.location, coordinates: [c.lon!, c.lat!] as [number, number] });
      }
      return acc;
    }, [] as { name: string; coordinates: [number, number] }[]);

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
              Fra små forsamlinger til store menigheter — se hvem som bruker Menighetsportalen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Customer Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
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
          ) : customers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-lg text-[#4A4A4A]">
                Kundeoversikten oppdateres snart. Vi jobber med å legge til menigheter som bruker plattformen.
              </p>
            </motion.div>
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
                      &ldquo;{customer.quote}&rdquo;
                    </blockquote>

                    <a
                      href={customer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#2D5A4A] hover:underline"
                    >
                      Besøk nettside
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
              Fra nord til sør
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              {customers.length > 0
                ? 'Menighetsportalen brukes av menigheter over hele Norge.'
                : 'Menighetsportalen er tilgjengelig for menigheter over hele Norge.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card p-8 max-w-2xl mx-auto"
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [15, 65],
                scale: 1200,
              }}
              width={500}
              height={700}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={NORWAY_TOPO_URL}>
                {({ geographies }) =>
                  geographies
                    .filter((geo) => geo.properties.name === 'Norway')
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#2D5A4A"
                        fillOpacity={0.15}
                        stroke="#2D5A4A"
                        strokeWidth={1}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                }
              </Geographies>

              {markers.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates}>
                  <circle r={6} fill="#2D5A4A" stroke="#fff" strokeWidth={2} />
                  <text
                    textAnchor="start"
                    x={12}
                    y={4}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      fill: '#1A1A1A',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                  >
                    {name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
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
