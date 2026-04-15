import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: '#e7e3da' }}>
      {/* Left Branding Side */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{ backgroundColor: '#992120' }}
      >
        {/* Subtle decorative circles */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{ backgroundColor: '#e7e3da' }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full translate-x-1/3 translate-y-1/3 opacity-10"
          style={{ backgroundColor: '#e7e3da' }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          {/* Logo */}
          <div className="mb-10 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(231,227,218,0.12)' }}>
            <img
              src="/main_logo.png"
              alt="Huma Neurology Logo"
              className="w-48 h-auto object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4 leading-tight" style={{ color: '#e7e3da' }}>
            Huma Neurology
          </h1>
          <p className="text-sm leading-relaxed opacity-75" style={{ color: '#e7e3da' }}>
            Admin Panel — Manage patients, doctors, and hospital operations with ease.
          </p>

          {/* Divider */}
          <div className="mt-10 w-16 h-1 rounded-full" style={{ backgroundColor: 'rgba(231,227,218,0.4)' }} />
        </div>
      </div>

      {/* Right Login Form Side */}
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16"
        style={{ backgroundColor: '#e7e3da' }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img src="/main_logo.png" alt="Huma Neurology Logo" className="w-32 h-auto object-contain" />
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#992120' }}>
              Welcome Back
            </h2>
            <p className="text-sm font-medium" style={{ color: '#992120', opacity: 0.6 }}>
              Sign in to your admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                className="text-xs font-bold uppercase tracking-widest block"
                style={{ color: '#992120' }}
              >
                Email or Username
              </label>
              <input
                type="text"
                placeholder="Your email or username"
                className="w-full px-6 py-4 rounded-2xl text-[13px] font-medium outline-none placeholder-opacity-50"
                style={{
                  backgroundColor: 'rgba(153,33,32,0.07)',
                  border: '1.5px solid rgba(153,33,32,0.15)',
                  color: '#992120',
                }}
                onFocus={e => (e.target.style.borderColor = '#992120')}
                onBlur={e => (e.target.style.borderColor = 'rgba(153,33,32,0.15)')}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-xs font-bold uppercase tracking-widest block"
                style={{ color: '#992120' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  className="w-full px-6 py-4 rounded-2xl text-[13px] font-medium outline-none placeholder-opacity-50"
                  style={{
                    backgroundColor: 'rgba(153,33,32,0.07)',
                    border: '1.5px solid rgba(153,33,32,0.15)',
                    color: '#992120',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#992120')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(153,33,32,0.15)')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                  style={{ color: '#992120', opacity: 0.5 }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl font-bold text-[15px] transition-all active:scale-[0.98] mt-2"
              style={{ backgroundColor: '#992120', color: '#e7e3da' }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#7a1a19')}
              onMouseLeave={e => (e.target.style.backgroundColor = '#992120')}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
