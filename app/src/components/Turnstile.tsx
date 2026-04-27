import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          language?: string;
          size?: 'normal' | 'compact' | 'flexible';
        },
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}

const TEST_SITE_KEY = '1x00000000000000000000AA';

interface TurnstileProps {
  onToken: (token: string | null) => void;
}

export function Turnstile({ onToken }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const sitekey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || TEST_SITE_KEY;

  useEffect(() => {
    let cancelled = false;
    let pollTimer: number | undefined;

    const tryRender = () => {
      if (cancelled || !containerRef.current) return;
      if (!window.turnstile) {
        pollTimer = window.setTimeout(tryRender, 100);
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        theme: 'light',
        language: 'nb',
        callback: (token) => onToken(token),
        'error-callback': () => onToken(null),
        'expired-callback': () => onToken(null),
      });
    };

    tryRender();

    return () => {
      cancelled = true;
      if (pollTimer) clearTimeout(pollTimer);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // widget may already be gone
        }
      }
    };
  }, [sitekey, onToken]);

  return <div ref={containerRef} />;
}
