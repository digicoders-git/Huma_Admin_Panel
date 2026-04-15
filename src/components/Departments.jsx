import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  Users, 
  Search, 
  SlidersHorizontal,
  MoreHorizontal
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

const stats = [
  {
    title: "Total Departments",
    value: "8",
    subtitle: "with 1,475 staff in total",
    icon: Building2,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600"
  },
  {
    title: "Total Specialties",
    value: "24",
    subtitle: "with 73 average staff per doctor",
    icon: Stethoscope,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600"
  },
  {
    title: "Average Team per Department",
    value: "45",
    subtitle: "increase +2,4% than last year",
    icon: Users,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600"
  }
];

const chartData = [
  { name: 'General Medicine', support: 5, specialists: 10, nurses: 15, doctors: 20 },
  { name: 'Pediatrics', support: 8, specialists: 12, nurses: 10, doctors: 15 },
  { name: 'Cardiology', support: 3, specialists: 7, nurses: 13, doctors: 17 },
  { name: 'Orthopedics', support: 6, specialists: 9, nurses: 14, doctors: 11 },
  { name: 'Dermatology', support: 4, specialists: 8, nurses: 12, doctors: 9 },
  { name: 'Neurology', support: 7, specialists: 11, nurses: 9, doctors: 13 },
  { name: 'Radiology', support: 5, specialists: 14, nurses: 8, doctors: 10 },
  { name: 'Maternity Care', support: 9, specialists: 6, nurses: 18, doctors: 12 },
];

const departments = [
  {
    id: 1,
    name: 'General Medicine',
    location: 'Main Building - 2nd Floor',
    staffCount: 24,
    description: 'Handles routine check-ups, acute illnesses, and chronic disease management with integrated access to diagnostics and referrals.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3']
  },
  {
    id: 2,
    name: 'Pediatrics',
    location: "Children's Wing - 3rd Floor",
    staffCount: 20,
    description: 'Dedicated to infants, children, and adolescents with child-friendly rooms and family-focused care.',
    image: 'https://images.unsplash.com/photo-1502740479796-61c9ed1c338f?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6']
  },
  {
    id: 3,
    name: 'Cardiology',
    location: 'Heart Center - 4th Floor',
    staffCount: 22,
    description: 'Specializes in heart disease prevention, diagnosis, and intervention with access to advanced monitoring and imaging.',
    image: 'https://images.unsplash.com/photo-1579684388669-c153308939e0?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=7', 'https://i.pravatar.cc/150?u=8', 'https://i.pravatar.cc/150?u=9']
  },
  {
    id: 4,
    name: 'Orthopedics',
    location: 'Surgical Block - 3rd Floor',
    staffCount: 22,
    description: 'Focuses on bone, joint, and muscle conditions, including trauma cases and post-operative rehabilitation.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=10', 'https://i.pravatar.cc/150?u=11', 'https://i.pravatar.cc/150?u=12']
  },
  {
    id: 5,
    name: 'Dermatology',
    location: 'Outpatient Clinic - 2nd Floor',
    staffCount: 16,
    description: 'Provides medical and cosmetic skin treatments for acne, allergies, chronic rashes, and aesthetic procedures.',
    image: 'https://images.unsplash.com/photo-1512677859289-868722942457?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=13', 'https://i.pravatar.cc/150?u=14', 'https://i.pravatar.cc/150?u=15']
  },
  {
    id: 6,
    name: 'Neurology',
    location: 'Neuro Center - 5th Floor',
    staffCount: 19,
    description: 'Manages brain, nerve, and spinal disorders with coordinated diagnostic tests and long-term follow-up plans.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=16', 'https://i.pravatar.cc/150?u=17', 'https://i.pravatar.cc/150?u=18']
  },
  {
    id: 7,
    name: 'Radiology',
    location: 'Diagnostic Wing - 1st Floor',
    staffCount: 18,
    description: 'Supports all departments with X-ray, CT, MRI, and ultrasound imaging, integrated directly with Medlink reports.',
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=19', 'https://i.pravatar.cc/150?u=20', 'https://i.pravatar.cc/150?u=21']
  },
  {
    id: 8,
    name: 'Maternity Care',
    location: 'Maternity Tower - 4th & 5th Floor',
    staffCount: 25,
    description: 'Covers prenatal care, delivery, and newborn services with specialized neonatal support and family-centered rooms.',
    image: 'https://images.unsplash.com/photo-1536640712247-c45474d612e4?auto=format&fit=crop&q=80&w=400',
    avatars: ['https://i.pravatar.cc/150?u=22', 'https://i.pravatar.cc/150?u=23', 'https://i.pravatar.cc/150?u=24']
  }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-xl border border-gray-100 rounded-xl">
        <p className="text-sm font-bold text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs text-gray-500">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-gray-900">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Departments = ({ onOpenDetails }) => {
  return (
    <div className="px-6 py-4 flex flex-col gap-6">
      {/* Upper Section: Stats and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stats Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-400">{stat.subtitle}</p>
              </div>
              <div className={`${stat.iconBg} ${stat.iconColor} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div className="absolute top-4 right-4 text-gray-400">
                <MoreHorizontal size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Staff Breakdown by Departments</h3>
              <p className="text-xs text-gray-400 mt-1">Total All Staff</p>
              <h4 className="text-3xl font-bold text-teal-600 mt-1">1,475</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <span className="text-xs text-gray-500">Support Staff</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-teal-100"></div>
                <span className="text-xs text-gray-500">Specialists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                <span className="text-xs text-gray-500">Nurses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                <span className="text-xs text-gray-500">Doctors</span>
              </div>
              <button className="text-gray-400 ml-2">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                  interval={0}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="support" stackId="a" fill="#e2e8f0" radius={[0, 0, 0, 0]} />
                <Bar dataKey="specialists" stackId="a" fill="#ccf2f4" />
                <Bar dataKey="nurses" stackId="a" fill="#3D9F9D" />
                <Bar dataKey="doctors" stackId="a" fill="#1e293b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Section: Search and Filter */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search Departments" 
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-xl text-sm font-semibold hover:bg-teal-100 transition-colors">
          <SlidersHorizontal size={18} />
          Filter
        </button>
      </div>

      {/* Lower Section: Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {departments.map((dept) => (
          <div 
            key={dept.id} 
            onClick={() => onOpenDetails && onOpenDetails(dept)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="h-40 overflow-hidden">
              <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                <div className="flex items-center gap-2 bg-gray-50 px-2.5 py-1 rounded-md w-fit">
                  <p className="text-[10px] text-gray-500">{dept.location}</p>
                  <div className="flex -space-x-2">
                    {dept.avatars.map((url, i) => (
                      <img key={i} src={url} className="w-4 h-4 rounded-full border border-white" alt="staff" />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-gray-700">{dept.staffCount} Staff</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                {dept.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
