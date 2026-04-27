import { motion } from 'framer-motion';
import { features, featureCategories, iconMap } from '@/data/features';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { CTASection } from '@/components/sections/CTASection';
import { useDocumentTitle } from '@/hooks/use-document-title';

export function FeaturesPage() {
  useDocumentTitle('Funksjoner');
  const categories = Object.keys(featureCategories) as Array<keyof typeof featureCategories>;

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Alt en menighet trenger — i én løsning
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Ikke mer å jonglere mellom WordPress, Google Sheets og e-postlister. 
              Menighetsportalen samler alt på ett sted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features by Category */}
      {categories.map((category, catIndex) => {
        const categoryFeatures = features.filter((f) => f.category === category);
        if (categoryFeatures.length === 0) return null;

        return (
          <section
            key={category}
            className={`section-padding ${catIndex % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F7]'}`}
          >
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
              >
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
                  {featureCategories[category]}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryFeatures.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="card p-5 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2D5A4A]/10 flex items-center justify-center group-hover:bg-[#2D5A4A]/20 transition-colors">
                          {IconComponent && <IconComponent className="w-5 h-5 text-[#2D5A4A]" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1A1A1A] mb-1">{feature.title}</h3>
                          <p className="text-sm text-[#636363] leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Comparison Section */}
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
              Menighetsportalen vs. alternativene
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Se hvordan vi sammenligner med andre løsninger på markedet.
            </p>
          </motion.div>

          <ComparisonTable />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-center text-sm text-[#636363]"
          >
            * Priser for WordPress inkluderer hosting, premium plugins og nødvendige tillegg.
            Byrå-priser varierer basert på omfang.
          </motion.div>
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
