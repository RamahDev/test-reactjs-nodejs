import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const Chart = (props) => {
  const {
    title,
    xAxisDataKey,
    yAxisDataKey,
    data,
    height,
    width,
    filter,
    overall,
    onFilterChange,
    theme: { background, foreground, accent },
  } = props;
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(0);
  const handleFilterClick = (index) => {
    setSelectedFilterIndex(index);
    onFilterChange({ filter: filter[index]?.value });
  };

  return (
    <div
      className="flex p-8 rounded-lg shadow-lg divide-x"
      style={{ background, minHeight: '250px' }}
    >
      <div
        className="w-1/3 flex flex-col justify-center text-center space-y-2 mr-8"
        style={{ color: foreground }}
      >
        <h4 className="text-sm">{title}</h4>
        <h1 className="text-4xl font-medium">{overall}</h1>
      </div>

      <div className="w-2/3 flex flex-col">
        <div className="mb-6 pl-8 flex items-center justify-between" style={{ color: foreground }}>
          {filter.map(({ value, label }, index) => (
            <button
              key={value}
              type="button"
              className={`${
                index === selectedFilterIndex ? 'bg-white text-green-400 rounded-full px-2' : ''
              }`}
              onClick={() => handleFilterClick(index)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1">
          <ResponsiveContainer height={height} width={width}>
            <AreaChart data={data} style={{ fontSize: 10 }}>
              <XAxis dataKey={xAxisDataKey} stroke={foreground} />
              <YAxis stroke={foreground} style={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="natural"
                dataKey={yAxisDataKey}
                stroke={accent || foreground}
                fill={foreground}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

Chart.propTypes = {
  title: PropTypes.string,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  xAxisDataKey: PropTypes.string.isRequired,
  yAxisDataKey: PropTypes.string.isRequired,
  overall: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.shape({
    background: PropTypes.string,
    foreground: PropTypes.string,
    accent: PropTypes.string,
  }),
  filter: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onFilterChange: PropTypes.func,
};

Chart.defaultProps = {
  title: '',
  data: [],
  filter: [],
  overall: '100',
  theme: {
    background: '#58A618',
    foreground: '#fff',
    accent: '#ccc',
  },
  onFilterChange: () => {},
};
