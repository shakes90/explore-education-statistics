import useMounted from '@common/hooks/useMounted';
import useToggle from '@common/hooks/useToggle';
import classNames from 'classnames';
import React, { MouseEvent, ReactNode, useEffect, useRef } from 'react';

let hasNativeDetails: boolean;
let idCounter = 0;

export interface DetailsProps {
  className?: string;
  children: ReactNode;
  id?: string;
  onToggle?: (isOpen: boolean, event: MouseEvent<HTMLElement>) => void;
  open?: boolean;
  summary: string | ReactNode;
}

const Details = ({
  className,
  children,
  id = `details-content-${(idCounter += 1)}`,
  open = false,
  onToggle,
  summary,
}: DetailsProps) => {
  const ref = useRef<HTMLElement>(null);

  const { onMounted } = useMounted();
  const [isOpened, setOpened] = useToggle(open);

  useEffect(() => {
    if (typeof hasNativeDetails === 'undefined') {
      hasNativeDetails =
        typeof document.createElement('details').open === 'boolean';
    }
  }, []);

  useEffect(() => {
    setOpened(open);
  }, [open, setOpened]);

  return (
    <details
      className={classNames('govuk-details', className)}
      open={open}
      ref={ref}
      role={onMounted('group')}
      data-testid={summary}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <summary
        aria-controls={onMounted(id)}
        aria-expanded={onMounted(isOpened)}
        className="govuk-details__summary"
        role={onMounted('button')}
        tabIndex={onMounted(0)}
        onClick={event => {
          event.persist();

          if (onToggle) {
            onToggle(!isOpened, event);

            if (event.isDefaultPrevented()) {
              return;
            }
          }

          setOpened(!isOpened);
        }}
        onKeyPress={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            (event.target as HTMLElement).click();
          }
        }}
        onKeyUp={event => {
          if (event.key === ' ') {
            event.preventDefault();
          }
        }}
      >
        <span
          className="govuk-details__summary-text"
          data-testid="details--expand"
        >
          {summary}
        </span>
      </summary>
      <div
        aria-hidden={onMounted(!isOpened)}
        className="govuk-details__text"
        id={onMounted(id)}
        style={
          !hasNativeDetails
            ? {
                display: !isOpened ? 'none' : undefined,
              }
            : undefined
        }
      >
        {children}
      </div>
    </details>
  );
};

export default Details;
