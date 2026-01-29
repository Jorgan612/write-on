import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import { Entry } from './interfaces/interfaces';
import { entryData } from './datasets/datasets';
import { format, subDays } from 'date-fns';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Stats from './stats/Stats';
import WordTracker from './tracker/WordTracker';
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';

import "chart.js/auto";
import { Line } from "react-chartjs-2";


function App() {

  const [entries, setEntries] = useState<Entry[]>(entryData);
  const [combinedEntries, setCombinedEntries] = useState<Record<string, number>>({});

  useEffect(() => {
    const dayTotal = entries.reduce((acc: Record<string, any>, entry) => {
      acc[entry.date] = (acc[entry.date] || 0) + entry.total;
      return acc;
    }, {});
    setCombinedEntries(dayTotal);
  }, [entries]);


const updateWordCountGraph = () => {
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
  
  return (
    <div className="main-app-container">
      <div className='top'>
        <Calendar combinedEntries={combinedEntries}/>
        <WordTracker setEntries={setEntries} setCombinedEntries={setCombinedEntries} />
        <div className='graph-container'>
          {Object.keys(combinedEntries).length > 0 ? (
            <Line data={updateWordCountGraph()} />
          ) : (
            <p>No data recorded yet. Start writing!</p>
          )}
        </div>
        <Header />
        {/* <Link to={'/stats'} key={'stats'}>
          <div onClick={() => {handleMenuClick(option.id)}} className='menu-item' >{option.name}</div>
        </Link> */}
      </div>
      {/* <div className='test'></div> */}
      <Routes>
        <Route path="/stats" element={ <Stats /> } />
        {/* <Route path="/" element={ <Dashboard /> } />`
        <Route path="activeGoals" element={ <ActiveGoals /> } />
        <Route path="warmup" element={ <Warmup /> } />
        <Route path="profile" element={ <Profile /> } /> */}
      </Routes>
    </div>
  );
}

export default App;