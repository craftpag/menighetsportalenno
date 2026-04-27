import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { templates } from '@/data/templates';
import { submitTrial } from '@/admin/adminStore';
import { useDocumentTitle } from '@/hooks/use-document-title';
import {
  generateSlug,
  validateSlug,
  SLUG_ERROR_MESSAGES,
  type SlugError,
} from '@/lib/slug';

type Step = 1 | 2 | 3;

interface FormData {
  churchName: string;
  slug: string;
  slugTouched: boolean;
  template: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  members: string;
  consent: boolean;
}

const initialData: FormData = {
  churchName: '',
  slug: '',
  slugTouched: false,
  template: '',
  contactName: '',
  email: '',
  phone: '',
  location: '',
  members: '',
  consent: false,
};

const stepLabels: Record<Step, string> = {
  1: 'Kirke',
  2: 'Mal',
  3: 'Kontakt',
};

export function RegistrerPage() {
  useDocumentTitle('Registrer menighet');
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Forhåndsvelg mal fra ?mal=
  useEffect(() => {
    const mal = searchParams.get('mal');
    if (mal && templates.some((t) => t.id === mal)) {
      setData((d) => ({ ...d, template: mal }));
    }
  }, [searchParams]);

  // Auto-generer slug fra kirkenavn til brukeren overstyrer
  useEffect(() => {
    if (!data.slugTouched) {
      setData((d) => ({ ...d, slug: generateSlug(d.churchName) }));
    }
  }, [data.churchName, data.slugTouched]);

  const slugError: SlugError | null = useMemo(
    () => (data.slug ? validateSlug(data.slug) : null),
    [data.slug],
  );

  const canProceedStep1 = data.churchName.trim().length >= 2 && data.slug && !slugError;
  const canProceedStep2 = !!data.template;
  const canSubmit =
    data.contactName.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(data.email) &&
    data.phone.trim().length >= 6 &&
    data.consent;

  const goNext = () => {
    if (step === 1 && canProceedStep1) setStep(2);
    else if (step === 2 && canProceedStep2) setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goBack = () => {
    if (step > 1) setStep((step - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const result = await submitTrial({
        churchName: data.churchName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        slug: data.slug,
        location: data.location,
        members: data.members,
        hasWebsite: '',
        currentWebsite: '',
        template: data.template,
        customTemplate: '',
        comment: '',
      });
      if (result.ok) {
        setSubmitState('success');
      } else if (result.reason === 'taken') {
        setStep(1);
        setErrorMessage('Subdomenet er allerede tatt. Velg en annen nettadresse.');
      } else {
        setErrorMessage(result.error || 'Noe gikk galt. Prøv igjen.');
      }
    } catch {
      setErrorMessage('Kunne ikke sende. Sjekk internettforbindelsen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitState === 'success') {
    return <SuccessScreen email={data.email} slug={data.slug} />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF9F7]">
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Registrer din menighet
            </h1>
            <p className="text-lg text-[#4A4A4A]">
              Kom i gang på under 2 minutter. 2 måneder gratis, ingen kredittkort.
            </p>
          </motion.div>

          <ProgressIndicator currentStep={step} />

          <div className="card p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StepKirke
                      data={data}
                      slugError={slugError}
                      onChange={(patch) => setData({ ...data, ...patch })}
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StepMal
                      selected={data.template}
                      onSelect={(template) => setData({ ...data, template })}
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StepKontakt
                      data={data}
                      onChange={(patch) => setData({ ...data, ...patch })}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {errorMessage && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E5E2DD]">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={goBack}
                    className="text-[#4A4A4A]"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Forrige
                  </Button>
                ) : (
                  <span />
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                    className="btn-primary"
                  >
                    Neste
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sender...
                      </>
                    ) : (
                      <>
                        Opprett menighet
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-[#636363] mt-6">
            Allerede kunde? <a href="/admin" className="text-[#2D5A4A] font-medium underline">Logg inn</a>
          </p>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// Komponenter
// ============================================================

function ProgressIndicator({ currentStep }: { currentStep: Step }) {
  const steps: Step[] = [1, 2, 3];
  return (
    <ol className="flex items-center justify-center gap-2 md:gap-4 mb-8" aria-label="Fremdrift">
      {steps.map((s, i) => {
        const done = s < currentStep;
        const active = s === currentStep;
        return (
          <li key={s} className="flex items-center gap-2 md:gap-4">
            <div
              aria-current={active ? 'step' : undefined}
              className={`flex items-center gap-2 ${active ? 'text-[#2D5A4A]' : done ? 'text-[#3D7A64]' : 'text-[#9C9C9C]'}`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  done
                    ? 'bg-[#2D5A4A] text-white'
                    : active
                      ? 'bg-[#2D5A4A] text-white'
                      : 'bg-white border border-[#E5E2DD] text-[#9C9C9C]'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : s}
              </span>
              <span className="hidden sm:inline text-sm font-medium">{stepLabels[s]}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-px ${s < currentStep ? 'bg-[#2D5A4A]' : 'bg-[#E5E2DD]'}`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

interface StepKirkeProps {
  data: FormData;
  slugError: SlugError | null;
  onChange: (patch: Partial<FormData>) => void;
}

function StepKirke({ data, slugError, onChange }: StepKirkeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">
          Hva heter menigheten?
        </h2>
        <p className="text-[#636363]">
          Vi bruker dette som navn og lager en nettadresse du kan endre.
        </p>
      </div>

      <div>
        <Label htmlFor="churchName">
          Menighetsnavn <span className="text-red-500">*</span>
        </Label>
        <Input
          id="churchName"
          name="churchName"
          placeholder="F.eks. Nordstrand pinsemenighet"
          value={data.churchName}
          onChange={(e) => onChange({ churchName: e.target.value })}
          autoFocus
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="slug">
          Nettadresse <span className="text-red-500">*</span>
        </Label>
        <div className="mt-1 flex items-stretch rounded-md border border-input bg-white focus-within:ring-2 focus-within:ring-[#2D5A4A] focus-within:ring-offset-0 focus-within:border-[#2D5A4A] transition-all">
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="dinmenighet"
            value={data.slug}
            onChange={(e) =>
              onChange({
                slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                slugTouched: true,
              })
            }
            required
            className="flex-1 min-w-0 px-3 py-2 bg-transparent text-base focus:outline-none"
            aria-invalid={!!slugError}
            aria-describedby={slugError ? 'slug-error' : 'slug-hint'}
          />
          <span className="flex items-center px-3 text-sm text-[#636363] bg-[#FAF9F7] border-l border-[#E5E2DD] rounded-r-md whitespace-nowrap">
            .menighetsportalen.no
          </span>
        </div>
        {slugError ? (
          <p id="slug-error" className="text-sm text-red-600 mt-1.5">
            {SLUG_ERROR_MESSAGES[slugError]}
          </p>
        ) : (
          <p id="slug-hint" className="text-sm text-[#636363] mt-1.5">
            Slik blir nettadressen til menigheten. Du kan koble til eget domene senere.
          </p>
        )}
      </div>
    </div>
  );
}

function StepMal({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">
          Velg en mal
        </h2>
        <p className="text-[#636363]">
          Du kan endre mal når som helst, og tilpasse farger, fonter og layout.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Velg mal"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {templates.map((tmpl) => {
          const isSelected = selected === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(tmpl.id)}
              className={`relative text-left rounded-2xl border-2 overflow-hidden transition-all bg-white ${
                isSelected
                  ? 'border-[#2D5A4A] shadow-md'
                  : 'border-[#E5E2DD] hover:border-[#2D5A4A]/40'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-[#2D5A4A] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="aspect-[4/3] overflow-hidden bg-[#F0EDE8]">
                <img
                  src={tmpl.image}
                  alt={`Forhåndsvisning av mal ${tmpl.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">{tmpl.name}</h3>
                <p className="text-sm text-[#636363]">{tmpl.style}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface StepKontaktProps {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}

function StepKontakt({ data, onChange }: StepKontaktProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">
          Kontaktinformasjon
        </h2>
        <p className="text-[#636363]">
          Vi sender en bekreftelse og lar deg sette opp menigheten din.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contactName">
            Kontaktperson <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contactName"
            name="contactName"
            placeholder="Ditt navn"
            value={data.contactName}
            onChange={(e) => onChange({ contactName: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">
            E-post <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="din@epost.no"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            required
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phone">
            Telefon <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+47 000 00 000"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Sted (frivillig)</Label>
          <Input
            id="location"
            name="location"
            placeholder="Oslo"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="members">Antall medlemmer (frivillig)</Label>
        <Select
          value={data.members}
          onValueChange={(v) => onChange({ members: v })}
        >
          <SelectTrigger id="members" className="mt-1">
            <SelectValue placeholder="Velg størrelse" />
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

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="consent"
          checked={data.consent}
          onCheckedChange={(checked) => onChange({ consent: checked === true })}
          required
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
          Jeg godtar at Designblokk kontakter meg om Menighetsportalen og lagrer opplysningene mine. Du kan når som helst be om å bli slettet.
        </Label>
      </div>
    </div>
  );
}

function SuccessScreen({ email, slug }: { email: string; slug: string }) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center bg-[#FAF9F7]">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto text-center"
          role="status"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center">
            <Mail className="w-10 h-10 text-[#2D5A4A]" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
            Sjekk e-posten din
          </h1>
          <p className="text-lg text-[#4A4A4A] mb-2">
            Vi har sendt en bekreftelse til <strong>{email}</strong>.
          </p>
          <p className="text-[#636363]">
            Når du bekrefter, gjør vi klar <code className="px-1.5 py-0.5 bg-white rounded border border-[#E5E2DD] text-sm">{slug}.menighetsportalen.no</code> og kontakter deg innen 24 timer.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
