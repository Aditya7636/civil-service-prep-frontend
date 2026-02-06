export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="govuk-body" aria-live="polite">
      Question {current} of {total} ({percent}%)
    </div>
  );
}
