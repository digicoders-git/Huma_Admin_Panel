import React, { useState, useRef ,useEffect  } from 'react';
import { X, Calendar, ChevronDown, Upload, FileText, Image, Trash2, Plus, Minus, Pencil, Loader2 } from 'lucide-react';

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

const AddDoctorModal = ({ isOpen, onClose, editData = null }) => {
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
    city: 'Lucknow',
    emergencyName: '',
    emergencyPhone: '',
    department: 'General Medicine',
    designation: 'Senior Consultant',
    qualification: 'MBBS, MD',
    specialization: '',
    expertise: '',
    procedures: '',
    whyChoose: '',
    workType: 'Full Time',
    startDate: '',
    salary: '',
    licenseNumber: '',
    licenseExpiry: '',
    consultationFee: 500,
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
      if (editData) {
        setForm({
          fullName: editData.fullName || '',
          gender: editData.gender || 'Male',
          dob: editData.dob ? editData.dob.split('T')[0] : '',
          doctorId: editData.doctorId || '',
          about: editData.about || '',
          phone: editData.phone || '',
          email: editData.email || '',
          address: editData.address || '',
          city: editData.city || 'Lucknow',
          emergencyName: editData.emergencyName || '',
          emergencyPhone: editData.emergencyPhone || '',
          department: editData.department || '',
          designation: editData.designation || 'Senior Consultant',
          qualification: editData.qualification || 'MBBS, MD',
          specialization: editData.specialization || '',
          expertise: Array.isArray(editData.expertise) ? editData.expertise.join(', ') : (editData.expertise || ''),
          procedures: Array.isArray(editData.procedures) ? editData.procedures.join(', ') : (editData.procedures || ''),
          whyChoose: Array.isArray(editData.whyChoose) ? editData.whyChoose.join(', ') : (editData.whyChoose || ''),
          workType: editData.workType || 'Full Time',
          startDate: editData.startDate ? editData.startDate.split('T')[0] : '',
          salary: editData.salary || '',
          licenseNumber: editData.licenseNumber || '',
          licenseExpiry: editData.licenseExpiry ? editData.licenseExpiry.split('T')[0] : '',
          consultationFee: editData.consultationFee || 500,
        });
        if (editData.schedule) {
          try {
            const parsedSchedule = typeof editData.schedule === 'string' ? JSON.parse(editData.schedule) : editData.schedule;
            setSchedule(parsedSchedule);
          } catch (e) { console.error("Error parsing schedule:", e); }
        }
        setMinAppt(editData.minAppt || 1);
        setMaxAppt(editData.maxAppt || 18);
        if (editData.avatar) {
          setAvatarPreview(`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${editData.avatar}`);
        } else {
          setAvatarPreview('https://via.placeholder.com/300?text=Doctor');
        }
      } else {
        // Reset form for addition
        setForm({
          address: '', city: 'Lucknow', emergencyName: '', emergencyPhone: '', department: 'General Medicine',
          designation: 'Senior Consultant', qualification: 'MBBS, MD',
          specialization: '', expertise: '', procedures: '', whyChoose: '',
          workType: 'Full Time', startDate: '', salary: '',
          licenseNumber: '', licenseExpiry: '',
          consultationFee: 500,
        });
        setSchedule(defaultSchedule);
        setMinAppt(1);
        setMaxAppt(18);
        setAvatarPreview('https://via.placeholder.com/300?text=Doctor');
        setAvatarFile(null);
        setUploadedFiles([]);
      }
    }
  }, [isOpen, editData]);

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
      Object.keys(form).forEach(key => {
        if (['expertise', 'procedures', 'whyChoose'].includes(key)) {
          const arr = form[key].split(',').map(s => s.trim()).filter(s => s !== '');
          arr.forEach(val => formData.append(`${key}[]`, val));
        } else {
          formData.append(key, form[key]);
        }
      });
      formData.append('minAppt', minAppt);
      formData.append('maxAppt', maxAppt);
      formData.append('schedule', JSON.stringify(schedule));
      
      if (avatarFile) formData.append('avatar', avatarFile);
      uploadedFiles.forEach(f => {
        if (f.file) formData.append('certifications', f.file);
      });

      const url = editData 
        ? `${import.meta.env.VITE_API_BASE_URL}/doctor/${editData._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/doctor`;
      
      const res = await fetch(url, {
        method: editData ? 'PUT' : 'POST',
        headers: {
           Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      const data = await res.json();
      if(data.success) {
        onClose(); // Parent (Doctors.jsx) will re-fetch
      } else {
        alert(data.message || `Error ${editData ? 'updating' : 'creating'} doctor`);
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
      <div className="bg-white rounded-2xl w-full max-w-[1100px] shadow-2xl flex flex-col my-auto">
        
        {/* ── Modal Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="font-bold text-gray-900 text-[16px]">{editData ? 'Edit Doctor' : 'Add New Doctor'}</h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 flex flex-col gap-6 max-h-[85vh]">
          {/* Main 2-Column Grid for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
            
            {/* ── LEFT COLUMN ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-8">
              {/* ── 1. Personal Info ──────────────────────────────────────────── */}
              <section className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#992120] rounded-full"></span>
                  Personal Info
                </p>
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  {/* Photo Upload Area */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="relative group">
                      <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                      <div 
                        onClick={() => avatarInputRef.current?.click()}
                        className="w-24 h-28 rounded-2xl overflow-hidden border-2 border-[#992120]/20 bg-gray-50 shadow-sm transition-all group-hover:border-[#992120]/60 cursor-pointer relative"
                      >
                        <img 
                          src={avatarPreview} 
                          alt="Doctor" 
                          className="w-full h-full object-cover object-top" 
                          onError={(e) => {
                            e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'; // Pro medical fallback
                            e.target.className = "w-full h-full object-contain p-4 opacity-40 bg-gray-50";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Upload size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); avatarInputRef.current?.click(); }}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all hover:scale-110 z-10"
                      >
                        <Pencil size={12} />
                      </button>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Upload Photo</span>
                  </div>

                  {/* Fields */}
                  <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Full Name</label>
                      <input
                        type="text" value={form.fullName}
                        onChange={e => handleChange('fullName', e.target.value)}
                        placeholder="Dr. Full Name"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Gender</label>
                      <select 
                        value={form.gender} 
                        onChange={e => handleChange('gender', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">DOB</label>
                      <input type="date" value={form.dob} onChange={e => handleChange('dob', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">About</label>
                      <textarea value={form.about} onChange={e => handleChange('about', e.target.value)} rows={2}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none resize-none" />
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 2. Contact Info ───────────────────────────────────────────── */}
              <section className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#992120] rounded-full"></span>
                  Contact Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Phone Number</label>
                    <input type="text" value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-[13px] font-semibold focus:ring-2 ${
                        phoneError ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-[#992120]/10'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Email</label>
                    <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Address</label>
                    <input type="text" value={form.address} onChange={e => handleChange('address', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none" />
                  </div>
                </div>
              </section>

              {/* ── 4. Licenses & Certifications ──────────────────────────────── */}
              <section className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#992120] rounded-full"></span>
                  Licenses & Files
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">License Number</label>
                    <input type="text" value={form.licenseNumber} onChange={e => handleChange('licenseNumber', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Upload Certifications</label>
                    <div
                      onDragOver={e => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full py-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                        dragging ? 'border-[#992120] bg-primary-light' : 'border-gray-200 bg-white hover:border-primary/40'
                      }`}
                    >
                      <Upload size={18} className="text-primary mb-1" />
                      <p className="text-[10px] text-gray-500 font-bold">Drop files or <span className="text-primary underline">Browse</span></p>
                    </div>
                    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 px-2 py-1.5 bg-white rounded-lg border border-gray-100 shadow-sm">
                          <FileText size={12} className="text-primary" />
                          <span className="text-[10px] font-bold text-gray-700 max-w-[80px] truncate">{f.name}</span>
                          <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN ──────────────────────────────────────────── */}
            <div className="flex flex-col gap-8">
              {/* ── 3. Professional Info ──────────────────────────────────────── */}
              <section className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#992120] rounded-full"></span>
                  Professional Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Designation</label>
                    <input type="text" value={form.designation} onChange={e => handleChange('designation', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" placeholder="e.g. Senior Neurologist" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Qualification</label>
                    <input type="text" value={form.qualification} onChange={e => handleChange('qualification', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" placeholder="e.g. MBBS, MD" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Department</label>
                    <select value={form.department} onChange={e => handleChange('department', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 transition-all">
                      <option value="">Select Dept</option>
                      {depts.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Specialization</label>
                    <select value={form.specialization} onChange={e => handleChange('specialization', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 transition-all">
                      <option value="">Select Specialization</option>
                      {specs.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Experience (Years)</label>
                    <input type="number" value={form.experience} onChange={e => handleChange('experience', e.target.value)} min={0}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" placeholder="e.g. 15" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Join Date (Fallback exp)</label>
                    <input type="date" value={form.startDate} onChange={e => handleChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Expertise (Comma separated)</label>
                    <textarea value={form.expertise} onChange={e => handleChange('expertise', e.target.value)} rows={2} placeholder="Stroke, Epilepsy..."
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Procedures (Comma separated)</label>
                    <textarea value={form.procedures} onChange={e => handleChange('procedures', e.target.value)} rows={2} placeholder="EEG, EMG..."
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Why Choose (Comma separated)</label>
                    <textarea value={form.whyChoose} onChange={e => handleChange('whyChoose', e.target.value)} rows={2} placeholder="Reasons..."
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none resize-none" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Work Type</label>
                    <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                      {['Full Time', 'Part Time'].map(w => (
                        <button key={w} onClick={() => handleChange('workType', w)}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${form.workType === w ? 'bg-[#992120] text-white shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}>
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Salary (/mo)</label>
                    <input type="text" value={form.salary} onChange={e => handleChange('salary', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" />
                  </div>
                   <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1 ml-1">Consultation Fee (₹)</label>
                    <input type="number" value={form.consultationFee} onChange={e => handleChange('consultationFee', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold focus:ring-2 focus:ring-[#992120]/20" />
                  </div>
                </div>
              </section>

              {/* ── 5. Schedule ───────────────────────────────────────────────── */}
              <section className="bg-gray-50/30 p-4 rounded-2xl border border-gray-100">
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#992120] rounded-full"></span>
                  Weekly Schedule
                </p>
                <div className="space-y-3">
                  {DAYS.map(day => (
                    <div key={day} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-50 shadow-sm transition-all hover:border-[#992120]/20">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={schedule[day].checked} onChange={() => handleScheduleCheck(day)}
                          className="w-4 h-4 rounded-md accent-[#992120]" />
                        <span className={`text-[12px] font-bold ${schedule[day].checked ? 'text-gray-900' : 'text-gray-300'}`}>{day}</span>
                      </div>
                      {schedule[day].checked && (
                        <div className="flex items-center gap-2">
                          <input type="time" value={schedule[day].start} onChange={e => handleScheduleTime(day, 'start', e.target.value)}
                            className="px-2 py-1 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-700 focus:ring-1 focus:ring-primary/20 outline-none" />
                          <span className="text-gray-300 text-[10px]">TO</span>
                          <input type="time" value={schedule[day].end} onChange={e => handleScheduleTime(day, 'end', e.target.value)}
                            className="px-2 py-1 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-700 focus:ring-1 focus:ring-primary/20 outline-none" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Min/Max Appointment */}
                <div className="mt-6 flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 shadow-sm lg:col-span-2">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700">Appts/Day:</div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-400 font-bold">MIN</span>
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                        <button onClick={() => setMinAppt(v => Math.max(0, v - 1))} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-primary"><Minus size={10} strokeWidth={3} /></button>
                        <span className="w-6 text-center text-[12px] font-bold">{minAppt}</span>
                        <button onClick={() => setMinAppt(v => v + 1)} className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-lg"><Plus size={10} strokeWidth={3} /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-400 font-bold">MAX</span>
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                        <button onClick={() => setMaxAppt(v => Math.max(minAppt, v - 1))} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-primary"><Minus size={10} strokeWidth={3} /></button>
                        <span className="w-6 text-center text-[12px] font-bold">{maxAppt}</span>
                        <button onClick={() => setMaxAppt(v => v + 1)} className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-lg"><Plus size={10} strokeWidth={3} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
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
            className="flex-1 py-2.5 bg-[#992120] text-white rounded-xl text-[13px] font-semibold hover:bg-[#7a1a19] transition-colors shadow-sm shadow-[#992120]/30 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            {loading ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Doctor' : 'Add Doctor')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorModal;
