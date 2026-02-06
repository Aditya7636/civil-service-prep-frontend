'use client';

import { useEffect, useState } from 'react';
import type { QuestionType } from '../lib/types';

type QuestionRendererProps = {
  questionId: string;
  prompt: string;
  type: QuestionType;
  options?: string[];
  initialResponse?: unknown;
  onChange: (response: unknown) => void;
};

export function QuestionRenderer({
  questionId,
  prompt,
  type,
  options = [],
  initialResponse,
  onChange,
}: QuestionRendererProps) {
  const [response, setResponse] = useState<unknown>(initialResponse ?? '');

  useEffect(() => {
    setResponse(initialResponse ?? '');
  }, [questionId, initialResponse]);

  useEffect(() => {
    onChange(response);
  }, [response, onChange]);

  const inputId = `question-${questionId}`;

  if (type === 'MCQ' || type === 'SJT') {
    return (
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">{prompt}</h1>
        </legend>
        <div className="govuk-radios" data-module="govuk-radios">
          {options.map((option, index) => (
            <div className="govuk-radios__item" key={option}>
              <input
                className="govuk-radios__input"
                id={`${inputId}-${index}`}
                name={inputId}
                type="radio"
                value={option}
                checked={response === option}
                onChange={() => setResponse(option)}
              />
              <label className="govuk-label govuk-radios__label" htmlFor={`${inputId}-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    );
  }

  if (type === 'NUMERICAL') {
    return (
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor={inputId}>
          {prompt}
        </label>
        <input
          className="govuk-input"
          id={inputId}
          name={inputId}
          type="number"
          inputMode="decimal"
          value={typeof response === 'number' || typeof response === 'string' ? response : ''}
          onChange={(event) => setResponse(event.target.value)}
        />
      </div>
    );
  }

  if (type === 'FREE_TEXT') {
    return (
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor={inputId}>
          {prompt}
        </label>
        <textarea
          className="govuk-textarea"
          id={inputId}
          name={inputId}
          rows={8}
          value={typeof response === 'string' ? response : ''}
          onChange={(event) => setResponse(event.target.value)}
        />
        <p className="govuk-hint">Use STAR format. Autosaves as you type.</p>
      </div>
    );
  }

  if (type === 'TECHNICAL') {
    return (
      <div className="govuk-form-group">
        <label className="govuk-label" htmlFor={inputId}>
          {prompt}
        </label>
        <textarea
          className="govuk-textarea"
          id={inputId}
          name={inputId}
          rows={8}
          value={typeof response === 'string' ? response : ''}
          onChange={(event) => setResponse(event.target.value)}
        />
        <p className="govuk-hint">Provide a structured response. Autosaves as you type.</p>
      </div>
    );
  }

  return null;
}
