import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import './App.scss';
import { Entry } from './interfaces/interfaces';
import { entryData } from './datasets/datasets';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';


interface combinedEntry {
        id: number,
        total: number,
        date: string,
        time: string
}

function App() {

  const [entries, setEntries] = useState<Entry[]>(entryData);
  const [combinedEntries, setCombinedEnries] = useState<any[]>([]);

  

  useEffect(() => {
    // console.log('entries', entries)
    updateCombinedEntries();
  }, [entries]);

  const updateCombinedEntries = () => {
    let splitDate;
    // need to compare entry dates and filter out different dates
    // then combine all entry word counts together into one day object
    // this gets passed down to calendar and then rendered (somehow)
    // console.log('updateCombinedEntries! -entries array -', entries)
    entries.reduce((acc, entry) => {
      let splitDate = entry.date.split('-');
      let monthObj = {}
      
      // if (!monthObj[splitDate[0]]) {
      //   console.log('splitDate[0]', splitDate[0])  
      // }
      // console.log('split', splitDate)
      // console.log('entry', entry)

      return acc;
    }, {})
  }

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
