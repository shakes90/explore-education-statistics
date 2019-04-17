import Details from '@common/components/Details';
import Link from '@frontend/components/Link';
import React from 'react';
import { Area, AreaChart } from 'recharts';

const chartData = [
  { name: '2012/13', overall: Math.random() * 2 + 4 },
  { name: '2013/14', overall: Math.random() * 2 + 4 },
  { name: '2014/15', overall: Math.random() * 2 + 4 },
  { name: '2015/16', overall: Math.random() * 2 + 4 },
  { name: '2016/17', overall: Math.random() * 2 + 4 },
];

interface Props {
  heading: string;
  subheading: string;
  percent: string;
}

const PrototypeTileWithChart = ({ heading, subheading, percent }: Props) => (
  <div className="dfe-dash-tiles__tile">
    <h2 className="govuk-heading-m">
      <Link to="/prototypes/publication">{heading}</Link>
    </h2>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-half">
        <h2 className="govuk-heading-s">{subheading}</h2>
        <AreaChart
          width={200}
          height={70}
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 15 }}
        >
          <Area
            type="linear"
            dataKey="overall"
            stroke="#208279"
            fill="#28A197"
            strokeWidth="1"
            unit="%"
            activeDot={{ r: 3 }}
          />
        </AreaChart>
        <span className="govuk-heading-xl govuk-!-margin-bottom-0 govuk-caption-increase-negative">
          {percent}
        </span>
        <p className="govuk-body">
          <strong className="increase">
            +0.4
            <abbr aria-label="Percentage points" title="Percentage points">
              ppt
            </abbr>
          </strong>
          more than 2015/16
        </p>
      </div>
      <div className="govuk-grid-column-one-half">
        <div className="govuk-body-s">
          <ul>
            <li>
              On average in 2016/17,{' '}
              <strong>pupils missed 8.2 school days</strong>
            </li>
            <li>
              Overall and unauthorised absence rates have{' '}
              <strong>increased</strong> since last year
            </li>
            <li>
              <strong>One in ten</strong> pupils was persistently absent during
              the academic year 2016/17
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Details summary="What does this mean?">
      Permanent exclusion rate is the adipisicing elit. Dolorum hic nobis
      voluptas quidem fugiat enim ipsa reprehenderit nulla.
    </Details>

    <hr />

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-half">
        <ul className="govuk-list govuk-body-s">
          <li>
            <a className="govuk-link" href="/local-authorities/sheffield">
              View report
            </a>
          </li>
          <li>
            <a className="govuk-link" href="/local-authorities/sheffield">
              Download data
            </a>
          </li>
        </ul>
      </div>
      <div className="govuk-grid-column-one-half">
        <ul className="govuk-list govuk-body-s">
          <li>
            <a className="govuk-link" href="/local-authorities/sheffield">
              Visualise data
            </a>
          </li>
          <li>
            <a className="govuk-link" href="/local-authorities/sheffield">
              Create your own dataset
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default PrototypeTileWithChart;
