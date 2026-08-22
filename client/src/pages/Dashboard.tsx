import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tripsRes, citiesRes] = await Promise.all([
          api.get('/trips'),
          api.get('/cities?search=') // fetch some popular cities
        ]);
        setTrips(tripsRes.data.trips.slice(0, 3)); // top 3 trips
        setCities(citiesRes.data.cities.slice(0, 4)); // top 4 cities
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">Ready for your next adventure?</p>
        </div>
        <Button onClick={() => navigate('/trips/new')} className="gap-2">
          <Plus className="h-4 w-4" /> Plan New Trip
        </Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading dashboard...</div>
      ) : (
        <>
          {/* Upcoming Trips Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Trips</h2>
              <Link to="/trips" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            
            {trips.length === 0 ? (
              <Card className="bg-gray-50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Plane className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">You don't have any upcoming trips.</p>
                  <Button variant="link" onClick={() => navigate('/trips/new')} className="mt-2">
                    Create your first trip
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <Card key={trip.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/trips/${trip.id}/itinerary`)}>
                    <div className="h-32 bg-gray-200 relative">
                      <img 
                        src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'} 
                        alt={trip.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 truncate">{trip.name}</h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500 gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500 gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.stops?.length || 0} Cities</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Popular Destinations Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Popular Destinations</h2>
              <Link to="/explore" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cities.map((city) => (
                <div key={city.id} className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square">
                  <img 
                    src={city.imageUrl || `https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80`} 
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold">{city.name}</h3>
                    <p className="text-white/80 text-xs">{city.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Stats (Mockup feature) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Budget Overview</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">₹1,75,000</p>
                      <p className="text-xs text-gray-500">Total Spent (All Trips)</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">₹25,000</p>
                      <p className="text-xs text-gray-500">Remaining Budget</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-50 border-orange-100">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Trips Summary</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
                      <p className="text-xs text-gray-500">Total Trips</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">18</p>
                      <p className="text-xs text-gray-500">Cities Visited</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}
