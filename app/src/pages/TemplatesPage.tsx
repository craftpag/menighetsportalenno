import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates } from '@/data/templates';
import { CTASection } from '@/components/sections/CTASection';
import { useDocumentTitle } from '@/hooks/use-document-title';

export function TemplatesPage() {
  useDocumentTitle('Maler');
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
              Profesjonelle maler for norske menigheter
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Hver mal er designet med norsk estetikk, tilgjengelighet og 
              menighetsarbeid i tankene. Nye maler lanseres hvert kvartal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-20">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                {/* Preview */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-[#F0EDE8] rounded-2xl p-4">
                    {/* Browser Chrome */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="bg-[#F0EDE8] px-4 py-3 flex items-center gap-2 border-b border-[#E5E2DD]">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#C17F59]" />
                          <div className="w-3 h-3 rounded-full bg-[#D4A574]" />
                          <div className="w-3 h-3 rounded-full bg-[#E5E2DD]" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="bg-white rounded-md px-3 py-1 text-xs text-[#636363] text-center">
                            demo-{template.id}.menighetsportalen.no
                          </div>
                        </div>
                      </div>
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-sm font-medium bg-[#2D5A4A]/10 text-[#2D5A4A] rounded-full">
                      {template.style}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
                    {template.name}
                  </h2>

                  <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Color Palette */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">Fargepalett</h4>
                    <div className="flex gap-3">
                      {template.colors.map((color, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-lg border border-[#E5E2DD] shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-[#636363] font-mono">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fonts */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">Fonter</h4>
                    <p className="text-[#4A4A4A]">{template.fonts}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">Nøkkelegenskaper</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 text-sm text-[#4A4A4A] bg-[#F0EDE8] px-3 py-1.5 rounded-full"
                        >
                          <Check className="w-3.5 h-3.5 text-[#2D5A4A]" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="btn-primary">
                    <Link to={`/registrer?mal=${template.id}`}>
                      Prøv denne malen gratis
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Templates */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
                  Vil du ha noe unikt?
                </h2>
                <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                  Vi designer en mal som er helt unik for din menighet — eller en 
                  tilpasset mal til redusert pris som også blir tilgjengelig for andre.
                </p>
                <Button asChild variant="outline" className="btn-secondary">
                  <Link to="/priser">
                    Se priser for tilpassede maler
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-6 text-center">
                  <div className="font-serif text-3xl font-bold text-[#C17F59] mb-2">20 000 kr</div>
                  <p className="text-sm text-[#4A4A4A] font-medium mb-1">Eksklusiv mal</p>
                  <p className="text-xs text-[#636363]">Kun for din menighet</p>
                </div>
                <div className="card p-6 text-center">
                  <div className="font-serif text-3xl font-bold text-[#2D5A4A] mb-2">10 000 kr</div>
                  <p className="text-sm text-[#4A4A4A] font-medium mb-1">Tilpasset mal</p>
                  <p className="text-xs text-[#636363]">Delt med andre</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
              Kommende maler
            </h2>
            <p className="text-[#4A4A4A]">
              Nye maler lanseres hvert kvartal. Har du ønsker? Ta kontakt!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Gløden', quarter: 'Q3 2026', color: '#F59E0B' },
              { name: 'Gryet', quarter: 'Q4 2026', color: '#F97316' },
              { name: 'Stjernen', quarter: 'Q1 2027', color: '#8B5CF6' },
            ].map((template, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card p-8 text-center bg-[#F0EDE8]/50"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${template.color}20` }}
                >
                  <span className="text-2xl" style={{ color: template.color }}>
                    {template.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-1">{template.name}</h3>
                <p className="text-sm text-[#636363]">{template.quarter}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Klar til å prøve?"
        subtitle="Start gratis i 2 måneder. Ingen forpliktelser."
        buttonText="Prøv gratis nå"
        buttonHref="/registrer"
        variant="dark"
      />
    </div>
  );
}
