import './Stats.scss';
import { format, subDays, getMonth, startOfYear, addDays, isLeapYear } from 'date-fns';
import "chart.js/auto";
import { Line } from "react-chartjs-2";

interface StatsProps {
    combinedEntries: Record<string, number>;
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 12,
        font: {
          size: 16,
          weight: 400,
        },
        color: '#94a3b8',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 14,
          weight: 400
        },
        color: '#94a3b8',
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
} as const;


function Stats({combinedEntries}: StatsProps) {
  
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
  const lastThirtyDays = Array.from({ length: 30 }).map((_, i) => {
    return subDays(new Date(), 29 - i);
  });

  const displayLabels = lastThirtyDays.map(date => format(date, 'MMM d'));

  const totals = lastThirtyDays.map(date => {
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

const updateYearWordCount = () => {
  const totalDays = isLeapYear(new Date()) ? 366 : 365;
  const startDate = startOfYear(new Date());


  const calendarYear = Array.from({ length: totalDays }).map((_, i) => {
    return addDays(startDate, i);
  });

  const displayLabels = calendarYear.map(date => format(date, 'MMM'));

  const totals = calendarYear.map(date => {
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
        width: '100%',
        tension: 0.3,
        fill: true,
      },
    ],
  };
}


return (
    <div className="stats-container">
        <div className='graph-container'>
            <p>7 day overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateSevenDayWordCount()} options={chartOptions} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <div className='graph-container'>
            <p>30 day overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateMonthWordCount()} options={chartOptions} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <div className='graph-container full-year'>
            <p>Year overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateYearWordCount()} options={chartOptions} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
    </div>
    )
}


export default Stats;