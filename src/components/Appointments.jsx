import React, { useState, useEffect } from 'react';
import { 
  FileText, ShieldCheck, Clock, XSquare, 
  ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw,
  Search, CheckCircle2, SlidersHorizontal, Trash2, Eye, User, Phone, MapPin, Calendar, Info
} from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection & Search States
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Detail Modal State
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    id: null, 
    ids: [], 
    newStatus: null, 
    isLoading: false,
    type: 'status' // 'status', 'delete', 'bulk-status', 'bulk-delete'
  });

  const openStatusModal = (id, newStatus) => {
    setConfirmModal({ isOpen: true, id, ids: [], newStatus, isLoading: false, type: 'status' });
  };

  const openDeleteModal = (id) => {
    setConfirmModal({ isOpen: true, id, ids: [], newStatus: null, isLoading: false, type: 'delete' });
  };

  const openBulkStatusModal = (newStatus) => {
    if (selectedIds.length === 0) return;
    setConfirmModal({ isOpen: true, id: null, ids: selectedIds, newStatus, isLoading: false, type: 'bulk-status' });
  };

  const openBulkDeleteModal = () => {
    if (selectedIds.length === 0) return;
    setConfirmModal({ isOpen: true, id: null, ids: selectedIds, newStatus: null, isLoading: false, type: 'bulk-delete' });
  };

  const handleConfirmAction = async () => {
    const { id, ids, newStatus, type } = confirmModal;
    setConfirmModal(prev => ({ ...prev, isLoading: true }));
    
    try {
      if (type === 'status') {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        if ((await res.json()).success) {
          setAppointments(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
        }
      } else if (type === 'delete') {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment/${id}`, { method: 'DELETE' });
        if ((await res.json()).success) {
          setAppointments(prev => prev.filter(app => app._id !== id));
        }
      } else if (type === 'bulk-status') {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment/bulk-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids, status: newStatus })
        });
        if ((await res.json()).success) {
          setAppointments(prev => prev.map(app => ids.includes(app._id) ? { ...app, status: newStatus } : app));
          setSelectedIds([]);
        }
      } else if (type === 'bulk-delete') {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment/bulk-delete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids })
        });
        if ((await res.json()).success) {
          setAppointments(prev => prev.filter(app => !ids.includes(app._id)));
          setSelectedIds([]);
        }
      }
    } catch (error) {
      console.error(`Error in ${type}:`, error);
    } finally {
      setConfirmModal({ isOpen: false, id: null, ids: [], newStatus: null, isLoading: false, type: 'status' });
    }
  };

  // Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allFilteredIds = filteredAppointments.map(a => a._id);
      setSelectedIds(allFilteredIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.phone.includes(searchQuery) ||
                          (app.doctor && app.doctor.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statCards = [
    { title: "Total Appointments", value: appointments.length, icon: FileText, color: "text-primary" },
    { title: "Completed", value: appointments.filter(a => a.status === 'Completed').length, icon: ShieldCheck, color: "text-green-600" },
    { title: "Ongoing", value: appointments.filter(a => a.status === 'Ongoing').length, icon: Clock, color: "text-orange-500" },
    { title: "Canceled", value: appointments.filter(a => a.status === 'Canceled').length, icon: XSquare, color: "text-red-500" },
  ];

  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto flex flex-col gap-6 font-sans">

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{card.title}</p>
              <h3 className="text-2xl font-black text-gray-900">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-gray-50 ${card.color}`}>
              <card.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Area */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, phone or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[13px] focus:ring-2 focus:ring-primary/10 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-primary-light px-4 py-1.5 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-left-2">
              <span className="text-[12px] font-bold text-primary">{selectedIds.length} Selected</span>
              <div className="h-4 w-px bg-primary/20 mx-1"></div>
              <select 
                onChange={(e) => openBulkStatusModal(e.target.value)}
                value=""
                className="bg-transparent text-[12px] font-bold text-primary outline-none cursor-pointer"
              >
                <option value="" disabled>Bulk Action</option>
                <option value="Scheduled">Mark Scheduled</option>
                <option value="Ongoing">Mark Ongoing</option>
                <option value="Completed">Mark Completed</option>
                <option value="Canceled">Mark Canceled</option>
              </select>
              <button 
                onClick={openBulkDeleteModal}
                className="p-1 px-2 text-primary hover:bg-primary/10 rounded-lg transition-colors border border-primary/20 ml-2"
                title="Bulk Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

          <div className="relative">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal size={14} /> {statusFilter}
            </button>
            {showFilterDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFilterDropdown(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20">
                  {['All', 'Scheduled', 'Ongoing', 'Completed', 'Canceled'].map(f => (
                    <button 
                      key={f}
                      onClick={() => { setStatusFilter(f); setShowFilterDropdown(false); }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-xs font-bold transition-colors ${statusFilter === f ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-400 font-bold uppercase tracking-widest border-b border-gray-50">
                <th className="p-4 pl-6 w-12">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedIds.length > 0 && selectedIds.length === filteredAppointments.length}
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 transition-all" 
                  />
                </th>
                <th className="p-4 py-4">Patient Details</th>
                <th className="p-4 py-4">Phone</th>
                <th className="p-4 py-4">Doctor</th>
                <th className="p-4 py-4">Scheduled Date</th>
                <th className="p-4 py-4 text-center">Status</th>
                <th className="p-4 py-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan="7" className="p-20 text-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3"></div><p className="text-gray-400 font-bold">Loading records...</p></td></tr>
              ) : filteredAppointments.length === 0 ? (
                <tr><td colSpan="7" className="p-20 text-center text-gray-400 font-bold italic text-base">No appointments found matching your criteria.</td></tr>
              ) : filteredAppointments.map((app) => (
                <tr key={app._id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors ${selectedIds.includes(app._id) ? 'bg-primary/5' : ''}`}>
                  <td className="p-4 pl-6">
                    <input 
                      type="checkbox" 
                      onChange={() => handleSelectOne(app._id)}
                      checked={selectedIds.includes(app._id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 transition-all" 
                    />
                  </td>
                  <td className="p-4 py-4 min-w-[220px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center font-black text-primary text-[11px] border border-primary/10">
                        {app.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 leading-tight">{app.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{app.code || '#APT-NEW'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 py-4 text-gray-600 font-bold text-[13px]">{app.phone}</td>
                  <td className="p-4 py-4 min-w-[180px]">
                    <div className="font-bold text-gray-900 leading-tight flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span> {app.doctor}
                    </div>
                  </td>
                  <td className="p-4 py-4">
                    <div className="font-bold text-gray-900 text-[13px] leading-tight">{app.date}</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1 uppercase">{app.time}</div>
                  </td>
                  <td className="p-4 py-4 text-center">
                    <select
                      value={app.status}
                      onChange={(e) => openStatusModal(app._id, e.target.value)}
                      className="px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest focus:outline-none cursor-pointer border shadow-sm transition-all"
                      style={{
                        backgroundColor: app.status === 'Completed' ? '#F0FDF4' : app.status === 'Ongoing' ? '#992120' : app.status === 'Scheduled' ? '#EFF6FF' : '#FEF2F2',
                        color: app.status === 'Completed' ? '#166534' : app.status === 'Ongoing' ? '#FFFFFF' : app.status === 'Scheduled' ? '#1E40AF' : '#991B1B',
                        borderColor: app.status === 'Completed' ? '#DCFCE7' : app.status === 'Ongoing' ? '#992120' : app.status === 'Scheduled' ? '#DBEAFE' : '#FEE2E2',
                      }}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="p-4 py-4 text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedAppointment(app)}
                        className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100" title="Full Details">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(app._id)}
                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-primary p-8 text-white relative">
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                <XSquare size={20} />
              </button>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-[2rem] bg-white text-primary flex items-center justify-center text-3xl font-black shadow-xl">
                  {selectedAppointment.name[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-black">{selectedAppointment.name}</h3>
                  <p className="text-white/70 font-bold uppercase tracking-widest text-xs mt-1">{selectedAppointment.code || '#APT-NEW'}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider">{selectedAppointment.status}</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider">{selectedAppointment.type}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <User size={12} /> Contact Information
                  </p>
                  <p className="text-[14px] font-bold text-gray-800">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar size={12} /> Schedule
                  </p>
                  <p className="text-[14px] font-bold text-gray-800">{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="text-primary font-black">DR.</span> Assigned Specialist
                  </p>
                  <p className="text-[14px] font-bold text-gray-800">{selectedAppointment.doctor}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FileText size={12} /> Appointment Notes
                  </p>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {selectedAppointment.notes || 'No specific notes or case history provided for this appointment.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Consultation Fee</p>
                      <p className="text-xl font-black text-gray-900">₹{selectedAppointment.fees || '500'}</p>
                   </div>
                   <button 
                     onClick={() => setSelectedAppointment(null)}
                     className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal (Status & Delete) */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 transform animate-in zoom-in-95">
            <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${
              confirmModal.type.includes('delete') ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'
            }`}>
              {confirmModal.type.includes('delete') ? <Trash2 size={24} /> : <RefreshCw size={24} />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {confirmModal.type.includes('delete') ? 'Confirm Delete?' : 'Update Status?'}
            </h3>
            <p className="text-[14px] text-gray-500 mb-8 font-medium leading-relaxed">
              {confirmModal.type === 'bulk-delete' 
                ? `Are you sure you want to permanently delete ${confirmModal.ids.length} selected appointments? This action cannot be undone.`
                : confirmModal.type === 'delete'
                ? `Are you sure you want to permanently delete this appointment? This action cannot be undone.`
                : confirmModal.type === 'bulk-status'
                ? `Are you sure you want to update ${confirmModal.ids.length} selected appointments to `
                : `Are you sure you want to change this appointment status to `
              }
              {confirmModal.newStatus && <span className="font-black text-primary underline underline-offset-4 ml-1">{confirmModal.newStatus}</span>}
              {!confirmModal.newStatus && confirmModal.type.includes('bulk') && <span>these appointments</span>}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal({ isOpen: false, id: null, ids: [], newStatus: null, isLoading: false, type: 'status' })}
                disabled={confirmModal.isLoading}
                className="flex-1 py-3 rounded-2xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={confirmModal.isLoading}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
                  confirmModal.type.includes('delete') ? 'bg-red-500 shadow-red-500/20' : 'bg-[#992120] shadow-primary/20'
                }`}
              >
                {confirmModal.isLoading ? <RefreshCw size={16} className="animate-spin" /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
