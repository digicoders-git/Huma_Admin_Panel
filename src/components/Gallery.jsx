import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Eye, 
  Filter, 
  Search, 
  MoreVertical, 
  X,
  Upload,
  Layers,
  CheckCircle2
} from 'lucide-react';

const galleryData = [
  { id: 1, title: 'Modern OT Unit', category: 'Infrastructure', url: 'https://images.unsplash.com/photo-1512678015430-69a0cb40efbb?auto=format&fit=crop&q=80&w=400', date: '10 Oct 2025' },
  { id: 2, title: 'MRI Scan Department', category: 'Infrastructure', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400', date: '08 Oct 2025' },
  { id: 3, title: 'Free Medical Camp 2024', category: 'Events', url: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=400', date: '05 Oct 2025' },
  { id: 4, title: 'Our Nursing Team', category: 'Team', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400', date: '01 Oct 2025' },
  { id: 5, title: 'Advanced Lab Equipment', category: 'Medical', url: 'https://images.unsplash.com/photo-1579154273841-4911397ce538?auto=format&fit=crop&q=80&w=400', date: '28 Sep 2025' },
  { id: 6, title: 'Reception Lounge', category: 'Infrastructure', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400', date: '25 Sep 2025' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const categories = ['All', 'Infrastructure', 'Medical', 'Events', 'Team'];

  const filteredData = galleryData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in pb-12">
      
      {/* Add Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-10 py-8 bg-primary text-white flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-bold">Add to Gallery</h3>
                    <p className="text-xs opacity-80 font-medium mt-1 uppercase tracking-widest">Upload your hospital moments</p>
                 </div>
                 <button onClick={() => setIsAddModalOpen(false)} className="bg-white/20 p-2 rounded-2xl hover:bg-white/30 transition-all">
                    <X size={24} />
                 </button>
              </div>
              <form className="p-10 space-y-6">
                 {/* Upload Area */}
                 <div className="border-4 border-dashed border-gray-100 rounded-[32px] p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-all group cursor-pointer">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary-light group-hover:text-primary transition-all">
                       <Upload size={32} />
                    </div>
                    <div className="text-center">
                       <p className="text-sm font-black text-gray-700">Click to upload image</p>
                       <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-tighter">JPG, PNG up to 10MB</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Image Title</label>
                       <input type="text" placeholder="e.g. Annual Staff Meet" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Category</label>
                       <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none">
                          {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all">UPLOAD NOW</button>
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">CANCEL</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Image Preview Overlay */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[120] bg-black/90 p-4 flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setPreviewImage(null)}
        >
           <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={40} />
           </button>
           <img src={previewImage.url} className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300" alt="Preview" />
           <div className="absolute bottom-12 text-center text-white">
              <h3 className="text-2xl font-bold">{previewImage.title}</h3>
              <p className="text-primary font-bold uppercase tracking-widest text-xs mt-2">{previewImage.category}</p>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospital Gallery</h2>
          <p className="text-xs text-gray-500 mt-1">Showcase your infrastructure, events, and medical achievements.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} />
          Upload Image
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
         <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-1 w-max lg:w-auto min-w-full lg:min-w-0">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2.5 rounded-xl text-[12px] font-black transition-all whitespace-nowrap ${
                     activeCategory === cat 
                       ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                       : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
         </div>
         <div className="flex-1 w-full relative">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search images by name..." 
              className="w-full pl-14 pr-6 py-4 bg-white shadow-sm border border-gray-100 rounded-3xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
             <div className="aspect-[4/3] overflow-hidden relative">
                <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                   <button 
                     onClick={() => setPreviewImage(item)}
                     className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shadow-2xl hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                   >
                      <Eye size={22} />
                   </button>
                   <button className="w-12 h-12 bg-white text-red-500 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110">
                      <Trash2 size={22} />
                   </button>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                   <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.category}</span>
                </div>
             </div>
             <div className="p-8">
                <div className="flex justify-between items-start gap-4">
                   <div>
                      <h4 className="text-[15px] font-extrabold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{item.date}</p>
                   </div>
                   <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                      <MoreVertical size={18} />
                   </button>
                </div>
             </div>
          </div>
        ))}

        {/* Empty State / Add New Placeholder */}
        <div 
          onClick={() => setIsAddModalOpen(true)}
          className="aspect-[4/3] border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center gap-4 hover:border-primary/30 hover:bg-primary-light/20 transition-all cursor-pointer group"
        >
           <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 group-hover:bg-primary-light group-hover:text-primary transition-all shadow-sm">
              <Plus size={32} />
           </div>
           <p className="text-sm font-black text-gray-400 group-hover:text-primary">Add New Image</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
