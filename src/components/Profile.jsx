import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Globe, Briefcase, Trash2 } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Personal');

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      {/* Top Banner / Header Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light rounded-full translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        
        <div className="relative">
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704b" 
            className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
            alt="James Cartis"
          />
          <button className="absolute -right-2 -bottom-2 bg-primary text-white p-2.5 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95">
            <Camera size={18} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-3xl font-bold text-gray-900">James Cartis</h2>
          <p className="text-sm font-semibold text-primary mt-1 uppercase tracking-widest">Administrator</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <MapPin size={14} className="text-primary" /> New York, USA
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
              <Calendar size={14} className="text-primary" /> Joined January 2024
            </div>
          </div>
        </div>

        <div className="flex gap-3 z-10">
          <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            Save Changes
          </button>
          <button className="bg-white text-gray-400 border border-gray-100 px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all">
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3">
          <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            {['Personal', 'Professional', 'Account Settings', 'Notifications Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-6 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-primary-light text-primary shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'Personal' && <User size={18} />}
                {tab === 'Professional' && <Briefcase size={18} />}
                {tab === 'Account Settings' && <Globe size={18} />}
                {tab === 'Notifications Settings' && <Trash2 size={18} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[500px]">
          <h3 className="text-lg font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">{activeTab} Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="James Cartis"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                />
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  defaultValue="james.cartis@medlink.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                />
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Phone Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="+1 234 567 890"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                />
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Date of Birth</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="12 Oct 1992"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                />
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Mailing Address</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="123 Medical Plaza, Apartment 4B, New York, NY 10001"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                />
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Gender</label>
              <select className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="jcartis_admin"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                />
                <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
