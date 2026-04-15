import React, { useState } from 'react';
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Eye, 
  Plus, 
  Search, 
  MoreVertical, 
  Users, 
  CheckCircle2, 
  XCircle,
  Edit2,
  Trash2
} from 'lucide-react';

const specialtiesData = [
  {
    id: 1,
    name: 'Neurology',
    description: 'Diagnosis and treatment of all categories of conditions and disease involving the nervous system.',
    doctors: 12,
    status: 'Active',
    icon: Brain,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 2,
    name: 'Cardiology',
    description: 'Dealing with disorders of the heart as well as some parts of the circulatory system.',
    doctors: 8,
    status: 'Active',
    icon: Heart,
    color: 'bg-red-50 text-red-600'
  },
  {
    id: 3,
    name: 'Ophthalmology',
    description: 'Specialized in the diagnosis and treatment of eye disorders and vision care.',
    doctors: 5,
    status: 'Active',
    icon: Eye,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 4,
    name: 'General Surgery',
    description: 'Surgical specialty that focuses on abdominal contents including esophagus, stomach, etc.',
    doctors: 15,
    status: 'Inactive',
    icon: Stethoscope,
    color: 'bg-primary-light text-primary'
  },
  {
    id: 5,
    name: 'Pediatrics',
    description: 'Medical care of infants, children, and adolescents up to the age of 18 or 21.',
    doctors: 10,
    status: 'Active',
    icon: Users,
    color: 'bg-amber-50 text-amber-600'
  }
];

const Specialities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-primary-light/30">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Add Medical Speciality</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Define a new department</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl shadow-sm transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Speciality Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dermatology"
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Description</label>
                <textarea 
                  rows="3"
                  placeholder="Tell us about this department..."
                  className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Initial Status</label>
                  <select className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Primary Color</label>
                    <div className="flex gap-2">
                      {['#992120', '#8B5CF6', '#EF4444', '#F59E0B'].map(c => (
                        <button key={c} type="button" style={{backgroundColor: c}} className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"></button>
                      ))}
                    </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
                >
                  Create Speciality
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3.5 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Specialities</h2>
          <p className="text-xs text-gray-500 mt-1">Manage and organize hospital medical departments and specialties.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} />
          Add Speciality
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Specialities', value: specialtiesData.length, icon: Stethoscope, color: 'primary' },
          { label: 'Active Depts', value: specialtiesData.filter(s => s.status === 'Active').length, icon: CheckCircle2, color: 'blue' },
          { label: 'Total Staff', value: specialtiesData.reduce((acc, s) => acc + s.doctors, 0), icon: Users, color: 'purple' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${stat.color === 'primary' ? 'bg-primary-light text-primary' : `bg-${stat.color}-50 text-${stat.color}-600`}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search specialities..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="px-6 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-gray-500 focus:ring-2 focus:ring-primary/20 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-6 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-gray-500 focus:ring-2 focus:ring-primary/20 outline-none">
            <option>Recently Added</option>
            <option>Sort by Name</option>
            <option>Most Doctors</option>
          </select>
        </div>
      </div>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialtiesData.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((spec) => (
          <div key={spec.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${spec.color} shadow-sm group-hover:scale-110 transition-transform`}>
                <spec.icon size={28} />
              </div>
              <div className="flex items-center gap-1">
                 <button className="p-2 text-gray-400 hover:text-primary bg-gray-50 rounded-xl transition-colors">
                    <Edit2 size={16} />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-xl transition-colors">
                    <Trash2 size={16} />
                 </button>
              </div>
            </div>

            <h4 className="text-lg font-bold text-gray-900 mb-2 truncate">{spec.name}</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-2">
              {spec.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${spec.id + i}`} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" alt="Doctor" />
                  ))}
                  <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                    +{spec.doctors - 3}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Staff</span>
              </div>
              
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                spec.status === 'Active' ? 'bg-primary-light text-primary' : 'bg-gray-100 text-gray-400'
              }`}>
                {spec.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                {spec.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {specialtiesData.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
              <Search size={32} />
           </div>
           <h3 className="text-lg font-bold text-gray-900">No results found</h3>
           <p className="text-xs text-gray-500 mt-2">We couldn't find any specialities matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default Specialities;
