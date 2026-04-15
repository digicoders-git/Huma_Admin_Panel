import React, { useState } from 'react';
import { 
  ChevronDown, 
  Plus, 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users,
  Info
} from 'lucide-react';

const categories = [
  { id: 1, name: 'Admin & Management', count: 5, color: '#3D9F9D' },
  { id: 2, name: 'System & Facility Maintenance', count: 3, color: '#DCFCE7' },
  { id: 3, name: 'Staff Training & Development', count: 4, color: '#FEF9C3' },
];

const events = [
  { date: 10, title: 'Monthly Hospital Operations Briefing', time: '09:00 - 10:30', color: 'bg-[#3D9F9D]', textColor: 'text-white' },
  { date: 11, title: 'New Nurse Orientation & Safety Protocols', time: '14:00 - 16:00', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { date: 12, title: 'Department Heads Coordination Meeti...', time: '08:30 - 09:30', color: 'bg-[#3D9F9D]', textColor: 'text-white' },
  { date: 12, title: 'Scheduled EMR System Performanc...', time: '15:00 - 17:00', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { date: 13, title: 'Infection Control Refresher Session', time: '10:00 - 11:30', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { date: 14, title: 'Advanced Photoshop Worksh...', time: '08:00 - 09:00', color: 'bg-[#3D9F9D]', textColor: 'text-white', active: true },
  { date: 14, title: 'Advanced Photoshop Worksh...', time: '13:00 - 15:00', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { date: 16, title: 'Radiology Equipment Calibration', time: '08:00 - 09:00', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { date: 18, title: 'Billing & Claims Process Review', time: '09:30 - 11:00', color: 'bg-[#3D9F9D]', textColor: 'text-white' },
  { date: 18, title: 'Medlink Dashboard Advanced Usage Tr...', time: '14:00 - 15:30', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { date: 27, title: 'Quarterly KPI & Performance Review', time: '15:00 - 16:30', color: 'bg-[#3D9F9D]', textColor: 'text-white' },
  { date: 29, title: 'Night Shift Power Backup & Generator Test', time: '20:00 - 22:00', color: 'bg-emerald-50', textColor: 'text-emerald-700' },
];

const calendarDays = [
  null, null, null, 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, null
];

const Calendar = () => {
  const [view, setView] = useState('Month');
  const [selectedDay, setSelectedDay] = useState(14);

  return (
    <div className="px-6 py-4 flex flex-col gap-6 h-full min-h-[calc(100vh-100px)]">
      {/* Container Background */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Section */}
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
              <h2 className="text-xl font-bold text-gray-900">March 2028</h2>
              <ChevronDown size={20} className="text-gray-400" />
            </div>
            <div className="px-2">
              <p className="text-xs text-gray-400">Total All Schedules</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-50 p-1 rounded-xl">
              {['Month', 'Week', 'Day'].map((v) => (
                <button 
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    view === v ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors">
              <Plus size={16} />
              New Agenda
            </button>
          </div>
        </div>

        {/* Main Workspace Section */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left: Category Sidebar */}
          <div className="w-72 border-r border-gray-50 p-6 flex flex-col gap-8 hidden lg:flex">
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat.id} className="flex gap-4">
                  <div className="w-1 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight">{cat.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">{cat.count} Schedules</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Calendar Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-7 border-b border-gray-50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-teal-50/30">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map((day, i) => {
                const dayEvents = events.filter(e => e.date === day);
                const isSelected = selectedDay === day;
                const isGrayed = day === null || i < 3; // First 3 are Prev Month placeholders in screenshot

                return (
                  <div 
                    key={i} 
                    onClick={() => day && setSelectedDay(day)}
                    className={`min-h-[120px] border-r border-b border-gray-50 p-2 flex flex-col gap-1 cursor-pointer transition-colors ${
                      isSelected ? 'bg-teal-50/20 ring-1 ring-inset ring-teal-200' : 'hover:bg-gray-50/50'
                    } ${isGrayed ? 'bg-slate-50/50' : ''}`}
                  >
                    <div className="flex justify-end">
                      <span className={`text-[10px] font-bold ${
                        isGrayed ? 'text-gray-300' : isSelected ? 'text-teal-600' : 'text-gray-500'
                      }`}>
                        {day || (i < 3 ? [28, 29, 30][i] : '')}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 overflow-hidden">
                      {dayEvents.map((evt, idx) => (
                        <div 
                          key={idx} 
                          className={`${evt.color} ${evt.textColor} p-1 rounded text-[9px] font-bold truncate leading-tight`}
                          title={evt.title}
                        >
                          {evt.title}
                          <div className="opacity-70 font-normal">{evt.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Schedule Details */}
          <div className="w-80 border-l border-gray-50 flex flex-col hidden xl:flex">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Schedule Details</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4 overflow-y-auto">
              
              {/* Card 1 */}
              <div className="bg-teal-600 p-4 rounded-2xl text-white flex flex-col gap-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold leading-tight">Outpatient Clinic Workflow Review</h4>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={12} className="opacity-70" />
                    <span className="text-[10px]">14 March 2035</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="opacity-70" />
                    <span className="text-[10px]">09:00 - 10:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="opacity-70" />
                    <span className="text-[10px]">Meeting Room A - 2nd Floor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} className="opacity-70" />
                    <span className="text-[10px]">Department Coordinators, Front Desk Leads</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-white/20">
                  <span className="text-[10px] font-bold opacity-70">Team</span>
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=elena" className="w-7 h-7 rounded-full border border-white" />
                    <div>
                      <p className="text-[10px] font-bold">Elena Mullen</p>
                      <p className="text-[9px] opacity-70">Operations Manager</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold opacity-70">Note</span>
                  <p className="text-[10px] leading-relaxed">
                    Review patient flow, waiting time metrics, and proposed changes to triage desk layout.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">Patient Communication & Empathy Workshop</h4>
                </div>
                <div className="space-y-1.5 text-gray-500">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={12} />
                    <span className="text-[10px]">14 March 2035</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span className="text-[10px]">13:30 - 15:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={12} />
                    <span className="text-[10px]">Training Hall - 3rd Floor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} />
                    <span className="text-[10px]">Nurses, Resident Doctors, Frontline Staff</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-emerald-200">
                  <span className="text-[10px] font-bold text-gray-400">Team</span>
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=victor" className="w-7 h-7 rounded-full border border-emerald-100" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-900">Victor Ridge</p>
                      <p className="text-[9px] text-gray-400">HR & Training</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <span className="text-[10px] font-bold text-gray-400">Note</span>
                  <p className="text-[10px] leading-relaxed">
                    Focus on communication scenarios, delivering difficult news, and improving overall patient satisfaction scores.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Calendar;
