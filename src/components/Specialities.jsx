import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Stethoscope,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Specialities = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });

  const fetchSpecialties = async () => {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    if (!apiBase) {
      console.error("VITE_API_BASE_URL is missing!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/speciality`);
      
      if (!res.ok) {
        console.error("Speciality fetch failed:", res.status);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSpecialties(data.data);
      }
    } catch (error) {
      console.error("Error fetching specialities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingSpec 
      ? `${import.meta.env.VITE_API_BASE_URL}/speciality/${editingSpec._id}` 
      : `${import.meta.env.VITE_API_BASE_URL}/speciality`;
    const method = editingSpec ? 'PUT' : 'POST';

    try {
      const body = {
        name: formData.name,
        description: formData.description,
        isActive: formData.status === 'Active'
      };

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        fetchSpecialties();
        setIsModalOpen(false);
        setEditingSpec(null);
        setFormData({ name: '', description: '', status: 'Active' });
      }
    } catch (error) {
      console.error("Error saving speciality:", error);
    }
  };

  const handleEdit = (spec) => {
    setEditingSpec(spec);
    setFormData({ 
      name: spec.name, 
      description: spec.description || '', 
      status: spec.isActive ? 'Active' : 'Inactive' 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this speciality?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/speciality/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (data.success) fetchSpecialties();
    } catch (error) {
      console.error("Error deleting speciality:", error);
    }
  };

  const filteredSpecs = specialties.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Specialities</h2>
          <p className="text-xs text-gray-500 mt-1">Configure medical specialties for doctor profiles and appointment booking.</p>
        </div>
        <button 
          onClick={() => { setEditingSpec(null); setFormData({ name: '', description: '', status: 'Active' }); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#992120] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-[#992120]/20 hover:opacity-90 transition-all"
        >
          <Plus size={18} />
          Add Speciality
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search specialities..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden">
            <div className="px-10 py-8 bg-[#992120] text-white">
              <h3 className="text-2xl font-bold">{editingSpec ? 'Update' : 'New'} Speciality</h3>
              <p className="text-xs opacity-80 font-medium">Professional Info category management</p>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase block pl-1">Speciality Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Cardiology" 
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase block pl-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Short description..." 
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none h-32" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase block pl-1">Status</label>
                <select 
                   value={formData.status}
                   onChange={e => setFormData({...formData, status: e.target.value})}
                   className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-[#992120]/20 outline-none"
                >
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-[#992120] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#992120]/20 hover:opacity-90">SAVE CHANGES</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-400 py-10 font-bold col-span-3">Loading specialities...</p>
        ) : filteredSpecs.length === 0 ? (
          <p className="text-center text-gray-400 py-10 font-bold col-span-3">No specialities found.</p>
        ) : filteredSpecs.map((spec) => (
          <div key={spec._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 rounded-2xl bg-gray-50 text-[#992120]">
                <Stethoscope size={28} />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(spec)}
                  className="p-2 text-gray-400 hover:text-[#992120] bg-gray-50 rounded-xl transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(spec._id)}
                  className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-xl transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2 truncate">{spec.name}</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-2">{spec.description || 'No description provided.'}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
               <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${spec.isActive ? 'bg-[#e7e3da] text-[#992120]' : 'bg-gray-100 text-gray-400'}`}>
                  {spec.isActive ? 'Active' : 'Inactive'}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialities;
