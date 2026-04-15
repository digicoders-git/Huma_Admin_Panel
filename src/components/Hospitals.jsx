import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Star, 
  Users, 
  Bed, 
  Plus, 
  Search, 
  MoreVertical, 
  ChevronRight,
  ShieldCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const hospitalsData = [
  {
    id: 1,
    name: 'City General Hospital',
    location: 'Downtown, New York',
    contact: '+1 234 567 8901',
    rating: 4.8,
    totalBeds: 500,
    availableBeds: 45,
    departments: 24,
    doctors: 120,
    image: 'https://images.unsplash.com/photo-1587350859728-117691f7380d?auto=format&fit=crop&q=80&w=400',
    status: 'Active'
  },
  {
    id: 2,
    name: 'St. Mary’s Medical Center',
    location: 'Brooklyn, NY',
    contact: '+1 234 567 8902',
    rating: 4.5,
    totalBeds: 350,
    availableBeds: 12,
    departments: 18,
    doctors: 85,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Metro Health Institute',
    location: 'Queens, NY',
    contact: '+1 234 567 8903',
    rating: 4.2,
    totalBeds: 420,
    availableBeds: 0,
    departments: 20,
    doctors: 95,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
    status: 'Full'
  },
  {
    id: 4,
    name: 'Sunrise Children’s Hospital',
    location: 'Manhattan, NY',
    contact: '+1 234 567 8904',
    rating: 4.9,
    totalBeds: 200,
    availableBeds: 30,
    departments: 12,
    doctors: 50,
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=400',
    status: 'Active'
  }
];

const Hospitals = ({ onOpenDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospital Management</h2>
          <p className="text-xs text-gray-500 mt-1">Monitor and manage all registered hospitals and health centers.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
          <Plus size={18} />
          Register New Hospital
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Hospitals', value: '42', icon: Building2, color: 'primary' },
          { label: 'Network Reach', value: '12 Towns', icon: MapPin, color: 'blue' },
          { label: 'Total Capacity', value: '1,240 Beds', icon: Bed, color: 'purple' },
          { label: 'Avg Rating', value: '4.7', icon: Star, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${i === 0 ? 'bg-primary-light text-primary' : `bg-${stat.color}-50 text-${stat.color}-600`}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h4 className="text-lg font-bold text-gray-900 leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 md:p-5 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search hospitals by name or location..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-[13px] font-bold text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select className="flex-1 sm:w-48 px-4 py-3.5 bg-gray-50 border-none rounded-2xl text-[12px] font-black text-gray-500 outline-none cursor-pointer hover:bg-gray-100 transition-colors appearance-none">
            <option>All Ratings</option>
            <option>4.5+ Stars</option>
            <option>4.0+ Stars</option>
          </select>
          <select className="flex-1 sm:w-48 px-4 py-3.5 bg-gray-50 border-none rounded-2xl text-[12px] font-black text-gray-500 outline-none cursor-pointer hover:bg-gray-100 transition-colors appearance-none">
             <option>Beds Availability</option>
             <option>Available First</option>
             <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hospitalsData.map((hospital) => (
          <div 
            key={hospital.id} 
            onClick={() => onOpenDetails && onOpenDetails(hospital)}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row group hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden relative">
              <img src={hospital.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={hospital.name} />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm ${
                  hospital.status === 'Active' ? 'bg-primary text-white' : 'bg-red-500 text-white'
                }`}>
                  {hospital.status}
                </span>
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight group-hover:text-primary transition-colors">{hospital.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-xl text-[11px] font-bold">
                    <Star size={12} fill="currentColor" /> {hospital.rating}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-4">
                  <MapPin size={14} className="text-primary" /> {hospital.location}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Beds</p>
                    <p className="text-xs font-bold text-gray-700">{hospital.availableBeds}/{hospital.totalBeds}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Depts</p>
                    <p className="text-xs font-bold text-gray-700">{hospital.departments}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Doctors</p>
                    <p className="text-xs font-bold text-gray-700">{hospital.doctors}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Phone size={14} className="text-primary" /> {hospital.contact}
                </div>
                <button className="p-2 bg-primary-light text-primary rounded-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;
