import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { TemplatePreview } from '@/components/sections/TemplatePreview';
import { PricingCard } from '@/components/sections/PricingCard';
import { CTASection } from '@/components/sections/CTASection';
import { useDocumentTitle } from '@/hooks/use-document-title';

const problems = [
  {
    title: 'WordPress er utdatert og sårbart',
    description: 'Gamle plugins, sikkerhetshull og konstant behov for oppdateringer.',
    image: '/images/problem-outdated.jpg',
  },
  {
    title: 'Byråer koster 50–100 000 kr',
    description: 'Høye oppstartskostnader og dyrt vedlikehold år etter år.',
    image: '/images/problem-expensive.jpg',
  },
  {
    title: 'Frivillige har ikke tid',
    description: 'Teknisk vedlikehold tar tid fra det viktige menighetsarbeidet.',
    image: '/images/problem-time.jpg',
  },
];

export function HomePage() {
  useDocumentTitle('Nettside for norske menigheter');
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="Din menighet fortjener en nettside som fungerer"
        subtitle="Menighetsportalen gir deg en komplett, moderne nettside — klar på under en time. Ingen koding. Ingen vedlikeholdshodepine. Alt på norsk."
        primaryCta={{ label: 'Prøv gratis i 2 måneder', href: '/registrer' }}
        secondaryCta={{ label: 'Se malene', href: '/maler' }}
      />

      {/* Problem Section */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Vi forstår utfordringen
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Mange menigheter sliter med utdaterte nettsider, dyre byråer og frivillige 
              som bruker tid på tekniske problemer i stedet for menighetsarbeid.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="card overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={problem.image}
                    alt={problem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-[#636363]">{problem.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Alt du trenger, ingenting du ikke trenger
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Menighetsportalen samler alt på ett sted — fra nettside og gaver til
              gudstjenesteplanlegger, innsjekking, arbeidsflyter og AI.
            </p>
          </motion.div>

          <FeaturesGrid showAll={false} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" className="btn-secondary">
              <Link to="/funksjoner">
                Se alt som er inkludert
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Velg stilen som passer din menighet
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Hver mal er designet med norsk estetikk, tilgjengelighet og 
              menighetsarbeid i tankene.
            </p>
          </motion.div>

          <TemplatePreview />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" className="btn-secondary">
              <Link to="/maler">
                Utforsk alle maler
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Enkel og forutsigbar prising
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Forutsigbar prising uten oppstartskostnad. Alt du trenger i én plattform.
            </p>
          </motion.div>

          <PricingCard variant="simple" />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Klar til å gi menigheten en moderne nettside?"
        subtitle="Prøv gratis i 2 måneder. Ingen forpliktelser."
        buttonText="Prøv gratis"
        buttonHref="/registrer"
        variant="dark"
      />
    </div>
  );
}
