import './Stats.scss';
import { format, subDays, startOfYear, addDays, isLeapYear, eachDayOfInterval } from 'date-fns';
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { getYear } from "date-fns";

const todayLinePlugin = {
  id: 'todayLine',
  afterDraw: (chart: any) => {
    if (!chart.data.datasets[0] || !chart.data.datasets[0].tooltipLabels) return;

    const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;
    const todayStr = format(new Date(), 'MMM d');
    const labels = chart.data.datasets[0].tooltipLabels;
    
    const index = labels.indexOf(todayStr);

    if (index !== -1) {
      const xPos = x.getPixelForValue(index);
      
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#5ea758';
      ctx.lineWidth = 4;
      ctx.setLineDash([5, 5]);
      ctx.moveTo(xPos, top - 40);
      ctx.lineTo(xPos, bottom);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.fillStyle = '#5ea758';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';

      ctx.fillText('Today', xPos + 5, top - 18);

      ctx.restore();
    }
  }
};

interface StatsProps {
    combinedEntries: Record<string, number>;
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 0,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: {
      top: 30,
      bottom: 10
    }
  },
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
    },
    tooltip: {
      callbacks: {
        title: function(context: any) {
          const item = context[0];
          const dataSet = item.dataset;

          if (dataSet.tooltipLabels) {
            return dataSet.tooltipLabels[item.dataIndex];
          }

          return item.label;
        }
      }
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
  };

  const updateYearWordCount = () => {
    const totalDays = isLeapYear(new Date()) ? 366 : 365;
    const startDate = startOfYear(new Date());


    const calendarYear = Array.from({ length: totalDays }).map((_, i) => {
      return addDays(startDate, i);
    });

    const displayLabels = calendarYear.map(date => format(date, 'MMM'));

    const tooltipLabels = calendarYear.map(date => format(date, 'MMM d'));

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
          tooltipLabels: tooltipLabels,
          borderColor: '#527199',
          backgroundColor: '#263b56',
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          hitRadius: 10,
        },
      ],
    };
  };

  const getDailyWordCountAverage = () => {
    const lastSevenDays = Array.from({ length: 7 }).map((_, i) => {
      return subDays(new Date(), 6 - i);
    });

    const formattedDays = lastSevenDays.map(date => format(date, 'yyyy-MM-dd'));
    
    let totalWords = formattedDays.reduce((acc, day) => {
      if (combinedEntries[day]) {
        acc += combinedEntries[day]!;
      } else {
        acc += 0;
      }
      return acc;
    }, 0);

    return Math.ceil(totalWords / 7);
  };

  const getSustainableWordCountAverage = () => {
    return Math.floor(getDailyWordCountAverage() - (getDailyWordCountAverage() * .20));
  };

  const getBestWritingDay  = () => {
    const currentYear = getYear(new Date());
    const totalDays = Object.keys(combinedEntries);
    const bestDay = totalDays.reduce((acc, day) => {
      let dayYear = day.split('-');
      if (acc < combinedEntries[day]! && Number(dayYear[0]) === currentYear) {
        acc = combinedEntries[day]!;
      }
      return acc;
    }, 0);
    
    return bestDay;
  };

  const getTotalDaysLoggedThisYear  = () => {
    const currentYear = getYear(new Date());
    const totalDays = Object.keys(combinedEntries);
    const totalDaysWrittenInCurrentYear = totalDays.reduce((acc, day) => {
      let dayYear = day.split('-');
      
      if (combinedEntries[day] && Number(dayYear[0]) === currentYear) {
        acc += 1;
      }

      return acc;
    }, 0);

    return totalDaysWrittenInCurrentYear;
  };

  const getLongestStreak = () => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    const currentYear = getYear(new Date());
    const todayFormatted = format(today, 'yyyy-MM-dd')
    const daysPassedThisYear = eachDayOfInterval({
      start: startOfYear(today),
      end: combinedEntries[todayFormatted] ? today : yesterday
    }).map(date => format(date, 'yyyy-MM-dd'));

    const totalDaysWrittenConsecutively = daysPassedThisYear.reduce((acc, day) => {
      let dayYear = day.split('-');
      
      if (combinedEntries[day] && Number(dayYear[0]) === currentYear) {
        acc += 1;
      } else {
        acc = 0;
      }

      return acc;
    }, 0);

    return totalDaysWrittenConsecutively;
  };


  return (
    <div className="stats-container">
      <div className='other-stats-container'>
        <div className='stats-basic'>
          <p>Daily Average</p>
          <div className='stat'>
            {getDailyWordCountAverage()}
            <span> {getDailyWordCountAverage() === 1 ? 'word' : 'words'}</span>
          </div>
        </div>
        <div className='stats-basic'>
          <p>Sustainable Average</p>
          <div className='stat'>
            {getSustainableWordCountAverage()}
            <span> {getSustainableWordCountAverage() === 1 ? 'word' : 'words'}</span>
          </div>
        </div>
        <div className='stats-basic'>
          <p>Best Writing Day</p>
          <div className='stat'>
            {getBestWritingDay() || 0}
            <span> {getBestWritingDay() === 1 ? 'word' : 'words'}</span>
          </div>
        </div>
        <div className='stats-basic'>
          <p>Days Written This Year</p>
          <div className='stat'>
            {getTotalDaysLoggedThisYear()}
            <span> {getTotalDaysLoggedThisYear() === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
        <div className='stats-basic'>
          <p>Longest Streak</p>
          <div className='stat'>
            {getLongestStreak()}
            <span> {getLongestStreak() === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
      </div>
      <div className='graph-container'>
        <div className='line-graph'>
            <p>7-day overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateSevenDayWordCount()} options={chartOptions} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <div className='line-graph'>
            <p>30-day overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateMonthWordCount()} options={chartOptions} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <div className='line-graph full-year'>
            <p>Year overview.</p>
            {Object.keys(combinedEntries).length > 0 ? (
              <div className='chart-wrapper'> 
                <Line data={updateYearWordCount()} options={chartOptions} plugins={[todayLinePlugin]} />
              </div>
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
      </div>
    </div>
  )
}


export default Stats;