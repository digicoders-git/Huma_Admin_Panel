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
  ArrowRight,
  BookOpen,
  User
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const Blogs = () => {
  const [blogsList, setBlogsList] = useState([]);
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
    category: 'Stroke', 
    introduction: '',
    content: '',
    excerpt: '',
    author: '',
    isPublished: true 
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categories = [
    'All', 
    'Stroke', 
    'Epilepsy', 
    'Movement Disorders', 
    'Headache', 
    'Memory Disorders', 
    'Multiple Sclerosis', 
    'Rehabilitation', 
    'Neuropathy', 
    'Brain Health'
  ];

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/blog/all`);
      const data = await res.json();
      if (data.success) {
        setBlogsList(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
    body.append('introduction', formData.introduction);
    body.append('content', formData.content);
    body.append('excerpt', formData.excerpt);
    body.append('author', formData.author);
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
        fetchBlogs();
        closeFormModal();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
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
        fetchBlogs();
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
      category: item.category || 'Stroke',
      introduction: item.introduction || '',
      content: item.content || '',
      excerpt: item.excerpt || '',
      author: item.author || '',
      isPublished: item.isPublished !== false
    });
    setPreview(getMediaUrl(item.coverImage));
    setImage(null);
    setIsFormModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      category: 'Stroke', 
      introduction: '',
      content: '', 
      excerpt: '', 
      author: '',
      isPublished: true 
    });
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

  const filteredBlogs = blogsList.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage Website Articles & Knowledge Hub</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsFormModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={16} />
          Create New Blog
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
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto scrollbar-hide">
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

        {/* ── BLOGS GRID ─────────────────────────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary mb-2" size={32} />
            <p className="text-gray-400 font-bold">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <BookOpen size={48} className="mb-4 opacity-20" />
            <p className="font-bold italic">No blog articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden group">
                {/* Image Area */}
                <div className="relative h-44 bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <img 
                    src={getMediaUrl(blog.coverImage)} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={blog.title}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{blog.category}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 text-[14px] line-clamp-2 mb-2 min-h-[40px] leading-tight group-hover:text-primary transition-colors">{blog.title}</h4>
                  
                  <div className="flex items-center justify-between mb-4">
                     <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold ${blog.isPublished ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-500 border border-red-100'}`}>
                       {blog.isPublished ? 'Published' : 'Draft'}
                     </span>
                     <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                       <User size={10} /> {blog.author}
                     </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex gap-1.5">
                       <button onClick={() => handleEdit(blog)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"><Pencil size={13} /></button>
                       <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"><Trash2 size={13} /></button>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                      <Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
             <div className="bg-primary p-5 text-white flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-lg font-bold">{editingItem ? 'Edit' : 'Create'} Blog Article</h3>
                  <p className="text-[10px] text-white/60 font-medium uppercase tracking-[0.2em]">Required fields are marked with *</p>
                </div>
                <button onClick={closeFormModal} className="p-1 hover:bg-white/20 rounded-full transition-all">
                  <X size={20} />
                </button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Side Column: Image & Settings */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Cover Image *</label>
                      <div className="relative group w-full h-48 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:border-primary/50">
                        {preview ? <img src={preview} className="w-full h-full object-cover" /> : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload size={32} className="text-gray-300" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Upload Thumbnail</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }}} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Category *</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Author Name</label>
                        <input 
                          type="text" value={formData.author}
                          onChange={(e) => setFormData({...formData, author: e.target.value})}
                          placeholder="Reporter / Doctor Name"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Status</label>
                        <select 
                          value={formData.isPublished ? 'true' : 'false'}
                          onChange={(e) => setFormData({...formData, isPublished: e.target.value === 'true'})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                        >
                           <option value="true">Published (Live)</option>
                           <option value="false">Draft (Hidden)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Main Column: Content */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Blog Title *</label>
                        <input 
                          type="text" required value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Enter a descriptive title..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Excerpt (Short Summary for card) *</label>
                        <textarea 
                          required value={formData.excerpt}
                          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                          placeholder="Briefly describe what this article is about..."
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none resize-none h-20" 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Introduction (First Section Text) *</label>
                        <textarea 
                          required value={formData.introduction}
                          onChange={(e) => setFormData({...formData, introduction: e.target.value})}
                          placeholder="Hook your readers with a strong introduction..."
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none resize-none h-28" 
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between ml-1 mb-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article Body (Supports HTML) *</label>
                          <span className="text-[9px] text-gray-400 font-medium">Use &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; for styling</span>
                        </div>
                        <textarea 
                          required value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          placeholder="Write your main article content here. You can use HTML tags for better formatting."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none resize-none h-60 font-mono" 
                        />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-50 shrink-0">
                   <button type="submit" disabled={submitting} className="flex-1 py-4 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                     {submitting ? <Loader2 className="animate-spin" size={18} /> : null}
                     {submitting ? 'Saving Changes...' : (editingItem ? 'Update Blog Article' : 'Publish Blog Article')}
                   </button>
                   <button type="button" onClick={closeFormModal} className="px-8 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Delete Article?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance leading-relaxed">This action cannot be undone. The article will be permanently removed from the website.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={confirmDelete}
                    className="py-3.5 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                   >
                      Delete
                   </button>
                   <button 
                    onClick={() => setDeleteConfirm({ show: false, id: null })}
                    className="py-3.5 bg-gray-50 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95"
                   >
                      Keep It
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />

    </div>
  );
};

export default Blogs;
