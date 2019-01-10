import React from 'react';
import { Link } from 'react-router-dom';

interface Datum {
  id: string;
  slug: string;
  summary: string;
  title: string;
}

interface Props {
  data: Datum[];
  linkIdentifier: string;
}

const DataList = ({ linkIdentifier = '', data = [] }: Props) => (
  <div data-testid="data-list">
    {data.length > 0 ? (
      <div className="govuk-grid-row">
        {data.map(elem => (
          <div
            className="govuk-grid-column-one-half"
            key={elem.id}
            data-testid="data-list-element"
          >
            <h4>
              <Link
                to={`${linkIdentifier}/${elem.slug}`}
                className="govuk-link"
                data-testid={elem.slug}
              >
                {elem.title}
              </Link>
            </h4>
            <p>{elem.summary}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="govuk-inset-text">None currently published.</div>
    )}
  </div>
);

export default DataList;
