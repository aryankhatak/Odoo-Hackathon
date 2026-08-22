import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Plane, Compass, Globe2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect to dashboard (Commented out temporarily so you can preview the page)
  /*
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  */

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col">
      {/* Background Animated Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
          alt="Travel Background" 
          className="w-full h-full object-cover opacity-60 animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white font-bold text-2xl">
          <Plane className="h-8 w-8 text-blue-400" />
          <span>GlobeTrotter</span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" onClick={() => navigate('/login')}>
            Log In
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-[-10vh]">
        <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold tracking-wide text-sm mb-6 inline-flex items-center gap-2">
          <Globe2 className="h-4 w-4" /> Discover the World
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          It's time to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">travel.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light">
          Pack your bags, embark on new adventures, and explore the beauty of the world. Let your wanderlust guide you to unforgettable memories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 border-none rounded-full flex items-center gap-2 shadow-xl shadow-blue-900/20" onClick={() => navigate('/signup')}>
            Start Planning For Free <Compass className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
