import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';
import './App.scss';
import { Entry } from './interfaces/interfaces';
import { entryData } from './datasets/datasets';
import { format, subDays } from 'date-fns';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Stats from './stats/Stats';
import WordTracker from './tracker/WordTracker';
import Timer from './timer/Timer';
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';

import "chart.js/auto";

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

  
  return (
    <div className="main-app-container">
      <div className='sidebar'>
        <div className='app-title'>
          <FaPenFancy />
          Write On!
          </div>
        <Calendar combinedEntries={combinedEntries} setEntries={setEntries}/>
        <WordTracker setEntries={setEntries} />
        <Header />
      </div>
      <div className='content-right'>
        <div className='header'>
          <Timer />
        </div>
        {/* <div className='test'></div> */}
        <Routes>
          <Route path="/stats" element={ <Stats combinedEntries={combinedEntries} /> } />
          {/* <Route path="/" element={ <Dashboard /> } />`
          <Route path="activeGoals" element={ <ActiveGoals /> } />
          <Route path="warmup" element={ <Warmup /> } />
          <Route path="profile" element={ <Profile /> } /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;