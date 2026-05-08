import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/use-document-title';

interface VerifyResponse {
  ok: boolean;
  churchName?: string;
  slug?: string;
  alreadyVerified?: boolean;
  provisioned?: boolean;
  reason?: string;
}

type State =
  | { kind: 'loading' }
  | { kind: 'success'; churchName: string; slug: string; alreadyVerified: boolean; provisioned: boolean }
  | { kind: 'error'; message: string };

export function VerifiserPage() {
  useDocumentTitle('Bekreft registrering');
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<State>({ kind: 'loading' });
  const hasFetched = useRef(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setState({ kind: 'error', message: 'Lenken mangler bekreftelseskode. Sjekk e-posten din.' });
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;

    (async () => {
      try {
        const res = await fetch(`/api/registrer/verify/${encodeURIComponent(token)}`);
        const body = (await res.json().catch(() => ({}))) as VerifyResponse;
        if (res.ok && body.ok && body.churchName && body.slug) {
          setState({
            kind: 'success',
            churchName: body.churchName,
            slug: body.slug,
            alreadyVerified: !!body.alreadyVerified,
            provisioned: !!body.provisioned,
          });
        } else {
          setState({
            kind: 'error',
            message:
              body.reason === 'not-found'
                ? 'Vi finner ikke denne bekreftelseskoden. Lenken kan være utløpt.'
                : 'Vi klarte ikke å bekrefte registreringen. Prøv igjen senere.',
          });
        }
      } catch {
        setState({
          kind: 'error',
          message: 'Kunne ikke kontakte serveren. Sjekk internettforbindelsen.',
        });
      }
    })();
  }, [searchParams]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center bg-[#FAF9F7]">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mx-auto text-center"
          role="status"
          aria-live="polite"
        >
          {state.kind === 'loading' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#2D5A4A] animate-spin" aria-hidden="true" />
              </div>
              <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
                Bekrefter registreringen…
              </h1>
              <p className="text-[#636363]">Et øyeblikk.</p>
            </>
          )}

          {state.kind === 'success' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center">
                <Check className="w-10 h-10 text-[#2D5A4A]" aria-hidden="true" />
              </div>
              <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
                {state.alreadyVerified ? 'Allerede bekreftet' : 'Takk — registreringen er bekreftet!'}
              </h1>
              <p className="text-lg text-[#4A4A4A] mb-2">
                <strong>{state.churchName}</strong> er klar for oppsett.
              </p>
              {state.provisioned ? (
                <>
                  <p className="text-[#636363] mb-6">
                    Vi har sendt en e-post med oppsettslenke til deg. Klikk på lenken for å komme i gang.
                  </p>
                  <p className="text-sm text-[#888]">
                    Nettstedet ditt vil bli tilgjengelig på{' '}
                    <code className="px-1.5 py-0.5 bg-white rounded border border-[#E5E2DD]">
                      {state.slug}.menighetsportalen.no
                    </code>{' '}
                    etter oppsettet.
                  </p>
                </>
              ) : (
                <p className="text-[#636363]">
                  Vi gjør klar{' '}
                  <code className="px-1.5 py-0.5 bg-white rounded border border-[#E5E2DD] text-sm">
                    {state.slug}.menighetsportalen.no
                  </code>{' '}
                  og kontakter deg innen 24 timer.
                </p>
              )}
            </>
          )}

          {state.kind === 'error' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" aria-hidden="true" />
              </div>
              <h1 className="font-serif text-3xl font-semibold text-[#1A1A1A] mb-4">
                Bekreftelse mislyktes
              </h1>
              <p className="text-[#4A4A4A] mb-6">{state.message}</p>
              <a
                href="/kontakt"
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-[#2D5A4A] text-[#2D5A4A] font-medium hover:bg-[#2D5A4A]/5 transition-colors"
              >
                Ta kontakt med oss
              </a>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
