import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitTrial } from '@/admin/adminStore';
import { useDocumentTitle } from '@/hooks/use-document-title';

const benefits = [
  'Gratis i 2 måneder',
  'Vi hjelper deg med oppsett',
  'Ingen kredittkort nodvendig',
  'Ingen bindingstid etter gratisperioden',
  'Full tilgang til alle funksjoner',
];

export function TrialPage() {
  useDocumentTitle('Prøv gratis');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasWebsite, setHasWebsite] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const success = await submitTrial({
        churchName: formData.get('churchName') as string || '',
        contactName: formData.get('contactName') as string || '',
        email: formData.get('email') as string || '',
        phone: formData.get('phone') as string || '',
        location: formData.get('location') as string || '',
        members: formData.get('members') as string || '',
        hasWebsite: hasWebsite,
        currentWebsite: formData.get('currentWebsite') as string || '',
        template: formData.get('template') as string || '',
        customTemplate: formData.get('custom') as string || '',
        comment: formData.get('comment') as string || '',
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        setError('Noe gikk galt. Prøv igjen.');
      }
    } catch {
      setError('Kunne ikke sende foresporselen. Sjekk internettforbindelsen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto text-center"
            role="status"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" aria-hidden="true" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
              Takk for din interesse!
            </h1>
            <p className="text-lg text-[#4A4A4A] mb-6">
              Vi har mottatt din forespørsel og tar kontakt innen 24 timer for å hjelpe deg i gang.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

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
              Prøv Menighetsportalen gratis i 2 måneder
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Fyll ut skjemaet under, så tar vi kontakt innen 24 timer for å hjelpe deg i gang.
              Ingen forpliktelser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="churchName">
                      Menighetsnavn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="churchName"
                      name="churchName"
                      placeholder="Din menighet"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">
                      Kontaktperson <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      placeholder="Ditt navn"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">
                      E-postadresse <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="din@epost.no"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      Telefonnummer <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+47 000 00 000"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Sted (by/kommune)</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Oslo"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="members">Antall medlemmer</Label>
                    <Select name="members">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Velg storrelse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under50">Under 50</SelectItem>
                        <SelectItem value="50-100">50–100</SelectItem>
                        <SelectItem value="100-250">100–250</SelectItem>
                        <SelectItem value="250-500">250–500</SelectItem>
                        <SelectItem value="over500">Over 500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Har dere en nettside i dag?</legend>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="hasWebsite"
                          value="yes"
                          onChange={(e) => setHasWebsite(e.target.value)}
                          className="w-4 h-4 text-[#2D5A4A]"
                        />
                        <span className="text-[#4A4A4A]">Ja</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="hasWebsite"
                          value="no"
                          onChange={(e) => setHasWebsite(e.target.value)}
                          className="w-4 h-4 text-[#2D5A4A]"
                        />
                        <span className="text-[#4A4A4A]">Nei</span>
                      </label>
                    </div>
                    {hasWebsite === 'yes' && (
                      <div>
                        <Label htmlFor="currentWebsite">Navarende nettadresse</Label>
                        <Input id="currentWebsite" name="currentWebsite" placeholder="https://dinnetside.no" className="mt-1" />
                      </div>
                    )}
                  </div>
                </fieldset>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="template">Hvilken mal interesserer deg mest?</Label>
                    <Select name="template">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Velg mal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hapet">Hapet (varm og moderne)</SelectItem>
                        <SelectItem value="lyset">Lyset (elegant og redaksjonell)</SelectItem>
                        <SelectItem value="kilden">Kilden (minimalistisk og klassisk)</SelectItem>
                        <SelectItem value="unknown">Vet ikke ennå</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="custom">Interessert i tilpasset mal?</Label>
                    <Select name="custom">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Velg alternativ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">Ja, eksklusiv (20 000 kr)</SelectItem>
                        <SelectItem value="shared">Ja, delt (10 000 kr)</SelectItem>
                        <SelectItem value="no">Nei, standard er fint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Eventuell kommentar</Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    placeholder="Har du spørsmål eller ønsker?"
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="consent" required />
                  <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                    Jeg godtar at Designblokk kontakter meg om Menighetsportalen.
                    Du kan når som helst be om å bli slettet fra vår database.
                  </Label>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full btn-primary py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Sender...
                    </>
                  ) : (
                    <>
                      Send forespørsel
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <div className="card p-6 lg:sticky lg:top-24">
                <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-6">
                  Dette far du
                </h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#2D5A4A]" />
                      </div>
                      <span className="text-[#4A4A4A]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[#E5E2DD]">
                  <img
                    src="/images/church-service.jpg"
                    alt="Glad menighet"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <p className="text-sm text-[#636363] mt-3 text-center">
                    Brukes av flere menigheter over hele Norge
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
