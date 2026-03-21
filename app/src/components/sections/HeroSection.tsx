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
      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 lg:gap-12 items-center">
          {/* Text - Left Side */}
          <div>
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
                <Button asChild size="lg" className="btn-primary rounded-full text-lg px-8 py-6">
                  <Link to={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild size="lg" variant="outline" className="btn-secondary rounded-full text-lg px-8 py-6">
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

          {/* Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block relative -mr-8 lg:-mr-16"
          >
            <img
              src={image}
              alt="Norsk kirke i landskap"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
