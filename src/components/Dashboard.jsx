import React from 'react';
import {
  Users,
  UserPlus,
  CalendarCheck,
  TrendingUp,
  MoreHorizontal,
  AlertCircle,
  ChevronDown,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';

const statCards = [
  { title: 'Total Patients', value: '8,340', trend: '+1.5% vs. last week', icon: Users },
  { title: 'Appointments Today', value: '52', trend: '+8% vs. yesterday', icon: CalendarCheck },
  { title: 'New Registrations', value: '124', trend: '+12% vs. last week', icon: UserPlus },
];

const ageData = [
  { name: 'Mon', Children: 28, Teens: 45, Adults: 35 },
  { name: 'Tue', Children: 32, Teens: 40, Adults: 40 },
  { name: 'Wed', Children: 38, Teens: 56, Adults: 35 },
  { name: 'Thu', Children: 42, Teens: 45, Adults: 40 },
  { name: 'Fri', Children: 35, Teens: 50, Adults: 35 },
  { name: 'Sat', Children: 38, Teens: 45, Adults: 32 },
  { name: 'Sun', Children: 42, Teens: 48, Adults: 40 },
];

const deptData = [
  { name: 'Neurology', value: 2140, color: '#992120' },
  { name: 'General Medicine', value: 1620, color: '#b52a29' },
  { name: 'Cardiology', value: 1380, color: '#e7e3da' },
  { name: 'Orthopedics', value: 1050, color: '#d4cfc5' },
  { name: 'Dermatology', value: 1060, color: '#c4bfb5' },
  { name: 'Pediatrics', value: 1090, color: '#7a1a19' },
];

const revenueData = [
  { name: 'Jan', Income: 800, Expense: 600 },
  { name: 'Feb', Income: 900, Expense: 650 },
  { name: 'Mar', Income: 850, Expense: 700 },
  { name: 'Apr', Income: 1100, Expense: 800 },
  { name: 'May', Income: 950, Expense: 750 },
  { name: 'Jun', Income: 1620, Expense: 872 },
  { name: 'Jul', Income: 1200, Expense: 900 },
  { name: 'Aug', Income: 1300, Expense: 850 },
  { name: 'Sep', Income: 1500, Expense: 1100 },
  { name: 'Oct', Income: 1400, Expense: 1000 },
  { name: 'Nov', Income: 1700, Expense: 1200 },
  { name: 'Dec', Income: 1800, Expense: 1300 },
];

const reports = [
  { id: 1, title: 'Medication stock running low in Pharmacy', desc: 'PT-2035-112', time: '5m ago', type: 'warning' },
  { id: 2, title: 'System lag on Outpatient Registration', desc: 'Eliana Marks (Front Desk)', time: '14m ago', type: 'error' },
  { id: 3, title: 'Air conditioning error in ICU ward', desc: 'Eduardo Huarez (Maintenance)', time: 'Yesterday', type: 'warning' },
  { id: 4, title: 'Broken wheelchair near Emergency entrance', desc: 'Andrew Feign (Hospital Staff)', time: 'Yesterday', type: 'error' },
];

const appointments = [
  { id: 1, name: 'Alicia Perth', code: 'PT-2035-001', doctor: 'Dr. Amelia Hart', specialty: 'Cardiology', type: 'Consultation', date: '20 March 2035', time: '09:00 - 09:20', status: 'Completed' },
  { id: 2, name: 'Bima Kurnia', code: 'PT-2035-024', doctor: 'Dr. Rizky Pratama', specialty: 'General Medicine', type: 'Follow-up', date: '20 March 2035', time: '10:15 - 10:45', status: 'Scheduled' },
  { id: 3, name: 'Clara Wright', code: 'PT-2035-053', doctor: 'Dr. Sophia Liang', specialty: 'Pediatrics', type: 'Consultation', date: '20 March 2035', time: '13:00 - 13:30', status: 'Completed' },
  { id: 4, name: 'Erica Smith', code: 'PT-2035-091', doctor: 'Dr. Nina Alvarez', specialty: 'Dermatology', type: 'Surgery', date: '06 March 2035', time: '08:00 - 11:00', status: 'Scheduled' },
  { id: 5, name: 'Rendy Tan', code: 'PT-2035-062', doctor: 'Dr. Daniel Obeng', specialty: 'Orthopedics', type: 'Follow-up', date: '06 March 2035', time: '15:30 - 16:00', status: 'Canceled' },
  { id: 6, name: 'Sintya Wavy', code: 'PT-2035-021', doctor: 'Dr. Rudy Writes', specialty: 'Cardiology', type: 'Surgery', date: '07 March 2035', time: '09:00 - 09:20', status: 'Completed' },
];

const todaySummary = [
  { label: 'Completed', value: 28, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Ongoing', value: 18, icon: Activity, color: 'text-primary', bg: 'bg-primary-light' },
  { label: 'Scheduled', value: 6, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Canceled', value: 6, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
];

const Dashboard = () => {
  return (
    <div className="px-2 sm:px-8 pb-8 flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto">

      {/* ── Left Main Content ── */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 font-medium mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-primary text-white">
                  <stat.icon size={22} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <div className="bg-primary-light p-1 rounded-full flex items-center justify-center">
                  <TrendingUp size={14} className="text-primary" />
                </div>
                <span className="text-sm text-primary font-medium">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Bar Chart */}
          <div className="col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900 leading-none">Patient by Age Stages</h3>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-xs sm:text-sm text-gray-500">Total Patients</span>
                  <span className="text-xl sm:text-2xl font-bold text-primary leading-none">465</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-sm text-gray-400 font-bold sm:font-medium">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-200"></div><span>Children</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary/60"></div><span>Teens</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div><span>Adults</span></div>
                </div>
                <button className="flex items-center gap-1 text-[11px] sm:text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-bold text-gray-600 hover:bg-gray-100">
                  This Week <ChevronDown size={14} />
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 10, right: 0, left: -20, bottom: 10 }} barSize={10}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 13 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 13 }} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="Children" fill="#e7e3da" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Teens" fill="#b52a29" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Adults" fill="#992120" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Patient by Departments</h3>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-44 relative flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deptData} innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="value" stroke="none">
                      {deptData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-gray-500 font-medium">All Patients</span>
                  <span className="text-xl font-bold text-gray-900">8,340</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-4">
                {deptData.map((dept, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="w-2.5 h-2.5 rounded mt-1 flex-shrink-0" style={{ backgroundColor: dept.color }}></div>
                    <div>
                      <p className="text-[12px] font-medium text-gray-800 leading-none mb-1">{dept.name}</p>
                      <p className="text-[11px] text-gray-500">{dept.value.toLocaleString()} Patients</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue & Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Revenue Chart */}
          <div className="col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-6">
                <h3 className="font-bold text-gray-900">Revenue</h3>
                <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div>Income</div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>Expense</div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium text-gray-600 hover:bg-gray-100">
                Last Year <ChevronDown size={16} />
              </button>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#992120" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#992120" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 13 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 13 }} tickFormatter={(v) => v >= 1000 ? v / 1000 + 'K' : v} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="Expense" stroke="#D1D5DB" strokeWidth={2} fill="none" dot={{ r: 0 }} activeDot={{ r: 6 }} />
                  <Area type="monotone" dataKey="Income" stroke="#992120" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" dot={{ r: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#992120' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reports */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">Reports</h3>
              <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
            </div>
            <div className="flex flex-col gap-5">
              {reports.map((report) => (
                <div key={report.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className={`mt-0.5 p-2 rounded-xl h-fit flex-shrink-0 ${report.type === 'warning' ? 'bg-amber-100/50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                    <AlertCircle size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-900 mb-1 leading-snug">{report.title}</p>
                    <p className="text-[11px] text-gray-400 font-medium truncate mb-2">{report.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{report.time}</span>
                      <a href="#" className="text-[11px] text-primary font-black hover:underline flex items-center gap-1">
                        DETAILS <span className="text-[14px]">›</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Recent Appointments</h3>
            <button className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium text-gray-600 hover:bg-gray-100">
              This Week <ChevronDown size={16} />
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/50 text-[12px] text-gray-400 border-b border-gray-100">
                  <th className="font-black p-4 pl-6 uppercase tracking-widest">Patient</th>
                  <th className="font-black p-4 uppercase tracking-widest">Doctor & Specialty</th>
                  <th className="font-black p-4 uppercase tracking-widest">Type</th>
                  <th className="font-black p-4 uppercase tracking-widest">Scheduled Date</th>
                  <th className="font-black p-4 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {appointments.map((app) => (
                  <tr key={app.id} className="border-b border-gray-50 last:border-0 hover:bg-primary/5 transition-all group">
                    <td className="p-4 pl-6 py-5">
                      <div className="font-black text-gray-900 group-hover:text-primary transition-colors">{app.name}</div>
                      <div className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase tracking-tighter">{app.code}</div>
                    </td>
                    <td className="p-4 py-5">
                      <div className="font-bold text-gray-900 leading-tight">{app.doctor}</div>
                      <div className="text-[11px] font-medium text-primary mt-1 bg-primary/10 inline-block px-2 py-0.5 rounded-lg">{app.specialty}</div>
                    </td>
                    <td className="p-4 py-5 font-bold text-gray-600">
                      <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                        {app.type}
                      </span>
                    </td>
                    <td className="p-4 py-5">
                      <div className="font-bold text-gray-900 leading-tight">{app.date}</div>
                      <div className="text-[11px] font-medium text-gray-400 mt-0.5">{app.time}</div>
                    </td>
                    <td className="p-4 py-5 pr-6">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'Completed' ? 'bg-primary/10 text-primary border border-primary/20' :
                        app.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-red-50 text-red-500 border border-red-100'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Right Sidebar ── */}
      <div className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0 flex flex-col gap-6">

        {/* Today's Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-5">Today's Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            {todaySummary.map((item, i) => (
              <div key={i} className={`${item.bg} rounded-2xl p-4 flex flex-col gap-2`}>
                <item.icon size={20} className={item.color} />
                <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors on Duty */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-900 text-lg">Doctors on Duty</h3>
            <span className="text-[11px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full">Today</span>
          </div>
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">35</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">11</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">Off Duty</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Dr. Amelia Hart', spec: 'Cardiology', avail: true, time: '08:00 - 14:00' },
              { name: 'Dr. Sophia Liang', spec: 'Pediatrics', avail: true, time: '10:00 - 18:00' },
              { name: 'Dr. Rizky Pratama', spec: 'General Medicine', avail: false },
              { name: 'Dr. Nina Alvarez', spec: 'Dermatology', avail: true, time: '13:00 - 20:00' },
              { name: 'Dr. Daniel Obeng', spec: 'Orthopedics', avail: false },
            ].map((doc, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt={doc.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-900 leading-tight">{doc.name}</h5>
                    <p className="text-xs text-gray-400 font-medium">{doc.spec}</p>
                  </div>
                </div>
                <div className="text-right">
                  {doc.avail ? (
                    <>
                      <div className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded inline-block mb-0.5">On Duty</div>
                      <div className="text-[10px] text-gray-400 font-medium block">{doc.time}</div>
                    </>
                  ) : (
                    <div className="text-[10px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded inline-block">Off Duty</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Bed Occupancy */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-900 text-lg">Bed Occupancy</h3>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="flex flex-col gap-4">
            {[
              { dept: 'Neurology', used: 38, total: 40 },
              { dept: 'Cardiology', used: 22, total: 30 },
              { dept: 'Orthopedics', used: 15, total: 25 },
              { dept: 'Pediatrics', used: 18, total: 20 },
              { dept: 'General', used: 45, total: 60 },
            ].map((item, i) => {
              const pct = Math.round((item.used / item.total) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] font-semibold text-gray-700">{item.dept}</span>
                    <span className="text-[11px] font-bold text-gray-500">{item.used}/{item.total} <span className="text-primary">{pct}%</span></span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: pct >= 90 ? '#ef4444' : '#992120' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
