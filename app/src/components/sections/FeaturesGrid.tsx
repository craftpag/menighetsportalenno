import { motion } from 'framer-motion';
import { features, iconMap } from '@/data/features';
import { cn } from '@/lib/utils';

interface FeaturesGridProps {
  showAll?: boolean;
  category?: string;
  className?: string;
}

export function FeaturesGrid({ showAll = true, category, className }: FeaturesGridProps) {
  const displayFeatures = showAll
    ? features
    : features.slice(0, 8);

  const filteredFeatures = category
    ? displayFeatures.filter((f) => f.category === category)
    : displayFeatures;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
    >
      {filteredFeatures.map((feature) => {
        const IconComponent = iconMap[feature.icon];
        return (
          <motion.div
            key={feature.id}
            variants={itemVariants}
            className="card p-5 group cursor-default"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2D5A4A]/10 flex items-center justify-center group-hover:bg-[#2D5A4A]/20 transition-colors">
                {IconComponent && <IconComponent className="w-5 h-5 text-[#2D5A4A]" />}
              </div>
              <div>
                <h3 className="font-medium text-[#1A1A1A] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#636363] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
