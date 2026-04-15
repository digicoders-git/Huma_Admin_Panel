import { Settings, Menu, ChevronRight } from 'lucide-react';

const Header = ({ setMobileMenuOpen, setActiveTab, title = 'Dashboard', showSubtitle = true, breadcrumb = null }) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 md:px-8 bg-[#F8F9FA] sticky top-0 z-[40] w-full border-b border-gray-100/50 backdrop-blur-md">
      {/* Left: Title & Subtitle */}
      <div className="flex flex-col min-w-0">
        <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight truncate">{title}</h1>
        {showSubtitle && (
          <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5 hidden sm:block">Hello James, welcome back!</p>
        )}
        {breadcrumb && (
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
            <button onClick={breadcrumb.onParent} className="hover:text-primary transition-colors font-bold uppercase tracking-tighter">{breadcrumb.parent}</button>
            <ChevronRight size={10} className="text-gray-300" />
            <span className="text-gray-500 font-bold uppercase tracking-tighter">{breadcrumb.current}</span>
          </div>
        )}
      </div>

      {/* Right: Actions Group */}
      <div className="flex items-center gap-2 md:gap-4 ml-4 shrink-0">
        {/* Settings Icon */}
        <button 
          onClick={() => setActiveTab && setActiveTab('Change Password')}
          className="p-2.5 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-primary hover:shadow-md transition-all active:scale-95 border border-gray-50"
        >
          <Settings size={20} />
        </button>

        {/* Profile Group */}
        <div 
          onClick={() => setActiveTab && setActiveTab('Profile')}
          className="flex items-center gap-3 bg-white p-1.5 md:pr-4 rounded-2xl shadow-sm border border-gray-50 cursor-pointer hover:shadow-md hover:bg-gray-50 transition-all select-none group"
        >
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704b"
            alt="James Cartis"
            className="w-8 h-8 md:w-9 md:h-9 rounded-xl object-cover"
          />
          <div className="hidden md:block">
            <p className="text-[13px] font-black text-gray-900 leading-none group-hover:text-primary transition-colors">James Cartis</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Admin</p>
          </div>
        </div>

        {/* Mobile Menu Button - Last on Right for easy thumb access */}
        <button
          className="md:hidden p-2.5 text-white bg-primary rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
