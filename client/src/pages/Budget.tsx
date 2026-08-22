import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Budget() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [budget, setBudget] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [totalBudget, setTotalBudget] = useState(200000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await api.get(`/trips/${id}/budget`);
        setBudget(response.data);
      } catch (error) {
        console.error('Error fetching budget:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBudget();
  }, [id]);

  if (isLoading) return <div className="p-8 text-center">Loading budget details...</div>;
  if (!budget) return <div className="p-8 text-center text-red-500">Failed to load budget</div>;

  const estimatedCost = budget.grandTotal;
  const remaining = totalBudget - estimatedCost;
  const daysCount = budget.dailyCosts?.length || 1;
  const dailyAverage = Math.round(estimatedCost / daysCount);

  // Prepare data for Pie Chart
  const pieData = Object.entries(budget.categoryTotals || {})
    .filter(([_, value]: [string, any]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  // Prepare data for Bar Chart
  const barData = (budget.dailyCosts || []).map((day: any) => ({
    date: new Date(day.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
    cost: day.cost
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/trips/${id}/itinerary`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget & Cost Breakdown</h1>
          <p className="text-sm text-gray-500">Track your expenses and stay within limits.</p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Budget</p>
            {isEditingBudget ? (
              <input 
                type="number" 
                autoFocus
                className="w-full text-2xl font-bold text-blue-600 border-b-2 border-blue-600 bg-transparent outline-none p-0"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                onBlur={() => setIsEditingBudget(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingBudget(false)}
              />
            ) : (
              <h3 
                className="text-2xl font-bold text-blue-600 cursor-pointer hover:opacity-80"
                onClick={() => setIsEditingBudget(true)}
                title="Click to edit"
              >
                ₹{totalBudget.toLocaleString()}
              </h3>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Estimated Cost</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{estimatedCost.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Remaining</p>
            <h3 className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{remaining.toLocaleString()}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Days</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{daysCount}</h3>
              <p className="text-xs text-gray-500 pb-1">₹{dailyAverage.toLocaleString()} / day</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown (Pie Chart + List) */}
        <Card>
          <CardHeader>
            <CardTitle>Expense by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-8">
            <div className="w-48 h-48">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-full text-sm text-gray-400">
                  No Data
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              {pieData.length > 0 ? pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="capitalize text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-semibold text-gray-900">₹{item.value.toLocaleString()}</span>
                    <span className="text-gray-400 w-10 text-right">
                      {Math.round((item.value / estimatedCost) * 100)}%
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500">Add activities to see your budget breakdown.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Daily Trend (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full mt-4">
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f3f4f6' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Cost']}
                    />
                    <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                  No daily costs available.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
