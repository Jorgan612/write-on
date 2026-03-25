import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPenFancy } from 'react-icons/fa';
import './App.scss';
import { Entry } from './interfaces/interfaces';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Stats from './stats/Stats';
import WordTracker from './tracker/WordTracker';
import Timer from './timer/Timer';
import Warmup from './warm-up/Warmup';
// import Dashboard from './dashboard/dashboard';
// import ActiveGoals from './goals/ActiveGoals';
// import Profile from './profile/Profile';

import "chart.js/auto";

function App() {

  const [entries, setEntries] = useState<Entry[]>(() => {
    const entry = localStorage.getItem("user_entry");
    return entry ? JSON.parse(entry) : [];
  });
  const [combinedEntries, setCombinedEntries] = useState<Record<string, number>>({});

  useEffect(() => {
    localStorage.setItem("user_entry", JSON.stringify(entries));

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
        <WordTracker setEntries={setEntries} combinedEntries={combinedEntries} />
        <Header />
      </div>
      <div className='content-right'>
        <div className='header'>
          <Timer />
        </div>
        {/* <div className='test'></div> */}
        <Routes>
          <Route path="/stats" element={ <Stats combinedEntries={combinedEntries} /> } />
          <Route path="warmup" element={ <Warmup /> } />
          {/* <Route path="/" element={ <Dashboard /> } />`
          <Route path="activeGoals" element={ <ActiveGoals /> } />
          <Route path="profile" element={ <Profile /> } /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;