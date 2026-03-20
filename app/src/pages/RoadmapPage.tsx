import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Hammer, Calendar, Lightbulb, Loader2 } from 'lucide-react';
import { roadmapPhases } from '@/data/roadmap';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitSuggestion } from '@/admin/adminStore';
import { useDocumentTitle } from '@/hooks/use-document-title';

const statusIcons = {
  completed: Check,
  'in-progress': Hammer,
  planned: Calendar,
  wishlist: Lightbulb,
};

const statusColors = {
  completed: 'bg-green-100 text-green-700 border-green-200',
  'in-progress': 'bg-orange-100 text-orange-700 border-orange-200',
  planned: 'bg-blue-100 text-blue-700 border-blue-200',
  wishlist: 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusLabels = {
  completed: 'Levert',
  'in-progress': 'Under utvikling',
  planned: 'Planlagt',
  wishlist: 'Pa onskelisten',
};

export function RoadmapPage() {
  useDocumentTitle('Veikart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const success = await submitSuggestion({
        name: formData.get('name') as string || '',
        church: formData.get('church') as string || '',
        email: formData.get('email') as string || '',
        suggestion: formData.get('suggestion') as string || '',
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        setError('Noe gikk galt. Prøv igjen.');
      }
    } catch {
      setError('Kunne ikke sende forslaget. Sjekk internettforbindelsen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Vi bygger fremtidens menighetsplattform
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Her er hva vi jobber med — og hva som kommer. Har du ønsker? Ta kontakt!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {roadmapPhases.map((phase, phaseIndex) => {
              const Icon = statusIcons[phase.status];
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: phaseIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8 md:pl-12 pb-12 last:pb-0"
                >
                  {/* Timeline line */}
                  {phaseIndex < roadmapPhases.length - 1 && (
                    <div className="absolute left-4 md:left-6 top-8 bottom-0 w-0.5 bg-[#E5E2DD]" />
                  )}

                  {/* Icon */}
                  <div
                    className={`absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center ${statusColors[phase.status]}`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>

                  {/* Content */}
                  <div className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                        {phase.label}
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[phase.status]}`}
                      >
                        {statusLabels[phase.status]}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-[#4A4A4A]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A4A] mt-2 flex-shrink-0" />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Suggestion Box */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto"
          >
            <div className="card p-8">
              <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2 text-center">
                Har du et onske?
              </h2>
              <p className="text-[#4A4A4A] text-center mb-6">
                Hva ønsker du at Menighetsportalen skal kunne gjøre?
              </p>

              {isSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium text-[#1A1A1A]">Takk for forslaget!</p>
                  <p className="text-sm text-[#636363] mt-1">Vi ser på det.</p>
                </div>
              ) : (
                <form onSubmit={handleSuggestion} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Navn</Label>
                      <Input id="name" name="name" placeholder="Ditt navn" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="church">Menighet</Label>
                      <Input id="church" name="church" placeholder="Din menighet" required className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-post</Label>
                    <Input id="email" name="email" type="email" placeholder="din@epost.no" required className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="suggestion">Ditt forslag</Label>
                    <Textarea
                      id="suggestion"
                      name="suggestion"
                      placeholder="Beskriv hva du ønsker..."
                      required
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sender...
                      </>
                    ) : (
                      'Send forslag'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Klar til å bli med på reisen?"
        subtitle="Prøv Menighetsportalen gratis i 2 måneder. Ingen forpliktelser."
        buttonText="Prøv gratis nå"
        buttonHref="/prov-gratis"
        variant="dark"
      />
    </div>
  );
}
