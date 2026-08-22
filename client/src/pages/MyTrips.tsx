import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar as CalendarIcon, Trash2, ExternalLink, ArrowRight, Compass, Wallet, LayoutGrid, List, Briefcase } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trips');
        setTrips(response.data.trips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this trip?')) return;
    
    try {
      await api.delete(`/trips/${id}`);
      setTrips(trips.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Trips</h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">Manage and revisit your adventures.</p>
        </div>
        <Button onClick={() => navigate('/trips/new')} className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200">
          <Plus className="h-4 w-4" /> New Trip
        </Button>
      </div>

      {/* Hero Banner (Always visible or conditional?) We will show it as a beautiful CTA */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm p-8 md:p-12">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
            No trips planned yet ✨
          </h2>
          <p className="text-gray-600 mb-6 font-medium">
            Every great journey begins with a plan.<br/>
            Start planning your next big adventure today!
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2" onClick={() => navigate('/trips/new')}>
            Create Your First Trip <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1000&auto=format&fit=crop" 
            alt="Travel illustration" 
            className="w-full h-full object-cover rounded-l-full opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Trips Planned</p>
              <h3 className="text-2xl font-bold text-gray-900">{trips.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Places to Visit</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0)}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Days of Adventure</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {trips.reduce((acc, t) => acc + Math.ceil((new Date(t.endDate).getTime() - new Date(t.startDate).getTime()) / (1000*60*60*24)), 0)}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Budget</p>
              <h3 className="text-2xl font-bold text-gray-900">₹0</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Trips */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 relative">
            Your Trips
            <span className="absolute -bottom-2.5 left-0 w-full h-1 bg-blue-600 rounded-t-full" />
          </h2>
          <div className="flex items-center gap-2">
            <select className="text-sm border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Sort by: Latest</option>
              <option>Sort by: Oldest</option>
            </select>
            <div className="flex bg-gray-100 rounded-md p-0.5">
              <button className="p-1.5 bg-blue-600 text-white rounded-md shadow-sm"><LayoutGrid className="h-4 w-4" /></button>
              <button className="p-1.5 text-gray-500 hover:text-gray-700"><List className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading trips...</div>
        ) : trips.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center bg-gray-50/50">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No trips yet!</h3>
            <p className="text-gray-500 text-sm max-w-sm text-center">
              Looks like you haven't planned any trips yet. Create your first trip and start building memories!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full border-gray-200">
                <div className="h-48 bg-gray-200 relative cursor-pointer overflow-hidden" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                  <img 
                    src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'} 
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 font-bold text-white text-xl truncate">
                    {trip.name}
                  </h3>
                  {trip.isPublic && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold px-2 py-1 rounded">
                      Public
                    </div>
                  )}
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1 cursor-pointer" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{trip.stops?.length || 0} Cities</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/trips/${trip.id}/share`)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={(e) => handleDelete(e, trip.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Need Inspiration Section */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Need Inspiration?</h2>
          <a href="/explore" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center">
            View all destinations <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Paris', country: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop' },
            { name: 'Rome', country: 'Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop' },
            { name: 'Tokyo', country: 'Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop' },
            { name: 'Bali', country: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop' },
            { name: 'Dubai', country: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&auto=format&fit=crop' }
          ].map((dest) => (
            <div key={dest.name} className="relative group rounded-xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button className="absolute top-2 right-2 h-6 w-6 bg-white/90 rounded text-blue-600 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50">
                <Plus className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-bold text-sm leading-tight">{dest.name}</h3>
                <p className="text-white/80 text-[10px] font-medium uppercase tracking-wider">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
