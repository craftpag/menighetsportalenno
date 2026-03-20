import { motion } from 'framer-motion';
import { PricingCard } from '@/components/sections/PricingCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';
import { useDocumentTitle } from '@/hooks/use-document-title';

export function PricingPage() {
  useDocumentTitle('Priser');
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
              Enkel og forutsigbar prising
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Alt inkludert i plattformen. Ingen oppstartskostnad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Pricing */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <PricingCard variant="full" />
        </div>
      </section>

      {/* FAQ */}
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
              Ofte stilte spørsmål
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Finn svar på de vanligste spørsmålene om Menighetsportalen.
            </p>
          </motion.div>

          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Fremdeles usikker?"
        subtitle="Prøv gratis i 2 måneder. Ingen forpliktelser. Ingen kredittkort nødvendig."
        buttonText="Prøv gratis nå"
        buttonHref="/prov-gratis"
        variant="dark"
      />
    </div>
  );
}
