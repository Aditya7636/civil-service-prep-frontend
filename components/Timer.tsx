'use client';

import { useEffect, useMemo, useState } from 'react';

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function Timer({ startedAt, timeLimitMinutes }: { startedAt: string; timeLimitMinutes: number }) {
  const endTime = useMemo(() => {
    const start = new Date(startedAt).getTime();
    return start + timeLimitMinutes * 60 * 1000;
  }, [startedAt, timeLimitMinutes]);

  const [remaining, setRemaining] = useState(() => {
    const now = Date.now();
    return Math.max(0, Math.floor((endTime - now) / 1000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setRemaining(Math.max(0, Math.floor((endTime - now) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="govuk-inset-text" aria-live="polite">
      <strong>Time remaining:</strong> {formatSeconds(remaining)}
    </div>
  );
}
