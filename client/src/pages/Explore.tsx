import { Search, MapPin, Star, Heart, Filter, Plus, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function Explore() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Hero Banner with Search */}
      <div className="relative rounded-2xl overflow-hidden h-72 shadow-sm border border-gray-100 flex items-center p-8 md:p-12">
        <img 
          src="https://images.unsplash.com/photo-1640926522543-c0d769c3a9f0?q=80&w=2000&auto=format&fit=crop" 
          alt="Cappadocia Hot Air Balloons" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
        
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Explore Destinations
          </h1>
          <p className="text-gray-700 font-medium mb-8">
            Discover amazing places, plan unforgettable itineraries and create lifetime memories.
          </p>
          
          <div className="flex items-center bg-white rounded-full p-1.5 shadow-lg max-w-lg border border-gray-100">
            <div className="pl-4 pr-2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search cities, countries, destinations..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-2 outline-none text-gray-700"
            />
            <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide flex-1">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shrink-0 shadow-sm shadow-blue-200">
            <span>🌐</span> All
          </button>
          {[
            { icon: '🔥', label: 'Trending' },
            { icon: '⛱️', label: 'Beaches' },
            { icon: '⛰️', label: 'Adventure' },
            { icon: '🏛️', label: 'Culture' },
            { icon: '🍜', label: 'Food' },
            { icon: '💰', label: 'Budget-friendly' },
          ].map((cat) => (
            <button key={cat.label} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-semibold shrink-0 transition-colors shadow-sm">
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
        <div className="pl-4 ml-4 border-l border-gray-200 shrink-0">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      {/* Featured Destination */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Featured Destination</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Card */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop" 
              alt="Bali, Indonesia" 
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-md text-xs font-bold text-yellow-600 flex items-center gap-1 shadow-sm">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> Featured
            </div>
            
            <button className="absolute top-4 right-4 h-8 w-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-extrabold text-white mb-2">Bali, Indonesia</h3>
                <p className="text-gray-200 font-medium text-sm max-w-md mb-4 leading-relaxed">
                  Tropical paradise with stunning beaches, rich culture and unforgettable sunsets.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-white">
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-2.5 py-1.5 rounded-md">
                    💰 Cost: Moderate
                  </span>
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-2.5 py-1.5 rounded-md">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 4.8 (2.3k reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="outline" className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 font-semibold border">
                  View Details
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-md gap-1.5 font-semibold">
                  <Plus className="h-4 w-4" /> Add to Trip
                </Button>
              </div>
            </div>
          </div>

          {/* Why Travelers Love list */}
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-6 tracking-tight">Why travelers love Bali</h3>
              <div className="space-y-5">
                {[
                  { icon: '🏖️', title: 'Beautiful Beaches', desc: 'Crystal clear waters and white sands' },
                  { icon: '🏛️', title: 'Rich Culture', desc: 'Temples, traditions and local heritage' },
                  { icon: '🥥', title: 'Amazing Food', desc: 'Delicious local and international cuisine' },
                  { icon: '🤿', title: 'Exciting Activities', desc: 'Surfing, diving, hiking and more' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-blue-100 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</h4>
                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Popular Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Popular Destinations</h2>
          <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { 
              name: 'Paris', country: 'France', flag: '🇫🇷', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
              desc: 'The city of light and love', cost: 'High', rating: '4.7 (1.8k)'
            },
            { 
              name: 'Tokyo', country: 'Japan', flag: '🇯🇵', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop',
              desc: 'Where tradition meets futuristic life', cost: 'High', rating: '4.8 (2.1k)'
            },
            { 
              name: 'Rome', country: 'Italy', flag: '🇮🇹', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop',
              desc: 'Explore ancient history and timeless beauty', cost: 'Moderate', rating: '4.6 (1.5k)'
            },
            { 
              name: 'Dubai', country: 'UAE', flag: '🇦🇪', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop',
              desc: 'Luxury, adventure and modern wonders', cost: 'High', rating: '4.5 (1.2k)'
            },
          ].map((dest) => (
            <div key={dest.name} className="relative rounded-xl overflow-hidden shadow-sm group aspect-[4/5] bg-gray-900 flex flex-col justify-end">
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <button className="absolute top-3 right-3 h-7 w-7 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors shadow-sm">
                <Heart className="h-3.5 w-3.5" />
              </button>

              <div className="relative p-4 pb-4">
                <h3 className="text-white font-extrabold text-lg flex items-center gap-1.5 mb-1">
                  {dest.name}, {dest.country} <span>{dest.flag}</span>
                </h3>
                <p className="text-gray-300 text-xs font-medium mb-4 line-clamp-2 leading-relaxed">
                  {dest.desc}
                </p>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-300">
                    <span className="flex items-center gap-1">💰 {dest.cost}</span>
                    <span className="flex items-center gap-0.5 text-yellow-400">
                      <Star className="h-3 w-3 fill-yellow-400" /> {dest.rating}
                    </span>
                  </div>
                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs h-8 gap-1 shadow-sm">
                    <Plus className="h-3.5 w-3.5 text-blue-600" /> Add to Trip
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore by Region */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">Explore by Region</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Europe', dests: '120+', icon: '🏰' },
            { name: 'Asia', dests: '150+', icon: '⛩️' },
            { name: 'Americas', dests: '80+', icon: '🗽' },
            { name: 'Africa', dests: '60+', icon: '🦒' },
            { name: 'Oceania', dests: '40+', icon: '🦘' },
            { name: 'Middle East', dests: '70+', icon: '🕌' },
          ].map((region) => (
            <div key={region.name} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md cursor-pointer transition-shadow">
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">{region.name}</h4>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{region.dests} Destinations</p>
              </div>
              <div className="text-2xl grayscale opacity-80">
                {region.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
