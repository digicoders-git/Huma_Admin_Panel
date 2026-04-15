import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  MessageSquare,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const enquiriesData = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '+91 98765 43210',
    subject: 'Appointment for Neurology',
    date: '12 Oct 2025',
    status: 'Pending',
    message: 'Hello, I would like to book an appointment with Dr. Nina Alvarez for my chronic migraine issues. Please let me know the availability.',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    phone: '+91 99887 76655',
    subject: 'Health Insurance Inquiry',
    date: '11 Oct 2025',
    status: 'In Progress',
    message: 'I want to know if you accept Star Health Insurance for surgical procedures. Waiting for your response.',
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit.v@example.com',
    phone: '+91 91234 56789',
    subject: 'Surgery Cost Estimation',
    date: '10 Oct 2025',
    status: 'Resolved',
    message: 'Looking for a cost estimation for Knee Replacement surgery. Please provide a rough breakdown.',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    email: 'sneha.g@example.com',
    phone: '+91 88776 65544',
    subject: 'Second Opinion for Cardiology',
    date: '09 Oct 2025',
    status: 'Pending',
    message: 'I have my reports from another hospital and I want a second opinion from your cardiologists.',
  }
];

const Enquiries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-primary-light text-primary';
      case 'In Progress': return 'bg-blue-50 text-blue-600';
      case 'Pending': return 'bg-amber-50 text-amber-600';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in relative">
      
      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
             
             {/* Modal Header */}
             <div className="px-6 sm:px-10 py-6 sm:py-8 bg-primary text-white flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black">Enquiry Details</h3>
                  <p className="text-[10px] opacity-80 font-bold mt-1 uppercase tracking-widest leading-none">Received on {selectedEnquiry.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedEnquiry(null)} 
                  className="bg-white/20 p-2.5 rounded-2xl hover:bg-white/30 transition-all active:scale-90"
                >
                  <MessageSquare size={24} />
                </button>
             </div>

             {/* Modal Content */}
             <div className="p-6 sm:p-10 space-y-6 sm:space-y-8 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">PATIENT NAME</p>
                      <div className="flex items-center gap-3 text-[13px] font-black text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                         <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                           <User size={16} />
                         </div>
                         {selectedEnquiry.name}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">CONTACT INFO</p>
                      <div className="flex items-center gap-3 text-[13px] font-black text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                         <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                           <Phone size={16} />
                         </div>
                         <span className="truncate">{selectedEnquiry.phone}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">SUBJECT</p>
                   <div className="text-[13px] font-black text-primary bg-primary-light p-4 rounded-2xl border border-primary/20">
                      {selectedEnquiry.subject}
                   </div>
                </div>

                <div className="space-y-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">MESSAGE</p>
                   <div className="text-[13px] font-medium text-gray-600 leading-relaxed bg-gray-50 p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-sm">
                      {selectedEnquiry.message}
                   </div>
                </div>

                {/* Modal Footer (Inner) */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
                      MARK AS RESOLVED
                    </button>
                    <button className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-gray-900/10 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-95">
                      <Mail size={18} /> SEND REPLY
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Enquiries</h2>
          <p className="text-xs text-gray-500 mt-1">Manage and respond to queries received from your website or mobile app.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white px-4 py-2.5 rounded-2xl border border-gray-100 flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-gray-600">2 New Today</span>
           </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Enquiries', value: '1,284', icon: MessageSquare, color: 'teal' },
          { label: 'Waiting Action', value: '42', icon: Clock, color: 'amber' },
          { label: 'Recently Resolved', value: '98', icon: CheckCircle2, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
             <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 shadow-sm`}>
                <stat.icon size={22} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-2xl font-black text-gray-900">{stat.value}</h4>
             </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, subject, or email..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-gray-50 text-gray-500 px-6 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold hover:bg-gray-100 transition-all">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 gap-4">
        {enquiriesData.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedEnquiry(item)}
            className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary/20 group"
          >
             {/* Date Circle */}
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center group-hover:bg-primary-light transition-colors">
                <span className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">OCT</span>
                <span className="text-xl font-black text-gray-700 leading-none">{item.date.split(' ')[0]}</span>
             </div>

             {/* User Info */}
             <div className="flex-1 w-full md:w-auto">
                <h4 className="text-[15px] font-extrabold text-gray-900 mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-gray-400">
                   <div className="flex items-center gap-1"><Mail size={12} className="text-primary" /> {item.email}</div>
                   <div className="flex items-center gap-1"><Phone size={12} className="text-primary" /> {item.phone}</div>
                </div>
             </div>

             {/* Subject */}
             <div className="flex-1 w-full md:w-auto">
                <div className="px-5 py-2.5 bg-gray-50 rounded-2xl text-xs font-bold text-gray-700 border border-transparent group-hover:border-teal-100 group-hover:bg-white transition-all">
                   {item.subject}
                </div>
             </div>

             {/* Status & Action */}
             <div className="flex items-center gap-4 self-end md:self-center">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-primary-light transition-all">
                   <ChevronRight size={20} />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enquiries;
