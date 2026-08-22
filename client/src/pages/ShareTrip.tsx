import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, ArrowLeft, Copy, Check, Globe } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function ShareTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data.trip);
      } catch (error) {
        console.error('Error fetching trip:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      const response = await api.post(`/trips/${id}/share`);
      setTrip({ ...trip, shareSlug: response.data.shareSlug, isPublic: response.data.isPublic });
    } catch (error) {
      console.error('Error generating share link:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/public/trips/${trip.shareSlug}`;
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!trip) return <div className="p-8 text-center text-red-500">Trip not found</div>;

  const publicLink = trip.shareSlug ? `${window.location.origin}/public/trips/${trip.shareSlug}` : '';

  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/trips/${id}/itinerary`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Share Your Adventure</h1>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="h-48 bg-gray-200 relative">
          <img 
            src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'} 
            alt={trip.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold text-white">{trip.name}</h2>
            <p className="text-white/90 mt-2">
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Make this trip public</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Share your itinerary with friends, family, or the GlobeTrotter community. Anyone with the link can view your day-by-day plan.
            </p>
          </div>

          {!trip.shareSlug ? (
            <div className="flex justify-center pt-4">
              <Button onClick={handleGenerateLink} size="lg" disabled={isGenerating} className="gap-2">
                <Share2 className="h-4 w-4" />
                {isGenerating ? 'Generating Link...' : 'Generate Public Link'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Your public link:
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-600 font-mono truncate">
                  {publicLink}
                </div>
                <Button onClick={handleCopyLink} variant="outline" className="shrink-0 gap-2 h-[46px]">
                  {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  {isCopied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>

              <div className="flex items-start gap-3 mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="mt-0.5">
                  <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Publicly visible</p>
                  <p className="text-xs text-blue-700 mt-0.5">Others can view this trip but cannot edit it.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
