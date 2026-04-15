import React, { useState } from 'react';
import { 
  Globe, 
  Image as ImageIcon, 
  Type, 
  Layout, 
  Link as LinkIcon, 
  Save, 
  Smartphone, 
  Monitor, 
  Mail, 
  Phone, 
  MapPin,
  Search,
  Share2
} from 'lucide-react';

const WebsiteContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('General');

  const sections = [
    { id: 'General', label: 'General Info', icon: Globe },
    { id: 'Hero', label: 'Hero Banners', icon: ImageIcon },
    { id: 'About', label: 'About Hospital', icon: Layout },
    { id: 'Footer', label: 'Contact & Social', icon: LinkIcon }
  ];

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Website Content</h2>
          <p className="text-xs text-gray-500 mt-1">Update labels, images, and contact information of your public website.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400">
              <Monitor size={18} />
           </div>
           <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400">
              <Smartphone size={18} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Nav Tabs */}
        <div className="lg:col-span-3">
           <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-1 sticky top-24">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSubTab(sec.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                    activeSubTab === sec.id 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <sec.icon size={18} />
                  {sec.label}
                </button>
              ))}
           </div>
        </div>

        {/* Right Content Form */}
        <div className="lg:col-span-9 space-y-6">
           {/* Section: General Info */}
           {activeSubTab === 'General' && (
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                   <h3 className="text-lg font-bold text-gray-900">General Information</h3>
                   <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-primary/10 hover:opacity-90 transition-all">
                      <Save size={14} /> SAVE CHANGES
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Website Title</label>
                      <div className="relative">
                         <input type="text" defaultValue="Medlink - Premium Healthcare Solutions" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                         <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">SEO Keywords</label>
                      <div className="relative">
                         <input type="text" defaultValue="hospital, neurology, surgery" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                         <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                   </div>
                   <div className="md:col-span-2 space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Meta Description</label>
                      <textarea rows="3" className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none resize-none">Providing world-class medical facilities and expert doctors specialized in Neurology and General Surgery.</textarea>
                   </div>
                </div>
             </div>
           )}

           {/* Section: Hero Banners */}
           {activeSubTab === 'Hero' && (
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                   <h3 className="text-lg font-bold text-gray-900">Hero Section Content</h3>
                   <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-primary/10 hover:opacity-90 transition-all">
                      <Save size={14} /> SAVE CHANGES
                   </button>
                </div>

                <div className="space-y-8">
                   <div className="relative group rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 aspect-video md:aspect-[21/9]">
                      <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover brightness-90" alt="Hero" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2">
                            <ImageIcon size={16} /> CHANGE BANNER IMAGE
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Hero Heading</label>
                         <input type="text" defaultValue="Your Health Is Our Top Priority" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-lg font-black text-gray-900 focus:ring-2 focus:ring-primary/20 outline-none" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Hero Subtext</label>
                         <input type="text" defaultValue="Experience advanced medical care with our team of global experts." className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold text-gray-500 focus:ring-2 focus:ring-primary/20 outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Primary CTA Button</label>
                         <input type="text" defaultValue="Book Appointment" className="w-full px-6 py-3.5 bg-primary-light text-primary border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Secondary CTA Button</label>
                         <input type="text" defaultValue="View Doctors" className="w-full px-6 py-3.5 bg-gray-50 text-gray-400 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none" />
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* Section: Contact & Social */}
           {activeSubTab === 'Footer' && (
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                   <h3 className="text-lg font-bold text-gray-900">Contact & Social Links</h3>
                   <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-primary/10 hover:opacity-90 transition-all">
                      <Save size={14} /> SAVE CHANGES
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Contact */}
                   <div className="space-y-6">
                      <p className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                         <Phone size={14} className="text-primary" /> Administrative Contact
                      </p>
                      <div className="space-y-4">
                         <div className="relative">
                            <input type="email" defaultValue="contact@medlink.com" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         </div>
                         <div className="relative">
                            <input type="text" defaultValue="+1 (555) 000-1234" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         </div>
                         <div className="relative">
                            <textarea rows="2" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-primary/20 outline-none resize-none">123 Medical Plaza, New York, NY 10001</textarea>
                            <MapPin size={16} className="absolute left-4 top-4 text-gray-400" />
                         </div>
                      </div>
                   </div>

                   {/* Social */}
                   <div className="space-y-6">
                      <p className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                         <LinkIcon size={14} className="text-primary" /> Social Presence
                      </p>
                      <div className="space-y-4">
                         <div className="relative">
                            <input type="text" defaultValue="facebook.com/medlink" className="w-full pl-12 pr-4 py-3.5 bg-blue-50 text-blue-700 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-blue-100 outline-none" />
                            <Share2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                         </div>
                         <div className="relative">
                            <input type="text" defaultValue="instagram.com/medlink_official" className="w-full pl-12 pr-4 py-3.5 bg-pink-50 text-pink-700 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-pink-100 outline-none" />
                            <Share2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
                         </div>
                         <div className="relative">
                            <input type="text" defaultValue="twitter.com/medlink" className="w-full pl-12 pr-4 py-3.5 bg-blue-50 text-blue-400 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-blue-100 outline-none" />
                            <Share2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteContent;
