import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal, ChevronDown, Plus,
  MessageCircle, Phone, MoreHorizontal, Pencil, Trash2, Search,
  Layers, Stethoscope, Edit3, Edit2, X, CheckCircle2, ChevronRight
} from 'lucide-react';
import AddDoctorModal from './AddDoctorModal';

// ── Components ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) =>
  status === 'Available' ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary-light text-primary border border-primary/10">
      Available
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-500 border border-red-100">
      Unavailable
    </span>
  );

const DoctorCard = ({ doctor, onOpenDetails, onEdit, onDelete }) => (
  <div
    onClick={() => onOpenDetails && onOpenDetails(doctor)}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
  >
    <div className="bg-gray-50 flex justify-center py-4 border-b border-gray-100">
      <div className="w-24 h-24 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
        <img
          src={doctor.avatar ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${doctor.avatar}` : `https://i.pravatar.cc/300?u=${doctor._id}`}
          alt={doctor.fullName}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
            e.target.className = "w-full h-full object-contain p-6 opacity-20";
          }}
        />
      </div>
    </div>
    <div className="p-4 text-center flex-1 flex flex-col">
      <h4 className="font-bold text-gray-900 text-[15px]">{doctor.fullName}</h4>
      <p className="text-[11px] text-primary font-bold uppercase tracking-tighter mb-2">{doctor.specialization || 'General Practitioner'}</p>
      <div className="flex justify-center mb-4">
        <StatusBadge status={doctor.status} />
      </div>
      <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
        <div className="flex gap-1.5">
           <button onClick={(e) => { e.stopPropagation(); onEdit(doctor); }} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"><Pencil size={13} /></button>
           <button onClick={(e) => { e.stopPropagation(); onDelete(doctor._id); }} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"><Trash2 size={13} /></button>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-primary transition-colors">
          View Detail <ChevronRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const Doctors = ({ onOpenDetails }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list', 'depts', 'specialities'
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showDocModal, setShowDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: 'doctor', id: null });
  
  const [categoryModal, setCategoryModal] = useState({ 
    isOpen: false, 
    type: 'dept', // 'dept' or 'spec'
    data: null 
  });
  const [catFormData, setCatFormData] = useState({ name: '', description: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [docRes, deptRes, specRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/department`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/speciality`)
      ]);
      const [docData, deptData, specData] = await Promise.all([docRes.json(), deptRes.json(), specRes.json()]);
      
      if (docData.success) setDoctorsList(docData.data);
      if (deptData.success) setDepartments(deptData.data);
      if (specData.success) setSpecialities(specData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = async () => {
    const { type, id } = deleteConfirm;
    const endpoint = type === 'doctor' ? 'doctor' : (type === 'dept' ? 'department' : 'speciality');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${endpoint}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
        setDeleteConfirm({ show: false, type: 'doctor', id: null });
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteDoctor = (id) => {
    setDeleteConfirm({ show: true, type: 'doctor', id });
  };

  const handleDeleteCategory = (type, id) => {
    setDeleteConfirm({ show: true, type, id });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const { type, data } = categoryModal;
    const isEdit = !!data;
    const endpoint = type === 'dept' ? 'department' : 'speciality';
    const url = isEdit ? `${import.meta.env.VITE_API_BASE_URL}/${endpoint}/${data._id}` : `${import.meta.env.VITE_API_BASE_URL}/${endpoint}`;
    
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catFormData)
      });
      if ((await res.json()).success) {
        setCategoryModal({ isOpen: false, type: 'dept', data: null });
        fetchData();
      }
    } catch (error) { console.error(error); }
  };



  const filteredDoctors = doctorsList.filter((d) => {
    const matchesTab = activeTab === 'All' || d.department === activeTab;
    const matchesSearch = d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (d.specialization && d.specialization.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ── Top Navigation Tabs ────────────────────────────────────────── */}
      <div className="flex items-center gap-1 mb-6 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
        <button 
          onClick={() => setViewMode('list')}
          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'}`}
        >
          DOCTORS LIST
        </button>
        <button 
          onClick={() => setViewMode('depts')}
          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'depts' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'}`}
        >
          DEPARTMENTS
        </button>
        <button 
          onClick={() => setViewMode('specialities')}
          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'specialities' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-600'}`}
        >
          SPECIALITIES
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Seach doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => { setEditingDoc(null); setShowDocModal(true); }}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
              >
                <Plus size={16} /> Add New Doctor
              </button>
            </div>

            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-gray-50">
               {['All', ...departments.map(d => d.name)].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-50'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            {loading ? (
              <p className="text-center py-20 text-gray-400 font-bold">Loading records...</p>
            ) : filteredDoctors.length === 0 ? (
              <p className="text-center py-20 text-gray-400 font-bold italic">No doctors found matching criteria.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredDoctors.map(doc => (
                  <DoctorCard 
                    key={doc._id} 
                    doctor={doc} 
                    onOpenDetails={onOpenDetails} 
                    onEdit={(d) => { setEditingDoc(d); setShowDocModal(true); }}
                    onDelete={handleDeleteDoctor}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── Categories Management View (Depts & Specialities) ─────────────────── */
        <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-bold text-gray-900 capitalize">Manage {viewMode}</h3>
                   <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">Medical Professional Categories</p>
                </div>
                <button 
                  onClick={() => { setCatFormData({ name: '', description: '' }); setCategoryModal({ isOpen: true, type: viewMode === 'depts' ? 'dept' : 'spec', data: null }); }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  <Plus size={16} /> Add New {viewMode === 'depts' ? 'Department' : 'Speciality'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] border-b border-gray-50">
                      <th className="pb-4 pl-4 w-16">Icon</th>
                      <th className="pb-4">Category Name</th>
                      <th className="pb-4 hidden md:table-cell">Description</th>
                      <th className="pb-4 text-right pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {(viewMode === 'depts' ? departments : specialities).map((item) => (
                      <tr key={item._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 pl-4 px-2">
                           <div className="w-10 h-10 rounded-xl bg-gray-50 text-primary flex items-center justify-center border border-gray-100 shadow-sm">
                              {viewMode === 'depts' ? <Layers size={18} /> : <Stethoscope size={18} />}
                           </div>
                        </td>
                        <td className="py-5">
                           <div className="font-bold text-gray-900">{item.name}</div>
                           <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase">ID: {item._id.slice(-6)}</div>
                        </td>
                        <td className="py-5 hidden md:table-cell max-w-[300px]">
                           <p className="text-gray-500 line-clamp-1">{item.description || 'No description provided.'}</p>
                        </td>
                        <td className="py-5 text-right pr-4">
                           <div className="flex justify-end gap-2">
                             <button 
                               onClick={() => { setCatFormData({ name: item.name, description: item.description || '' }); setCategoryModal({ isOpen: true, type: viewMode === 'depts' ? 'dept' : 'spec', data: item }); }}
                               className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white rounded-lg transition-all border border-blue-100"
                             >
                               <Pencil size={14} />
                             </button>
                             <button 
                               onClick={() => handleDeleteCategory(viewMode === 'depts' ? 'dept' : 'spec', item._id)}
                               className="p-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-100"
                             >
                               <Trash2 size={14} />
                             </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      )}

      {/* ── Modals ───────────────────────────────────────────────────────────── */}

      {/* Doctor Modal */}
      <AddDoctorModal 
        isOpen={showDocModal} 
        editData={editingDoc}
        onClose={() => { setShowDocModal(false); setEditingDoc(null); fetchData(); }} 
      />

      {/* Category Modal (Depts/Specs) */}
      {categoryModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
             <div className="bg-primary p-6 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold">{categoryModal.data ? 'Update' : 'Add New'} {categoryModal.type === 'dept' ? 'Department' : 'Speciality'}</h3>
                <button onClick={() => setCategoryModal({...categoryModal, isOpen: false})}><X size={20} /></button>
             </div>
             <form onSubmit={handleCategorySubmit} className="p-8 space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Category Name</label>
                  <input 
                    required type="text" 
                    value={catFormData.name}
                    onChange={e => setCatFormData({...catFormData, name: e.target.value})}
                    placeholder="Enter name..."
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Short Description</label>
                  <textarea 
                    value={catFormData.description}
                    onChange={e => setCatFormData({...catFormData, description: e.target.value})}
                    placeholder="Brief details..."
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all h-24"
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all">
                  Save Category
                </button>
             </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────── */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm({ show: false, type: 'doctor', id: null })}></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
                   <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Confirm Delete?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8 text-balance">
                  {deleteConfirm.type === 'doctor' ? 'Are you sure you want to remove this doctor from the medical staff?' : `Are you sure you want to delete this ${deleteConfirm.type === 'dept' ? 'department' : 'speciality'}?`}
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={confirmDelete}
                    className="py-3.5 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                   >
                      Delete
                   </button>
                   <button 
                    onClick={() => setDeleteConfirm({ show: false, type: 'doctor', id: null })}
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

export default Doctors;

