export function ErrorSummary({ message }: { message: string }) {
  return (
    <div className="govuk-error-summary" role="alert" aria-live="assertive">
      <h2 className="govuk-error-summary__title">There is a problem</h2>
      <div className="govuk-error-summary__body">
        <p className="govuk-body">{message}</p>
      </div>
    </div>
  );
}
