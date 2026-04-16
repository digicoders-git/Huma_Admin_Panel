import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ChevronRight
} from 'lucide-react';

const API = import.meta.env.VITE_API_BASE_URL;

const ChangePassword = ({ onBack }) => {
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const toggleVisibility = (field) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const requirements = [
    { text: '8+ chars', met: password.new.length >= 8 },
    { text: 'Number', met: /\d/.test(password.new) },
    { text: 'Special char', met: /[!@#$%^&*]/.test(password.new) },
    { text: 'Match', met: password.new !== '' && password.new === password.confirm },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allMet = requirements.every(req => req.met);
    if (!allMet) {
      setMessage({ type: 'error', text: 'Password requirements not met.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API}/admin/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: password.current,
          newPassword: password.new
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setPassword({ current: '', new: '', confirm: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Error updating password.' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Connection error. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* ── HEADER (Simple Style) ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Update Account Security</p>
        </div>
      </div>

      {/* ── MAIN CARD (Simplified) ───────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-hidden">
          
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-primary-light text-primary border-primary/20' : 'bg-red-50 text-red-500 border-red-100'}`}>
              {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <p className="text-xs font-bold">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Field 1 */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Current Password</label>
                <div className="relative">
                  <input 
                    type={showPass.current ? 'text' : 'password'}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Enter current password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  <button type="button" onClick={() => toggleVisibility('current')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors">
                    {showPass.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="h-px bg-gray-50 w-full"></div>

              {/* Field 2 */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showPass.new ? 'text' : 'password'}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    placeholder="New password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  <button type="button" onClick={() => toggleVisibility('new')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors">
                    {showPass.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Field 3 */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showPass.confirm ? 'text' : 'password'}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Confirm new password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  <button type="button" onClick={() => toggleVisibility('confirm')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors">
                    {showPass.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Simple Requirements Row */}
            <div className="flex flex-wrap gap-3 pb-2 pt-1 border-b border-gray-50">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className={req.met ? 'text-primary' : 'text-gray-200'} fill={req.met ? 'currentColor' : 'none'} />
                  <span className={`text-[9px] font-bold uppercase tracking-tighter ${req.met ? 'text-primary' : 'text-gray-300'}`}>{req.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Update Password
              </button>
              <button 
                type="button" 
                onClick={onBack}
                className="px-6 py-3 bg-gray-50 text-gray-400 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
