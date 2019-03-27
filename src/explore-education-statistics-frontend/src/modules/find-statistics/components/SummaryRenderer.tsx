import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import Details from '../../../components/Details';
import {
  CharacteristicsData,
  PublicationMeta,
} from '../../../services/tableBuilderService';

interface Props {
  data: any;
  meta: PublicationMeta;
  dataKeys: string[];
  description: { type: string; body: string };
}

export class SummaryRenderer extends React.Component<Props> {
  public render() {
    let indicators: any = {};
    let indicatorMeta: any = {};
    const dataKeys = this.props.dataKeys;

    if (this.props.data) {
      const characteristicsData: CharacteristicsData = this.props.data;

      const result = [...characteristicsData.result];

      result.sort((a, b) =>
        a.timePeriod < b.timePeriod ? -1 : a.timePeriod > b.timePeriod ? 1 : 0,
      );

      const latest = result[result.length - 1];
      indicators = latest.indicators;
      indicatorMeta = Array.prototype
        .concat(...Object.values(this.props.meta.indicators))
        .reduce((allMeta, next) => ({ ...allMeta, [next.name]: next }), {});
    } else {
      dataKeys.forEach(key => {
        indicators[key] = '';
        indicatorMeta[key] = { label: key, unit: '' };
      });
    }

    return (
      <div>
        <div className="dfe-dash-tiles dfe-dash-tiles--3-in-row">
          {dataKeys.map((key, index) => (
            <div className="dfe-dash-tiles__tile" key={`${key}_${index}`}>
              <h3 className="govuk-heading-m dfe-dash-tiles__heading">
                {indicatorMeta[key].label}
              </h3>
              <p className="govuk-heading-xl govuk-!-margin-bottom-2">
                {indicators[key]}
                {indicatorMeta[key].unit}
              </p>
              <Details summary={`What is ${indicatorMeta[key].label}?`}>
                Overall absence is the adipisicing elit. Dolorum hic nobis
                voluptas quidem fugiat enim ipsa reprehenderit nulla.
              </Details>
            </div>
          ))}
        </div>
        {this.props.description.body !== '' ? (
          <ReactMarkdown source={this.props.description.body} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
