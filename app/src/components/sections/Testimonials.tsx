import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          variants={itemVariants}
          className="card p-6 relative"
        >
          <Quote className="w-8 h-8 text-[#2D5A4A]/20 absolute top-6 right-6" />

          <blockquote className="font-serif text-lg italic text-[#1A1A1A] mb-6 leading-relaxed">
            "{testimonial.quote}"
          </blockquote>

          <div className="flex items-center gap-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-[#1A1A1A]">{testimonial.name}</p>
              <p className="text-sm text-[#636363]">
                {testimonial.role}, {testimonial.church}
              </p>
              <p className="text-xs text-[#636363]">{testimonial.location}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
