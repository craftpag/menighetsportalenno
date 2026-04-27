import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { submitContact } from '@/admin/adminStore';
import { useDocumentTitle } from '@/hooks/use-document-title';

const contactInfo = [
  {
    icon: Mail,
    label: 'E-post',
    value: 'hei@menighetsportalen.no',
    href: 'mailto:hei@menighetsportalen.no',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+47 999 99 999',
    href: 'tel:+47999999999',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Storgata 1, 0155 Oslo',
    href: '#',
  },
];

export function ContactPage() {
  useDocumentTitle('Kontakt oss');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const success = await submitContact({
        name: formData.get('name') as string || '',
        email: formData.get('email') as string || '',
        subject: formData.get('subject') as string || '',
        message: formData.get('message') as string || '',
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        setError('Noe gikk galt. Prøv igjen.');
      }
    } catch {
      setError('Kunne ikke sende meldingen. Sjekk internettforbindelsen.');
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
              Kontakt oss
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Har du spørsmål? Vi er her for å hjelpe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-1"
            >
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#2D5A4A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D5A4A]/20 transition-colors">
                        <Icon className="w-5 h-5 text-[#2D5A4A]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#636363]">{item.label}</p>
                        <p className="text-[#1A1A1A] font-medium group-hover:text-[#2D5A4A] transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-[#E5E2DD]">
                <h3 className="font-medium text-[#1A1A1A] mb-3">
                  Vil du prove Menighetsportalen?
                </h3>
                <p className="text-sm text-[#636363] mb-4">
                  Start gratis i 2 måneder. Ingen forpliktelser.
                </p>
                <Button asChild className="btn-primary rounded-full w-full">
                  <Link to="/registrer">Prøv gratis</Link>
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              {isSubmitted ? (
                <div className="card p-8 text-center" role="status">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">
                    Melding sendt!
                  </h3>
                  <p className="text-[#4A4A4A]">
                    Takk for din henvendelse. Vi svarer så snart som mulig.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Navn</Label>
                      <Input id="name" name="name" placeholder="Ditt navn" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">E-post</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="din@epost.no"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Emne</Label>
                    <Input id="subject" name="subject" placeholder="Hva gjelder det?" required className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="message">Melding</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Skriv din melding her..."
                      required
                      className="mt-1 min-h-[150px]"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sender...
                      </>
                    ) : (
                      <>
                        Send melding
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
