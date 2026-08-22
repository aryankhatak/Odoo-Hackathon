import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Plane, Map, Heart, Calendar, User, Settings, LogOut } from 'lucide-react';
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

  const bottomNavItems = [
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center px-6">
          <span className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Plane className="h-6 w-6" /> GlobeTrotter
          </span>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 px-3 py-4 space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
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
              <img src={user.photoUrl} alt={user.name} className="h-8 w-8 rounded-full bg-gray-200" />
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
