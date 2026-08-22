import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Mail, Shield, Camera } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your personal information.</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-3xl overflow-hidden">
                {user?.photoUrl ? (
                  <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0).toUpperCase() || <User className="h-10 w-10" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" /> {user?.email}
              </p>
              <div className="mt-4 pt-4 flex gap-3 justify-center md:justify-start">
                <Button variant="outline" size="sm">Edit Profile</Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Change Password</Button>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" /> Security
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Two-factor Authentication</span>
                  <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">Disabled</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Active Sessions</span>
                  <span className="text-xs font-semibold text-gray-500">1 device</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
