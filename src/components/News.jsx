import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  X,
  Calendar,
  Loader2,
  Upload,
  Pencil,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ 
    title: '', 
    category: 'Latest', 
    content: '',
    excerpt: '',
    isPublished: true 
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categories = ['All', 'Latest', 'Event', 'Notice'];

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/blog/all`);
      const data = await res.json();
      if (data.success) {
        setNewsList(data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editingItem 
      ? `${API}/blog/update/${editingItem._id}` 
      : `${API}/blog/create`;

    const body = new FormData();
    body.append('title', formData.title);
    body.append('category', formData.category);
    body.append('content', formData.content);
    body.append('excerpt', formData.excerpt);
    body.append('isPublished', formData.isPublished);
    if (image) body.append('coverImage', image);

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
        fetchNews();
        closeFormModal();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Error saving: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/blog/delete/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchNews();
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
      title: item.title || '',
      category: item.category || 'Latest',
      content: item.content || '',
      excerpt: item.excerpt || '',
      isPublished: item.isPublished !== false
    });
    setPreview(getMediaUrl(item.coverImage));
    setImage(null);
    setIsFormModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'Latest', content: '', excerpt: '', isPublished: true });
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

  const filteredNews = newsList.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News & Announcements</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage Website Articles</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsFormModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={16} />
          Post News
        </button>
      </div>

      {/* ── MAIN CARD CONTAINER ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden">
        
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveFilter(cat)}
                 className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${activeFilter === cat ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:bg-gray-50 border border-gray-100'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* ── NEWS GRID ──────────────────────────────────────────────────── */}
        {loading ? (
          <p className="text-center py-20 text-gray-400 font-bold">Loading records...</p>
        ) : filteredNews.length === 0 ? (
          <p className="text-center py-20 text-gray-400 font-bold italic">No news articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredNews.map((news) => (
              <div key={news._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden">
                {/* News Image Area */}
                <div className="relative h-44 bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <img 
                    src={getMediaUrl(news.coverImage)} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    alt={news.title}
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/2965/2965872.png'; e.target.className = "w-full h-full object-contain p-10 opacity-20"; }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{news.category}</span>
                  </div>
                </div>

                {/* News Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 text-[14px] line-clamp-2 mb-2 min-h-[40px] leading-tight">{news.title}</h4>
                  
                  <div className="flex items-center gap-2 mb-4">
                     <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold ${news.isPublished ? 'bg-primary-light text-primary border border-primary/10' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                       {news.isPublished ? 'Published' : 'Draft'}
                     </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex gap-1.5">
                       <button onClick={() => handleEdit(news)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"><Pencil size={13} /></button>
                       <button onClick={() => handleDelete(news._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"><Trash2 size={13} /></button>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                      <Calendar size={12} /> {new Date(news.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FORM MODAL ───────────────────────────────────────────────────── */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
             <div className="bg-primary p-5 text-white flex justify-between items-center shrink-0">
                <h3 className="text-lg font-bold">{editingItem ? 'Update' : 'Post'} News Article</h3>
                <button onClick={closeFormModal} className="p-1 hover:bg-white/20 rounded-full transition-all">
                  <X size={20} />
                </button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                <div className="flex justify-center mb-2">
                  <div className="relative group w-full h-48 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                    {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Upload size={32} className="text-gray-300" />}
                    <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }}} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Title</label>
                      <input 
                        type="text" required value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Status</label>
                        <select 
                          value={formData.isPublished ? 'true' : 'false'}
                          onChange={(e) => setFormData({...formData, isPublished: e.target.value === 'true'})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           <option value="true">Published</option>
                           <option value="false">Draft</option>
                        </select>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Excerpt (Short Summary)</label>
                      <textarea 
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none resize-none h-20" 
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Content</label>
                      <textarea 
                        required value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none resize-none h-40" 
                      />
                   </div>
                </div>

                <div className="flex gap-4 pt-2 shrink-0">
                   <button type="submit" disabled={submitting} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                     {submitting && <Loader2 size={16} className="animate-spin" />}
                     {submitting ? 'Saving...' : 'Save Article'}
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
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Remove Article?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">Are you sure you want to delete this news article permanently?</p>
                
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

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #fdfdfd; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      ` }} />

    </div>
  );
};

export default News;
