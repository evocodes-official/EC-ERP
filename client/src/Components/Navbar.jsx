import React from 'react';
import { Search, Bell, Grid } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-64">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search modules..."
          className="w-full bg-gray-50 pl-9 pr-4 py-1.5 rounded-lg text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>w

      <div className="flex items-center space-x-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-semibold transition-colors">
          Create New
        </button>

        <button className="relative text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
          <Grid size={18} />
        </button>

        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-200 object-cover cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Navbar;