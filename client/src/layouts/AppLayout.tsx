import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Plane, Map, Heart, Calendar, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/trips', icon: Plane, label: 'My Trips' },
    { to: '/explore', icon: Map, label: 'Explore' },
    { to: '/saved', icon: Heart, label: 'Saved' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
  ];



  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-20 flex-col justify-center px-6 border-b border-gray-100">
          <span className="text-xl font-extrabold text-blue-600 flex items-center gap-2">
            <Plane className="h-6 w-6" /> GlobeTrotter
          </span>
          <p className="text-xs font-medium text-gray-400 mt-0.5 ml-8">Plan. Explore. Repeat.</p>
        </div>
        
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", location.pathname === item.to ? 'text-blue-600' : 'text-gray-400')} />
                {item.label}
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-4 space-y-2">
          {/* User Profile Card */}
          <div className="flex items-center gap-3 p-2 mb-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/profile')}>
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt={user.name} className="h-10 w-10 rounded-full border border-gray-200 object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 font-medium">Traveler</p>
            </div>
          </div>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Map className="w-4 h-4 text-gray-500" />
               </div>
               <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2" placeholder="Search destinations, trips..." />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt={user.name} className="h-8 w-8 rounded-full bg-gray-200 object-cover" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
