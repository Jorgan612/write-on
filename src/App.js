import logo from './assets/wo_logo2.png';
import './App.scss';
import Header from './header/header';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <div className="main-app-container">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
