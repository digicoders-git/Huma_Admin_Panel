import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Eye, 
  Search, 
  X,
  Upload,
  Pencil,
  ChevronRight,
  Loader2
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ title: '', category: 'Infrastructure', isActive: true });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const categories = ['All', 'Infrastructure', 'Medical', 'Events', 'Team', 'Achievements'];

  // ── Fetch all gallery images ──
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/gallery/all`);
      const data = await res.json();
      if (data.success) {
        setGalleryData(data.data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ── Create / Update ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !editingItem) {
      alert("Please select an image to upload.");
      return;
    }

    setSubmitting(true);
    const url = editingItem 
      ? `${API}/gallery/${editingItem._id}` 
      : `${API}/gallery/create`;

    const body = new FormData();
    body.append('title', formData.title);
    body.append('category', formData.category);
    body.append('isActive', formData.isActive);
    if (image) body.append('image', image);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert("Please login first");
        setSubmitting(false);
        return;
      }
      const res = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body
      });
      const data = await res.json();
      if (data.success) {
        fetchGallery();
        closeFormModal();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error saving gallery item:", error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        alert("Cannot connect to server. Is backend running on port 5000?");
      } else {
        alert("Error saving: " + error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──
  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/gallery/delete/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchGallery();
        setDeleteConfirm({ show: false, id: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };


  // ── Edit ──
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Infrastructure',
      isActive: item.isActive !== false
    });
    setPreview(getMediaUrl(item.image));
    setImage(null);
    setIsFormModalOpen(true);
  };

  // ── Form Helpers ──
  const resetForm = () => {
    setFormData({ title: '', category: 'Infrastructure', isActive: true });
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
    const base = API.replace('/api', '');
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // ── Filtering ──
  const filteredData = galleryData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ═══════════════ FORM MODAL ═══════════════ */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-primary p-6 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold italic uppercase tracking-tight">{editingItem ? 'Update' : 'Upload'} Image</h3>
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest mt-0.5">Hospital Gallery Management</p>
                </div>
                <button onClick={closeFormModal} className="p-1.5 hover:bg-white/20 rounded-full transition-all">
                  <X size={20} />
                </button>
             </div>
             <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Upload Area */}
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all group cursor-pointer overflow-hidden">
                   {preview ? (
                     <img src={preview} className="w-full h-40 object-cover rounded-xl" alt="Preview" />
                   ) : (
                     <>
                       <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-primary-light group-hover:text-primary transition-all">
                          <Upload size={28} />
                       </div>
                       <div className="text-center">
                          <p className="text-sm font-bold text-gray-600">Click to upload image</p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">JPG, PNG up to 10MB</p>
                       </div>
                     </>
                   )}
                   <input 
                     type="file" 
                     accept="image/*" 
                     onChange={(e) => {
                       const file = e.target.files[0];
                       if (file) {
                         setImage(file);
                         setPreview(URL.createObjectURL(file));
                       }
                     }} 
                     className="absolute inset-0 opacity-0 cursor-pointer" 
                   />
                </div>

                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Image Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Modern OT Unit" 
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Status</label>
                        <select 
                          value={formData.isActive ? 'Active' : 'Hidden'}
                          onChange={(e) => setFormData({...formData, isActive: e.target.value === 'Active'})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           <option value="Active">Active (Public)</option>
                           <option value="Hidden">Hidden (Draft)</option>
                        </select>
                     </div>
                   </div>
                </div>

                <div className="flex gap-4 pt-2">
                   <button 
                     type="submit" 
                     disabled={submitting}
                     className="flex-1 py-3.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                   >
                     {submitting && <Loader2 size={14} className="animate-spin" />}
                     {editingItem ? 'Update Image' : 'Upload Now'}
                   </button>
                   <button type="button" onClick={closeFormModal} className="px-8 py-3.5 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs uppercase transition-all hover:bg-gray-200">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* ═══════════════ IMAGE PREVIEW OVERLAY ═══════════════ */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[120] bg-black/90 p-4 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setPreviewImage(null)}
        >
           <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10">
              <X size={36} />
           </button>
           <img 
             src={getMediaUrl(previewImage.image)} 
             className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300" 
             alt={previewImage.title || 'Preview'} 
           />
           <div className="absolute bottom-10 text-center text-white">
              <h3 className="text-xl font-bold">{previewImage.title}</h3>
              <p className="text-primary font-bold uppercase tracking-widest text-[10px] mt-1.5">{previewImage.category}</p>
           </div>
        </div>
      )}

      {/* ═══════════════ HEADER ═══════════════ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospital Gallery</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage Images & Media</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsFormModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={16} />
          Upload Image
        </button>
      </div>

      {/* ═══════════════ MAIN CARD CONTAINER (Doctor Style) ═══════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        
        {/* Search + Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
          <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ GALLERY GRID ═══════════════ */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={32} className="animate-spin text-primary" />
            <p className="text-sm text-gray-400 font-bold">Loading gallery...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <ImageIcon size={48} className="text-gray-200" />
            <p className="text-sm text-gray-400 font-bold italic">No images found.</p>
            <button 
              onClick={() => { resetForm(); setIsFormModalOpen(true); }}
              className="mt-2 text-xs font-bold text-primary hover:underline"
            >
              Upload your first image →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredData.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden group">
                 {/* Image Area */}
                 <div className="relative h-44 bg-gray-50 border-b border-gray-100 overflow-hidden">
                    <img 
                      src={getMediaUrl(item.image)} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={item.title}
                      onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3342/3342137.png'; e.target.className = "w-full h-full object-contain p-10 opacity-20"; }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <button 
                         onClick={() => setPreviewImage(item)}
                         className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                       >
                         <Eye size={18} />
                       </button>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                       <span className="text-[9px] font-black text-primary uppercase tracking-widest">{item.category}</span>
                    </div>
                 </div>

                 {/* Info */}
                 <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-bold text-gray-900 text-[14px] line-clamp-1 mb-1">{item.title || 'Untitled'}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    
                    {/* Status Badge */}
                    <div className="flex justify-start mb-3">
                       <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                         item.isActive !== false 
                           ? 'bg-primary-light text-primary border border-primary/10' 
                           : 'bg-red-50 text-red-500 border border-red-100'
                       }`}>
                         {item.isActive !== false ? 'Active' : 'Hidden'}
                       </span>
                    </div>

                    {/* Actions - exactly like Specialities */}
                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                       <div className="flex gap-1.5">
                          <button onClick={() => handleEdit(item)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100">
                            <Trash2 size={13} />
                          </button>
                       </div>
                       <button onClick={() => setPreviewImage(item)} className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer">
                         Preview <ChevronRight size={14} />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Remove Media?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">This image will be permanently deleted from the gallery storage.</p>
                
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

export default Gallery;

