import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Star, 
  Users, 
  Bed, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  Calendar,
  Layers,
  Activity,
  Award,
  MoreVertical,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';

const patientFlowData = [
  { name: 'Mon', visits: 400, emergency: 240 },
  { name: 'Tue', visits: 300, emergency: 139 },
  { name: 'Wed', visits: 200, emergency: 980 },
  { name: 'Thu', visits: 278, emergency: 390 },
  { name: 'Fri', visits: 189, emergency: 480 },
  { name: 'Sat', visits: 239, emergency: 380 },
  { name: 'Sun', visits: 349, emergency: 430 },
];

const HospitalDetails = ({ onBack, hospital }) => {
  if (!hospital) return null;

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in pb-12">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-primary font-bold text-xs transition-colors w-fit"
      >
        <ArrowLeft size={16} /> BACK TO HOSPITALS
      </button>

      {/* Hospital Banner Info */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="h-48 md:h-64 overflow-hidden relative">
          <img 
            src={hospital.image} 
            className="w-full h-full object-cover brightness-75 transition-transform duration-700 hover:scale-105" 
            alt={hospital.name} 
          />
          <div className="absolute top-6 left-6 md:top-10 md:left-10">
             <span className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl">
               Prime Member
             </span>
          </div>
        </div>

        <div className="px-8 md:px-12 py-8 relative">
           {/* Detailed Badge */}
           <div className="absolute top-0 right-12 -translate-y-1/2 w-48 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 hidden lg:block">
              <div className="flex items-center gap-2 mb-3">
                 <Award size={18} className="text-amber-500" />
                 <span className="text-xs font-bold text-gray-900">Highest Quality Award</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Certified for excellence in patient care and infrastructure 2024-25.</p>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
             <div className="flex-1">
               <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{hospital.name}</h2>
               <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" /> {hospital.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-amber-500 fill-amber-500" /> {hospital.rating} Rating
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> Open 24/7 Hours
                  </div>
               </div>
             </div>
             <div className="flex items-center gap-3">
                <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
                  Update Details
                </button>
                <button className="p-3.5 bg-gray-50 text-gray-400 rounded-2xl hover:text-gray-900 transition-all">
                  <MoreVertical size={20} />
                </button>
             </div>
           </div>

           {/* Stats Summary Grid */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-50">
             <div className="space-y-1">
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Available Beds</p>
               <div className="flex items-center gap-2">
                 <h4 className="text-2xl font-bold text-gray-900">{hospital.availableBeds}</h4>
                 <span className="text-[10px] font-bold bg-primary-light text-primary px-2 py-0.5 rounded-lg">Available</span>
               </div>
             </div>
             <div className="space-y-1">
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Doctors</p>
               <div className="flex items-center gap-2">
                 <h4 className="text-2xl font-bold text-gray-900">{hospital.doctors}</h4>
                 <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg">Specialists</span>
               </div>
             </div>
             <div className="space-y-1">
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Departments</p>
               <div className="flex items-center gap-2">
                 <h4 className="text-2xl font-bold text-gray-900">{hospital.departments}</h4>
                 <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-lg">Active depts</span>
               </div>
             </div>
             <div className="space-y-1">
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Emergency Cases</p>
               <div className="flex items-center gap-2">
                 <h4 className="text-2xl font-bold text-gray-900">12</h4>
                 <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg">Last 24h</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Flow & Departments */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Patient Flow Chart */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Patient Inflow & Outflow</h3>
                <p className="text-xs text-gray-400 font-medium">Weekly statistics for appointments and emergencies.</p>
              </div>
              <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2 text-gray-500">
                <option>This Week</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={patientFlowData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#992120" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#992120" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                    <Tooltip />
                    <Area type="monotone" dataKey="visits" stroke="#992120" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* Active Departments Row */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Key Medical Departments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Cardiology', icon: Activity, color: 'red' },
                { name: 'Neurology', icon: Activity, color: 'purple' },
                { name: 'Radiology', icon: Layers, color: 'blue' },
              ].map((dept, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-transparent hover:border-gray-200 transition-all">
                  <div className={`w-10 h-10 rounded-2xl mb-4 flex items-center justify-center bg-${dept.color}-50 text-${dept.color}-600`}>
                    <dept.icon size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{dept.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">12 Doctors Available</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Team */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Administrative Info</h3>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 mb-1">RECEPTIONIST</p>
                    <p className="text-xs font-bold text-gray-900">{hospital.contact}</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 mb-1">CHIEF DOCTOR</p>
                    <p className="text-xs font-bold text-gray-900">Dr. Sarah Johnson</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 mb-1">SECURITY STATUS</p>
                    <p className="text-xs font-bold text-gray-900">Verified & Certified</p>
                  </div>
               </div>
            </div>

            <div className="mt-10 p-6 bg-primary-light/30 rounded-3xl border border-primary/10 text-center">
              <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Bed Occupancy Rate</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <h4 className="text-3xl font-black text-primary">88.5%</h4>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{width: '88.5%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Assigned Doctors</h3>
                <button className="text-primary font-bold text-xs uppercase hover:underline">See All</button>
             </div>
             <div className="space-y-4">
                {[
                  { name: 'Dr. John Doe', role: 'Neurology', img: 'https://i.pravatar.cc/100?u=1' },
                  { name: 'Dr. Jane Smith', role: 'Cardiology', img: 'https://i.pravatar.cc/100?u=2' },
                  { name: 'Dr. Alex Lee', role: 'Radiology', img: 'https://i.pravatar.cc/100?u=3' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <img src={doc.img} className="w-10 h-10 rounded-xl object-cover" alt={doc.name} />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{doc.name}</h4>
                        <p className="text-[11px] text-gray-400 font-medium">{doc.role}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-all" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
