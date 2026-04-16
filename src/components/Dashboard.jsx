import React, { useState, useEffect } from 'react';
import {
  Users,
  CalendarCheck,
  Loader2,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  Brain,
  Building2,
  MessageSquare,
  Newspaper,
  Hospital
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

const API = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Loading Dashboard Data...</p>
      </div>
    );
  }

  const mainStatCards = [
    { title: 'Total Patients', value: stats.patientCount, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Appointments', value: stats.totalAppointments, icon: CalendarCheck, color: 'text-primary', bg: 'bg-primary-light' },
    { title: 'Total Doctors', value: stats.totalDoctors, icon: Stethoscope, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const quickStats = [
    { title: 'Specialities', value: stats.totalSpecialities, icon: Brain, color: 'text-purple-500' },
    { title: 'Departments', value: stats.totalDepartments, icon: Building2, color: 'text-emerald-500' },
    { title: 'Enquiries', value: stats.totalEnquiries, icon: MessageSquare, color: 'text-orange-500' },
    { title: 'News Articles', value: stats.totalNews, icon: Newspaper, color: 'text-pink-500' },
    // { title: 'Hospitals', value: stats.totalHospitals, icon: Hospital, color: 'text-cyan-500' },
  ];

  const statusPieData = stats.statusStats.map(s => {
    const colors = {
      'Completed': '#992120',
      'Scheduled': '#3b82f6',
      'Ongoing': '#10b981',
      'Canceled': '#ef4444'
    };
    return { name: s._id, value: s.count, color: colors[s._id] || '#cbd5e1' };
  });

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">overview of hospital operations</p>
        </div>
      </div>

      {/* ── TOP MAIN STATS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mainStatCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value.toLocaleString()}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* ── QUICK STATS ROW ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
         {quickStats.map((stat, idx) => (
           <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:bg-gray-50 transition-all">
              <div className={`${stat.color} mb-2 group-hover:scale-110 transition-transform`}>
                 <stat.icon size={20} />
              </div>
              <h4 className="text-lg font-bold text-gray-800 leading-tight">{stat.value}</h4>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{stat.title}</p>
           </div>
         ))}
      </div>

      {/* ── CONTENT GRID ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Appointments (Left) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900 text-sm italic uppercase tracking-tighter">Recent Appointments</h3>
              <button 
                onClick={() => window.location.href='/appointments'}
                className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Full List
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-50">
                    <th className="p-4 pl-6">Patient</th>
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {stats.recentAppointments.map((app) => (
                    <tr key={app._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-gray-900">{app.name}</div>
                        <div className="text-[9px] font-bold text-gray-300 uppercase mt-0.5">{app.code || '#N/A'}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-800 text-xs text-nowrap">Dr. {app.doctor}</div>
                        <div className="text-[9px] text-primary font-bold uppercase">{app.specialty || 'General'}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          app.status === 'Completed' ? 'bg-primary/5 text-primary' :
                          app.status === 'Canceled' ? 'bg-red-50 text-red-500' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 font-bold text-gray-400 text-[10px] text-nowrap">
                        {app.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Status Pie & Duty (Right) */}
        <div className="space-y-8">
          
          {/* Status Pie */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-6 pb-2 border-b border-gray-50">Appointment Mix</h3>
            <div className="h-44 relative">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={statusPieData} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                      {statusPieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[9px] text-gray-400 font-bold uppercase">Total</span>
                  <span className="text-xl font-bold text-gray-900">{stats.totalAppointments}</span>
               </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 justify-center">
               {statusPieData.map((item, i) => (
                 <div key={i} className="flex items-center gap-1.5 min-w-[70px]">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{item.name} ({item.value})</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Simple Duty Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 text-sm italic uppercase tracking-tighter">On Duty Staff</h3>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             </div>
             <div className="flex items-center justify-between py-6 bg-gray-50 rounded-xl px-6 mb-6">
                <div className="text-center">
                   <p className="text-2xl font-black text-primary">{stats.doctorsOnDuty}</p>
                   <p className="text-[9px] font-bold text-gray-500 uppercase mt-0.5 tracking-tight">Available</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                   <p className="text-2xl font-black text-gray-800">{stats.totalDoctors}</p>
                   <p className="text-[9px] font-bold text-gray-500 uppercase mt-0.5 tracking-tight">Total Staff</p>
                </div>
             </div>
             <button 
               onClick={() => window.location.href='/doctors'}
               className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-gray-400 hover:text-primary hover:border-primary transition-all uppercase tracking-widest"
             >
                Staff Management →
             </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
