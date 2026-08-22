import { Calendar as CalendarIcon, Briefcase, Plane, Ticket, ChevronLeft, ChevronRight, Plus, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Calendar() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">Trip Calendar</h1>
          <p className="text-gray-500 font-medium">All your trips, flights and activities in one place.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md shadow-blue-200 gap-2">
          <Plus className="h-4 w-4" /> Add Trip / Event
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { count: '2', title: 'Upcoming Trips', subtitle: 'Next one in 12 days', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
          { count: '3', title: 'Upcoming Flights', subtitle: 'Next flight in 12 days', icon: Plane, color: 'text-green-500', bg: 'bg-green-50' },
          { count: '5', title: 'Activities', subtitle: 'Across your trips', icon: Ticket, color: 'text-orange-500', bg: 'bg-orange-50' },
          { count: '18', title: 'Days Traveled', subtitle: 'This year', icon: CalendarIcon, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-gray-900">{stat.count}</span>
                <span className="text-sm font-bold text-gray-700">{stat.title}</span>
              </div>
              <p className="text-xs font-semibold text-gray-400">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upcoming List */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.03)] flex flex-col">
          <div className="p-6 pb-2">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Upcoming</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
            
            {/* Trip 1 */}
            <div className="border border-gray-100 rounded-2xl p-3 flex gap-4 hover:border-blue-100 hover:shadow-sm transition-all group">
              <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=200&auto=format&fit=crop" alt="Bali" className="h-16 w-20 rounded-xl object-cover" />
              <div className="flex-1 py-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">Bali Getaway</h4>
                  <span className="text-blue-600 font-bold text-xs">In 12 days &gt;</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> Bali, Indonesia</p>
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> May 24 – May 30, 2025</p>
                </div>
              </div>
            </div>

            {/* Trip 2 */}
            <div className="border border-gray-100 rounded-2xl p-3 flex gap-4 hover:border-blue-100 hover:shadow-sm transition-all group">
              <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=200&auto=format&fit=crop" alt="Tokyo" className="h-16 w-20 rounded-xl object-cover" />
              <div className="flex-1 py-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">Tokyo Adventure</h4>
                  <span className="text-blue-600 font-bold text-xs">In 31 days &gt;</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> Tokyo, Japan</p>
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> Jun 12 – Jun 20, 2025</p>
                </div>
              </div>
            </div>

            {/* Flight */}
            <div className="border border-gray-100 rounded-2xl p-3 flex gap-4 hover:border-blue-100 hover:shadow-sm transition-all group">
              <div className="h-16 w-20 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Plane className="h-7 w-7" />
              </div>
              <div className="flex-1 py-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">Flight to Bali</h4>
                  <span className="text-blue-600 font-bold text-xs">In 12 days &gt;</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> DEL ➔ DPS</p>
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> May 24, 2025 • 8:40 AM</p>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="border border-gray-100 rounded-2xl p-3 flex gap-4 hover:border-blue-100 hover:shadow-sm transition-all group">
              <div className="h-16 w-20 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Ticket className="h-7 w-7" />
              </div>
              <div className="flex-1 py-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-gray-900 text-sm">Ubud Tour & Temples</h4>
                  <span className="text-blue-600 font-bold text-xs">In 13 days &gt;</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> Bali, Indonesia</p>
                  <p className="text-xs font-medium text-gray-500 flex items-center gap-1"><CalendarIcon className="h-3 w-3" /> May 25, 2025 • 10:00 AM</p>
                </div>
              </div>
            </div>

          </div>
          
          <div className="p-4 border-t border-gray-50 mt-2">
            <button className="w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
              View all events <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Calendar View */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.03)] p-6">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
              <h2 className="text-lg font-extrabold text-gray-900 ml-4">May 2025</h2>
            </div>
            <button className="px-4 py-1.5 border border-gray-200 rounded-full text-sm font-bold text-blue-600 hover:bg-gray-50 transition-colors">
              Today
            </button>
          </div>

          <div className="grid grid-cols-7 mb-4">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-400 tracking-wider">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-4 relative">
            {/* Row 1 */}
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">27</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">28</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">29</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">30</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">1</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">2</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">3</span></div>

            {/* Row 2 */}
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">4</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">5</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">6</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">7</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">8</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">9</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">10</span></div>

            {/* Row 3 */}
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">11</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">12</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">13</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">14</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">15</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">16</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">17</span></div>

            {/* Row 4 */}
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">18</span></div>
            <div className="h-16 flex flex-col items-center pt-1 relative z-10"><span className="text-sm font-semibold text-gray-900">19</span></div>
            <div className="h-16 flex flex-col items-center pt-1 relative z-10"><span className="text-sm font-semibold text-gray-900">20</span></div>
            <div className="h-16 flex flex-col items-center pt-1 relative z-10"><span className="text-sm font-semibold text-gray-900">21</span></div>
            <div className="h-16 flex flex-col items-center pt-1 relative z-10"><span className="text-sm font-semibold text-gray-900">22</span></div>
            <div className="h-16 flex flex-col items-center pt-1 relative z-10"><span className="text-sm font-semibold text-gray-900">23</span></div>
            <div className="h-16 flex flex-col items-center pt-1 relative z-10">
              <span className="text-sm font-bold text-white bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center -mt-1 shadow-sm">24</span>
            </div>
            
            {/* Span for Bali trip on row 4 */}
            <div className="absolute top-[210px] left-[14.28%] right-0 h-6 bg-green-100/80 rounded-l-md px-2 flex items-center">
              <span className="text-[10px] font-bold text-green-700">Bali Getaway</span>
            </div>
            
            {/* Blue flight pill on 24 */}
            <div className="absolute top-[240px] right-2 h-5 bg-blue-100 rounded px-1.5 flex items-center gap-1">
              <Plane className="h-2.5 w-2.5 text-blue-600" /> <span className="text-[9px] font-bold text-blue-700">Flight to Bali</span>
            </div>

            {/* Row 5 */}
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">25</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">26</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">27</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">28</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">29</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">30</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-900">31</span></div>

            {/* Span for Bali trip on row 5 */}
            <div className="absolute top-[286px] left-0 right-[14.28%] h-6 bg-green-100/80 rounded-r-md px-2" />
            
            {/* Orange activity on 25 */}
            <div className="absolute top-[315px] left-2 flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              <span className="text-[9px] font-bold text-gray-700">Ubud Tour & Temples</span>
            </div>

            {/* Row 6 */}
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">1</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">2</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">3</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">4</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">5</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">6</span></div>
            <div className="h-16 flex flex-col items-center pt-1"><span className="text-sm font-semibold text-gray-300">7</span></div>
            
            {/* Span for Tokyo trip on row 6 */}
            <div className="absolute top-[362px] left-[14.28%] right-[28.56%] h-6 bg-purple-100/80 rounded-md px-2 flex items-center">
              <span className="text-[10px] font-bold text-purple-700">Tokyo Adventure</span>
            </div>

          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-bold text-gray-600">Trip</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-gray-600">Flight</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-xs font-bold text-gray-600">Activity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-xs font-bold text-gray-600">Other</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Tip / CTA */}
      <div className="bg-[#f8faff] border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white h-12 w-12 rounded-xl flex items-center justify-center shadow-sm border border-blue-50 shrink-0 text-blue-600">
            <CalendarIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-0.5 text-lg">Plan ahead, travel better</h3>
            <p className="text-sm font-medium text-gray-500">
              Add your flights, stays and activities to keep everything organized.
            </p>
          </div>
        </div>
        <Button variant="outline" className="shrink-0 bg-white border-gray-200 hover:bg-gray-50 text-blue-600 font-bold px-6">
          Add your first event
        </Button>
      </div>

    </div>
  );
}
