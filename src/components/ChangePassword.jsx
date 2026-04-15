import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ChangePassword = ({ onBack }) => {
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

  const toggleVisibility = (field) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const requirements = [
    { text: 'At least 8 characters long', met: password.new.length >= 8 },
    { text: 'Must contain at least one number', met: /\d/.test(password.new) },
    { text: 'Must contain a special character', met: /[!@#$%^&*]/.test(password.new) },
    { text: 'Passwords must match', met: password.new !== '' && password.new === password.confirm },
  ];

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1000px] mx-auto animate-fade-in">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary-light text-primary rounded-2xl flex items-center justify-center shadow-sm">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
          <p className="text-xs text-gray-500 mt-1">Update your account password to ensure your account remains secure.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <form className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Current Password</label>
              <div className="relative">
                <input 
                  type={showPass.current ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 placeholder-gray-400 transition-all outline-none"
                  placeholder="Enter current password"
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('current')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-50"></div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">New Password</label>
              <div className="relative">
                <input 
                  type={showPass.new ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 placeholder-gray-400 transition-all outline-none"
                  placeholder="Enter new password"
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Confirm New Password</label>
              <div className="relative">
                <input 
                  type={showPass.confirm ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 placeholder-gray-400 transition-all outline-none"
                  placeholder="Confirm new password"
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                type="submit"
                className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
              >
                Change Password
              </button>
              <button 
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto text-gray-400 font-bold text-sm px-8 py-3.5 hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Requirements & Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-primary" />
              Password Requirements
            </h3>
            <div className="space-y-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-1 rounded-full ${req.met ? 'bg-primary-light text-primary' : 'bg-gray-50 text-gray-300'}`}>
                    <CheckCircle2 size={12} fill={req.met ? 'currentColor' : 'none'} />
                  </div>
                  <span className={`text-[11px] font-bold ${req.met ? 'text-primary' : 'text-gray-400'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary p-6 rounded-3xl shadow-xl shadow-primary/10 text-white">
             <h4 className="text-sm font-bold mb-3">Security Note</h4>
             <p className="text-[11px] leading-relaxed opacity-90">
                Regularly updating your password helps keep your medical data and patient information safe. We recommend changing it every 3 months.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
