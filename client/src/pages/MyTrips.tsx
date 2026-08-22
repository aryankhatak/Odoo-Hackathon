import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar as CalendarIcon, Trash2, ExternalLink } from 'lucide-react';
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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and revisit your adventures.</p>
        </div>
        <Button onClick={() => navigate('/trips/new')} className="gap-2">
          <Plus className="h-4 w-4" /> New Trip
        </Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading trips...</div>
      ) : trips.length === 0 ? (
        <Card className="bg-gray-50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No trips planned yet</h2>
            <p className="text-gray-500 mb-6">Start planning your next big adventure today.</p>
            <Button size="lg" onClick={() => navigate('/trips/new')}>Create Your First Trip</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
              <div className="h-40 bg-gray-200 relative cursor-pointer" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                <img 
                  src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'} 
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{trip.stops?.length || 0} Cities</span>
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
  );
}
