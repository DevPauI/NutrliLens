import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Auth/Registration';
import LandingPage from './components/Auth/LandingPage';
import Login from './components/Auth/Login';
import Home from './components/Dashboard/Home';
import CameraView from './components/Scanner/CameraView';
import AiCoach from './components/Coach/AiCoach';
import FoodLogHelper from './components/Food/FoodLogHelper';
import WorkoutLog from './components/Track/WorkoutLog';
import FitnessHub from './components/Track/FitnessHub';
import Vitamins from './components/Gamification/Vitamins';
import Rewards from './components/Gamification/Rewards';
import Settings from './components/Settings/Settings';
import BottomNav from './components/Layout/BottomNav';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="container" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/scan" element={<CameraView />} />
            <Route path="/coach" element={<AiCoach />} />
            <Route path="/log-food" element={<FoodLogHelper />} />
            <Route path="/log-workout" element={<WorkoutLog />} />
            <Route path="/fitness" element={<FitnessHub />} />
            <Route path="/vitamins" element={<Vitamins />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
