import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Mail, Lock, Eye, EyeOff, ArrowRight, Map, MapPin, Users, Shield, Globe, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Login Form */}
      <div className="flex flex-col flex-1 relative bg-white">
        {/* Dotted path background decoration */}
        <div className="absolute top-10 left-10 right-10 flex justify-between items-start pointer-events-none opacity-20">
          <svg width="100%" height="150" viewBox="0 0 1000 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 Q 250 50, 500 100 T 1000 50" stroke="#2563eb" strokeWidth="2" strokeDasharray="8 8" fill="none" />
          </svg>
          <Plane className="absolute top-[40px] right-[10%] text-blue-600 h-8 w-8 rotate-12" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-[420px] relative z-10">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <span className="flex items-center gap-2 text-3xl font-extrabold text-blue-700">
                <Plane className="h-8 w-8" /> GlobeTrotter
              </span>
              <p className="mt-1 text-xs font-semibold text-gray-500 uppercase tracking-widest">Plan. Explore. Experience.</p>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                Welcome back <span className="text-yellow-400">👋</span>
              </h1>
              <p className="text-gray-500 font-medium">Log in to continue your adventure.</p>
            </div>

            <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-gray-100 rounded-2xl">
              <div className="flex border-b border-gray-100">
                <div className="flex-1 text-center py-4 border-b-2 border-blue-600 font-bold text-blue-700">
                  Login
                </div>
                <Link to="/signup" className="flex-1 text-center py-4 text-gray-400 hover:text-gray-700 font-bold transition-colors">
                  Sign Up
                </Link>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-gray-900">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-xl border-0 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-gray-900">
                        Password
                      </label>
                      <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-6 rounded-xl font-bold text-base shadow-md shadow-blue-200 gap-2 transition-transform active:scale-[0.98]" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'} <ArrowRight className="h-5 w-5" />
                  </Button>

                  <div className="mt-6 text-center text-sm font-semibold text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer features */}
        <div className="pb-8 px-8 hidden sm:flex justify-center gap-12 mt-auto text-center border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Secure & Private</h4>
            <p className="text-xs font-medium text-gray-500">Your data is safe with us</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <Globe className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Explore the World</h4>
            <p className="text-xs font-medium text-gray-500">Discover amazing places</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Build Memories</h4>
            <p className="text-xs font-medium text-gray-500">Plan trips you'll love</p>
          </div>
        </div>

      </div>
      
      {/* Right side - The Water Image Cover */}
      <div className="relative hidden w-0 flex-1 lg:block overflow-hidden bg-gray-900">
        <img
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
          src="/water.png"
          alt="Water and mountain scenery"
        />
      </div>
    </div>
  );
}
