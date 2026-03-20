import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mainPlan, addOns } from '@/data/pricing';
// import { cn } from '@/lib/utils';

interface PricingCardProps {
  variant?: 'simple' | 'full';
}

export function PricingCard({ variant = 'simple' }: PricingCardProps) {
  if (variant === 'simple') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto"
      >
        <div className="card border-2 border-[#2D5A4A] p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">
            {mainPlan.name}
          </h3>

          <div className="mb-4">
            <span className="font-serif text-5xl font-bold text-[#2D5A4A]">
              {mainPlan.price}
            </span>
            <span className="text-[#4A4A4A]"> kr/{mainPlan.period}</span>
          </div>

          <p className="text-sm text-[#636363] mb-6">{mainPlan.vatInfo}</p>

          <p className="text-[#4A4A4A] mb-8">{mainPlan.description}</p>

          <ul className="text-left space-y-3 mb-8">
            {mainPlan.features.slice(0, 5).map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#2D5A4A] flex-shrink-0 mt-0.5" />
                <span className="text-[#4A4A4A]">{feature}</span>
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="btn-secondary w-full">
            <Link to="/priser">
              Se fullstendig prisliste
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card border-2 border-[#2D5A4A] p-8 lg:p-12"
      >
        <div className="text-center mb-8">
          <h3 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-2">
            {mainPlan.name}
          </h3>

          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-serif text-6xl font-bold text-[#2D5A4A]">
              {mainPlan.price}
            </span>
            <span className="text-xl text-[#4A4A4A]">kr/{mainPlan.period}</span>
          </div>

          <p className="text-sm text-[#636363] mb-4">{mainPlan.vatInfo}</p>

          <p className="text-lg text-[#4A4A4A]">{mainPlan.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {mainPlan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#2D5A4A] flex-shrink-0 mt-0.5" />
              <span className="text-[#4A4A4A]">{feature}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="btn-primary text-lg px-12 py-6">
            <Link to="/prov-gratis">
              Prøv gratis i 2 måneder
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-sm text-[#636363] mt-4">
            Ingen kredittkort nødvendig. Ingen forpliktelser.
          </p>
        </div>
      </motion.div>

      {/* Add-ons */}
      {variant === 'full' && (
        <div className="grid md:grid-cols-2 gap-6">
          {addOns.map((addon, index) => (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card p-6"
            >
              <h4 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">
                {addon.name}
              </h4>

              <div className="mb-4">
                <span className="font-serif text-3xl font-bold text-[#C17F59]">
                  {addon.price}
                </span>
                <span className="text-[#4A4A4A]"> kr</span>
              </div>

              <p className="text-sm text-[#636363] mb-4">{addon.vatInfo}</p>

              <ul className="space-y-2">
                {addon.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#2D5A4A] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#4A4A4A]">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
