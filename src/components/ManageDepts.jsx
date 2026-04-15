import React, { useState } from 'react';
import { 
  Layers, 
  Stethoscope, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  Activity,
  Heart,
  Brain,
  Eye,
  Settings2,
  CheckCircle2
} from 'lucide-react';

const departmentsData = [
  {
    id: 1,
    name: 'Cardiology',
    head: 'Dr. Michael Chen',
    services: ['Heart Surgery', 'ECG', 'Echocardiogram', 'Stress Test'],
    status: 'Active',
    icon: Heart,
    color: 'bg-red-50 text-red-600'
  },
  {
    id: 2,
    name: 'Neurology',
    head: 'Dr. Sarah Smith',
    services: ['Brain Mapping', 'EEG', 'Stroke Care', 'Sleep Study'],
    status: 'Active',
    icon: Brain,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 3,
    name: 'Ophthalmology',
    head: 'Dr. John Roberts',
    services: ['Eye Exam', 'Laser Surgery', 'Cataract Care', 'Glaucoma'],
    status: 'Active',
    icon: Eye,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 4,
    name: 'Dermatology',
    head: 'Dr. Anna Lee',
    services: ['Skin Allergy', 'Acne Treatment', 'Laser Therapy'],
    status: 'Inactive',
    icon: Stethoscope,
    color: 'bg-amber-50 text-amber-600'
  }
];

const ManageDepts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [selectedDeptForService, setSelectedDeptForService] = useState('');

  const openServiceModal = (deptName = '') => {
    setSelectedDeptForService(deptName);
    setIsAddServiceOpen(true);
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in relative">
      
      {/* Add Department Modal */}
      {isAddDeptOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-10 py-8 bg-primary text-white flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-bold">New Department</h3>
                    <p className="text-xs opacity-80 font-medium mt-1 uppercase tracking-widest">Create a medical division</p>
                 </div>
                 <button onClick={() => setIsAddDeptOpen(false)} className="bg-white/20 p-2 rounded-2xl hover:bg-white/30 transition-all">
                    <Trash2 size={24} className="rotate-45" />
                 </button>
              </div>
              <form className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Department Name</label>
                    <input type="text" placeholder="e.g. Cardiology" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Head of Department</label>
                    <input type="text" placeholder="e.g. Dr. Michael Chen" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Status</label>
                       <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none">
                          <option>Active</option>
                          <option>Inactive</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Initial Services</label>
                       <input type="text" placeholder="Comma separated" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all">CREATE NOW</button>
                    <button type="button" onClick={() => setIsAddDeptOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">CANCEL</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddServiceOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-10 py-8 bg-primary text-white flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-bold">Add Medical Service</h3>
                    <p className="text-xs opacity-80 font-medium mt-1 uppercase tracking-widest">Register a new healthcare package</p>
                 </div>
                 <button onClick={() => setIsAddServiceOpen(false)} className="bg-white/20 p-2 rounded-2xl hover:bg-white/30 transition-all">
                    <Trash2 size={24} className="rotate-45" />
                 </button>
              </div>
              <form className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Target Department</label>
                    <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" defaultValue={selectedDeptForService}>
                       <option value="">Select Department</option>
                       {departmentsData.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Service Name</label>
                    <input type="text" placeholder="e.g. MRI Scan" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Price / Tariff (optional)</label>
                    <input type="text" placeholder="e.g. $250" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all">REGISTER SERVICE</button>
                    <button type="button" onClick={() => setIsAddServiceOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">CANCEL</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Departments & Services</h2>
          <p className="text-xs text-gray-500 mt-1">Configure your hospital departments and the medical services they provide.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white text-gray-600 border border-gray-100 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all">
            <Settings2 size={18} />
            Categories
          </button>
          <button 
            onClick={() => setIsAddDeptOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
          >
            <Plus size={18} />
            Add Department
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search departments or specific medical services..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Departments List */}
      <div className="grid grid-cols-1 gap-4">
        {departmentsData.map((dept) => (
          <div key={dept.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:border-primary/30 transition-all">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Icon & Name */}
              <div className="flex items-center gap-5 min-w-[280px]">
                <div className={`p-4 rounded-2xl ${dept.color} shadow-sm group-hover:scale-110 transition-transform`}>
                   <dept.icon size={28} />
                </div>
                <div>
                   <h3 className="text-lg font-extrabold text-gray-900 leading-tight">{dept.name}</h3>
                   <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">HOD: <span className="text-gray-600 font-extrabold">{dept.head}</span></p>
                </div>
              </div>

              {/* Services Tags */}
              <div className="flex-1">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Available Services</p>
                 <div className="flex flex-wrap gap-2">
                    {dept.services.map((service, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-xl text-[11px] font-bold border border-gray-100 group-hover:bg-primary-light group-hover:text-primary group-hover:border-primary/20 transition-all">
                        {service}
                      </span>
                    ))}
                    <button 
                      onClick={() => openServiceModal(dept.name)}
                      className="w-8 h-8 rounded-full border-2 border-dashed border-gray-200 text-gray-300 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all"
                    >
                       <Plus size={14} />
                    </button>
                 </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-6 self-end md:self-center">
                 <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">STATUS</p>
                    <div className={`flex items-center gap-1.5 font-bold text-[11px] ${dept.status === 'Active' ? 'text-primary' : 'text-red-400'}`}>
                       <CheckCircle2 size={14} />
                       {dept.status}
                    </div>
                 </div>
                 <div className="h-10 w-[1px] bg-gray-100 hidden md:block"></div>
                 <div className="flex items-center gap-2">
                    <button className="p-3 text-gray-400 hover:text-primary bg-gray-50 rounded-2xl hover:bg-primary-light transition-all">
                       <Edit3 size={18} />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-red-500 bg-gray-50 rounded-2xl hover:bg-red-50 transition-all">
                       <Trash2 size={18} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Section (Quick) */}
      <div className="bg-primary rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
         <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-white backdrop-blur-md">
               <Layers size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-bold">New Medical Service?</h3>
               <p className="text-sm opacity-80 font-medium">Add a specialized service to an existing department easily.</p>
            </div>
         </div>
         <button 
           onClick={() => openServiceModal()}
           className="relative z-10 bg-white text-primary px-10 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-gray-50 hover:scale-105 transition-all outline-none"
         >
            ADD SERVICE NOW
         </button>
      </div>
    </div>
  );
};

export default ManageDepts;
