import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Loader2,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Send
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const Announcements = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({ 
    message: '', 
    type: 'News', 
    link: '',
    isActive: true 
  });

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/announcement/all`);
      const data = await res.json();
      if (data.success) {
        setList(data.data);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const url = editingItem 
      ? `${API}/announcement/update/${editingItem._id}` 
      : `${API}/announcement/create`;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        fetchAnnouncements();
        closeModal();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
      alert("Error saving: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticker message?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/announcement/delete/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchAnnouncements();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      message: item.message || '',
      type: item.type || 'News',
      link: item.link || '',
      isActive: item.isActive !== false
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ message: '', type: 'News', link: '', isActive: true });
  };

  return (
    <div className="px-4 md:px-8 pb-12 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 italic uppercase italic tracking-tight">Ticker Announcements</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Manage scrolling news bar on the main website</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus size={16} />
          Add Ticker Message
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 grayscale opacity-30">
             <Loader2 size={40} className="animate-spin text-primary" />
             <p className="text-xs font-bold uppercase tracking-widest">Loading Records...</p>
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold italic">No notices found. Add your first announcement.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((item) => (
              <div key={item._id} className="bg-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 relative group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-start">
                  <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.type === 'Alert' ? 'bg-red-100 text-red-500' : 
                    item.type === 'Offer' ? 'bg-orange-100 text-orange-500' : 
                    'bg-primary-light text-primary'
                  }`}>
                    {item.type}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-white text-gray-400 hover:text-primary rounded-xl border border-gray-100 transition-all"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 bg-white text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
                
                <p className="text-sm font-bold text-gray-800 leading-relaxed line-clamp-3">
                  {item.message}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-200/50 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 grayscale opacity-40">
                      <Bell size={12} strokeWidth={3} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Live Preview Enabled</span>
                   </div>
                   <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${item.isActive ? 'bg-green-50 text-green-500' : 'bg-gray-200 text-gray-500'}`}>
                      {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-primary p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Send size={20} />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold tracking-tight uppercase italic pb-0.5">{editingItem ? 'Update' : 'New'} Announcement</h3>
                      <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest leading-none">Website Ticker Management</p>
                   </div>
                </div>
                <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-all">
                   <X size={20} />
                </button>
             </div>
             
             <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Scrolling Message *</label>
                   <textarea 
                     required value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none resize-none h-24" 
                     placeholder="Type your announcement here..."
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Badge Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none"
                    >
                       <option value="News">News</option>
                       <option value="Offer">Offer</option>
                       <option value="Event">Event</option>
                       <option value="Alert">Alert</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                    <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                       <button type="button" onClick={() => setFormData({...formData, isActive: true})} className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${formData.isActive ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}>ACTIVE</button>
                       <button type="button" onClick={() => setFormData({...formData, isActive: false})} className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${!formData.isActive ? 'bg-gray-200 text-gray-700' : 'text-gray-400'}`}>OFF</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button type="submit" disabled={submitting} className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                     {submitting && <Loader2 size={16} className="animate-spin" />}
                     {submitting ? 'Broadcasting...' : (editingItem ? 'Update Live' : 'Post to Ticker')}
                   </button>
                   <button type="button" onClick={closeModal} className="px-6 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">Cancel</button>
                </div>
             </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Announcements;
