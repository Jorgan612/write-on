import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './header/Header.js'
import Dashboard from './dashboard/Dashboard';
import ActiveGoals from './goals/ActiveGoals.js';
import Warmup from './warm-up/Warmup.js';
import Profile from './profile/Profile.js';

function App() {
  return (
    <div className="main-app-container">
      <Header />
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="activeGoals" element={ <ActiveGoals /> } />
        <Route path="warmup" element={ <Warmup /> } />
        <Route path="profile" element={ <Profile /> } />
      </Routes>
    </div>
  );
}

export default App;
