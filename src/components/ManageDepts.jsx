import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const ManageDepts = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/department`);
      const data = await res.json();
      if (data.success) {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingDept 
      ? `${import.meta.env.VITE_API_BASE_URL}/department/${editingDept._id}` 
      : `${import.meta.env.VITE_API_BASE_URL}/department`;
    const method = editingDept ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchDepartments();
        setIsModalOpen(false);
        setEditingDept(null);
        setFormData({ name: '', description: '' });
      }
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, description: dept.description });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this department?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/department/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (data.success) fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Departments</h2>
          <p className="text-xs text-gray-500 mt-1">Add, edit, or deactivate hospital departments for the Professional Info section.</p>
        </div>
        <button 
          onClick={() => { setEditingDept(null); setFormData({ name: '', description: '' }); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-[#992120] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-[#992120]/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search departments..." 
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
              <h3 className="text-2xl font-bold">{editingDept ? 'Update' : 'New'} Department</h3>
              <p className="text-xs opacity-80 font-medium">Professional Info category management</p>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase block pl-1">Department Name</label>
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
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-[#992120] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#992120]/20 hover:opacity-90">SAVE CHANGES</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center text-gray-400 py-10 font-bold">Loading departments...</p>
        ) : filteredDepts.length === 0 ? (
          <p className="text-center text-gray-400 py-10 font-bold">No departments found.</p>
        ) : filteredDepts.map((dept) => (
          <div key={dept._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:border-[#992120]/30 transition-all p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-gray-50 text-[#992120]">
                <Layers size={28} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">{dept.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{dept.description || 'No description provided.'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEdit(dept)}
                className="p-3 text-gray-400 hover:text-[#992120] bg-gray-50 rounded-2xl transition-all"
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(dept._id)}
                className="p-3 text-gray-400 hover:text-red-500 bg-gray-50 rounded-2xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDepts;
