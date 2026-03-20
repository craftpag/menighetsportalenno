import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Rocket,
  Palette,
  CreditCard,
  Users,
  Mail,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    icon: Rocket,
    title: 'Kom i gang',
    items: [
      'Registrer deg via «Prøv gratis»-skjemaet',
      'Vi setter opp domenet og kontoen din innen 24 timer',
      'Velg mal, legg inn innhold og publiser',
    ],
  },
  {
    icon: Palette,
    title: 'Maler og design',
    items: [
      'Bytt mal når som helst — innholdet overføres automatisk',
      'Tilpass farger, fonter og logo i utseende-innstillingene',
      'Mørk modus aktiveres automatisk basert på brukerens enhet',
    ],
  },
  {
    icon: BookOpen,
    title: 'Innhold',
    items: [
      'Artikler skrives med rik teksteditor (TipTap)',
      'Bilder optimaliseres automatisk ved opplasting',
      'Prekener kan organiseres i serier med lydavspiller',
    ],
  },
  {
    icon: CreditCard,
    title: 'Gaver og betaling',
    items: [
      'Gavemottak støtter Vipps, kort, Google Pay og Apple Pay',
      'Giverattester genereres automatisk for skattefradrag',
      'Regnskap med MVA-sporing er innebygd',
    ],
  },
  {
    icon: Users,
    title: 'Medlemmer og fellesskap',
    items: [
      'Medlemsregisteret håndterer familier og grupper',
      'Smågrupper, frivilligkoordinering og bønnevegg er inkludert',
      'Roller og tilgangsnivåer kan tilpasses per bruker',
    ],
  },
  {
    icon: Mail,
    title: 'Nyhetsbrev og kommunikasjon',
    items: [
      'Send nyhetsbrev til alle abonnenter direkte fra plattformen',
      'Kalender viser gudstjenester og arrangementer',
      'Kunngjøringer kan pinnes til forsiden',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Sikkerhet og personvern',
    items: [
      'All data lagres i Norge/EU med full GDPR-kompatibilitet',
      'WCAG 2.2 AA tilgjengelighet er innebygd i alle maler',
      'SSL-sertifikat og hosting er inkludert i prisen',
    ],
  },
];

export function HelpPage() {
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
              Hjelpesenter
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Alt du trenger å vite om Menighetsportalen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="card p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2D5A4A]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#2D5A4A]" />
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-3">
                    {cat.title}
                  </h2>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                        <span className="text-[#2D5A4A] mt-1 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card p-8 max-w-2xl mx-auto text-center"
          >
            <MessageCircle className="w-10 h-10 text-[#2D5A4A] mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">
              Finner du ikke svaret?
            </h2>
            <p className="text-[#4A4A4A] mb-6">
              Ta kontakt — vi svarer vanligvis innen et par timer.
            </p>
            <Link to="/kontakt">
              <Button className="bg-[#2D5A4A] hover:bg-[#1F3D32] text-white">
                Kontakt oss
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
