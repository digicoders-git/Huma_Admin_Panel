import React, { useState, useRef ,useEffect  } from 'react';
import { X, Calendar, ChevronDown, Upload, FileText, Image, Trash2, Plus, Minus, Pencil } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const defaultSchedule = {
  Monday:    { checked: true,  start: '09:00', end: '17:00' },
  Tuesday:   { checked: true,  start: '09:00', end: '17:00' },
  Wednesday: { checked: true,  start: '15:00', end: '21:00' },
  Thursday:  { checked: true,  start: '09:00', end: '17:00' },
  Friday:    { checked: true,  start: '13:00', end: '18:00' },
  Saturday:  { checked: false, start: '09:00', end: '17:00' },
  Sunday:    { checked: false, start: '09:00', end: '17:00' },
};

const AddDoctorModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    doctorId: '',
    about: '',
    phone: '',
    email: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    department: 'General Medicine',
    specialization: '',
    workType: 'Full Time',
    startDate: '',
    salary: '',
    licenseNumber: '',
    licenseExpiry: '',
  });

  const [schedule, setSchedule] = useState(defaultSchedule);
  const [minAppt, setMinAppt] = useState(1);
  const [maxAppt, setMaxAppt] = useState(18);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [phoneError, setPhoneError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [depts, setDepts] = useState([]);
  const [specs, setSpecs] = useState([]);

  const fetchData = async () => {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    console.log("Fetching professional info from:", apiBase);
    
    if (!apiBase) {
      console.error("VITE_API_BASE_URL is undefined! Please restart your npm run dev server.");
      return;
    }

    try {
      const [deptRes, specRes] = await Promise.all([
        fetch(`${apiBase}/department`),
        fetch(`${apiBase}/speciality`)
      ]);
      
      if (!deptRes.ok || !specRes.ok) {
         console.error("Fetch failed:", deptRes.status, specRes.status);
         const text = await (deptRes.ok ? specRes.text() : deptRes.text());
         console.error("Response text (first 100 chars):", text.substring(0, 100));
         return;
      }

      const [deptData, specData] = await Promise.all([deptRes.json(), specRes.json()]);
      if (deptData.success) setDepts(deptData.data);
      if (specData.success) setSpecs(specData.data);
    } catch (error) {
       console.error("Error fetching professional info lists:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const [avatarPreview, setAvatarPreview] = useState('https://via.placeholder.com/300?text=Doctor');
  const [avatarFile, setAvatarFile] = useState(null);
  const avatarInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const render = new FileReader();
      render.onload = (e) => setAvatarPreview(e.target.result);
      render.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'phone') setPhoneError(!value.trim());
  };

  const handleScheduleCheck = (day) => {
    setSchedule(prev => ({ ...prev, [day]: { ...prev[day], checked: !prev[day].checked } }));
  };

  const handleScheduleTime = (day, key, value) => {
    setSchedule(prev => ({ ...prev, [day]: { ...prev[day], [key]: value } }));
  };

  const processFiles = (filesList) => {
    const files = Array.from(filesList);
    files.forEach(f => {
      const type = f.name.endsWith('.pdf') ? 'pdf' : 'img';
      setUploadedFiles(prev => [...prev, { file: f, name: f.name, type }]);
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
  };

  const removeFile = (idx) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!form.phone.trim()) {
      setPhoneError(true);
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      formData.append('minAppt', minAppt);
      formData.append('maxAppt', maxAppt);
      formData.append('schedule', JSON.stringify(schedule));
      
      if (avatarFile) formData.append('avatar', avatarFile);
      uploadedFiles.forEach(f => {
        if (f.file) formData.append('certifications', f.file);
      });

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      const data = await res.json();
      if(data.success) {
        onClose(); // Parent (Doctors.jsx) will re-fetch
      } else {
        alert(data.message || 'Error creating doctor');
      }
    } catch (e) {
      console.error(e);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
         style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-2xl w-full max-w-[720px] shadow-2xl flex flex-col my-auto">
        
        {/* ── Modal Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="font-bold text-gray-900 text-[16px]">Add New Doctor</h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-7">

          {/* ── 1. Personal Info ──────────────────────────────────────────── */}
          <section>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">Personal Info</p>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              {/* Photo Upload */}
              <div className="flex-shrink-0 relative group">
                <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                <div className="w-28 h-32 md:w-24 md:h-28 rounded-2xl overflow-hidden border-2 border-[#992120]/30 bg-[#e7e3da] shadow-inner">
                  <img src={avatarPreview} alt="Doctor" className="w-full h-full object-cover object-top" />
                </div>
                <button 
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 md:w-6 md:h-6 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#992120] hover:bg-[#e7e3da] transition-all hover:scale-110"
                >
                  <Pencil size={12} />
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Full Name</label>
                  <input
                    type="text" value={form.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Gender</label>
                  <div className="flex items-center gap-4 mt-1.5">
                    {['Female', 'Male', 'Other'].map(g => (
                      <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="gender" checked={form.gender === g} onChange={() => handleChange('gender', g)}
                          className="w-3.5 h-3.5 accent-[#992120]" />
                        <span className="text-[12px] font-medium text-gray-700">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* DOB */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Date of Birth</label>
                  <div className="relative">
                    <input type="date" value={form.dob} onChange={e => handleChange('dob', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120] pr-8" />
                  </div>
                </div>
                {/* Doctor ID */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Doctor ID</label>
                  <input type="text" value={form.doctorId} onChange={e => handleChange('doctorId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
                </div>
                {/* About */}
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">About</label>
                  <textarea value={form.about} onChange={e => handleChange('about', e.target.value)} rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120] resize-none" />
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. Contact Info ───────────────────────────────────────────── */}
          <section>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-[#992120] pl-3">Contact Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Phone Number</label>
                <input type="text" value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="Input your phone number"
                  className={`w-full px-3 py-2 border rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 placeholder:text-gray-400 ${
                    phoneError
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                      : 'border-gray-200 focus:ring-[#992120]/20 focus:border-[#992120]'
                  }`}
                />
                {phoneError && <p className="text-[11px] text-red-400 mt-1 font-medium">Please input the phone number</p>}
              </div>
              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
              </div>
              {/* Address */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5">Address</label>
                <input type="text" value={form.address} onChange={e => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
              </div>
              {/* Emergency Contact */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-tighter">Emergency Contact</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input type="text" value={form.emergencyName} onChange={e => handleChange('emergencyName', e.target.value)}
                    placeholder="Contact Name"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
                  <input type="text" value={form.emergencyPhone} onChange={e => handleChange('emergencyPhone', e.target.value)}
                    placeholder="Contact Phone"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
                </div>
              </div>
            </div>
          </section>

          {/* ── 3. Professional Info ──────────────────────────────────────── */}
          <section>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-[#992120] pl-3">Professional Info</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Department</label>
                <select
                  value={form.department}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none transition-all"
                >
                  <option value="">Select Department</option>
                  {depts.map(d => (
                    <option key={d._id} value={d.name}>{d.name}</option>
                  ))}
                  {depts.length === 0 && <option disabled>No departments found</option>}
                </select>
              </div>

              {/* Specialization */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Specialization</label>
                <select
                  value={form.specialization}
                  onChange={e => setForm({ ...form, specialization: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none transition-all"
                >
                  <option value="">Select Specialization</option>
                  {specs.map(s => (
                    <option key={s._id} value={s.name}>{s.name}</option>
                  ))}
                  {specs.length === 0 && <option disabled>No specializations found</option>}
                </select>
              </div>

              {/* Work Type */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-tighter">Work Type</label>
                <div className="flex items-center gap-6 bg-gray-50/50 p-2.5 rounded-2xl border border-gray-100 w-full sm:w-fit">
                  {['Full Time', 'Part Time'].map(w => (
                    <label key={w} className="flex items-center gap-2.5 cursor-pointer group flex-1 sm:flex-initial justify-center">
                      <input type="radio" name="workType" checked={form.workType === w} onChange={() => handleChange('workType', w)}
                        className="w-4 h-4 accent-[#992120] cursor-pointer" />
                      <span className={`text-[12px] font-black ${form.workType === w ? 'text-primary' : 'text-gray-400'}`}>{w}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employment Start Date */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-tighter">Employment Start Date</label>
                <div className="relative">
                  <input type="date" value={form.startDate} onChange={e => handleChange('startDate', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-[13px] text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120] shadow-sm" />
                </div>
              </div>

              {/* Salary */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-tighter">Salary</label>
                <div className="relative flex items-center">
                  <input type="text" value={form.salary} onChange={e => handleChange('salary', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-[13px] text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120] pr-20 shadow-sm" />
                  <span className="absolute right-4 text-[12px] text-gray-400 font-bold uppercase tracking-widest">/ month</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 4. Licenses & Certifications ──────────────────────────────── */}
          <section>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-[#992120] pl-3">Licenses & Certifications</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* License Number */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-tighter">Medical License Number</label>
                <input type="text" value={form.licenseNumber} onChange={e => handleChange('licenseNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
              </div>
              {/* Certification Upload */}
              <div className="md:row-span-2">
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-tighter">Certification Uploads</label>
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full min-h-[100px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                    dragging ? 'border-[#992120] bg-[#e7e3da]' : 'border-gray-200 hover:border-[#992120]/40 hover:bg-gray-50'
                  }`}
                >
                  <Upload size={20} className="text-primary mb-2" />
                  <p className="text-[11px] text-gray-500 font-bold">
                    Drop files or <span className="text-[#992120] underline underline-offset-2">Browse</span>
                  </p>
                </div>
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />

                {/* Uploaded Files */}
                <div className="mt-4 flex flex-col gap-2">
                  {uploadedFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[#e7e3da] rounded-xl border border-[#992120]/10">
                      {f.type === 'pdf'
                        ? <FileText size={14} className="text-primary flex-shrink-0" />
                        : <Image size={14} className="text-primary flex-shrink-0" />}
                      <span className="text-[12px] text-gray-700 font-bold flex-1 truncate">{f.name}</span>
                      <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* License Expiry */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-tighter">License Expiry Date</label>
                <input type="date" value={form.licenseExpiry} onChange={e => handleChange('licenseExpiry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-[13px] text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
              </div>
            </div>
          </section>

          {/* ── 5. Schedule ───────────────────────────────────────────────── */}
          <section>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 border-l-4 border-[#992120] pl-3">Schedule</p>
            <p className="text-[11px] font-semibold text-gray-500 mb-3">Working Days & Shifts</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              {DAYS.map(day => (
                <div key={day} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={schedule[day].checked}
                    onChange={() => handleScheduleCheck(day)}
                    className="w-4 h-4 rounded accent-[#992120] flex-shrink-0"
                  />
                  <span className={`text-[12px] font-semibold w-24 flex-shrink-0 ${schedule[day].checked ? 'text-gray-900' : 'text-gray-400'}`}>
                    {day}
                  </span>
                  {schedule[day].checked && (
                    <div className="flex items-center gap-2 flex-1">
                      <input type="time" value={schedule[day].start}
                        onChange={e => handleScheduleTime(day, 'start', e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-200 rounded-lg text-[12px] text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
                      <span className="text-gray-400 text-[12px]">—</span>
                      <input type="time" value={schedule[day].end}
                        onChange={e => handleScheduleTime(day, 'end', e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-200 rounded-lg text-[12px] text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#992120]/20 focus:border-[#992120]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <span className="text-[12px] font-bold text-gray-700">Max Appt per Day</span>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400 font-bold uppercase">Min</span>
                  <div className="flex items-center border border-gray-100 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                    <button onClick={() => setMinAppt(v => Math.max(0, v - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                      <Minus size={10} strokeWidth={3} />
                    </button>
                    <span className="w-10 text-center text-[13px] font-bold text-gray-900">{minAppt}</span>
                    <button onClick={() => setMinAppt(v => v + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-primary text-white hover:bg-[#7a1a19] transition-colors">
                      <Plus size={10} strokeWidth={3} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400 font-bold uppercase">Max</span>
                  <div className="flex items-center border border-gray-100 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                    <button onClick={() => setMaxAppt(v => Math.max(minAppt, v - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                      <Minus size={10} strokeWidth={3} />
                    </button>
                    <span className="w-10 text-center text-[13px] font-bold text-gray-900">{maxAppt}</span>
                    <button onClick={() => setMaxAppt(v => v + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-primary text-white hover:bg-[#7a1a19] transition-colors">
                      <Plus size={10} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Footer Buttons ────────────────────────────────────────────── */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 bg-[#992120] text-white rounded-xl text-[13px] font-semibold hover:bg-[#7a1a19] transition-colors shadow-sm shadow-[#992120]/30 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Doctor'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorModal;
