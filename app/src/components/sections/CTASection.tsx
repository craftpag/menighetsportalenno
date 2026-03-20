import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'light' | 'dark';
}

export function CTASection({
  title,
  subtitle,
  buttonText,
  buttonHref,
  variant = 'dark',
}: CTASectionProps) {
  const isDark = variant === 'dark';

  return (
    <section className={isDark ? 'bg-[#2D5A4A]' : 'bg-[#FAF9F7]'}>
      <div className="container-custom py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2
            className={`font-serif text-3xl md:text-4xl font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}
          >
            {title}
          </h2>

          <p
            className={`text-lg mb-8 ${
              isDark ? 'text-white/80' : 'text-[#4A4A4A]'
            }`}
          >
            {subtitle}
          </p>

          <Button
            asChild
            size="lg"
            className={
              isDark
                ? 'bg-white text-[#2D5A4A] hover:bg-white/90 text-lg px-10 py-6 rounded-xl font-medium transition-all hover:scale-105'
                : 'btn-primary text-lg px-10 py-6'
            }
          >
            <Link to={buttonHref}>
              {buttonText}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
