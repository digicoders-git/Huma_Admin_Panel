import React, { useState } from 'react';
import { 
  Newspaper, 
  Plus, 
  Search, 
  Calendar, 
  Tag, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X,
  FileText,
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: 'New Neurology Wing Opening This Monday',
    category: 'Latest',
    date: '15 Oct 2025',
    author: 'Admin',
    status: 'Published',
    description: 'We are proud to announce the opening of our state-of-the-art neurology wing equipped with the latest MRI technology.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    title: 'Free Health Check-up Camp in Rural Areas',
    category: 'Event',
    date: '12 Oct 2025',
    author: 'Management',
    status: 'Scheduled',
    description: 'Our team will be visiting the neighboring villages to provide free medical consultations and basic diagnostics.',
    image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    title: 'Important Update: New Visiting Hours',
    category: 'Notice',
    date: '10 Oct 2025',
    author: 'Staff',
    status: 'Published',
    description: 'Please note the revised visiting hours for the General Ward starting from next month to ensure patient rest.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400'
  }
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Latest', 'Event', 'Notice'];

  const filteredNews = newsData.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="px-6 py-4 flex flex-col gap-6 max-w-[1200px] mx-auto animate-fade-in pb-12">
      
      {/* Add News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 h-[90vh] flex flex-col">
              <div className="px-10 py-8 bg-primary text-white flex justify-between items-center shrink-0">
                 <div>
                    <h3 className="text-2xl font-bold">Post New Article</h3>
                    <p className="text-xs opacity-80 font-medium mt-1 uppercase tracking-widest">Broadcast news to your website</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="bg-white/20 p-2 rounded-2xl hover:bg-white/30 transition-all">
                    <X size={24} />
                 </button>
              </div>
              <form className="p-10 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Headline / Title</label>
                       <input type="text" placeholder="e.g. Breaking: New Medical Advancements" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-lg font-extrabold text-gray-900 focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-gray-300" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Category</label>
                          <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none">
                             <option>Latest News</option>
                             <option>Event</option>
                             <option>Urgent Notice</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Publish Status</label>
                          <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none">
                             <option>Immediate</option>
                             <option>Draft</option>
                             <option>Scheduled</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-2 border-2 border-dashed border-gray-100 rounded-[32px] p-8 text-center hover:bg-primary-light/30 hover:border-primary/20 transition-all cursor-pointer group">
                       <div className="mx-auto w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary-light group-hover:text-primary transition-all mb-3 text-center">
                          <ImageIcon size={24} />
                       </div>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Upload Cover Image</p>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Article Content</label>
                       <textarea rows="6" placeholder="Write the full story here..." className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none leading-relaxed"></textarea>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4 shrink-0">
                    <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all">PUBLISH ARTICLE</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">CANCEL</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News & Announcements</h2>
          <p className="text-xs text-gray-500 mt-1">Keep your patients and community updated with the latest happenings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
        >
          <Plus size={18} />
          Post News
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
         <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex p-1 bg-gray-50 rounded-[1.25rem] gap-1 w-max lg:w-auto min-w-full lg:min-w-0">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveFilter(cat)}
                   className={`px-6 py-2.5 rounded-2xl text-[10px] sm:text-[11px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${
                      activeFilter === cat 
                       ? 'bg-white text-primary shadow-sm' 
                       : 'text-gray-400 hover:text-gray-600'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
         </div>
         <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search news titles or keywords..." 
              className="w-full pl-14 pr-6 py-4 bg-white shadow-sm border border-gray-100 rounded-3xl text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Main List Column */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:border-primary/20 transition-all group overflow-hidden relative">
                 {/* Article Image */}
                 <div className="w-full md:w-56 h-56 md:h-auto rounded-[32px] overflow-hidden shrink-0">
                    <img src={news.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={news.title} />
                 </div>

                 {/* Content */}
                 <div className="flex-1 flex flex-col py-2">
                    <div className="flex items-center gap-3 mb-4">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          news.category === 'Latest' ? 'bg-primary-light text-primary' :
                          news.category === 'Event' ? 'bg-purple-50 text-purple-600' :
                          'bg-amber-50 text-amber-600'
                       }`}>
                          {news.category}
                       </span>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <Calendar size={12} className="text-primary" /> {news.date}
                       </div>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-primary transition-colors">
                       {news.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                       {news.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                       <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                             news.status === 'Published' ? 'text-primary' : 'text-amber-500'
                          }`}>
                             {news.status === 'Published' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                             {news.status}
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button className="p-2.5 text-gray-300 hover:text-primary hover:bg-primary-light rounded-xl transition-all">
                             <Edit3 size={18} />
                          </button>
                          <button className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Sidebar / Stats Column */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-primary rounded-[40px] p-8 text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <Newspaper size={32} className="mb-6 opacity-80" />
               <h4 className="text-sm font-black uppercase tracking-widest mb-2 opacity-80">Newsletter Reach</h4>
               <h2 className="text-4xl font-black mb-6">12.4K</h2>
               <p className="text-xs font-medium opacity-80 leading-relaxed mb-6">
                  Your announcements are seen by thousands of people every week through the mobile app and website.
               </p>
               <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs shadow-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                  VIEW ANALYTICS <ArrowRight size={14} />
               </button>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
               <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Tag size={14} className="text-primary" /> Topic Popularity
               </h4>
               <div className="space-y-4">
                  {[
                    { label: 'Infrastructure', count: 42, color: 'bg-primary' },
                    { label: 'Patient News', count: 28, color: 'bg-blue-500' },
                    { label: 'Medical Camp', count: 65, color: 'bg-purple-500' },
                    { label: 'Staff Notice', count: 12, color: 'bg-amber-500' },
                  ].map((topic, i) => (
                    <div key={i} className="space-y-1.5">
                       <div className="flex justify-between text-[11px] font-black text-gray-700 uppercase tracking-tighter">
                          <span>{topic.label}</span>
                          <span>{topic.count}%</span>
                       </div>
                       <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                          <div className={`h-full ${topic.color}`} style={{ width: `${topic.count}%` }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default News;
