import { motion } from 'framer-motion';
import { Heart, Shield, Users, Globe, Church } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/use-document-title';

const values = [
  {
    icon: Church,
    title: 'Spre budskapet om Jesus',
    description: 'Vi bygger verktøy som hjelper menigheter med å nå ut med evangeliet — digitalt og lokalt.',
  },
  {
    icon: Globe,
    title: 'Norsk',
    description: 'Bygget for norske menigheter, med norsk språk og norske betalingsløsninger.',
  },
  {
    icon: Users,
    title: 'Tilgjengelig',
    description: 'WCAG 2.2 AA-sertifisert, slik at alle kan bruke nettsiden uansett funksjonsevne.',
  },
  {
    icon: Shield,
    title: 'Sikkert',
    description: 'Data lagres i Norge/EU med full GDPR-kompatibilitet og kryptering.',
  },
  {
    icon: Heart,
    title: 'Menighets-fokusert',
    description: 'Hver funksjon er designet med menighetsarbeid i tankene.',
  },
];

const team = [
  {
    name: 'Philip André Gauling',
    role: 'Grunnlegger og utvikler',
  },
  {
    name: 'Tobias Ugland',
    role: 'Designer',
  },
];

export function AboutPage() {
  useDocumentTitle('Om oss');
  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Om Menighetsportalen
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Bygget med hjerte for norske menigheter
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-6">
                Historien bak Menighetsportalen
              </h2>
              <div className="space-y-4 text-[#4A4A4A] leading-relaxed">
                <p>
                  Vi er to utviklere innen IT som i flere år har designet og bygget nettsider
                  for bedrifter — gjennom Webflow, WordPress og egne løsninger. Men det var
                  i menighetene vi selv er medlemmer i at vi så et tydelig behov.
                </p>
                <p>
                  Menighetene slet med å nå ut til sine medlemmer og lokalsamfunnet. De
                  eksisterende løsningene var enten altfor dyre, eller så utdaterte at de
                  ikke fungerte godt nok. Frivillige brukte utallige timer på teknisk
                  vedlikehold i stedet for menighetsarbeid.
                </p>
                <p>
                  I 2025 tok vi valget: vi skulle utvikle et komplett system skreddersydd
                  for norske menigheter. I mars 2026 ble Menighetsportalen lansert — og vi
                  har som mål å gjøre denne plattformen til den beste alt-i-ett-løsningen
                  for alle frikirke-menigheter i Norge, og videre.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img
                src="/images/hero-church.jpg"
                alt="Norsk kirke"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Våre verdier
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Dette står vi for i alt vi gjør
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="card p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#2D5A4A]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#636363]">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Menneskene bak
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Et lite team som brenner for å hjelpe norske menigheter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center">
                  <span className="text-3xl font-serif font-semibold text-[#2D5A4A]">
                    {member.name.split(' ')[0][0]}{member.name.split(' ').slice(-1)[0][0]}
                  </span>
                </div>
                <h3 className="font-medium text-[#1A1A1A]">{member.name}</h3>
                <p className="text-sm text-[#636363]">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="section-padding bg-[#FAF9F7]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card p-8 max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-4">
              Designblokk
            </h2>
            <p className="text-[#4A4A4A] mb-6">
              Menighetsportalen er utviklet av Designblokk — et norsk selskap
              som spesialiserer seg på webutvikling og design. Vi har bakgrunn
              fra å bygge nettsider for bedrifter, og bruker nå den erfaringen
              til å hjelpe norske menigheter.
            </p>
            <div className="text-sm text-[#636363]">
              <p>Norge</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
