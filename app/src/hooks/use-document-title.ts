import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const suffix = 'Menighetsportalen';
    document.title = title ? `${title} — ${suffix}` : suffix;
  }, [title]);
}
