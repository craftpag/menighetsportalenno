import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image?: string;
  showSocialProof?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image = '/images/hero-church.jpg',
  showSocialProof = true,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Norsk kirke i landskap"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F7]/95 via-[#FAF9F7]/80 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7]/95 via-[#FAF9F7]/85 to-[#FAF9F7]/70 md:hidden" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight mb-6">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-8">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {primaryCta && (
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-6">
                <Link to={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild size="lg" variant="outline" className="btn-secondary text-lg px-8 py-6">
                <Link to={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              </Button>
            )}
          </motion.div>

          {showSocialProof && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 pt-8 border-t border-[#E5E2DD]"
            >
              <p className="text-sm text-[#4A4A4A]">
                Brukes av flere menigheter
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
