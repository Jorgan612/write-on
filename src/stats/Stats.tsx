import './Stats.scss';
import { format, subDays, getMonth } from 'date-fns';
import "chart.js/auto";
import { Line } from "react-chartjs-2";

interface StatsProps {
    combinedEntries: Record<string, number>;
}

function Stats({combinedEntries}: StatsProps) {
    console.log('combinedEntries', combinedEntries)

const updateSevenDayWordCount = () => {
  const lastSevenDays = Array.from({ length: 7 }).map((_, i) => {
    return subDays(new Date(), 6 - i);
  });

  const displayLabels = lastSevenDays.map(date => format(date, 'MMM d'));

  const totals = lastSevenDays.map(date => {
    const dateString = format(date, 'yyyy-MM-dd');
    return combinedEntries[dateString] || 0;
  });

  return {
    labels: displayLabels,
    datasets: [
      {
        label: 'Words',
        data: totals,
        borderColor: '#527199',
        backgroundColor: '#263b56',
        tension: 0.3,
        fill: true,
      },
    ],
  };
};

const updateMonthWordCount = () => {
    // logic for month graph
    const lastThirtynDays = Array.from({ length: 30 }).map((_, i) => {
    return subDays(new Date(), 30 - i);
  });

  const displayLabels = lastThirtynDays.map(date => format(date, 'MMM d'));

  const totals = lastThirtynDays.map(date => {
    const dateString = format(date, 'yyyy-MM-dd');
    return combinedEntries[dateString] || 0;
  });

  return {
    labels: displayLabels,
    datasets: [
      {
        label: 'Words',
        data: totals,
        borderColor: '#527199',
        backgroundColor: '#263b56',
        tension: 0.3,
        fill: true,
      },
    ],
  };
}


return (
    <div className="stats-container">
        <div className='graph-container'>
            <p>Last 7 days overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateSevenDayWordCount()} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <div className='graph-container'>
            <p>Last 30 days overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateMonthWordCount()} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <div className='graph-container full-year'>
            <p>Year overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateMonthWordCount()} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
    </div>
    )
}


export default Stats;