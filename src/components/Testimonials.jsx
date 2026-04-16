import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Search, 
  X,
  Calendar,
  Loader2,
  ChevronRight,
  Upload,
  Pencil,
  Star,
  Quote
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ 
    name: '', 
    role: 'Patient', 
    rating: 5, 
    message: '',
    isActive: true 
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/testimonial/all`);
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editingItem 
      ? `${API}/testimonial/${editingItem._id}` 
      : `${API}/testimonial/create`;

    const body = new FormData();
    body.append('name', formData.name);
    body.append('role', formData.role);
    body.append('rating', formData.rating);
    body.append('message', formData.message);
    body.append('isActive', formData.isActive);
    if (image) body.append('image', image);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body
      });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
        closeFormModal();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Error saving: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/testimonial/delete/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
        setDeleteConfirm({ show: false, id: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };


  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      role: item.role || 'Patient',
      rating: item.rating || 5,
      message: item.message || '',
      isActive: item.isActive !== false
    });
    setPreview(getMediaUrl(item.image));
    setImage(null);
    setIsFormModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', role: 'Patient', rating: 5, message: '', isActive: true });
    setImage(null);
    setPreview(null);
    setEditingItem(null);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    resetForm();
  };

  const getMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API.replace('/api', '')}/${url}`;
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ── HEADER (Doctor Style) ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Testimonials</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage Public Reviews</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsFormModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      {/* ── MAIN CARD CONTAINER (Doctor Style) ───────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* ── TESTIMONIAL GRID (Doctor Card Style) ───────────────────────── */}
        {loading ? (
          <p className="text-center py-20 text-gray-400 font-bold">Loading records...</p>
        ) : filteredTestimonials.length === 0 ? (
          <p className="text-center py-20 text-gray-400 font-bold italic">No testimonials found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTestimonials.map((t) => (
              <div key={t._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden">
                {/* Header Area (Like Doctor avatar area) */}
                <div className="bg-gray-50 flex justify-center py-6 border-b border-gray-100 relative">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
                    <img 
                      src={getMediaUrl(t.image) || `https://ui-avatars.com/api/?name=${t.name}&background=random`} 
                      className="w-full h-full object-cover" 
                      alt={t.name}
                      onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'; e.target.className = "w-full h-full object-contain p-4 opacity-20"; }}
                    />
                  </div>
                  <div className="absolute top-2 right-2 text-primary-light/50">
                    <Quote size={24} fill="currentColor" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 text-center flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 text-[15px]">{t.name}</h4>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2">{t.role}</p>
                  
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < t.rating ? 'text-amber-400' : 'text-gray-200'} fill={i < t.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>

                  {/* Message Snippet */}
                  <div className="text-[11px] text-gray-500 font-medium italic mb-4 line-clamp-3 px-2">
                    "{t.message}"
                  </div>
                  
                  {/* Actions (Exact same as Doctors page) */}
                  <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex gap-1.5">
                       <button onClick={() => handleEdit(t)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"><Pencil size={13} /></button>
                       <button onClick={() => handleDelete(t._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"><Trash2 size={13} /></button>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                      <Calendar size={12} /> {new Date(t.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FORM MODAL (Simple Style) ───────────────────────────────────── */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-primary p-5 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold">{editingItem ? 'Update' : 'Add'} Testimonial</h3>
                <button onClick={closeFormModal} className="p-1 hover:bg-white/20 rounded-full transition-all">
                  <X size={20} />
                </button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="flex justify-center mb-2">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                      {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Upload size={24} className="text-gray-300" />}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }}} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Patient Name</label>
                      <input 
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Role</label>
                        <select 
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           <option value="Patient">Patient</option>
                           <option value="Parent of Patient">Parent</option>
                           <option value="Guardian">Guardian</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Rating</label>
                        <select 
                          value={formData.rating}
                          onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                        </select>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Message</label>
                      <textarea 
                        required value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none resize-none h-24" 
                      />
                   </div>
                </div>

                <div className="flex gap-4 pt-2">
                   <button type="submit" disabled={submitting} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50">
                     {submitting ? 'Saving...' : 'Save Testimonial'}
                   </button>
                   <button type="button" onClick={closeFormModal} className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-200">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Delete Testimonial?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">This action cannot be undone. All data will be permanently removed.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={confirmDelete}
                    className="py-3.5 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                   >
                      Confirm
                   </button>
                   <button 
                    onClick={() => setDeleteConfirm({ show: false, id: null })}
                    className="py-3.5 bg-gray-50 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95"
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

export default Testimonials;

