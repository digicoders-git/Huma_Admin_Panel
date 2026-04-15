import React, { useState } from 'react';
import {
  MoreHorizontal, Phone, Mail, MapPin, Download,
  CheckCircle2, XCircle, Clock, ChevronLeft, CreditCard
} from 'lucide-react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

// ─── Blood Pressure Data ──────────────────────────────────────────────────────
const bpData = [
  { month: 'Jan', heartRate: 72, bloodPressure: 80 },
  { month: 'Feb', heartRate: 78, bloodPressure: -60 },
  { month: 'Mar', heartRate: 80, bloodPressure: 60 },
  { month: 'Apr', heartRate: 68, bloodPressure: -70 },
  { month: 'May', heartRate: 85, bloodPressure: 90 },
  { month: 'Jun', heartRate: 74, bloodPressure: -50 },
  { month: 'Jul', heartRate: 70, bloodPressure: 75 },
  { month: 'Aug', heartRate: 76, bloodPressure: -65 },
  { month: 'Sep', heartRate: 82, bloodPressure: 85 },
  { month: 'Oct', heartRate: 69, bloodPressure: -72 },
  { month: 'Nov', heartRate: 77, bloodPressure: 68 },
  { month: 'Dec', heartRate: 73, bloodPressure: -58 },
];

// ─── Medications ─────────────────────────────────────────────────────────────
const medications = [
  { name: 'Paracetamol', type: 'Tablet', dosage: '500 mg', frequency: 'Every 6 hours as needed', start: '11 Mar 2035', end: '16 Mar 2035', status: 'Completed' },
  { name: 'Enoxaparin',   type: 'Injection', dosage: '40 mg', frequency: 'Once daily', start: '11 Mar 2035', end: '16 Mar 2035', status: 'Active' },
  { name: 'Amlodipine', type: 'Tablet', dosage: '5 mg', frequency: 'Once daily (morning)', start: '01 Jan 2035', end: 'Ongoing', status: 'Discontinued' },
];

// ─── Appointments ─────────────────────────────────────────────────────────────
const apptHistory = [
  { date: '10 Mar 2035', time: '16:00 – 16:30', type: 'Consultation', doctor: 'Dr. Daniel Obeng', specialty: 'Orthopedics', status: 'Completed', note: 'Pre-op assessment' },
  { date: '11 Mar 2035', time: '08:00 – 11:00', type: 'Surgery',       doctor: 'Dr. Daniel Obeng', specialty: 'Orthopedics', status: 'Completed', note: 'Tibia fracture fixation' },
  { date: '18 Mar 2035', time: '09:30 – 10:00', type: 'Follow-up',     doctor: 'Dr. Daniel Obeng', specialty: 'Orthopedics', status: 'Scheduled', note: 'Wound check & X-ray review' },
];

// ─── Health Reports ──────────────────────────────────────────────────────────
const reports = [
  { name: 'Orthopedic Surgery Re...', size: '3 MB' },
  { name: 'Inpatient Insurance Clai...', size: '2.5 MB' },
  { name: 'Informed Consent Surg...', size: '4 MB' },
  { name: 'Orthopedic Surgery Re...', size: '1.2 MB' },
  { name: 'Inpatient Insurance Clai...', size: '2.5 MB' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const MedStatusBadge = ({ status }) => {
  const map = {
    Completed:    'bg-[#f0f9f8] text-[#3D9F9D] border border-[#c8e8e6]',
    Active:       'bg-[#3D9F9D] text-white',
    Discontinued: 'bg-gray-100 text-gray-500',
  };
  const icons = {
    Completed: <CheckCircle2 size={11} />,
    Active: <CheckCircle2 size={11} />,
    Discontinued: <XCircle size={11} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${map[status]}`}>
      {icons[status]} {status}
    </span>
  );
};

const ApptStatusBadge = ({ status }) => {
  const map = {
    Completed: 'text-[#3D9F9D] font-semibold',
    Scheduled: 'text-[#7C6EF5] font-semibold',
    Cancelled: 'text-red-400 font-semibold',
  };
  return <span className={`text-[12px] ${map[status] || 'text-gray-500'}`}>{status}</span>;
};

// ─── Custom Tooltip for Chart ─────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E3A3A] text-white text-[11px] rounded-xl p-3 shadow-xl">
        <p className="font-bold mb-1">{label} 2035</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name === 'heartRate' ? '● Heart Rate' : '● Blood Pressure'}&nbsp;
            <span className="font-bold">{Math.abs(p.value)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Component ──────────────────────────────────────────────────────────
const PatientDetails = ({ onBack }) => {
  const [apptTab, setApptTab] = useState('All');

  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto flex flex-col gap-5">

      {/* ── Row 1: Patient Card + Medlink Card ────────────────────────────── */}
      <div className="flex gap-5 flex-col xl:flex-row">

        {/* Patient Info Card */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-5 items-start">
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-[#e0f4f2] shadow">
            <img src="https://i.pravatar.cc/300?u=daniel_wong" alt="Daniel Wong" className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900">Daniel Wong</h2>
                  <span className="text-[12px] font-semibold text-[#3D9F9D] bg-[#e8f6f5] px-2 py-0.5 rounded-md">#PT-2035-078</span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-[12px] text-gray-500">
                  <span className="flex items-center gap-1"><Phone size={11} className="text-[#3D9F9D]" /> +62 812-9012-4477</span>
                  <span className="flex items-center gap-1"><Mail size={11} className="text-[#3D9F9D]" /> daniel.wong@hospital.com</span>
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-[#3D9F9D]" /> Jl. Kaliurang No. 88, Yogyakarta, Indonesia</span>
                  <span className="flex items-center gap-1"><Phone size={11} className="text-[#3D9F9D]" /> +62 812-9988-4411 (Michelle Wong/Spouse)</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-700 flex-shrink-0"><MoreHorizontal size={20} /></button>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-4 pt-4 border-t border-gray-100">
              {[
                { label: 'Age & Gender', value: '42 / Male' },
                { label: 'DOB',          value: '23 July 1993' },
                { label: 'Blood Type',   value: 'O+' },
                { label: 'Occupation',   value: 'Project Manager' },
                { label: 'Status',       value: 'Post-Op (Inpatient)' },
                { label: 'Insurance',    value: 'BPJS – Class 1' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-gray-400 font-medium">{item.label}</p>
                  <p className="text-[13px] font-semibold text-gray-900 mt-0.5 leading-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medlink Membership Card */}
        <div className="xl:w-[220px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-md"
             style={{ background: 'linear-gradient(135deg, #1E4A4A 0%, #3D9F9D 60%, #6EC9C4 100%)' }}>
          <div className="p-5 flex flex-col h-full min-h-[140px] justify-between">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1 rounded-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-white font-bold text-[13px]">Medlink</span>
              </div>
              <span className="text-[10px] font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">Gold</span>
            </div>

            {/* Card chip decoration */}
            <div className="flex justify-end mt-2">
              <div className="w-8 h-6 rounded bg-white/20 border border-white/30" />
            </div>

            {/* Patient name & ID */}
            <div className="mt-auto">
              <p className="text-white font-bold text-[15px] leading-tight">Daniel Wong</p>
              <p className="text-white/70 text-[11px] mt-0.5">#PT-2035-078</p>
              <div className="flex justify-between items-end mt-3">
                <div>
                  <p className="text-white/50 text-[10px]">Expiry Date</p>
                  <p className="text-white font-bold text-[13px]">09/35</p>
                </div>
                <CreditCard size={22} className="text-white/40" />
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />
        </div>
      </div>

      {/* ── Row 2: Vitals + Medical Info ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* 3 Vital Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Blood Sugar', value: '171', unit: 'mg/dL', icon: '💧', iconBg: 'bg-[#e8f6f5]' },
              { label: 'Body Weight', value: '62',  unit: 'kg',    icon: '⭐', iconBg: 'bg-[#e8f6f5]' },
              { label: 'Temperature', value: '37',  unit: '°C',    icon: '🌡️', iconBg: 'bg-[#e8f6f5]' },
            ].map((v) => (
              <div key={v.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                <div className={`w-10 h-10 ${v.iconBg} rounded-xl flex items-center justify-center text-lg`}>
                  {v.icon}
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">{v.label}</p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">
                    {v.value}<span className="text-sm font-semibold text-gray-500 ml-0.5">{v.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Blood Pressure Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#e8f6f5] rounded-xl flex items-center justify-center">
                  <span className="text-[#3D9F9D] text-base">❤️</span>
                </div>
                <h3 className="font-bold text-gray-900">Blood Pressure</h3>
              </div>
              <span className="text-[11px] text-gray-400">Last check up: <span className="font-semibold text-gray-700">Feb, 23 2035</span></span>
            </div>

            <div className="flex items-center gap-4 mt-2 mb-3">
              <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <span className="w-3 h-3 rounded-sm bg-[#8BD2D2] inline-block" /> Heart Rate
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <span className="w-3 h-0.5 bg-[#1E4A4A] inline-block" /> Blood Pressure
              </span>
            </div>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bpData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <ReferenceLine y={0} stroke="#E5E7EB" strokeWidth={1} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} dy={6} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[-100, 100]} ticks={[-100, -75, -50, -25, 0, 25, 50, 75, 100]} tickFormatter={v => Math.abs(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="bloodPressure" fill="#8BD2D2" radius={[3, 3, 0, 0]} />
                  <Line dataKey="heartRate" type="monotone" stroke="#1E4A4A" strokeWidth={2} dot={{ fill: '#1E4A4A', r: 3 }} activeDot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column – Medical Info */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Medical Info</h3>
            <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
          </div>

          {/* Conditions + Allergies */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-3">Conditions</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D9F9D" strokeWidth="2" className="mt-0.5 flex-shrink-0"><path d="M4 19l8-8 8 8M4 11l4-4 4 4 8-8"/></svg>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">Bone Fracture</p>
                    <p className="text-[11px] text-gray-400">Left Tibia (Post-Surgery)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D9F9D" strokeWidth="2" className="mt-0.5 flex-shrink-0"><path d="M4 19l8-8 8 8M4 11l4-4 4 4 8-8"/></svg>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">Hypertension</p>
                    <p className="text-[11px] text-gray-400">Controlled</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-3">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {['Penicillin', 'Aspirin', 'Shellfish', 'Dust Mites', 'Peanuts'].map((a) => (
                  <span key={a} className="flex items-center gap-1 text-[12px] text-gray-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#3D9F9D] inline-block" /> {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Medications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px] min-w-[520px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 text-[11px]">
                  <th className="pb-3 font-semibold w-8"><input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" /></th>
                  <th className="pb-3 font-semibold">Name ↕</th>
                  <th className="pb-3 font-semibold">Dosage ↕</th>
                  <th className="pb-3 font-semibold">Frequency ↕</th>
                  <th className="pb-3 font-semibold">Start – End Date ↕</th>
                  <th className="pb-3 font-semibold text-right">Status ↕</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3"><input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" /></td>
                    <td className="py-3 min-w-[120px]">
                      <p className="font-semibold text-gray-900">{med.name}</p>
                      <p className="text-[11px] text-gray-400">{med.type}</p>
                    </td>
                    <td className="py-3 font-medium text-gray-700">{med.dosage}</td>
                    <td className="py-3 font-medium text-gray-700 min-w-[160px]">{med.frequency}</td>
                    <td className="py-3 font-medium text-gray-700 whitespace-nowrap">
                      {med.start} –<br />{med.end}
                    </td>
                    <td className="py-3 text-right">
                      <MedStatusBadge status={med.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Row 3: Health Reports + Patient Note + Appointments ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Health Reports */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Health Reports</h3>
            <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
          </div>
          <div className="flex flex-col gap-3">
            {reports.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#e8f6f5] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D9F9D" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900 leading-tight">{r.name}</p>
                    <p className="text-[11px] text-gray-400">{r.size}</p>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-[#3D9F9D] transition-colors flex-shrink-0">
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Note */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Patient Note</h3>
            <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
          </div>
          <div className="flex items-center gap-2.5 mb-3">
            <img src="https://i.pravatar.cc/150?u=samjaguar" alt="Dr. Sam Jaguar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div>
              <p className="text-[12px] font-semibold text-gray-900">Dr. Sam Jaguar</p>
              <p className="text-[11px] text-gray-400">11 March 2035</p>
            </div>
          </div>
          <div className="bg-[#f0f9f8] rounded-xl p-3 border-l-4 border-[#3D9F9D]">
            <p className="text-[12px] text-gray-700 leading-relaxed">
              Daniel is stable post-op with well-controlled pain, and early mobilization is planned.{' '}
              <span className="font-semibold text-gray-900">Continue regular blood pressure monitoring and adjust medication</span>{' '}
              if pain or hypertension worsens.
            </p>
          </div>
        </div>

        {/* Appointments */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Appointments</h3>
            <button className="text-gray-400 hover:text-gray-700"><MoreHorizontal size={18} /></button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-4">
            {['All', 'Upcoming', 'History'].map((tab) => (
              <button
                key={tab}
                onClick={() => setApptTab(tab)}
                className={`px-4 pb-3 text-[13px] font-semibold transition-colors ${
                  apptTab === tab
                    ? 'text-[#3D9F9D] border-b-2 border-[#3D9F9D] -mb-px'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Appointments Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px] min-w-[560px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 text-[11px]">
                  <th className="pb-3 font-semibold w-8"><input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" /></th>
                  <th className="pb-3 font-semibold">Date ↕</th>
                  <th className="pb-3 font-semibold">Time ↕</th>
                  <th className="pb-3 font-semibold">Type ↕</th>
                  <th className="pb-3 font-semibold">Doctor ↕</th>
                  <th className="pb-3 font-semibold">Status ↕</th>
                  <th className="pb-3 font-semibold">Note ↕</th>
                </tr>
              </thead>
              <tbody>
                {apptHistory.map((a, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-3"><input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" /></td>
                    <td className="py-3 font-semibold text-gray-900 whitespace-nowrap">{a.date}</td>
                    <td className="py-3 font-medium text-gray-600 whitespace-nowrap">{a.time}</td>
                    <td className="py-3 font-medium text-gray-800">{a.type}</td>
                    <td className="py-3 min-w-[150px]">
                      <p className="font-semibold text-gray-900 leading-tight">{a.doctor}</p>
                      <p className="text-[11px] text-gray-400">{a.specialty}</p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <ApptStatusBadge status={a.status} />
                    </td>
                    <td className="py-3 font-medium text-gray-600 min-w-[160px]">{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
