import React from 'react';
import { Link } from 'react-router-dom';
import { H4 } from './Heading';

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
  <div>
    {data.length > 0 ? (
      <div className="govuk-grid-row">
        {data.map(elem => (
          <div className="govuk-grid-column-one-half" key={elem.id}>
            <H4>
              <Link
                className="govuk-link"
                to={`${linkIdentifier}/${elem.slug}`}
              >
                {elem.title}
              </Link>
            </H4>
            <p className="govuk-body">{elem.summary}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="govuk-inset-text">None currently published.</div>
    )}
  </div>
);

export default DataList;
