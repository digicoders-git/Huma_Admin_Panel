import React, { useState } from 'react';
import {
  MoreHorizontal, ChevronLeft, ChevronRight, ArrowUpRight,
  Search, LayoutGrid, Share2, ChevronsUpDown, CheckCircle2,
  CircleDashed, Info, CalendarDays, Users2
} from 'lucide-react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area
} from 'recharts';

// ── Patient Overview Chart Data ───────────────────────────────────────────────
const overviewData = [
  { day: 'Mon', inpatient: 30, outpatient: 55 },
  { day: 'Tue', inpatient: 45, outpatient: 70 },
  { day: 'Wed', inpatient: 28, outpatient: 48 },
  { day: 'Thu', inpatient: 23, outpatient: 47 },
  { day: 'Fri', inpatient: 50, outpatient: 75 },
  { day: 'Sat', inpatient: 38, outpatient: 60 },
  { day: 'Sun', inpatient: 42, outpatient: 65 },
];

// ── Appointment Schedule Data ─────────────────────────────────────────────────
const scheduleAppointments = [
  { name: 'Erica Smith',    avatar: 'https://i.pravatar.cc/150?u=15', type: 'Follow-up',    time: '13:30 – 13:50', active: false },
  { name: 'Johan Greece',   avatar: 'https://i.pravatar.cc/150?u=20', type: 'Consultation', time: '14:00 – 14:30', active: true },
  { name: 'Maya Patel',     avatar: 'https://i.pravatar.cc/150?u=maya', type: 'Consultation', time: '14:45 – 15:15', active: false },
  { name: 'Sara Kim',       avatar: 'https://i.pravatar.cc/150?u=sara', type: 'Consultation', time: '16:00 – 16:20', active: false },
  { name: 'Ryan Patel',     avatar: 'https://i.pravatar.cc/150?u=ryan', type: 'Telemedicine', time: '14:45 – 15:15', active: false },
  { name: 'Lucas Ferreira', avatar: 'https://i.pravatar.cc/150?u=lucas', type: 'Follow-up',  time: '15:30 – 15:50', active: false },
];

// ── Patients Table Data ───────────────────────────────────────────────────────
const patientsData = [
  { name: 'Erica Smith',    id: '#PT-2035-091', avatar: 'https://i.pravatar.cc/150?u=15',    date: '12 March 2035', condition: 'Acne',              treatment: 'Topical & oral medication',   status: 'In Treatment' },
  { name: 'Johan Greece',   id: '#PT-2035-175', avatar: 'https://i.pravatar.cc/150?u=20',    date: '12 March 2035', condition: 'Dermatitis',         treatment: 'Anti-inflammatory cream',      status: 'In Treatment' },
  { name: 'Maya Patel',     id: '#PT-2035-204', avatar: 'https://i.pravatar.cc/150?u=maya',  date: '11 March 2035', condition: 'Hyperpigmentation',  treatment: 'Chemical peel plan',           status: 'Discharged' },
  { name: 'Lucas Ferreira', id: '#PT-2035-219', avatar: 'https://i.pravatar.cc/150?u=lucas', date: '10 March 2035', condition: 'Psoriasis',          treatment: 'Long-term topical therapy',    status: 'Admitted' },
  { name: 'Sara Kim',       id: '#PT-2035-231', avatar: 'https://i.pravatar.cc/150?u=sara',  date: '09 March 2035', condition: 'Eczema',             treatment: 'Moisturizer + steroid cream',  status: 'Discharged' },
];

// ── Feedback Data ─────────────────────────────────────────────────────────────
const feedbackData = [
  { name: 'Erica Smith',  avatar: 'https://i.pravatar.cc/150?u=15',    rating: 4.8, text: 'Dr. Nina explained every step of my acne treatment clearly, showed before-after expectations...', date: '12 March 2035' },
  { name: 'Johan Greece', avatar: 'https://i.pravatar.cc/150?u=20',    rating: 5,   text: 'She listened carefully to my concerns about recurring rashes, adjusted the cream dosage, and f...', date: '12 March 2035' },
  { name: 'Maya Patel',   avatar: 'https://i.pravatar.cc/150?u=maya',  rating: 4.9, text: 'I appreciated how she combined medical expertise with realistic skincare advice', date: '11 March 2035' },
];

const weekdays = [
  { label: 'Sat', date: 12 },
  { label: 'Sun', date: 13 },
  { label: 'Mon', date: 14, active: true },
  { label: 'Tue', date: 15 },
  { label: 'Wed', date: 16 },
];

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    'In Treatment': { bg: 'bg-[#992120]', text: 'text-white', icon: <CircleDashed size={11} /> },
    Discharged:     { bg: 'bg-[#e7e3da]', text: 'text-[#992120]', icon: <Info size={11} /> },
    Admitted:       { bg: 'bg-[#e7e3da]', text: 'text-[#992120]', icon: <CheckCircle2 size={11} /> },
  };
  const s = map[status] || map['Discharged'];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${s.bg} ${s.text}`}>
      {s.icon} {status}
    </span>
  );
};

// ── Custom Chart Tooltip ──────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#7a1a19] text-white text-[11px] rounded-xl p-3 shadow-xl">
        <p className="font-bold mb-1">12 March 2036</p>
        {payload.map((p, i) => (
          <p key={i} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            {p.name === 'inpatient' ? 'Inpatient' : 'Outpatient'}:&nbsp;
            <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Performance Gauge (SVG semi-circle) ──────────────────────────────────────
const PerformanceGauge = ({ percent = 88 }) => {
  const r = 70, cx = 90, cy = 90;
  const circumference = Math.PI * r; // half circle
  const filled = (percent / 100) * circumference;
  const segments = 24;
  return (
    <svg viewBox="0 0 180 100" className="w-full max-w-[200px] mx-auto">
      {/* Background arc segments */}
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * 180 - 180;
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + r * Math.cos(rad);
        const y1 = cy + r * Math.sin(rad);
        const rad2 = (((i + 0.8) / segments) * 180 - 180) * (Math.PI / 180);
        const x2 = cx + r * Math.cos(rad2);
        const y2 = cy + r * Math.sin(rad2);
        const isFilled = i < (percent / 100) * segments;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isFilled ? '#992120' : '#E5E7EB'}
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
      {/* Center text */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9" fill="#9CA3AF" fontWeight="500">Satisfied</text>
      <text x={cx} y={cy + 2} textAnchor="middle" fontSize="9" fill="#9CA3AF" fontWeight="500">Range</text>
    </svg>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const DoctorDetails = () => {
  const [activeDay, setActiveDay] = useState(14);

  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* ══ LEFT COLUMN ══════════════════════════════════════════════════════ */}
        <div className="xl:col-span-3 flex flex-col gap-5">

          {/* Doctor Profile Card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Teal gradient photo background */}
            <div className="relative flex justify-center pt-4 pb-0"
                 style={{ background: 'linear-gradient(180deg, #e7e3da 0%, #e7e3da 60%, #e7e3da 100%)' }}>
              <img
                src="https://i.pravatar.cc/300?u=nina_alvarez_doc"
                alt="Dr. Nina Alvarez"
                className="w-full max-w-[200px] h-[220px] object-cover object-top"
                style={{ objectPosition: 'center top' }}
              />
            </div>
            {/* Info */}
            <div className="bg-white px-5 pb-5 pt-4 text-center">
              <span className="inline-block text-[11px] font-bold text-[#992120] bg-[#e7e3da] px-2.5 py-0.5 rounded-md mb-2">#DR-1005</span>
              <h3 className="font-bold text-gray-900 text-[16px] mb-3">Dr. Nina Alvarez</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Specialty</p>
                  <p className="text-[12px] font-semibold text-gray-900 mt-0.5">Dermatology</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Experience</p>
                  <p className="text-[12px] font-semibold text-gray-900 mt-0.5">11+ years</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Status</p>
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e7e3da] text-[#992120]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#992120]" /> Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Schedule */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-900">Appointment Schedule</h4>
              <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
            </div>

            {/* Day Picker */}
            <div className="flex items-center justify-between mb-4 gap-1">
              <button className="text-gray-400 hover:text-gray-700 p-1"><ChevronLeft size={16} /></button>
              {weekdays.map((d) => (
                <button
                  key={d.date}
                  onClick={() => setActiveDay(d.date)}
                  className={`flex flex-col items-center px-2 py-2 rounded-xl transition-all flex-1 ${
                    activeDay === d.date
                      ? 'bg-[#992120] text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[10px] font-medium">{d.label}</span>
                  <span className="text-[15px] font-bold mt-0.5">{d.date}</span>
                </button>
              ))}
              <button className="text-gray-400 hover:text-gray-700 p-1"><ChevronRight size={16} /></button>
            </div>

            {/* Appointment List */}
            <div className="flex flex-col gap-2">
              {scheduleAppointments.map((appt, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    appt.active ? 'bg-[#e7e3da] border border-[#992120]/20' : 'hover:bg-gray-50'
                  }`}
                >
                  <img src={appt.avatar} alt={appt.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-[13px] leading-tight truncate">{appt.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      <span className="text-[#992120] font-medium">{appt.type}</span>
                      {' • '}{appt.time}
                    </p>
                  </div>
                  <button className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors ${
                    appt.active
                      ? 'bg-[#992120] border-[#992120] text-white'
                      : 'border-gray-200 text-gray-400 hover:border-[#992120] hover:text-[#992120]'
                  }`}>
                    <ChevronRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MIDDLE COLUMN ════════════════════════════════════════════════════ */}
        <div className="xl:col-span-6 flex flex-col gap-5">

          {/* About Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">About</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  Dr. Nina specializes in medical and cosmetic dermatology, focusing on acne, pigmentation,
                  and chronic skin conditions with patient-friendly, step-by-step treatment plans.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-[#992120] hover:border-[#992120]/30 transition-colors"><LayoutGrid size={15} /></button>
                <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-[#992120] hover:border-[#992120]/30 transition-colors"><Share2 size={15} /></button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt-4 pt-4 border-t border-gray-100">
              {[
                { label: 'Room Number',        value: 'Dermatology Clinic – Room D-204' },
                { label: 'Phone Number',        value: '+62 21-555-2035' },
                { label: 'Email',               value: 'nina.alvarez@medlinkhospital.com' },
                { label: 'First Joint',         value: '18 January 2006' },
                { label: 'Emergency Contact',   value: 'Miguel Morales\n+62 813-7700-1198' },
                { label: 'Address',             value: 'Jl. Harmoni Raya No. 22, Jakarta, Indonesia' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-gray-400 font-medium">{item.label}</p>
                  <p className="text-[12px] font-semibold text-gray-900 mt-0.5 leading-snug whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Overview Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-gray-900">Patient Overview</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#b52a29] inline-block" /> Inpatient</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#992120] inline-block" /> Outpatient</span>
                </div>
                <button className="flex items-center gap-1 text-[12px] font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 hover:bg-gray-100">
                  Last Week <ChevronRight size={12} className="rotate-90" />
                </button>
              </div>
            </div>
            <div className="h-[200px] w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={overviewData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={22}>
                  <defs>
                    <linearGradient id="barGradDoc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b52a29" stopOpacity={1} />
                      <stop offset="100%" stopColor="#e7e3da" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={6} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="inpatient" fill="url(#barGradDoc)" radius={[6, 6, 0, 0]} />
                  <Line dataKey="outpatient" type="monotone" stroke="#992120" strokeWidth={2.5} dot={{ fill: '#992120', r: 3 }} activeDot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h4 className="font-bold text-gray-900">Patients</h4>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients"
                    className="pl-8 pr-3 py-1.5 border border-gray-100 rounded-lg text-[12px] text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 w-36"
                  />
                </div>
                <button className="flex items-center gap-1.5 text-[12px] font-semibold text-[#992120] bg-[#e7e3da] px-3 py-1.5 rounded-lg border border-[#992120]/20 hover:bg-[#d4cfc5] transition-colors">
                  Latest <ChevronRight size={12} className="rotate-90" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px] min-w-[560px]">
                <thead>
                  <tr className="text-[11px] text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-semibold w-8"><input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" /></th>
                    <th className="pb-3 font-semibold"><div className="flex items-center gap-1 cursor-pointer">Name <ChevronsUpDown size={11} /></div></th>
                    <th className="pb-3 font-semibold"><div className="flex items-center gap-1 cursor-pointer">Check In Date <ChevronsUpDown size={11} /></div></th>
                    <th className="pb-3 font-semibold"><div className="flex items-center gap-1 cursor-pointer">Condition <ChevronsUpDown size={11} /></div></th>
                    <th className="pb-3 font-semibold"><div className="flex items-center gap-1 cursor-pointer">Treatment <ChevronsUpDown size={11} /></div></th>
                    <th className="pb-3 font-semibold text-right"><div className="flex items-center gap-1 cursor-pointer justify-end">Status <ChevronsUpDown size={11} /></div></th>
                  </tr>
                </thead>
                <tbody>
                  {patientsData.map((p, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer">
                      <td className="py-3"><input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" onClick={e => e.stopPropagation()} /></td>
                      <td className="py-3 min-w-[160px]">
                        <div className="flex items-center gap-2.5">
                          <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">{p.name}</p>
                            <p className="text-[10px] text-gray-400">{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-medium text-gray-700 whitespace-nowrap">{p.date}</td>
                      <td className="py-3 font-semibold text-[#992120]">{p.condition}</td>
                      <td className="py-3 font-medium text-gray-700 min-w-[150px]">{p.treatment}</td>
                      <td className="py-3 text-right"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN ═════════════════════════════════════════════════════ */}
        <div className="xl:col-span-3 flex flex-col gap-5">

          {/* Performance Gauge */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900">Performance</h4>
              <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
            </div>
            <PerformanceGauge percent={88} />
            <div className="text-center -mt-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-gray-900">88%</span>
                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-bold bg-[#e7e3da] text-[#992120]">
                  <ArrowUpRight size={12} /> +0.5%
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                <span className="font-semibold text-gray-700">1,739 patients</span> are satisfied.<br />
                It's increasing than last month
              </p>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-[#e7e3da] rounded-lg flex items-center justify-center">
                <CalendarDays size={14} className="text-[#992120]" />
              </div>
              <p className="text-[12px] font-semibold text-gray-500">Total Appointments</p>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">620</span>
              <span className="flex items-center gap-0.5 px-2 py-0.5 mb-1 rounded text-[11px] font-bold bg-[#e7e3da] text-[#992120]">
                <ArrowUpRight size={11} /> +9%
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">vs. last month</p>
          </div>

          {/* Total Patients */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-[#e7e3da] rounded-lg flex items-center justify-center">
                <Users2 size={14} className="text-[#992120]" />
              </div>
              <p className="text-[12px] font-semibold text-gray-500">Total Patients</p>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">410</span>
              <span className="flex items-center gap-0.5 px-2 py-0.5 mb-1 rounded text-[11px] font-bold bg-[#e7e3da] text-[#992120]">
                <ArrowUpRight size={11} /> +6%
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">vs. last quarter</p>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-900">Feedback</h4>
              <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              {feedbackData.map((fb, i) => (
                <div key={i} className={`${i < feedbackData.length - 1 ? 'pb-4 border-b border-gray-50' : ''}`}>
                  <div className="flex items-start gap-2.5">
                    <img src={fb.avatar} alt={fb.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-gray-900 text-[13px]">{fb.name}</p>
                        <div className="flex items-center gap-0.5">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-[11px] font-bold text-gray-700">{fb.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{fb.text}</p>
                      <p className="text-[10px] text-[#992120] font-semibold mt-1.5">{fb.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetails;
