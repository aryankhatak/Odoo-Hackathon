import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plane, Calendar as CalendarIcon, Copy, Clock, IndianRupee } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function PublicTripView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    const fetchPublicTrip = async () => {
      try {
        const response = await api.get(`/public/trips/${slug}`);
        setTripData(response.data.trip);
      } catch (error) {
        console.error('Error fetching public trip:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublicTrip();
  }, [slug]);

  const handleCopyTrip = async () => {
    // Requires authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsCopying(true);
    try {
      const response = await api.post(`/public/trips/${slug}/copy`);
      navigate(`/trips/${response.data.trip.id}/itinerary`);
    } catch (error) {
      console.error('Error copying trip:', error);
      alert('Failed to copy trip. Please try again.');
    } finally {
      setIsCopying(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading itinerary...</div>;
  if (!tripData) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">Trip not found or is not public.</div>;

  // Calculate some aggregate stats
  const totalDays = Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24));
  let totalCost = 0;
  tripData.stops.forEach((stop: any) => {
    stop.stopActivities.forEach((sa: any) => {
      totalCost += parseFloat(sa.costOverride || sa.activity.cost);
    });
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Plane className="h-6 w-6" /> GlobeTrotter
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] bg-gray-900">
        <img 
          src={tripData.coverPhotoUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80'} 
          alt={tripData.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{tripData.name}</h1>
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <span className="flex items-center gap-2 text-lg">
              <CalendarIcon className="h-5 w-5" />
              {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
            </span>
            <span className="text-lg font-medium">{totalDays} Days</span>
            <span className="text-lg font-medium">By {tripData.user.name}</span>
          </div>
          
          <div className="mt-8 flex gap-4">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold gap-2" onClick={handleCopyTrip} disabled={isCopying}>
              <Copy className="h-5 w-5" /> 
              {isCopying ? 'Copying...' : 'Copy This Trip'}
            </Button>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="max-w-4xl mx-auto mt-12 px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Day-by-Day Itinerary</h2>
          <p className="text-gray-500">Explore the complete journey</p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {tripData.stops.map((stop: any, index: number) => {
            // Group activities by date
            const groupedActivities = stop.stopActivities.reduce((acc: any, item: any) => {
              const date = new Date(item.scheduledDate).toISOString().split('T')[0];
              if (!acc[date]) acc[date] = [];
              acc[date].push(item);
              return acc;
            }, {});

            return (
              <div key={stop.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                  {index + 1}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl shadow bg-white border border-gray-100">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-xl text-gray-900">{stop.city.name}</h3>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {stop.city.country}
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    {Object.keys(groupedActivities).length === 0 ? (
                      <p className="text-gray-400 text-sm italic">No specific activities planned for this stop.</p>
                    ) : (
                      Object.entries(groupedActivities).map(([dateStr, activities]: [string, any]) => (
                        <div key={dateStr}>
                          <h4 className="font-semibold text-gray-700 text-sm mb-3">
                            {new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          </h4>
                          <ul className="space-y-3">
                            {activities.map((item: any) => (
                              <li key={item.id} className="flex gap-3 text-sm">
                                <div className="text-gray-400 w-12 font-medium shrink-0">
                                  {item.scheduledTime || 'Any'}
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                  <p className="font-bold text-gray-900">{item.activity.name}</p>
                                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" /> {item.activity.durationMinutes}m
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <IndianRupee className="h-3 w-3" /> {item.costOverride || item.activity.cost}
                                    </span>
                                    <span className="bg-gray-200 px-2 rounded">
                                      {item.activity.category}
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
