import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export default function CreateTrip() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/trips', {
        name,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        description,
        coverPhotoUrl: coverPhotoUrl || undefined
      });
      
      // Navigate to the newly created trip's itinerary builder
      navigate(`/trips/${response.data.trip.id}/itinerary`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create trip');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Trip</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                Trip Name
              </label>
              <Input
                required
                placeholder="e.g. Europe Adventure"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                  End Date
                </label>
                <Input
                  type="date"
                  required
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                Description
              </label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                placeholder="Exploring the best of Europe - culture, food and unforgettable views."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                Cover Photo URL (Optional)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    className="pl-9"
                    placeholder="https://example.com/image.jpg"
                    value={coverPhotoUrl}
                    onChange={(e) => setCoverPhotoUrl(e.target.value)}
                  />
                </div>
              </div>
              {coverPhotoUrl && (
                <div className="mt-3 relative h-40 rounded-lg overflow-hidden border border-gray-200">
                  <img src={coverPhotoUrl} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL')} />
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Trip'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
