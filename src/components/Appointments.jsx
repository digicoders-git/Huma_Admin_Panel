import React from 'react';
import { 
  FileText, ShieldCheck, Clock, XSquare, 
  ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const statCards = [
  { 
    title: "Today's Appointments", 
    value: "52", 
    trend: "+2.45%", 
    isPositiveTrend: true,
    desc: "The available bed capacity is ", 
    descBold: "180",
    icon: FileText,
    iconColor: "text-primary",
    trendBg: "bg-primary-light"
  },
  { 
    title: "Completed", 
    value: "28", 
    trend: "+0.5%", 
    isPositiveTrend: true,
    desc: "The incomplete appointments are ", 
    descBold: "24",
    icon: ShieldCheck,
    iconColor: "text-primary",
    trendBg: "bg-primary-light"
  },
  { 
    title: "Ongoing", 
    value: "18", 
    trend: "-0.25%", 
    isPositiveTrend: false,
    desc: "The performance is slower than yesterday",
    descBold: "",
    icon: Clock,
    iconColor: "text-primary",
    trendBg: "bg-red-50 text-red-500"
  },
  { 
    title: "Canceled", 
    value: "6", 
    trend: "+1.3%", 
    isPositiveTrend: true, // But styled red
    isNegativeColor: true,
    desc: "The performance is higher than yesterday",
    descBold: "",
    icon: XSquare,
    iconColor: "text-primary",
    trendBg: "bg-red-50 text-red-500"
  },
];

const trendData = [
  { name: 'Mon', Appointments: 28 },
  { name: 'Tue', Appointments: 45 },
  { name: 'Wed', Appointments: 25 },
  { name: 'Thu', Appointments: 40 },
  { name: 'Fri', Appointments: 32 },
  { name: 'Sat', Appointments: 38 },
  { name: 'Sun', Appointments: 50 },
];

const appointments = [
  { id: 1, name: 'Alicia Perth', code: '#PT-2035-001', phone: '+62 812-3456-7102', doctor: 'Dr. Amelia Hart', specialty: 'Cardiology', type: 'Consultation', notes: 'Chest pain check', date: '12 March 2035', time: '08:30 - 09:00', status: 'Completed', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 2, name: 'Bima Kurnia', code: '#PT-2035-024', phone: '+62 813-2255-8941', doctor: 'Dr. Rizky Pratama', specialty: 'General Medicine', type: 'Follow-up', notes: 'Post flu review', date: '12 March 2035', time: '09:00 - 09:20', status: 'Completed', avatar: 'https://i.pravatar.cc/150?u=12' },
  { id: 3, name: 'Clara Wright', code: '#PT-2035-053', phone: '+62 811-6677-2043', doctor: 'Dr. Sophia Liang', specialty: 'Pediatrics', type: 'Consultation', notes: 'Fever & cough', date: '12 March 2035', time: '09:30 - 10:00', status: 'Ongoing', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 4, name: 'Daniel Wong', code: '#PT-2035-078', phone: '+62 812-9012-4477', doctor: 'Dr. Daniel Obeng', specialty: 'Orthopedics', type: 'Surgery', notes: 'Knee arthroscopy', date: '12 March 2035', time: '10:00 - 12:00', status: 'Scheduled', avatar: 'https://i.pravatar.cc/150?u=14' },
  { id: 5, name: 'Erica Smith', code: '#PT-2035-091', phone: '+62 815-3399-1280', doctor: 'Dr. Nina Alvarez', specialty: 'Dermatology', type: 'Follow-up', notes: 'Acne treatment plan', date: '12 March 2035', time: '11:00 - 11:20', status: 'Scheduled', avatar: 'https://i.pravatar.cc/150?u=15' },
  { id: 6, name: 'Francis Rowe', code: '#PT-2035-129', phone: '+62 819-4455-7832', doctor: 'Dr. Amelia Hart', specialty: 'Cardiology', type: 'Follow-up', notes: 'ECG result discussion', date: '12 March 2035', time: '13:00 - 13:20', status: 'Completed', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 7, name: 'Grace Nathanile', code: '#PT-2035-141', phone: '+62 812-7788-9034', doctor: 'Dr. Rizky Pratama', specialty: 'General Medicine', type: 'Consultation', notes: 'Back pain complaint', date: '12 March 2035', time: '13:30 - 14:00', status: 'Canceled', avatar: 'https://i.pravatar.cc/150?u=17' },
  { id: 8, name: 'Hasan Malik', code: '#PT-2035-152', phone: '+62 817-2200-5611', doctor: 'Dr. Daniel Obeng', specialty: 'Orthopedics', type: 'Telemedicine', notes: 'Online follow-up', date: '12 March 2035', time: '14:15 - 14:45', status: 'Ongoing', avatar: 'https://i.pravatar.cc/150?u=18' },
];

const renderStatusBadge = (status) => {
  switch(status) {
    case 'Completed':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary/10">Completed</span>;
    case 'Ongoing':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">Ongoing</span>;
    case 'Scheduled':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-500 border border-blue-100">Scheduled</span>;
    case 'Canceled':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-100">Canceled</span>;
    default:
      return null;
  }
};

const Appointments = () => {
  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto flex flex-col gap-6">

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                <card.icon size={18} className={card.iconColor} />
                {card.title}
              </div>
              <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-4xl font-bold text-gray-900">{card.value}</h3>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${
                card.isNegativeColor || !card.isPositiveTrend ? 'bg-red-50 text-red-500' : 'bg-primary-light text-primary'
              }`}>
                {card.isPositiveTrend ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.trend}
              </div>
            </div>

            <p className="text-[13px] text-gray-500 leading-tight">
              {card.desc.split('slower')[0]}
              {card.desc.includes('slower') && <span className="font-bold text-gray-900">slower </span>}
              {card.desc.includes('higher') && <span className="font-bold text-gray-900">higher </span>}
              {card.desc.split('slower')[1] || card.desc.split('higher')[1]}
              {card.descBold && <span className="font-bold text-gray-900">{card.descBold}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Middle Row: Trends & Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[420px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg tracking-tight">Appointment Trends</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-500 font-medium tracking-wide">Total Appointments</p>
                <div className="text-4xl font-black text-primary mt-1">320</div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-sm bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 font-bold text-gray-600 hover:bg-gray-100 transition-all">
              This Week <ChevronDown size={16} />
            </button>
          </div>
          <div className="flex-1 w-full translate-x-[-10px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }} barSize={32}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#992120" stopOpacity={0.15}/>
                    <stop offset="100%" stopColor="#992120" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}} 
                />
                <Tooltip 
                  cursor={{fill: '#F8FAFB', radius: 8}} 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700}} 
                />
                <Bar dataKey="Appointments" fill="url(#colorTrend)" radius={[10, 10, 0, 0]}>
                  {trendData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.Appointments > 45 ? '#992120' : "url(#colorTrend)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Type */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Appointment Type</h3>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="border-l-4 border-primary pl-3">
              <p className="text-[13px] font-semibold text-gray-900 mb-1">Consultation</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">50%</span>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">26 Total Patients</span>
              </div>
            </div>
            <div className="border-l-4 border-primary/60 pl-3">
              <p className="text-[13px] font-semibold text-gray-900 mb-1">Follow-up</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">25%</span>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">13 Total Patients</span>
              </div>
            </div>
            <div className="border-l-4 border-primary/30 pl-3">
              <p className="text-[13px] font-semibold text-gray-900 mb-1">Surgery</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">15%</span>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">8 Total Patients</span>
              </div>
            </div>
            <div className="border-l-4 border-primary/15 pl-3">
              <p className="text-[13px] font-semibold text-gray-900 mb-1">Telemedicine</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">10%</span>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">5 Total Patients</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end pb-4 pt-4">
            <div className="flex h-36 items-end gap-[4px] sm:gap-[6px] justify-between px-2">
              {/* Generate 50 vertical bars (25 of type1, 12 of type2, 8 of type3, 5 of type4) */}
              {Array.from({length: 50}).map((_, i) => {
                let colorClass = "bg-primary";
                if (i >= 25 && i < 37) colorClass = "bg-primary/60";
                else if (i >= 37 && i < 45) colorClass = "bg-primary/30";
                else if (i >= 45) colorClass = "bg-primary-light";
                
                // Random height for dramatic effect between 70% and 100%
                const height = 60 + Math.random() * 40;
                
                return (
                  <div key={i} className={`flex-1 rounded-t-sm w-1.5 ${colorClass}`} style={{height: `${height}%`}}></div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List View */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Appointments</h3>
          <button className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium text-gray-600 hover:bg-gray-100">
            This Week <ChevronDown size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 text-[13px] text-gray-500 border-b border-gray-100">
                <th className="font-medium p-4 pl-6 w-12"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" /></th>
                <th className="font-medium p-4 py-3">Name ↕</th>
                <th className="font-medium p-4 py-3">Phone Number ↕</th>
                <th className="font-medium p-4 py-3">Doctor ↕</th>
                <th className="font-medium p-4 py-3">Appointment Type ↕</th>
                <th className="font-medium p-4 py-3">Notes ↕</th>
                <th className="font-medium p-4 py-3">Date ↕</th>
                <th className="font-medium p-4 py-3">Status ↕</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {appointments.map((app) => (
                <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" /></td>
                  <td className="p-4 py-3 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <img src={app.avatar} alt={app.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900 leading-tight">{app.name}</div>
                        <div className="text-[12px] text-gray-500 mt-0.5">{app.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 py-3 text-gray-600 font-medium whitespace-nowrap">{app.phone}</td>
                  <td className="p-4 py-3 min-w-[180px]">
                    <div className="font-semibold text-gray-900 leading-tight">{app.doctor}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{app.specialty}</div>
                  </td>
                  <td className="p-4 py-3 font-medium text-gray-700">{app.type}</td>
                  <td className="p-4 py-3 w-[200px]">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <FileText size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">{app.notes}</span>
                    </div>
                  </td>
                  <td className="p-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900 leading-tight">{app.date}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{app.time}</div>
                  </td>
                  <td className="p-4 py-3 whitespace-nowrap pr-6">
                    {renderStatusBadge(app.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
