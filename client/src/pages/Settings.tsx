import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bell, Globe, Lock, CreditCard } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your app preferences and account settings.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Preferences</h3>
                <p className="text-sm text-gray-500">Language and region settings</p>
              </div>
            </div>
            <div className="space-y-4 ml-14">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Currency</span>
                <select className="text-sm border-gray-300 rounded-md bg-gray-50 px-3 py-1.5 outline-none">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Language</span>
                <select className="text-sm border-gray-300 rounded-md bg-gray-50 px-3 py-1.5 outline-none">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">Manage how we contact you</p>
              </div>
            </div>
            <div className="space-y-4 ml-14">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Trip Reminders</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Promotional Emails</span>
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
