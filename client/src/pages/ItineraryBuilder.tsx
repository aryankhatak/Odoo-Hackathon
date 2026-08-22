import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Clock, Trash2, IndianRupee } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function ItineraryBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [budget, setBudget] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTripData = async () => {
    try {
      const [itineraryRes, budgetRes] = await Promise.all([
        api.get(`/trips/${id}/itinerary`),
        api.get(`/trips/${id}/budget`)
      ]);
      setTrip(itineraryRes.data.trip);
      setItinerary(itineraryRes.data.itinerary);
      setBudget(budgetRes.data);
    } catch (error) {
      console.error('Error fetching itinerary data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTripData();
  }, [id]);

  if (isLoading) return <div className="p-8 text-center">Loading itinerary...</div>;
  if (!trip) return <div className="p-8 text-center text-red-500">Trip not found</div>;

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">
      {/* LEFT COLUMN: TRIP STOPS */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/trips')} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold truncate">{trip.name}</h2>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Your Stops</h3>
          <Button size="sm" variant="outline" className="h-7 text-xs bg-white text-blue-600 border-blue-200 hover:bg-blue-50">
            <Plus className="h-3 w-3 mr-1" /> Add Stop
          </Button>
        </div>

        {itinerary.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 border border-dashed rounded-lg text-sm text-gray-500">
            No stops added yet. Click "Add Stop" to begin.
          </div>
        ) : (
          itinerary.map((stop, index) => (
            <Card key={stop.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex gap-3 items-start relative">
                <div className="flex flex-col items-center gap-1 min-w-[24px]">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  {index < itinerary.length - 1 && <div className="w-px h-8 bg-gray-200"></div>}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{stop.city.name}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(stop.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                    {' - '} 
                    {new Date(stop.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* MIDDLE COLUMN: ITINERARY */}
      <div className="flex-1 flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-inner">
        <div className="bg-white p-4 border-b flex justify-between items-center shadow-sm z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Itinerary Builder</h2>
            <p className="text-sm text-gray-500">
              {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
          <Button onClick={() => navigate(`/trips/${id}/budget`)} variant="outline" className="gap-2">
            View Full Budget
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {itinerary.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MapPin className="h-16 w-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">Your itinerary is empty</p>
              <p className="text-sm">Add a stop from the left panel to start planning.</p>
            </div>
          ) : (
            itinerary.map((stop) => (
              <div key={`itinerary-${stop.id}`} className="space-y-4">
                <div className="flex items-center gap-2 mb-4 sticky top-0 bg-gray-50/90 backdrop-blur py-2 z-10">
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">{stop.city.name}, {stop.city.country}</h3>
                </div>
                
                {Object.entries(stop.days).map(([dateStr, activities]: [string, any]) => {
                  const date = new Date(dateStr);
                  return (
                    <Card key={dateStr} className="border-0 shadow-sm overflow-hidden">
                      <div className="bg-blue-50/50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <h4 className="font-semibold text-blue-900 text-sm flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h4>
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-2">
                          + Add Activity
                        </Button>
                      </div>
                      
                      <div className="p-0">
                        {activities.length === 0 ? (
                          <div className="p-4 text-center text-sm text-gray-400 italic">No activities planned yet.</div>
                        ) : (
                          <ul className="divide-y divide-gray-100">
                            {activities.map((item: any) => (
                              <li key={item.id} className="p-4 hover:bg-gray-50 flex items-start gap-4 transition-colors group">
                                <div className="flex flex-col items-center min-w-[60px] text-gray-500 font-medium">
                                  <span>{item.scheduledTime || 'Any time'}</span>
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-900">{item.activity.name}</h5>
                                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" /> {item.activity.durationMinutes} min
                                    </span>
                                    <span className="flex items-center gap-1 text-orange-600 font-medium">
                                      <IndianRupee className="h-3 w-3" /> {item.costOverride || item.activity.cost}
                                    </span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                      {item.activity.category}
                                    </span>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: BUDGET INSIGHTS */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pb-8 pl-2">
        <h3 className="font-semibold text-gray-700">Budget Insights</h3>
        
        <Card className="bg-blue-600 text-white border-0 shadow-md">
          <CardContent className="p-6">
            <p className="text-blue-100 text-sm font-medium mb-1">Total Estimated Cost</p>
            <h2 className="text-3xl font-bold">₹{budget?.grandTotal?.toLocaleString() || 0}</h2>
            <div className="mt-4 pt-4 border-t border-blue-500/30 flex justify-between text-sm">
              <span className="text-blue-100">Daily Average</span>
              <span className="font-medium">
                ₹{budget?.dailyCosts?.length ? Math.round(budget.grandTotal / budget.dailyCosts.length).toLocaleString() : 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {budget?.categoryTotals && Object.entries(budget.categoryTotals).map(([category, amount]: [string, any]) => (
              amount > 0 && (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-700">{category}</span>
                    <span className="font-medium text-gray-900">₹{amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(amount / budget.grandTotal) * 100}%` }}
                    />
                  </div>
                </div>
              )
            ))}
            
            {(!budget?.categoryTotals || Object.values(budget.categoryTotals).every(v => v === 0)) && (
              <p className="text-sm text-gray-400 italic text-center py-4">No expenses recorded yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
