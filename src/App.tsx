import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import Header from './header/header'
import Dashboard from './dashboard/dashboard';
import ActiveGoals from './goals/ActiveGoals';
import Warmup from './warm-up/Warmup';
import Profile from './profile/Profile';

function App() {

  useEffect(() => {
  }, []);

  return (
    <div className="main-app-container">
      <Header />
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
