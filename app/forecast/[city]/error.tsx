'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <ErrorMessage message={error.message} onReset={reset} />;
}
