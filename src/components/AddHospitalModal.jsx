import React, { useState, useEffect } from 'react';
import { X, Upload, Building2, MapPin, Phone, Star, Bed, Layers, Users, Loader2 } from 'lucide-react';

const AddHospitalModal = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    description: '',
    contact: '',
    totalBeds: 0,
    availableBeds: 0,
    departments: 0,
    doctors: 0,
    rating: 4.5
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        location: editData.location || '',
        city: editData.city || '',
        description: editData.description || '',
        contact: editData.contact || '',
        totalBeds: editData.totalBeds || 0,
        availableBeds: editData.availableBeds || 0,
        departments: editData.departments || 0,
        doctors: editData.doctors || 0,
        rating: editData.rating || 4.5
      });
      if (editData.image) setPreview(`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${editData.image}`);
    } else {
      setFormData({
        name: '', location: '', city: '', description: '', contact: '',
        totalBeds: 0, availableBeds: 0, departments: 0, doctors: 0, rating: 4.5
      });
      setPreview(null);
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    const url = editData 
      ? `${import.meta.env.VITE_API_BASE_URL}/hospital/update/${editData._id}`
      : `${import.meta.env.VITE_API_BASE_URL}/hospital/create`;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, {
        method: editData ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      if ((await res.json()).success) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex flex-col md:flex-row h-[85vh] md:h-auto overflow-y-auto overflow-x-hidden">
          
          {/* Left: Image Upload Section */}
          <div className="w-full md:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-r border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6 w-full text-center">Hospital Image</h3>
            <div className="relative group w-full aspect-square max-w-[240px]">
              <div className="w-full h-full rounded-[2.5rem] bg-white border-4 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary/50 relative shadow-inner">
                {preview ? (
                  <img src={preview} alt="Hospital" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <Upload size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload View</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold mt-4 text-center leading-relaxed">
              * Recommended: 800x600px <br/> PNG or JPG format
            </p>
          </div>

          {/* Right: Forms Section */}
          <div className="flex-1 p-8 md:p-12 relative">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-gray-100">
              <X size={20} />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <Building2 className="text-primary" /> {editData ? 'Edit' : 'Register'} Hospital
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hospital Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" placeholder="e.g. Metro Health" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                   <input required type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" placeholder="+91 000 000 0000" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Location / Address</label>
                   <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" placeholder="e.g. Downtown Sector 5" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
                   <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-[13px] font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans" placeholder="e.g. Lucknow" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Total Beds</label>
                    <input type="number" value={formData.totalBeds} onChange={e => setFormData({...formData, totalBeds: e.target.value})} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold outline-none" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Available</label>
                    <input type="number" value={formData.availableBeds} onChange={e => setFormData({...formData, availableBeds: e.target.value})} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold outline-none" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Depts</label>
                    <input type="number" value={formData.departments} onChange={e => setFormData({...formData, departments: e.target.value})} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold outline-none" />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Doctors</label>
                    <input type="number" value={formData.doctors} onChange={e => setFormData({...formData, doctors: e.target.value})} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold outline-none" />
                 </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">About Hospital</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans h-24" placeholder="Brief history and services provided..."></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? 'Saving Changes...' : (editData ? 'Update Record' : 'Register Hospital')}
                </button>
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHospitalModal;
