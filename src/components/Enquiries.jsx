import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, ChevronRight, RefreshCw, Square, CheckSquare, X, Loader2
} from 'lucide-react';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, mode: 'single', id: null });

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/enquiry/all`);
      if (searchQuery) url.searchParams.append('search', searchQuery);
      if (filterStatus !== 'All') url.searchParams.append('status', filterStatus);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [searchQuery, filterStatus]);

  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enquiry/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if ((await res.json()).success) {
         if (selectedEnquiry && selectedEnquiry._id === id) {
             setSelectedEnquiry(prev => ({...prev, status: newStatus}));
         }
         fetchEnquiries();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    const { mode, id } = deleteConfirm;
    
    if (mode === 'single') {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enquiry/delete/${id}`, { method: 'DELETE' });
        if ((await res.json()).success) {
            setSelectedEnquiry(null);
            fetchEnquiries();
            setDeleteConfirm({ show: false, mode: 'single', id: null });
        }
      } catch (error) { console.error(error); }
    } else {
      // Bulk Delete
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enquiry/bulk-delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds })
        });
        if ((await res.json()).success) {
          setSelectedIds([]);
          fetchEnquiries();
          setDeleteConfirm({ show: false, mode: 'single', id: null });
        }
      } catch (error) { console.error(error); }
    }
  };

  const deleteEnquiry = (id) => {
    setDeleteConfirm({ show: true, mode: 'single', id });
  };

  const bulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteConfirm({ show: true, mode: 'bulk', id: null });
  };


  const bulkUpdateStatus = async (newStatus) => {
    if (selectedIds.length === 0) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/enquiry/bulk-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, status: newStatus })
      });
      if ((await res.json()).success) {
        setSelectedIds([]);
        fetchEnquiries();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSelection = (id) => {
     setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  const toggleAll = () => {
     if (selectedIds.length === enquiries.length) {
         setSelectedIds([]);
     } else {
         setSelectedIds(enquiries.map(e => e._id));
     }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-primary-light text-primary border border-primary/10';
      case 'contacted': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
      default: return 'bg-gray-50 text-gray-500 border border-gray-100';
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
       month: d.toLocaleString('default', { month: 'short' }),
       day: d.getDate(),
       full: d.toLocaleDateString()
    };
  };

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Enquiries</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Patient Leads & Comms</p>
        </div>
        <button onClick={fetchEnquiries} className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-gray-500 hover:text-primary hover:border-primary/20 hover:bg-primary-light/50 px-4 py-2.5 rounded-xl font-bold text-xs transition-all">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Data
        </button>
      </div>

      {/* Global Card Container (Doctor Style) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Search names, phone, email..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
               />
             </div>
             <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 outline-none cursor-pointer hidden sm:block"
             >
                <option value="All">All Leads</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
             </select>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             {enquiries.length > 0 && (
                <button onClick={toggleAll} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                   {selectedIds.length === enquiries.length ? <CheckSquare size={16} className="text-primary"/> : <Square size={16} />}
                   <span>Select All</span>
                </button>
             )}
             {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-300">
                  <button onClick={() => bulkUpdateStatus('resolved')} className="px-3 py-2 bg-primary-light text-primary border border-primary/20 text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all whitespace-nowrap">
                     Mark Resolved
                  </button>
                  <button onClick={bulkDelete} className="p-2 bg-red-50 text-red-500 border border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                     <Trash2 size={16} />
                  </button>
                </div>
             )}
          </div>
        </div>

        {/* List View */}
        {loading ? (
          <p className="text-center py-20 text-gray-400 font-bold">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
             <MessageSquare size={32} className="text-gray-300 mb-3" />
             <p className="text-gray-400 font-bold italic">No patient leads currently available.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {enquiries.map((item) => {
              const dateInfo = formatDate(item.createdAt);
              const isSelected = selectedIds.includes(item._id);

              return (
                <div 
                  key={item._id} 
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all group hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-primary-light/30' : ''}`}
                >
                  <div className="flex items-center gap-4">
                     <button onClick={(e) => { e.stopPropagation(); toggleSelection(item._id); }} className="text-gray-300 hover:text-primary shrink-0">
                        {isSelected ? <CheckSquare size={18} className="text-primary" /> : <Square size={18} />}
                     </button>

                     <div onClick={() => setSelectedEnquiry(item)} className="w-12 h-12 shrink-0 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                        <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-0.5">{dateInfo.month}</span>
                        <span className="text-base font-black text-gray-700 leading-none">{dateInfo.day}</span>
                     </div>
                  </div>

                  <div onClick={() => setSelectedEnquiry(item)} className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                     {/* User Details */}
                     <div className="sm:col-span-4">
                        <h4 className="text-[14px] font-bold text-gray-900 mb-0.5 line-clamp-1">{item.name}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-gray-500">
                           <span className="flex items-center gap-1 leading-none"><Phone size={10} className="text-primary" /> {item.phone || 'No Phone'}</span>
                        </div>
                     </div>

                     {/* Subject / Message */}
                     <div className="sm:col-span-5">
                        <p className="text-xs font-bold text-gray-700 line-clamp-1 mb-0.5">{item.treatment || 'General / Not Specified'}</p>
                        <p className="text-[11px] font-medium text-gray-400 line-clamp-1">{item.message || 'No additional message.'}</p>
                     </div>

                     {/* Status & Options */}
                     <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors hidden sm:block" />
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Simplified Detail Modal (Doctor Modal Style) */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="bg-primary p-6 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold italic uppercase tracking-tight">Lead Detail: {selectedEnquiry.name}</h3>
                <button onClick={() => setSelectedEnquiry(null)} className="p-1 hover:bg-white/20 rounded-full transition-all"><X size={20} /></button>
             </div>
             
             <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   {/* Left Col */}
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contact Info</p>
                         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm font-semibold space-y-2">
                             <div className="flex items-center gap-2"><Phone size={14} className="text-primary"/> {selectedEnquiry.phone || 'N/A'}</div>
                             <div className="flex items-center gap-2"><Mail size={14} className="text-primary"/> {selectedEnquiry.email}</div>
                         </div>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                         <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold text-gray-700">
                             {selectedEnquiry.country || 'Unknown'}
                         </div>
                      </div>
                   </div>

                   {/* Right Col */}
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Interested In</p>
                         <div className="bg-primary-light/40 border border-primary/20 px-4 py-2.5 rounded-xl text-primary text-sm font-bold">
                             {selectedEnquiry.treatment || 'General Query'}
                         </div>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Received On</p>
                         <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold text-gray-700">
                             {formatDate(selectedEnquiry.createdAt).full}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mb-8">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Message Describe</p>
                   <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 font-medium leading-relaxed min-h-[100px]">
                      {selectedEnquiry.message || <span className="italic opacity-50">No message body.</span>}
                   </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                   <div className="flex items-center gap-2 w-full md:w-auto">
                      <button 
                        disabled={updatingId === selectedEnquiry._id}
                        onClick={() => updateStatus(selectedEnquiry._id, 'pending')} 
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${selectedEnquiry.status === 'pending' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {updatingId === selectedEnquiry._id && <Loader2 size={12} className="animate-spin" />}
                        Pending
                      </button>
                      <button 
                        disabled={updatingId === selectedEnquiry._id}
                        onClick={() => updateStatus(selectedEnquiry._id, 'contacted')} 
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${selectedEnquiry.status === 'contacted' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {updatingId === selectedEnquiry._id && <Loader2 size={12} className="animate-spin" />}
                        Contacted
                      </button>
                      <button 
                        disabled={updatingId === selectedEnquiry._id}
                        onClick={() => updateStatus(selectedEnquiry._id, 'resolved')} 
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${selectedEnquiry.status === 'resolved' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {updatingId === selectedEnquiry._id && <Loader2 size={12} className="animate-spin" />}
                        Resolved
                      </button>
                   </div>
                   <button onClick={() => deleteEnquiry(selectedEnquiry._id)} className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-all">
                      <Trash2 size={16} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, mode: 'single', id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">
                  {deleteConfirm.mode === 'bulk' ? 'Delete Leads?' : 'Remove Lead?'}
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">
                  {deleteConfirm.mode === 'bulk' 
                    ? `Are you sure you want to delete ${selectedIds.length} selected patient enquiries permanently?`
                    : 'Are you sure you want to delete this patient enquiry? This cannot be undone.'}
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={confirmDelete}
                    className="py-3.5 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                   >
                      Confirm
                   </button>
                   <button 
                    onClick={() => setDeleteConfirm({ show: false, mode: 'single', id: null })}
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

export default Enquiries;

