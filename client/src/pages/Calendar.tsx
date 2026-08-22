import { Calendar as CalendarIcon } from 'lucide-react';
export default function Calendar() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="p-4 bg-orange-50 text-orange-600 rounded-full">
        <CalendarIcon className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Trip Calendar</h2>
      <p className="text-gray-500 max-w-md">
        Your unified travel calendar will appear here. Track all your upcoming trips, flights, and activities in one consolidated view. Coming soon!
      </p>
    </div>
  );
}
