import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { comparisonData, competitors } from '@/data/comparison';
import { cn } from '@/lib/utils';

export function ComparisonTable() {
  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span role="img" aria-label="Ja"><Check className="w-5 h-5 text-[#2D5A4A] mx-auto" aria-hidden="true" /></span>
      ) : (
        <span role="img" aria-label="Nei"><X className="w-5 h-5 text-[#636363] mx-auto" aria-hidden="true" /></span>
      );
    }
    if (['Delvis', 'Varierer', 'Mulig', 'Vanskelig', 'Sjelden', 'Enkel', 'Tillegg', 'App', 'E-handel', 'Plugin'].includes(value)) {
      return <span className="text-[#636363] text-sm">{value}</span>;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[800px]">
        <caption className="sr-only">Sammenligning av Menighetsportalen med andre løsninger</caption>
        <thead>
          <tr className="border-b-2 border-[#2D5A4A]">
            <th className="text-left py-4 px-4 font-medium text-[#1A1A1A]">Funksjon</th>
            {competitors.map((comp) => (
              <th
                key={comp.key}
                className={cn(
                  'text-center py-4 px-4 font-medium',
                  comp.highlight ? 'text-[#2D5A4A]' : 'text-[#4A4A4A]'
                )}
              >
                {comp.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-[#E5E2DD]',
                index % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F7]'
              )}
            >
              <td className="py-4 px-4 font-medium text-[#1A1A1A]">{row.feature}</td>
              {competitors.map((comp) => (
                <td
                  key={comp.key}
                  className={cn(
                    'py-4 px-4 text-center',
                    comp.highlight && 'bg-[#2D5A4A]/5'
                  )}
                >
                  {renderValue(row[comp.key as keyof typeof row] as string | boolean)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
