import { PublicationDownloadSummary } from '@common/services/themeService';
import Link from '@frontend/components/Link';
import React from 'react';

interface Props {
  publications: PublicationDownloadSummary[];
}

function getPublicationDate(path: string) {
  const twoYearDateFormat = /.*\/([0-9]{4})-([0-9]{2})\/.*/;
  const singleYearDateFormat = /.*\/([0-9]{4})\/.*/;

  const twoYearDate = twoYearDateFormat.exec(path);
  const singleYearDate = singleYearDateFormat.exec(path);

  if (twoYearDate) {
    return `, ${twoYearDate[1]} to 20${twoYearDate[2]}`;
  }

  if (singleYearDate) {
    return `, ${singleYearDate[1]}`;
  }
  return '';
}

function PublicationList({ publications }: Props) {
  return (
    <>
      {publications.length > 0 ? (
        publications.map(({ id, title, downloadFiles }) => (
          <React.Fragment key={id}>
            <h3 className="govuk-heading-s">Download files for: {title}</h3>
            <ul className="govuk-list govuk-list--bullet">
              {downloadFiles.map(({ extension, name, path, size }) => (
                <li key={path} className="govuk-!-margin-bottom-6">
                  <Link
                    to={`${process.env.DATA_API_BASE_URL}/download/${path}`}
                    className="govuk-link"
                    data-testid={`download-stats-${path}`}
                    analytics={{
                      category: 'Downloads',
                      action: `Download latest data page ${name} file downloaded`,
                      label: `File URL: /api/download/${path}`,
                    }}
                  >
                    {`${name}${getPublicationDate(path)}`}
                  </Link>
                  {` (${extension.toUpperCase()}, ${size.toUpperCase()})`}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

export default PublicationList;
