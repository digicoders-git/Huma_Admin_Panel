import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  MoreHorizontal, 
  ChevronRight, 
  Users,
  Star
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const teamMembers = [
  { name: 'Dr. Amelia Hart', role: 'Head of Cardiology', category: 'Doctors', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Dr. Kevin Lau', role: 'Consultant Cardiologist', category: 'Doctors', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Dr. Aisha Farhan', role: 'Cardiologist', category: 'Doctors', avatar: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Maria Gonzales, RN', role: 'Nurse Supervisor', category: 'Nurses', avatar: 'https://i.pravatar.cc/150?u=4' },
  { name: 'Ardi Prasetyo', role: 'ECG Technician', category: 'Specialists', avatar: 'https://i.pravatar.cc/150?u=5' },
  { name: 'Lina Rahman', role: 'Care Coordinator', category: 'Support Staff', avatar: 'https://i.pravatar.cc/150?u=6' },
];

const performanceStats = [
  { label: 'Patient Satisfaction', value: 94 },
  { label: 'Appointment Efficiency', value: 89 },
  { label: 'Treatment Outcomes', value: 91 },
  { label: 'Staff Performance', value: 85 },
];

const trendsData = [
  { day: 'Mon', value: 36 },
  { day: 'Tue', value: 50 },
  { day: 'Wed', value: 44 },
  { day: 'Thu', value: 40 },
  { day: 'Fri', value: 42 },
  { day: 'Sat', value: 31 },
  { day: 'Sun', value: 48 },
];

const treatments = [
  {
    title: 'General Cardiac Consultation',
    desc: 'Comprehensive evaluation of chest pain, palpitations, breathlessness, and cardiovascular risk factors, supported by ECG and basic diagnostic tests.'
  },
  {
    title: 'Arrhythmia Assessment & Therapy',
    desc: 'Comprehensive evaluation of chest pain, palpitations, breathlessness, and cardiovascular risk factors, supported by ECG and basic diagnostic tests.'
  },
  {
    title: 'Heart Failure Management Program',
    desc: 'Long-term care for heart failure patients, including medication adjustment, lifestyle counseling, and regular monitoring of symptoms and fluid status.'
  },
  {
    title: 'Heart Failure Management Program',
    desc: 'Detailed rhythm analysis with Holter monitoring, medication planning, and procedure referrals for atrial fibrillation and complex arrhythmias.'
  }
];

const DepartmentDetails = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="px-6 py-4 flex flex-col gap-6">
      {/* Top Banner Section */}
      <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        {/* Image Part */}
        <div className="lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
            alt="Cardiology Room" 
            className="w-full h-[400px] object-cover rounded-2xl"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
            <MapPin size={14} className="text-teal-600" />
            <span className="text-[10px] font-bold text-gray-700 uppercase">Heart Center - 4th Floor</span>
          </div>
        </div>

        {/* Content Part */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">Cardiology Department</h2>
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=1" className="w-10 h-10 rounded-full border-2 border-teal-100" />
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900 leading-none">Dr. Amelia Hart, MD, FACC</p>
                <p className="text-[10px] text-gray-400 mt-1">Head of Department</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">About</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              The Cardiology Department focuses on prevention, diagnosis, and treatment of heart and blood vessel diseases. 
              Using integrated Medlink monitoring, the team manages both emergency and routine cardiac cases, coordinates with 
              other specialties, and supports long-term heart health programs for inpatients and outpatients.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Treatments</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {treatments.map((t, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-900 mb-1">{t.title}</h4>
                    <p className="text-[10px] text-gray-400 leading-normal">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Team</h3>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-teal-600">18 Staff</span>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Doctors (4)', 'Specialists (2)', 'Nurses (6)', 'Support Staff (6)'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.split(' ')[0])}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.split(' ')[0] 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={member.avatar} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-none">{member.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">{member.role}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-lg ${
                  member.category === 'Doctors' ? 'bg-slate-800 text-white' :
                  member.category === 'Nurses' ? 'bg-teal-600 text-white' :
                  member.category === 'Specialists' ? 'bg-teal-50 text-teal-600' :
                  'bg-gray-50 text-gray-400'
                }`}>
                  {member.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Card */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance</h3>
            <button className="text-gray-400">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="relative w-40 h-24 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#f1f5f9" 
                strokeWidth="8" 
                strokeLinecap="round"
              />
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#3D9F9D" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray="100 125"
                strokeDashoffset="0"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 text-center">
              <p className="text-[10px] text-gray-400 mb-1">Score</p>
              <p className="text-xl font-bold text-gray-900">
                4.8<span className="text-gray-400 text-sm">/5.0</span>
              </p>
            </div>
          </div>

          <div className="w-full space-y-4">
            {performanceStats.map((stat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-gray-900">{stat.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-600 rounded-full transition-all duration-1000"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Trends Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Appointment Trends</h3>
              <div className="flex items-center gap-2 mt-2">
                <h4 className="text-2xl font-bold text-gray-900">236 Appointments</h4>
                <div className="bg-teal-50 text-teal-600 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <ChevronRight size={10} className="-rotate-90" /> +0.5%
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">than last week</p>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
              Last Week <ChevronRight size={12} className="rotate-90" />
            </button>
          </div>

          <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white px-2 py-1 shadow-md border rounded text-[10px] font-bold">
                          {payload[0].value}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#E2F2F2" radius={[4, 4, 0, 0]}>
                  {trendsData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === 'Tue' ? '#E2F2F2' : '#E2F2F2'} // The blue-ish color from image
                      className="hover:fill-teal-600 transition-colors"
                    />
                  ))}
                </Bar>
                {/* Custom Label for one bar to match screenshot */}
                {trendsData.map((entry, index) => {
                   if (entry.day === 'Tue') {
                     return (
                      <Tooltip key={index} />
                     )
                   }
                   return null;
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
