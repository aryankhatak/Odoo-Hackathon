import { Heart } from 'lucide-react';
export default function Saved() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="p-4 bg-red-50 text-red-500 rounded-full">
        <Heart className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Saved Items</h2>
      <p className="text-gray-500 max-w-md">
        Keep track of places you want to visit, activities you want to do, and public trips you want to copy. Coming soon!
      </p>
    </div>
  );
}
