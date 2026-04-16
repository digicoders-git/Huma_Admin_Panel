import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Stethoscope, 
  Building2, 
  Brain, 
  ClipboardList, 
  Layers,
  Globe,
  Image as ImageIcon,
  Star,
  Newspaper,
  Lock,
  LogOut,
  X,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen, activeTab, setActiveTab, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Appointments', icon: CalendarCheck },
    { name: 'Doctors', icon: Stethoscope },
    { name: 'Specialities', icon: Brain },
    { name: 'Enquiries', icon: ClipboardList },
    { name: 'Manage Content', icon: Globe },
    { name: 'Gallery', icon: ImageIcon },
    { name: 'Testimonials', icon: Star },
    { name: 'News', icon: Newspaper },
    { name: 'Change Password', icon: Lock },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
        w-64 flex flex-col flex-shrink-0 z-50 transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <img src="/main_logo.png" alt="Huma Neurology" className="h-10 w-auto object-contain flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-extrabold tracking-tight" style={{ color: '#992120' }}>Huma Neurology</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#992120', opacity: 0.55 }}>Center</span>
            </div>
          </div>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.name 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-[15px]">{item.name}</span>
            </button>
          ))}
        </nav>


        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary text-white rounded-xl shadow-md hover:opacity-90 transition-all transform active:scale-95"
          >
            <LogOut size={18} />
            <span className="font-bold text-[14px]">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)}></div>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4">
                   <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Ready to Leave?</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 mb-8">Are you sure you want to log out from the admin panel?</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                   <button 
                    onClick={onLogout}
                    className="py-3.5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
                   >
                      Logout
                   </button>
                   <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="py-3.5 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95"
                   >
                      Cancel
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
