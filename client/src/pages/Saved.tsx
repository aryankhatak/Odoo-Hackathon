import { Heart, Compass, MapPin, ChevronRight, Bookmark, Camera } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Saved() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Saved</h1>
          <p className="text-gray-500 font-medium">Your travel collection</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-semibold text-gray-700">
          <Heart className="h-4 w-4 text-gray-400" /> 0 items saved
        </div>
      </div>

      {/* Main Empty State Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row items-center">
        {/* Left Illustration side */}
        <div className="w-full md:w-1/2 bg-blue-50/50 p-12 flex justify-center items-center h-80 relative overflow-hidden">
          {/* Using a beautifully composed Unsplash image for the flatlay/travel vibe */}
          <img 
            src="https://images.unsplash.com/photo-1494516192674-b82b5f1e61da?q=80&w=800&auto=format&fit=crop" 
            alt="Travel gear"
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
          />
        </div>
        
        {/* Right Content side */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center items-start">
          <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Your travel collection starts here
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 font-medium">
            Save destinations, activities, hotels, and trips you're excited about. We'll keep everything organized for your next adventure.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 gap-2">
            <Compass className="h-4 w-4" /> Explore destinations
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gray-200 flex-1 max-w-[200px]" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or start exploring ideas</span>
        <div className="h-px bg-gray-200 flex-1 max-w-[200px]" />
      </div>

      {/* Discover something new Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Discover something new</h3>
          <a href="#" className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800">
            View all destinations <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        
        <div className="relative group">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'Bali, Indonesia',
                desc: 'Tropical beaches & serene temples',
                img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop'
              },
              {
                name: 'Kyoto, Japan',
                desc: 'Timeless culture & tranquil beauty',
                img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop'
              },
              {
                name: 'Paris, France',
                desc: 'Iconic landmarks & charming streets',
                img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop'
              },
              {
                name: 'Dubai, UAE',
                desc: 'Modern luxury & desert adventures',
                img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop'
              }
            ].map((place, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-md transition-shadow group/card">
                <img 
                  src={place.img} 
                  alt={place.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                  <h4 className="text-white font-bold flex items-center gap-1.5 mb-1 text-sm">
                    <MapPin className="h-3.5 w-3.5" /> {place.name}
                  </h4>
                  <p className="text-gray-300 text-xs font-medium mb-4 leading-relaxed">
                    {place.desc}
                  </p>
                  <button className="bg-white hover:bg-gray-50 text-blue-700 font-bold text-xs py-2 px-4 rounded-lg w-24 transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll arrow (visual only) */}
          <button className="absolute -right-5 top-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors z-10 hidden lg:flex">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Bottom Tip */}
      <div className="bg-[#f0f4fd] border border-blue-100 rounded-xl p-4 flex items-center gap-4 mt-8">
        <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-blue-50">
          <Bookmark className="h-4 w-4 text-blue-600" />
        </div>
        <p className="text-sm font-medium text-gray-600">
          <strong className="font-bold text-gray-900">Tip:</strong> Tap the heart icon on any destination, activity, or trip to save it here.
        </p>
      </div>

    </div>
  );
}
