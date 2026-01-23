import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import './App.scss';
import { Entry, CombinedEntry } from './interfaces/interfaces';
import { entryData } from './datasets/datasets';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';


function App() {

  const [entries, setEntries] = useState<Entry[]>(entryData);
  const [combinedEntries, setCombinedEntries] = useState<Record<string, number>>({});
  const [months, setMonths] = useState([])

  

  useEffect(() => {
    updateCombinedEntries();
  }, [entries]);

  const updateCombinedEntries = () => {
    
    const dayTotal = entries.reduce((acc: Record<string, any>, entry) => {

      if (!acc[entry.date]) {
        acc[entry.date] = entry.total;
      } else {
        acc[entry.date] += entry.total;
      }

      return acc;
    }, {})
    setCombinedEntries(dayTotal)
  }

  return (
    <div className="main-app-container">
      <Header setEntries={setEntries} setCombinedEntries={setCombinedEntries}/>
      <Calendar combinedEntries={combinedEntries}/>
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
