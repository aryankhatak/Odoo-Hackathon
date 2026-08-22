import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar as CalendarIcon, ArrowRight, Plane } from 'lucide-react';
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
          api.get('/cities?search=')
        ]);
        
        // Filter out past trips, or just sort them by closest upcoming date
        const now = new Date().getTime();
        const upcomingTrips = tripsRes.data.trips
          .filter((t: any) => new Date(t.endDate).getTime() >= now)
          .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
          
        // Store all trips for budget calc, but upcoming for display
        setTrips(tripsRes.data.trips || []);
        setCities(citiesRes.data.cities.slice(0, 4) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute actual closest upcoming trip
  const upcomingTrip = useMemo(() => {
    const now = new Date().getTime();
    return trips
      .filter((t: any) => new Date(t.endDate).getTime() >= now)
      .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
  }, [trips]);

  // Compute budget
  const { totalCost, categoryBreakdown } = useMemo(() => {
    let cost = 0;
    const breakdown: Record<string, number> = {};
    
    trips.forEach(trip => {
      trip.stops?.forEach((stop: any) => {
        stop.stopActivities?.forEach((sa: any) => {
          const itemCost = Number(sa.costOverride || sa.activity?.cost || 0);
          cost += itemCost;
          
          const category = sa.activity?.category || 'Other';
          breakdown[category] = (breakdown[category] || 0) + itemCost;
        });
      });
    });

    return { totalCost: cost, categoryBreakdown: breakdown };
  }, [trips]);

  // We don't have a hardcoded 'budget' per user, so let's set a logical total budget
  const assumedBudget = totalCost === 0 ? 50000 : Math.ceil((totalCost * 1.2) / 10000) * 10000;
  const remaining = Math.max(0, assumedBudget - totalCost);
  const percentageUsed = assumedBudget === 0 ? 0 : Math.min(100, Math.round((totalCost / assumedBudget) * 100));

  // Sort categories by cost
  const topCategories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  // Category Icons mapping
  const categoryIcons: Record<string, string> = {
    'Food': '🍜',
    'Sightseeing': '🏛️',
    'Transport': '✈️',
    'Accommodation': '🏨',
    'Other': '🎟️'
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <Plane className="absolute -right-8 -top-8 h-48 w-48 text-white/10 rotate-45" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}! 👋
            </h1>
            <p className="text-blue-100 mb-6">Ready to explore the world? Your next adventure is waiting.</p>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                🌍 {trips.length} Total Trips
              </span>
              <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                🏙️ {trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0)} Cities
              </span>
            </div>
          </div>
          <Button onClick={() => navigate('/trips/new')} size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-semibold gap-2 shrink-0">
            <Plus className="h-5 w-5" /> Plan New Trip
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500 font-medium animate-pulse">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Upcoming Trip + Destinations) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Trip */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Your Upcoming Adventure</h2>
                  <Link to="/trips" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                    View all trips &rarr;
                  </Link>
                </div>
                
                {!upcomingTrip ? (
                  <Card className="bg-gray-50 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Plane className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 font-medium">You don't have any upcoming trips.</p>
                      <Button variant="link" onClick={() => navigate('/trips/new')} className="mt-2 text-blue-600">
                        Create your first trip
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md">
                    <div className="h-64 relative overflow-hidden cursor-pointer" onClick={() => navigate(`/trips/${upcomingTrip.id}/itinerary`)}>
                      <img 
                        src={upcomingTrip.coverPhotoUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'} 
                        alt={upcomingTrip.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700 flex items-center gap-1 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Upcoming
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-3xl font-bold mb-2">{upcomingTrip.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-200">
                          <span className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
                            <CalendarIcon className="h-4 w-4 text-blue-400" />
                            {new Date(upcomingTrip.startDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})} - {new Date(upcomingTrip.endDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                          </span>
                          <span className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
                            ⏳ {Math.max(1, Math.ceil((new Date(upcomingTrip.endDate).getTime() - new Date(upcomingTrip.startDate).getTime()) / (1000 * 60 * 60 * 24)))} Days
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 bg-white flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                          <MapPin className="h-5 w-5 text-red-500" /> 
                          {upcomingTrip.stops?.length > 0 ? upcomingTrip.stops.map((s:any) => s.city.name).join(' ✈️ ') : 'No cities added yet'}
                        </div>
                      </div>
                      <Button onClick={() => navigate(`/trips/${upcomingTrip.id}/itinerary`)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 gap-2 shrink-0 rounded-full px-6">
                        View Itinerary <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </section>

              {/* Popular Destinations Section */}
              <section>
                <div className="flex items-center justify-between mb-4 mt-12">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Popular Destinations</h2>
                  <Link to="/explore" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                    Explore all &rarr;
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cities.map((city, idx) => {
                    const fallbackImages = [
                      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop", // Paris
                      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop", // Tokyo
                      "https://images.unsplash.com/photo-1513635269975-5969336cd100?q=80&w=600&auto=format&fit=crop", // London
                      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop"  // NY
                    ];
                    return (
                      <div key={city.id} onClick={() => navigate('/explore')} className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300">
                        <img 
                          src={city.imageUrl || fallbackImages[idx % fallbackImages.length]} 
                          alt={city.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-300 group-hover:-translate-y-2">
                          <h3 className="text-white font-bold text-lg leading-tight">{city.name}</h3>
                          <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{city.country}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column (Insights & Budget) */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Your Travel Insights</h2>
              
              <Card className="bg-white border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Trips</p>
                      <h3 className="text-2xl font-extrabold text-gray-900">{trips.length}</h3>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gray-100 w-full my-4" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Cities Planned</p>
                      <h3 className="text-2xl font-extrabold text-gray-900">{trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0)}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Budget Overview Card */}
              <Card className="bg-gray-900 text-white border-0 shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      💰 Estimated Spending
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total Cost</p>
                        <p className="text-3xl font-extrabold text-white">₹{totalCost.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Assumed Budget</p>
                        <p className="text-xl font-bold text-emerald-400">₹{assumedBudget.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-3 mb-2 overflow-hidden border border-gray-700">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full" style={{ width: `${percentageUsed}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 text-right font-medium">{percentageUsed}% of Budget Used</p>
                    
                    <div className="pt-4 mt-4 border-t border-gray-800">
                      <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">Top Expenses</p>
                      {topCategories.length > 0 ? (
                        topCategories.map(([cat, cost]) => (
                          <div key={cat} className="flex justify-between text-sm mt-2 first:mt-0">
                            <span className="flex items-center gap-2">{categoryIcons[cat] || '🎟️'} {cat}</span>
                            <span className="font-medium text-gray-300">{Math.round((cost / totalCost) * 100)}%</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400 italic">No expenses recorded yet.</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
