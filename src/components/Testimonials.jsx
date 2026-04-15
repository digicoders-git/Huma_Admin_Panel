import React, { useState } from 'react';
import { 
  Star, 
  MessageCircle, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  User, 
  Quote, 
  X,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const initialTestimonials = [
  {
    id: 1,
    name: 'Anjali Sharma',
    role: 'Patient',
    rating: 5,
    message: 'The neurology department at Medlink is exceptional. Dr. Nina was very patient and explained everything clearly. My chronic migraines are finally under control.',
    date: '12 Oct 2025',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 2,
    name: 'Vikram Singh',
    role: 'Parent of Patient',
    rating: 4,
    message: 'Very clean facilities and helpful staff. We came for my son surgery and the coordinated care was impressive. Highly recommended for pediatric care.',
    date: '10 Oct 2025',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 3,
    name: 'Meera Reddy',
    role: 'Post-Op Patient',
    rating: 5,
    message: 'Best hospital experience so far. The nursing staff is very attentive and the food was surprisingly good for a hospital. Recovery was smooth.',
    date: '05 Oct 2025',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

const Testimonials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);

  const filteredTestimonials = initialTestimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in pb-12">
      
      {/* Add Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-10 py-8 bg-primary text-white flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-bold">New Testimonial</h3>
                    <p className="text-xs opacity-80 font-medium mt-1 uppercase tracking-widest">Share patient success stories</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="bg-white/20 p-2 rounded-2xl hover:bg-white/30 transition-all">
                    <X size={24} />
                 </button>
              </div>
              <form className="p-10 space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Patient Name</label>
                       <input type="text" placeholder="e.g. John Doe" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Experience Rating</label>
                       <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                             <button 
                               key={star}
                               type="button"
                               onClick={() => setSelectedStars(star)}
                               className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${star <= selectedStars ? 'bg-amber-50 text-amber-500 shadow-sm border border-amber-100' : 'bg-gray-50 text-gray-300'}`}
                             >
                                <Star size={20} fill={star <= selectedStars ? 'currentColor' : 'none'} />
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Testimonial Message</label>
                       <textarea rows="4" placeholder="What did the patient say?" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all">PUBLISH REVIEW</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">CANCEL</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Testimonials</h2>
          <p className="text-xs text-gray-500 mt-1">Manage public reviews and feedback from your patients.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
         <div className="lg:col-span-8">
            <div className="bg-white p-2 rounded-[32px] shadow-sm border border-gray-100 flex items-center">
               <div className="relative flex-1">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search testimonials by patient name or content..." 
                    className="w-full pl-14 pr-6 py-4 bg-transparent border-none text-sm font-semibold outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>
         </div>
         <div className="lg:col-span-4 flex justify-end gap-4">
            <div className="bg-amber-50 px-6 py-4 rounded-3xl border border-amber-100 flex flex-col items-center min-w-[120px]">
               <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Avg Rating</span>
               <div className="flex items-center gap-1 mt-1 text-amber-600 font-black text-xl">
                  4.8 <Star size={18} fill="currentColor" />
               </div>
            </div>
         </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTestimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 relative group hover:shadow-2xl hover:border-primary/20 transition-all overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-light transition-colors"></div>
             
             {/* Header */}
             <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                      <img src={t.image} className="w-full h-full object-cover" alt={t.name} />
                   </div>
                   <div>
                      <h4 className="text-lg font-black text-gray-900 leading-none">{t.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{t.role}</p>
                   </div>
                </div>
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={14} className={i < t.rating ? 'text-amber-400' : 'text-gray-200'} fill={i < t.rating ? 'currentColor' : 'none'} />
                   ))}
                </div>
             </div>

             {/* Quote Icon */}
             <div className="text-primary-light mb-4 group-hover:text-primary/20 transition-colors">
                <Quote size={40} fill="currentColor" />
             </div>

             {/* Message */}
             <p className="text-sm font-medium text-gray-600 leading-relaxed mb-8 italic">
                "{t.message}"
             </p>

             {/* Footer Actions */}
             <div className="flex items-center justify-between pt-6 border-t border-gray-50 relative z-10">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <Calendar size={12} /> {t.date}
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-3 text-gray-300 hover:text-primary hover:bg-primary-light rounded-2xl transition-all">
                      <Edit3 size={18} />
                   </button>
                   <button className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                      <Trash2 size={18} />
                   </button>
                </div>
             </div>
          </div>
        ))}

        {/* Placeholder for fresh item */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-50 border-4 border-dashed border-gray-100 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/30 hover:bg-white transition-all cursor-pointer group min-h-[300px]"
        >
           <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-gray-300 group-hover:text-primary shadow-sm transition-all group-hover:scale-110">
              <Plus size={32} />
           </div>
           <p className="text-sm font-black text-gray-400 group-hover:text-primary uppercase tracking-widest">New Success Story</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
