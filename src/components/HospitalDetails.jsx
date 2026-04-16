import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, MapPin, Phone, Star, Bed, 
  ShieldCheck, Clock, ArrowLeft, Layers, 
  Activity, Award, MoreVertical, ChevronRight, Stethoscope
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
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

const HospitalDetails = ({ onBack }) => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/${id}`);
        const data = await res.json();
        if (data.success) {
          setHospital(data.data);
        }
      } catch (error) {
        console.error("Error fetching hospital:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchHospital();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-gray-100 mx-auto max-w-[1200px] min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-400 font-bold mt-4 text-sm">Loading Hospital Profile...</p>
    </div>
  );

  if (!hospital) return (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-gray-100 mx-auto max-w-[1200px]">
        <p className="text-[#992120] font-bold text-lg mb-4">Hospital Not Found</p>
        <button onClick={onBack} className="px-6 py-2 bg-primary text-white rounded-xl font-bold shadow-sm">Back to List</button>
    </div>
  );

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1400px] mx-auto transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm">
              <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-gray-900">Hospital Details</h2>
      </div>

      {/* Main Banner Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="h-48 md:h-64 relative">
          <img 
            src={hospital.image} 
            className="w-full h-full object-cover brightness-90" 
            alt={hospital.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:left-10 text-white">
             <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">Verified Institution</span>
             </div>
             <h2 className="text-3xl font-bold">{hospital.name}</h2>
          </div>
        </div>

        <div className="p-8 md:p-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                 <div className="flex flex-wrap gap-6 mb-8 text-[13px] font-semibold text-gray-500">
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {hospital.location}</div>
                    <div className="flex items-center gap-2"><Star size={16} className="text-amber-500" /> {hospital.rating} Rating</div>
                    <div className="flex items-center gap-2"><Clock size={16} className="text-primary" /> Open 24/7 Hours</div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-50">
                   <div className="space-y-1">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Beds Available</p>
                     <p className="text-2xl font-bold text-gray-900">{hospital.availableBeds}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Specialists</p>
                     <p className="text-2xl font-bold text-gray-900">{hospital.doctors}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Departments</p>
                     <p className="text-2xl font-bold text-gray-900">{hospital.departments}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Support Staff</p>
                     <p className="text-2xl font-bold text-gray-900">45+</p>
                   </div>
                 </div>
              </div>

              <div className="lg:col-span-4 flex items-start justify-end gap-3">
                 <button className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all">
                   Manage Facility
                 </button>
                 <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-900 border border-gray-100">
                   <MoreVertical size={20} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-tight">Patient Inflow Analysis</h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={patientFlowData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#992120" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#992120" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                    <Tooltip />
                    <Area type="monotone" dataKey="visits" stroke="#992120" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-tight">Facility Contacts</h3>
            <div className="space-y-5">
               <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100"><Phone size={16} /></div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">RECEPTION</p>
                    <p className="text-[13px] font-bold text-gray-900">{hospital.contact}</p>
                  </div>
               </div>
               <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"><Stethoscope size={16} /></div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">CHIEF MEDICAL OFFICER</p>
                    <p className="text-[13px] font-bold text-gray-900">Dr. Sarah Johnson</p>
                  </div>
               </div>
            </div>

            <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">Real-time Occupancy</p>
              <h4 className="text-2xl font-bold text-primary mb-3">88.5%</h4>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{width: '88.5%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
