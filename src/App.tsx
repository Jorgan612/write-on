import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';
import {Entry} from './interfaces/interfaces';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';

function App() {

  const [entries, setEntries] = useState<Entry[]>([]);
  

  useEffect(() => {
    // console.log('entries', entries)
  }, [entries]);

  return (
    <div className="main-app-container">
      <Header setEntries={setEntries}/>
      <Calendar entries={entries}/>
      {/* <div className='dark1'>Dark 1</div>
      <div className='dark2'>Dark 2</div>
      <div className='dark3'>Dark 3</div>
      <div className='dark4'>Dark 4</div>
      <div className='dark5'>Dark 5</div> */}
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
