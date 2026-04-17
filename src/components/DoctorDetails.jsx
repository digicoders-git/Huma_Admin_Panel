import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ChevronLeft, CheckCircle2, CircleDashed, Info, Phone, MapPin, Share2
} from 'lucide-react';

const DoctorDetails = ({ onBack }) => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(14);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      const docRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor/${id}`);
      const docData = await docRes.json();
      
      if (docData.success) {
        setDoctor(docData.data);
        const appRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment?doctor=${encodeURIComponent(docData.data.fullName)}`);
        const appData = await appRes.json();
        if (appData.success) {
          setAppointments(appData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDoctorData();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto max-w-[1600px] min-h-[400px]">
       <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
       <p className="text-gray-400 font-bold">Loading Doctor Profile...</p>
    </div>
  );

  if (!doctor) return (
    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto max-w-[1600px]">
       <p className="text-[#992120] font-bold text-lg mb-4">Doctor Not Found</p>
       <button onClick={onBack} className="px-6 py-2 bg-[#992120] text-white rounded-xl font-bold transition-all">Go Back</button>
    </div>
  );

  const apiBase = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
  const avatarUrl = doctor.avatar ? `${apiBase}${doctor.avatar}` : `https://i.pravatar.cc/300?u=${doctor._id}`;
  const uniquePatients = [...new Set(appointments.map(a => a.name))].length;
  const daySchedule = appointments.slice(0, 6); 

  const weekdays = [
    { label: 'Sat', date: 12 }, { label: 'Sun', date: 13 }, { label: 'Mon', date: 14 }, 
    { label: 'Tue', date: 15 }, { label: 'Wed', date: 16 }
  ];

  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all">
              <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-gray-900">Doctor Profile Details</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* ══ LEFT COLUMN ══════════════════════════════════════════════════════ */}
        <div className="xl:col-span-3 flex flex-col gap-5">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 flex justify-center py-6 border-b border-gray-100">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
                <img
                  src={avatarUrl}
                  alt={doctor.fullName}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
                      e.target.className = "w-full h-full object-contain p-8 opacity-20";
                  }}
                />
              </div>
            </div>
            <div className="p-5 text-center">
              <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full mb-2 inline-block">
                {doctor.doctorId || '#DR-NEW'}
              </span>
              <h3 className="font-bold text-gray-900 text-lg">{doctor.fullName}</h3>
              <p className="text-xs text-gray-400 font-semibold mb-4">{doctor.specialization || 'N/A'}</p>
              
              <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-4">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Status</p>
                  <span className="text-[11px] font-bold text-green-600 flex items-center justify-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {doctor.status || 'Active'}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Exp.</p>
                  <p className="text-[11px] font-bold text-gray-800 mt-1">
                    {doctor.experience 
                      ? `${doctor.experience} Years` 
                      : (doctor.startDate ? `${Math.max(1, new Date().getFullYear() - new Date(doctor.startDate).getFullYear())} Years` : '10+ Years')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900 text-sm">Appointments</h4>
            </div>
            <div className="space-y-3">
              {daySchedule.length === 0 ? (
                 <p className="text-center py-6 text-gray-400 text-xs italic">No appointments today</p>
              ) : daySchedule.map((appt, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center font-bold text-primary text-[10px]">
                    {appt.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-[12px] truncate">{appt.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{appt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MIDDLE COLUMN ════════════════════════════════════════════════════ */}
        <div className="xl:col-span-6 flex flex-col gap-5">

          {/* About Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-3">About Doctor</h4>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              {doctor.about || 'Biography details are currently being updated for this medical professional.'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-50">
              {[
                { label: 'Designation', value: doctor.designation || 'N/A' },
                { label: 'Qualification', value: doctor.qualification || 'N/A' },
                { label: 'Department', value: doctor.department || 'N/A' },
                { label: 'Specialty',  value: doctor.specialization || 'N/A' },
                { label: 'License ID', value: doctor.licenseNumber || 'N/A' },
                { label: 'Joined',     value: doctor.startDate ? new Date(doctor.startDate).getFullYear() : 'N/A' }
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{item.label}</p>
                  <p className="text-[13px] font-bold text-gray-800 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-bold text-gray-900 text-sm">Professional Certifications</h4>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">Verified</span>
            </div>
            {doctor.certifications && doctor.certifications.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {doctor.certifications.map((file, idx) => {
                  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file);
                  return (
                    <a key={idx} href={`${apiBase}${file}`} target="_blank" rel="noopener noreferrer" className="group">
                      <div className="aspect-square bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center relative hover:border-primary/30 transition-all shadow-sm">
                        {isImage ? (
                          <img src={`${apiBase}${file}`} alt="Cert" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        ) : (
                          <span className="font-bold text-[10px] text-primary">PDF</span>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-[13px] italic py-4">No certifications uploaded yet.</p>
            )}
          </div>

          {/* History Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-bold text-gray-900 text-sm mb-4">Consultation History</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-50 uppercase text-[10px] font-bold">
                    <th className="pb-3 pr-2">Patient</th>
                    <th className="pb-3 text-center">Time</th>
                    <th className="pb-3 text-center">Type</th>
                    <th className="pb-3 text-right">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr><td colSpan="4" className="py-8 text-center text-gray-300 italic">No records found</td></tr>
                  ) : appointments.slice(0, 5).map((p, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                           <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-[9px]">{p.name[0]}</div>
                           <span className="font-bold text-gray-800">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-center text-gray-500 px-2">{p.time}</td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-0.5 rounded-lg bg-gray-50 border border-gray-100 text-[9px] font-bold text-gray-600">
                           {p.type}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold text-gray-900">₹{p.fees || '500'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN ═════════════════════════════════════════════════════ */}
        <div className="xl:col-span-3 flex flex-col gap-5">
          
          {/* Quick Stats */}
          <div className="bg-[#992120] rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Clinic Performance</p>
             <h4 className="text-lg font-bold mb-6">Total Impact</h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                   <p className="text-[8px] font-bold uppercase opacity-50 mb-1">Total Patients</p>
                   <p className="text-xl font-bold">{uniquePatients}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                   <p className="text-[8px] font-bold uppercase opacity-50 mb-1">Success Rate</p>
                   <p className="text-xl font-bold">98%</p>
                </div>
             </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-gray-900 text-sm mb-4">Contact Information</h4>
            <div className="space-y-4 text-[13px]">
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
                  <p className="font-bold text-gray-800 mt-1">{doctor.phone || 'N/A'}</p>
               </div>
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                  <p className="font-bold text-gray-800 mt-1">{doctor.email || 'N/A'}</p>
               </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
             <h4 className="font-bold text-gray-900 text-sm mb-4">Office Address</h4>
             <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                {doctor.address || 'Huma Neurology & Multispecialty Hospital.'}
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
