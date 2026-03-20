import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates } from '@/data/templates';

interface TemplatePreviewProps {
  showAll?: boolean;
}

export function TemplatePreview({ showAll = false }: TemplatePreviewProps) {
  const displayTemplates = showAll ? templates : templates.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {displayTemplates.map((template) => (
        <motion.div
          key={template.id}
          variants={itemVariants}
          className="group"
        >
          <div className="card overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-medium bg-[#2D5A4A]/10 text-[#2D5A4A] rounded-full">
                  {template.style}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">
                {template.name}
              </h3>

              <p className="text-sm text-[#636363] leading-relaxed mb-4">
                {template.description}
              </p>

              {/* Color Palette */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#636363]">Farger:</span>
                <div className="flex gap-1">
                  {template.colors.slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-[#E5E2DD]"
                      style={{ backgroundColor: color }}
                      role="img"
                      aria-label={`Farge ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs text-[#636363] bg-[#F0EDE8] px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Button asChild variant="outline" className="w-full btn-secondary">
                <Link to={`/prov-gratis?mal=${template.id}`}>
                  Prøv denne malen
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
