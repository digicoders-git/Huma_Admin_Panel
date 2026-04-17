import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Loader2, Plus, Search, Pencil, Trash2, ChevronRight, X, Upload
} from 'lucide-react';

const ManageDepts = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  const [editingDept, setEditingDept] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const [formData, setFormData] = useState({ 
    name: '', 
    shortDesc: '',
    about: '',
    head: '',
    qualification: '',
    icon: '🧠',
    color: 'from-blue-600 to-blue-800',
    conditions: '',
    services: '',
    status: 'Active' 
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
    setSubmitting(true);
    const url = editingDept 
      ? `${import.meta.env.VITE_API_BASE_URL}/department/${editingDept._id}` 
      : `${import.meta.env.VITE_API_BASE_URL}/department`;
    
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    data.append('name', formData.name);
    data.append('shortDesc', formData.shortDesc || '');
    data.append('about', formData.about || '');
    data.append('head', formData.head || '');
    data.append('qualification', formData.qualification || '');
    data.append('icon', formData.icon || '🧠');
    data.append('color', formData.color || 'from-blue-600 to-blue-800');
    data.append('conditions', formData.conditions || '');
    data.append('services', formData.services || '');
    data.append('isActive', formData.status === 'Active');
    
    if (image) {
       data.append('image', image);
    }

    try {
      const res = await fetch(url, {
        method: editingDept ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });
      const responseData = await res.json();
      if (responseData.success) {
        fetchDepartments();
        setIsFormModalOpen(false);
        setEditingDept(null);
        resetForm();
      } else {
        alert("Failed to save: " + responseData.message);
      }
    } catch (error) {
      console.error("Error saving department:", error);
      alert("Error saving. Please check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', shortDesc: '', about: '', head: '', qualification: '',
      icon: '🧠', color: 'from-blue-600 to-blue-800',
      conditions: '', services: '', status: 'Active' 
    });
    setImage(null);
    setPreview(null);
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setFormData({ 
      name: dept.name, 
      shortDesc: dept.shortDesc || '',
      about: dept.about || '',
      head: dept.head || '',
      qualification: dept.qualification || '',
      icon: dept.icon || '🧠',
      color: dept.color || 'from-blue-600 to-blue-800',
      conditions: Array.isArray(dept.conditions) ? dept.conditions.join(', ') : (dept.conditions || ''),
      services: Array.isArray(dept.services) ? dept.services.join(', ') : (dept.services || ''),
      status: dept.isActive ? 'Active' : 'Inactive' 
    });
    const apiBase = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    setPreview(dept.image ? `${apiBase}${dept.image}` : null);
    setIsFormModalOpen(true);
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/department/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchDepartments();
        setDeleteConfirm({ show: false, id: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };


  const filteredDepts = departments.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMediaUrl = (url) => {
    if (!url) return 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
    if (url.startsWith('http')) return url;
    const base = import.meta.env.VITE_API_BASE_URL.replace('/api', '').replace(/\/$/, '');
    return `${base}${url}`;
  };

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Departments</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Medical Infrastructure Category</p>
        </div>
        <button 
          onClick={() => { setEditingDept(null); resetForm(); setIsFormModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={16} /> Add Department
        </button>
      </div>

      {/* Global Card Container (Doctor Style) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-20 text-gray-400 font-bold">Loading records...</p>
        ) : filteredDepts.length === 0 ? (
          <p className="text-center py-20 text-gray-400 font-bold italic">No departments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDepts.map((dept) => (
              <div key={dept._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden">
                <div className="bg-gray-50 flex justify-center py-4 border-b border-gray-100 h-32 relative">
                   <div className="w-20 h-20 rounded-2xl border-2 border-white shadow-sm overflow-hidden bg-white flex items-center justify-center">
                      <img 
                         src={getMediaUrl(dept.image)} 
                         className="w-full h-full object-cover" 
                         alt={dept.name}
                         onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'; e.target.className = "w-full h-full object-contain p-4 opacity-10"; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-80 pointer-events-none">
                         {!dept.image && dept.icon}
                      </div>
                   </div>
                </div>
                <div className="p-4 text-center flex-1 flex flex-col">
                   <h4 className="font-bold text-gray-900 text-[15px] line-clamp-1 mb-1">{dept.name}</h4>
                   <p className="text-[10px] text-primary font-bold uppercase tracking-tighter mb-4">{dept.head || 'HOD Not Assigned'}</p>
                   <div className="flex justify-center mb-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${dept.isActive ? 'bg-primary-light text-primary border border-primary/10' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                         {dept.isActive ? 'Active' : 'Hidden'}
                      </span>
                   </div>
                   <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex gap-1.5">
                         <button onClick={() => handleEdit(dept)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"><Pencil size={13} /></button>
                         <button onClick={() => handleDelete(dept._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"><Trash2 size={13} /></button>
                      </div>
                      <button onClick={() => setViewDetails(dept)} className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer">
                        Details <ChevronRight size={14} />
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-primary p-6 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold italic uppercase tracking-tight">{editingDept ? 'Update' : 'Define'} Department</h3>
                <button onClick={() => setIsFormModalOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-all"><X size={20} /></button>
             </div>
             <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Dept Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none" placeholder="e.g. General Neurology" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Short Description</label>
                      <input required type="text" value={formData.shortDesc} onChange={e => setFormData({...formData, shortDesc: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none" placeholder="One line intro..." />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Icon (Emoji)</label>
                        <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-center text-xl" placeholder="🧠" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">UI Color</label>
                        <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full px-3 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                           <option value="from-blue-600 to-blue-800">Blue Gradient</option>
                           <option value="from-red-600 to-red-800">Red Gradient</option>
                           <option value="from-purple-600 to-purple-800">Purple Gradient</option>
                           <option value="from-green-600 to-green-800">Green Gradient</option>
                           <option value="from-amber-600 to-amber-800">Amber Gradient</option>
                           <option value="from-teal-600 to-teal-800">Teal Gradient</option>
                           <option value="from-indigo-600 to-indigo-800">Indigo Gradient</option>
                        </select>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Dept Head (Dr. Name)</label>
                      <input type="text" value={formData.head} onChange={e => setFormData({...formData, head: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none" placeholder="HOD Name" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Head Qualification</label>
                      <input type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none" placeholder="Degrees..." />
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                         {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Upload className="text-gray-300" size={24} />}
                         <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; setImage(file); setPreview(URL.createObjectURL(file)); }} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Status</label>
                        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none">
                           <option value="Active">Active (Public)</option>
                           <option value="Inactive">Hidden (Draft)</option>
                        </select>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Detailed About</label>
                      <textarea value={formData.about} onChange={e => setFormData({...formData, about: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium outline-none h-20" placeholder="Full overview..."></textarea>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Conditions Treated (comma separated)</label>
                      <textarea value={formData.conditions} onChange={e => setFormData({...formData, conditions: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-medium outline-none h-16" placeholder="Disease list..."></textarea>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Services Offered (comma separated)</label>
                      <textarea value={formData.services} onChange={e => setFormData({...formData, services: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-medium outline-none h-16" placeholder="Services list..."></textarea>
                   </div>
                </div>

                <div className="col-span-full pt-4 flex gap-4">
                   <button type="submit" disabled={submitting} className="flex-1 py-3.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      {submitting && <Loader2 size={14} className="animate-spin" />}
                      {submitting ? 'Saving...' : 'Save Department'}
                   </button>
                   <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-8 py-3.5 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs uppercase transition-all">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Detail Modal (Website Style) */}
      {viewDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewDetails(null)} />
          <div className="relative w-full max-w-5xl bg-white flex flex-col md:flex-row shadow-2xl overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Image Side */}
            <div className="w-full md:w-2/5 relative h-[220px] md:h-auto shrink-0 bg-gray-900">
               <img src={getMediaUrl(viewDetails.image)} alt={viewDetails.name} className="w-full h-full object-cover opacity-60" />
               <div className={`absolute inset-0 bg-gradient-to-t ${viewDetails.color || 'from-primary to-primary'} opacity-70`} />
               <div className="absolute bottom-6 left-6 text-white text-left">
                  <div className="text-4xl mb-2 drop-shadow-xl">{viewDetails.icon}</div>
                  <h2 className="text-xl font-black uppercase leading-tight tracking-tight">{viewDetails.name}</h2>
               </div>
               <button onClick={() => setViewDetails(null)} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-lg rounded-full text-white md:hidden">
                 <X size={20} />
               </button>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
               <button onClick={() => setViewDetails(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-primary transition-colors hidden md:block">
                 <X size={24} />
               </button>

               <div className="space-y-6 text-left">
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                     <div className="w-2 h-2 bg-secondary rounded-full" />
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department Head</p>
                        <p className="font-bold text-primary text-sm">{viewDetails.head || 'To be assigned'} <span className="text-slate-400 font-medium">— {viewDetails.qualification}</span></p>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-secondary rounded-full" /> About Department
                     </h4>
                     <p className="text-slate-600 text-sm leading-relaxed font-medium">{viewDetails.about || 'No description provided.'}</p>
                  </div>

                  <div className="space-y-3">
                     <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-secondary rounded-full" /> Conditions Treated
                     </h4>
                     <div className="flex flex-wrap gap-2">
                        {viewDetails.conditions && Array.isArray(viewDetails.conditions) && viewDetails.conditions.length > 0 ? (
                           viewDetails.conditions.map((c, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                 {c}
                              </span>
                           ))
                        ) : (
                           <p className="text-xs text-gray-400 italic">No conditions registered.</p>
                        )}
                     </div>
                  </div>

                  <div className="space-y-3">
                     <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-secondary rounded-full" /> Services Offered
                     </h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {viewDetails.services && Array.isArray(viewDetails.services) && viewDetails.services.length > 0 ? (
                           viewDetails.services.map((s, i) => (
                              <div key={i} className="flex items-center gap-2">
                                 <CheckCircle2 size={13} className="text-secondary shrink-0" />
                                 <span className="text-sm text-slate-600 font-medium">{s}</span>
                              </div>
                           ))
                        ) : (
                           <p className="text-xs text-gray-400 italic">No services listed.</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Confirm Delete?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">Permanent removal of this department from all public listings.</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button onClick={confirmDelete} className="py-3.5 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95">Delete</button>
                   <button onClick={() => setDeleteConfirm({ show: false, id: null })} className="py-3.5 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95">Cancel</button>
                </div>
             </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />

    </div>
  );
};

export default ManageDepts;
