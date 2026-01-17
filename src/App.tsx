import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import {Entry} from './interfaces/interfaces';
import { entryData } from './datasets/datasets';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';

function App() {

  const [entries, setEntries] = useState<Entry[]>(entryData);
  

  useEffect(() => {
    console.log('entries', entries)
  }, [entries]);

  return (
    <div className="main-app-container">
      <Header setEntries={setEntries}/>
      <Calendar entries={entries}/>
      <Routes>
        {/* <Route path="/" element={ <Dashboard /> } />
        <Route path="activeGoals" element={ <ActiveGoals /> } />
        <Route path="warmup" element={ <Warmup /> } />
        <Route path="profile" element={ <Profile /> } /> */}
      </Routes>
    </div>
  );
}

export default App;
