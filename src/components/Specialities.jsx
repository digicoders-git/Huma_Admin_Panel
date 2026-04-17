import React, { useState, useEffect } from 'react';
import { 
  RotateCw, Database, X, ChevronRight, Upload, Loader2
} from 'lucide-react';

const Specialities = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  const [editingSpec, setEditingSpec] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    whatIs: '',
    whenRecommended: '',
    costRange: 'Contact for Price',
    status: 'Active' 
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/speciality`);
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
    setSubmitting(true);
    const url = editingSpec 
      ? `${import.meta.env.VITE_API_BASE_URL}/speciality/${editingSpec._id}` 
      : `${import.meta.env.VITE_API_BASE_URL}/speciality`;
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description || '');
    data.append('whatIs', formData.whatIs || '');
    data.append('whenRecommended', formData.whenRecommended || '');
    data.append('costRange', formData.costRange || '');
    data.append('isActive', formData.status === 'Active');
    
    if (image) {
       data.append('image', image);
    }

    try {
      const res = await fetch(url, {
        method: editingSpec ? 'PUT' : 'POST',
        body: data
      });
      const responseData = await res.json();
      if (responseData.success) {
        fetchSpecialties();
        setIsFormModalOpen(false);
        setEditingSpec(null);
        resetForm();
      } else {
        alert("Failed to save: " + responseData.message);
      }
    } catch (error) {
      console.error("Error saving speciality:", error);
      alert("Error saving. Please check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', description: '', whatIs: '', 
      whenRecommended: '', costRange: 'Contact for Price', status: 'Active' 
    });
    setImage(null);
    setPreview(null);
  };

  const handleEdit = (spec) => {
    setEditingSpec(spec);
    setFormData({ 
      name: spec.name, 
      description: spec.description || '', 
      whatIs: spec.whatIs || '',
      whenRecommended: Array.isArray(spec.whenRecommended) ? spec.whenRecommended.join(', ') : (spec.whenRecommended || ''),
      costRange: spec.costRange || 'Contact for Price',
      status: spec.isActive ? 'Active' : 'Inactive' 
    });
    const apiBase = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
    setPreview(spec.image ? `${apiBase}${spec.image}` : null);
    setIsFormModalOpen(true);
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/speciality/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchSpecialties();
        setDeleteConfirm({ show: false, id: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };


  const filteredSpecs = specialties.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h2 className="text-2xl font-bold text-gray-900">Manage Specialities</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Medical Infrastructure Category</p>
        </div>
        <button 
          onClick={() => { setEditingSpec(null); resetForm(); setIsFormModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={16} /> Add Speciality
        </button>
      </div>

      {/* Global Card Container (Doctor Style) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search specialities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-20 text-gray-400 font-bold">Loading records...</p>
        ) : filteredSpecs.length === 0 ? (
          <p className="text-center py-20 text-gray-400 font-bold italic">No specialities found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredSpecs.map((spec) => (
              <div key={spec._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden">
                <div className="bg-gray-50 flex justify-center py-4 border-b border-gray-100 h-32 relative">
                   <div className="w-20 h-20 rounded-2xl border-2 border-white shadow-sm overflow-hidden bg-white">
                      <img 
                         src={getMediaUrl(spec.image)} 
                         className="w-full h-full object-cover" 
                         alt={spec.name}
                         onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'; e.target.className = "w-full h-full object-contain p-4 opacity-20"; }}
                      />
                   </div>
                </div>
                <div className="p-4 text-center flex-1 flex flex-col">
                   <h4 className="font-bold text-gray-900 text-[15px] line-clamp-1 mb-1">{spec.name}</h4>
                   <p className="text-[10px] text-primary font-bold uppercase tracking-tighter mb-4">{spec.costRange}</p>
                   <div className="flex justify-center mb-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${spec.isActive ? 'bg-primary-light text-primary border border-primary/10' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                         {spec.isActive ? 'Active' : 'Hidden'}
                      </span>
                   </div>
                   <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex gap-1.5">
                         <button onClick={() => handleEdit(spec)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"><Pencil size={13} /></button>
                         <button onClick={() => handleDelete(spec._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"><Trash2 size={13} /></button>
                      </div>
                      <button onClick={() => setViewDetails(spec)} className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer">
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
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-primary p-6 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold italic uppercase tracking-tight">{editingSpec ? 'Update' : 'Define'} Speciality</h3>
                <button onClick={() => setIsFormModalOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-all"><X size={20} /></button>
             </div>
             <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Speciality Title</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all" placeholder="e.g. Cardiology" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cost / Price Overview</label>
                      <input type="text" value={formData.costRange} onChange={e => setFormData({...formData, costRange: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all" placeholder="Contact for Price" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Brief Description</label>
                      <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium outline-none h-24" placeholder="Short intro..."></textarea>
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Detailed Overview (What is it?)</label>
                      <textarea value={formData.whatIs} onChange={e => setFormData({...formData, whatIs: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium outline-none h-20" placeholder="Medical background..."></textarea>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Symptoms Tags (comma separated)</label>
                      <input type="text" value={formData.whenRecommended} onChange={e => setFormData({...formData, whenRecommended: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" placeholder="Stroke, Numbness..." />
                   </div>
                </div>

                <div className="col-span-full pt-4 flex gap-4">
                   <button type="submit" disabled={submitting} className="flex-1 py-3.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      {submitting && <Loader2 size={14} className="animate-spin" />}
                      {submitting ? 'Saving...' : 'Save Speciality'}
                   </button>
                   <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-8 py-3.5 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs uppercase transition-all">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Website-Style "Full Detail" Modal */}
      {viewDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setViewDetails(null)} />
          <div className="relative w-full max-w-5xl bg-white flex flex-col md:flex-row shadow-2xl overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Left Image Pane */}
            <div className="w-full md:w-1/2 relative bg-gray-900 flex items-center justify-center min-h-[300px]">
              <img 
                src={getMediaUrl(viewDetails.image)} 
                alt={viewDetails.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'; e.target.className = "w-full h-full object-contain p-20 opacity-30"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button 
                onClick={() => setViewDetails(null)} 
                className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white md:hidden cursor-pointer backdrop-blur-md transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Right Content Pane */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <button 
                onClick={() => setViewDetails(null)} 
                className="absolute top-8 right-8 p-1 text-gray-400 hover:text-primary transition-colors hidden md:block cursor-pointer"
              >
                <X size={28} />
              </button>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em] text-[#d6b07c]">SPECIALITY DETAIL</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-primary uppercase italic tracking-tighter leading-none text-[#992120]">
                    {viewDetails.name}
                  </h2>
                </div>

                <div className="space-y-6 text-left">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#992120] uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d6b07c] rounded-full" /> About Treatment
                    </h4>
                    <p className="text-gray-600 leading-relaxed font-medium">{viewDetails.description || 'No description provided.'}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#992120] uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d6b07c] rounded-full" /> Detailed Overview
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{viewDetails.whatIs || 'Details are actively being compiled.'}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#992120] uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#d6b07c] rounded-full" /> Recommended When
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {viewDetails.whenRecommended && Array.isArray(viewDetails.whenRecommended) && viewDetails.whenRecommended.length > 0 ? (
                        viewDetails.whenRecommended.map((tag, i) => (
                           // Ensure empty strings aren't rendered as empty chips if they occur.
                           tag ? <span key={i} className="px-4 py-1.5 bg-gray-50 border border-gray-100 shadow-sm rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">{tag}</span> : null
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 italic">No symptoms registered.</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Cost</p>
                      <p className="text-2xl font-black text-[#992120] italic">{viewDetails.costRange || 'Contact for Price'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Remove Speciality?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">Are you sure you want to delete this medical speciality? This cannot be undone.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={confirmDelete}
                    className="py-3.5 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                   >
                      Delete
                   </button>
                   <button 
                    onClick={() => setDeleteConfirm({ show: false, id: null })}
                    className="py-3.5 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95"
                   >
                      Cancel
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Specialities;

