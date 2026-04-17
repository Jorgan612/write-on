import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { FaPenFancy, FaCoffee, FaCog } from 'react-icons/fa';
import { Entry, User } from './interfaces/interfaces';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Stats from './stats/Stats';
import WordTracker from './tracker/WordTracker';
import Timer from './timer/Timer';
import Warmup from './warm-up/Warmup';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import LandingPage from './landingPage/LandingPage';
import Signup from './signup/Signup';
import Login from './login/Login';
import './App.scss';
import "chart.js/auto";


const user: User = {
    id: 612,
    name: 'Jessica',
    username: 'Jesso',
    email: 'Jorgan612@gmail.com',
    password: '123456',
    pronouns: 'She/Her',
    bio: 'bookworm | game enthusiast | perpetually curious',
    joined: 'January 1st, 2026',
    userIcon: {icon: FaCoffee, id: 'coffee', color: '#94a3b8'},
    website: {
        name: 'jessoportfolio',
        url: 'https://jess-o-portfolio.vercel.app/',
    },
    socials: [{
        id: 1,
        handle: 'jessowrites.bsky.social',
        url: 'https://bsky.app/profile/jessowrites.bsky.social'
    },
    {
        id: 2,
        handle: 'jess.o.writes',
        url: 'https://instagram.com'
    }],
    goals: [{
        name: 'Weekly Word Count',
        id: '1',
        total: 3000,
        current: 0,
        type: 'word(s)'
      },
      {
        name: 'Weekly Session Frequency ',
        id: '2',
        total: 4,
        current: 0,
        type: 'day(s)'
      },
      {
        name: 'Overall Word Count',
        id: '3',
        total: 90000,
        current: 0,
        type: 'word(s)'
      }],
    entries: [],
};

function App() {
  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser  = localStorage.getItem(`user_info`);
    return savedUser ? JSON.parse(savedUser) : user;
  });

  const combinedEntries = useMemo(() => {
    if (!currentUser?.entries) return {};
    return currentUser.entries.reduce((acc: Record<string, number>, entry) => {
      acc[entry.date] = (acc[entry.date] || 0) + entry.total;
      return acc;
    }, {})
  }, [currentUser?.entries]);

  if (!currentUser) {
    console.log('No user data!');
  };
  
  useEffect(() => {
      localStorage.setItem("user_info", JSON.stringify(currentUser));
      localStorage.setItem(`user_${currentUser.id}`, JSON.stringify(currentUser));
  }, [currentUser]);

  const handleSetEntries = (updateFn: (prev: Entry[]) => Entry[]) => {
    setCurrentUser(prevUser => {
      const updatedEntries = updateFn(prevUser.entries || []);
      return {
        ...prevUser,
        entries: updatedEntries
      };
    });
  };

  const handleLogOut = () => {
    setSignedIn(false);
    navigate('/login');
  };

  if (!signedIn) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setSignedIn={setSignedIn} />} />
        <Route path="/signup" element={<Signup setSignedIn={setSignedIn} />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    )
  }
  
  return (
    <div className="main-app-container">
      <div className='sidebar'>
        <div className='app-title'>
          Write On
          <FaPenFancy />
          </div>
        <Calendar combinedEntries={combinedEntries} setEntries={handleSetEntries}/>
        <WordTracker setEntries={handleSetEntries} combinedEntries={combinedEntries} />
        <Header />
      </div>
      <div className='content-right'>
        <div className='header'>
          <Timer />
          <div className='top-right-corner'>
            <button onClick={handleLogOut}>Log out</button>
            <FaCog className='icon' />
          </div>
        </div>

        <Routes>
          {signedIn ? (
            <>
              <Route path="/stats" element={ <Stats combinedEntries={combinedEntries} /> } />
              <Route path="warmup" element={ <Warmup /> } />
              <Route path="profile" element={ <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} /> } />
              <Route path="/dashboard" element={ <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} combinedEntries={combinedEntries}/> } />
            </>
          ) : (
            <Route path="*" element={<LandingPage />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;