import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Globe, Loader2, Save, X } from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/get`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setFormData({
          name: data.data.name || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
        });
        setPreview(getMediaUrl(data.data.profilePhoto));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const body = new FormData();
    body.append('name', formData.name);
    body.append('email', formData.email);
    body.append('phone', formData.phone);
    if (image) body.append('profilePhoto', image);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/update/${profile._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setEditing(false);
        // Trigger event to update header
        window.dispatchEvent(new Event('profileUpdated'));
        alert("Profile updated successfully!");
      }

    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const getMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API.replace('/api', '')}${url}`;
  };

  if (loading || !profile) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1000px] mx-auto animate-in fade-in duration-500">
      
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Profile</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage your identity and details</p>
        </div>
        {!editing ? (
          <button 
            onClick={() => setEditing(true)}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-[13px] shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleUpdate}
              disabled={saving}
              className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-[13px] shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Changes
            </button>
            <button 
              onClick={() => { setEditing(false); setPreview(getMediaUrl(profile.profilePhoto)); setImage(null); }}
              className="bg-gray-100 text-gray-400 px-6 py-2 rounded-xl font-bold text-[13px] hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner Area */}
        <div className="h-40 bg-gray-50 relative border-b border-gray-100">
          <div className="absolute -bottom-16 left-8 md:left-12">
             <div className="relative group">
                <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white">
                   <img 
                     src={preview || `https://ui-avatars.com/api/?name=${profile.name}&background=random`} 
                     className="w-full h-full object-cover" 
                     alt={profile.name} 
                   />
                </div>
                {editing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                    <Camera size={24} className="text-white" />
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
                )}
             </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-20 pb-12 px-8 md:px-12">
          {editing ? (
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Phone Number</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Joined Date</label>
                  <div className="relative">
                    <input 
                      type="text" disabled
                      value={new Date(profile.createdAt).toLocaleDateString()}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-400 outline-none"
                    />
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-200" />
                  </div>
               </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
               <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Display Name</h4>
                  <p className="text-xl font-bold text-gray-800">{profile.name}</p>
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Role</h4>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest">System Administrator</p>
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Connection</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <Mail size={14} className="text-gray-300" />
                     <p className="text-sm font-bold text-gray-700">{profile.email}</p>
                  </div>
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contact Line</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <Phone size={14} className="text-gray-300" />
                     <p className="text-sm font-bold text-gray-700">{profile.phone || 'Not provided'}</p>
                  </div>
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Account History</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <Calendar size={14} className="text-gray-300" />
                     <p className="text-sm font-bold text-gray-700">Member since {new Date(profile.createdAt).getFullYear()}</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Profile;
