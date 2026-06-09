import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { FaPenFancy, FaCoffee, FaCog } from 'react-icons/fa';
import { Entry, UsersList, User } from './interfaces/interfaces';
import { RequireAuth } from './requireAuth/RequireAuth';
import Header from './header/header'
import Calendar from './calendar/Calendar';
import Stats from './stats/Stats';
import WordTracker from './tracker/WordTracker';
import Timer from './timer/Timer';
import Warmup from './warm-up/Warmup';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import CreateGroup from './createGroup/CreateGroup';
import LandingPage from './landingPage/LandingPage';
import Signup from './signup/Signup';
import Login from './login/Login';
import ForgotPassword from './forgotPassword/ForgotPassword';
import ResetPassword from './resetPassword/ResetPassword';
import './App.scss';
import "chart.js/auto";



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const [usersList, setUsersList] =  useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser  = localStorage.getItem(`user_info`);
    return savedUser ? JSON.parse(savedUser) : {};
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
    if (
      !signedIn && location.pathname  === '/dashboard' ||
      !signedIn && location.pathname  === '/stats' ||
      !signedIn && location.pathname  === '/warmup' ||
      !signedIn && location.pathname  === '/profile'
    ) {
        navigate('/login', { replace: true });
    }
  }, [signedIn, location.pathname, navigate]);
  
  useEffect(() => {
    if (currentUser && currentUser.id) {
      localStorage.setItem("user_info", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (signedIn) {
      fetchUsers();
    }
  }, [signedIn]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Network response is not ok.');

      const data: User[] = await response.json();
      setUsersList(data);

    } catch (error) {
      console.error('Could not fetch users:', error);
    }
  }

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
    localStorage.clear();
    setSignedIn(false);
    setCurrentUser({} as User);
    navigate('/login', { replace: true });
  };

  if (!signedIn) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setSignedIn={setSignedIn} />} />
        <Route path="/signup" element={<Signup setSignedIn={setSignedIn} />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
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
            <>
              <Route path="/stats" element={ <Stats combinedEntries={combinedEntries} /> } />
              <Route path="warmup" element={ <Warmup /> } />
              <Route path="profile" element={ <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} /> } />
              <Route path='/create-group' element={ <CreateGroup currentUser={currentUser} />} />
              <Route path="/dashboard" element={ 
                <RequireAuth>
                  <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} combinedEntries={combinedEntries} users={usersList}/> 
                </RequireAuth>
                } />
              <Route path='*' element={ <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} combinedEntries={combinedEntries} users={usersList}/> } />
            </>
        </Routes>
      </div>
    </div>
  );
}

export default App;