import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './layouts/AppLayout';
import { AuthRoute } from './components/AuthRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import ItineraryBuilder from './pages/ItineraryBuilder';
import Budget from './pages/Budget';
import MyTrips from './pages/MyTrips';
import ShareTrip from './pages/ShareTrip';
import PublicTripView from './pages/PublicTripView';
import Explore from './pages/Explore';
import Saved from './pages/Saved';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/public/trips/:slug" element={<PublicTripView />} />

          {/* Protected Routes inside AppLayout */}
          <Route element={<AuthRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trips" element={<MyTrips />} />
              <Route path="/trips/new" element={<CreateTrip />} />
              <Route path="/trips/:id/itinerary" element={<ItineraryBuilder />} />
              <Route path="/trips/:id/budget" element={<Budget />} />
              <Route path="/trips/:id/share" element={<ShareTrip />} />
              
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
