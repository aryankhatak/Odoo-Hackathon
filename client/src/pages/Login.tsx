import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center mb-8">
            <span className="flex items-center gap-2 text-3xl font-bold text-blue-600">
              <Plane className="h-8 w-8" /> GlobeTrotter
            </span>
            <p className="mt-2 text-sm text-gray-600">Plan, Explore, Experience.</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex gap-4 border-b border-gray-100 pb-4 mb-2">
                <div className="w-1/2 text-center pb-2 border-b-2 border-blue-600 font-semibold text-blue-600">
                  Login
                </div>
                <Link to="/signup" className="w-1/2 text-center pb-2 text-gray-500 hover:text-gray-700 font-medium cursor-pointer">
                  Sign Up
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Email address
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                      Forgot Password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                <div className="mt-6 text-center text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Right side - Animated Image Cover */}
      <div className="relative hidden w-0 flex-1 lg:block overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="Scenic travel background"
        />
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
      </div>
    </div>
  );
}
