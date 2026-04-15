import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  User, 
  MessageSquare, 
  Package, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  MoreVertical,
  Circle
} from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'New Appointment Booked',
    message: 'Daniel Wong has booked a follow-up consultation with Dr. Nina Alvarez for March 15th at 10:00 AM.',
    time: '5 mins ago',
    read: false,
    icon: Calendar,
    color: 'bg-teal-50 text-teal-600'
  },
  {
    id: 2,
    type: 'system',
    title: 'System Update Scheduled',
    message: 'The Medlink dashboard will be undergoing a scheduled maintenance tonight at 12:00 AM GMT.',
    time: '45 mins ago',
    read: false,
    icon: AlertCircle,
    color: 'bg-amber-50 text-amber-600'
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message from Pharmacy',
    message: 'The pharmacy administrator has sent a new message regarding Paracetamol stock levels.',
    time: '2 hours ago',
    read: true,
    icon: MessageSquare,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 4,
    type: 'patient',
    title: 'Patient Lab Results Ready',
    message: 'Lab results for patient Aisha Farhan (ID: #PT-8821) are now available for review.',
    time: 'Yesterday',
    read: true,
    icon: User,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 5,
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Inventory alert: N95 Masks stock has fallen below the safety threshold of 50 units.',
    time: 'Yesterday',
    read: true,
    icon: Package,
    color: 'bg-red-50 text-red-600'
  },
  {
    id: 6,
    type: 'appointment',
    title: 'Appointment Canceled',
    message: 'Ardi Prasetyo has canceled their appointment scheduled for today at 3:30 PM.',
    time: '2 days ago',
    read: true,
    icon: Calendar,
    color: 'bg-gray-100 text-gray-400'
  },
  {
    id: 7,
    type: 'success',
    title: 'Profile Verified',
    message: 'Your professional credentials have been successfully verified by the medical board.',
    time: '3 days ago',
    read: true,
    icon: CheckCircle2,
    color: 'bg-teal-50 text-teal-600'
  }
];

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto">
      {/* Header Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <p className="text-xs text-gray-500 mt-1">You have 2 unread notifications for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-4 py-2 rounded-xl transition-colors">
            Mark all as read
          </button>
          <button className="text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-50 px-4 py-2 rounded-xl transition-colors">
            Clear all
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="px-6 border-b border-gray-50 flex gap-6 overflow-x-auto scrollbar-none">
          {['All', 'Unread', 'Appointments', 'System', 'Messages'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`py-4 text-xs font-bold transition-all border-b-2 relative ${
                activeFilter === filter 
                  ? 'text-teal-600 border-teal-600' 
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {filter}
              {filter === 'Unread' && (
                <span className="ml-1.5 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full inline-block">2</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-50">
          {initialNotifications.map((noti) => (
            <div 
              key={noti.id} 
              className={`p-6 flex flex-col md:flex-row gap-4 transition-all group ${!noti.read ? 'bg-teal-50/10' : 'hover:bg-gray-50/50'}`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${noti.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <noti.icon size={22} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`text-sm font-bold ${!noti.read ? 'text-gray-900' : 'text-gray-700'}`}>{noti.title}</h4>
                  {!noti.read && <Circle size={8} fill="#3D9F9D" className="text-teal-600" />}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2 max-w-3xl">
                  {noti.message}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
                  <span className="flex items-center gap-1">
                    <Bell size={10} /> {noti.time}
                  </span>
                  <button className="hover:text-teal-600 transition-colors uppercase tracking-wider">Mark as Read</button>
                  <button className="hover:text-red-500 transition-colors uppercase tracking-wider">Delete</button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col items-center justify-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-gray-600 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Mockup (if needed) */}
        {initialNotifications.length === 0 && (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Notifications</h3>
            <p className="text-xs text-gray-500 mt-2 max-w-xs">You're all caught up! New alerts will appear here when they're available.</p>
          </div>
        )}

        {/* Load More */}
        <div className="p-4 border-t border-gray-50 flex justify-center">
          <button className="text-[11px] font-bold text-gray-400 hover:text-teal-600 transition-colors uppercase tracking-widest py-2 px-6">
            Load Earlier Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
