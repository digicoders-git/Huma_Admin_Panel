import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Phone, Star, Bed, Plus, Search, 
  ArrowUpRight, Pencil, Trash2, ShieldCheck, Database, LayoutGrid, RotateCw
} from 'lucide-react';
import AddHospitalModal from './AddHospitalModal';

const Hospitals = ({ onOpenDetails }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/all`);
      const data = await res.json();
      if (data.success) {
        setHospitals(data.data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/delete/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchHospitals();
        setDeleteConfirm({ show: false, id: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };


  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hospital/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      const data = await res.json();
      if (data.success) fetchHospitals();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                          (activeFilter === 'Active' && h.isActive) || 
                          (activeFilter === 'Inactive' && !h.isActive);
    return matchesSearch && matchesFilter;
  });

  const apiBase = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Infrastructure</p>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Hospital Management</h2>
        </div>
        <button 
          onClick={() => { setEditData(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} /> Register Hospital
        </button>
      </div>

      {/* Dynamic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Centers', value: hospitals.length, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Network Reach', value: [...new Set(hospitals.map(h => h.city))].length + ' Cities', icon: MapPin, color: 'text-primary', bg: 'bg-primary-light' },
          { label: 'Bed Capacity', value: hospitals.reduce((sum, h) => sum + (Number(h.totalBeds) || 0), 0) + ' Beds', icon: Bed, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Active Status', value: hospitals.filter(h => h.isActive).length + ' Live', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center gap-4 transition-all hover:border-primary/20">
            <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h4 className="text-xl font-black text-gray-900 leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Tabs */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, location or city..." 
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-gray-700 placeholder:text-gray-400 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex bg-gray-50 p-1.5 rounded-3xl w-fit">
           {['All', 'Active', 'Inactive'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveFilter(tab)}
               className={`px-8 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeFilter === tab ? 'bg-white text-primary shadow-lg shadow-black/5' : 'text-gray-400 hover:text-gray-600'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
           <RotateCw size={40} className="text-primary animate-spin mb-4" />
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Updating Database...</p>
        </div>
      ) : filteredHospitals.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
           <Database size={48} className="mx-auto text-gray-200 mb-4" />
           <p className="text-gray-400 font-bold text-base italic">No Hospital Records Found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hospital) => {
            const imgSrc = hospital.image ? `${apiBase}${hospital.image}` : 'https://images.unsplash.com/photo-1587350859728-117691f7380d?auto=format&fit=crop&q=80&w=600';
            return (
              <div 
                key={hospital._id} 
                className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500 relative"
              >
                {/* Image Section */}
                <div className="w-full md:w-56 h-56 md:h-auto overflow-hidden relative">
                  <img src={imgSrc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={hospital.name} />
                  <div className="absolute top-5 left-5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleStatus(hospital._id, hospital.isActive); }}
                      className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-90 ${
                        hospital.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {hospital.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-8 flex flex-col justify-between" onClick={() => onOpenDetails && onOpenDetails(hospital)}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors cursor-pointer">{hospital.name}</h3>
                       <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-2xl text-[11px] font-black">
                          <Star size={12} fill="currentColor" /> {hospital.rating || '4.5'}
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6">
                      <MapPin size={16} className="text-primary" /> {hospital.location}, {hospital.city}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Beds</p>
                        <p className="text-xs font-black text-gray-900">{hospital.availableBeds || 0}/{hospital.totalBeds || 0}</p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Doctors</p>
                        <p className="text-xs font-black text-gray-900">{hospital.doctors || 0}</p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Depts</p>
                        <p className="text-xs font-black text-gray-900">{hospital.departments || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-[13px] font-black text-gray-900">
                      <Phone size={14} className="text-primary" /> {hospital.contact || 'N/A'}
                    </div>
                    <div className="flex gap-2">
                       <button 
                         onClick={(e) => { e.stopPropagation(); setEditData(hospital); setIsModalOpen(true); }}
                         className="p-3 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-2xl transition-all border border-blue-100" title="Edit"
                       >
                         <Pencil size={16} />
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); handleDelete(hospital._id); }}
                         className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-100" title="Delete"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <AddHospitalModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditData(null); fetchHospitals(); }} 
        editData={editData}
      />
      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic text-nowrap">Delete Hospital?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">Are you sure you want to remove this hospital from your network? All associated data will be lost.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={confirmDelete}
                    className="py-3.5 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                   >
                      Confirm
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

export default Hospitals;

