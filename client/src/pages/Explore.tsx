import { Compass } from 'lucide-react';
export default function Explore() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
        <Compass className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Explore Destinations</h2>
      <p className="text-gray-500 max-w-md">
        This feature is coming soon! Soon you'll be able to browse popular itineraries, discover hidden gems, and get inspired for your next adventure.
      </p>
    </div>
  );
}
