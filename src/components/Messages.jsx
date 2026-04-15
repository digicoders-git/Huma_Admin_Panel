import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Video, 
  Phone, 
  MoreHorizontal, 
  Smile, 
  Paperclip, 
  Send, 
  X,
  ExternalLink,
  FileText,
  Copy,
  CheckCheck,
  Edit2,
  Info
} from 'lucide-react';

const chatThreads = [
  { id: 1, name: 'Daniel Wong', message: 'Hi, is my follow-up appointment for tomorrow confirmed in the system?', time: '09:18', unread: 5, avatar: 'https://i.pravatar.cc/150?u=daniel' },
  { id: 2, name: 'Dr. Amelia Hart', message: 'Can we add one more follow-up slot for Daniel Wong tomorrow morning...', time: '09:12', unread: 0, avatar: 'https://i.pravatar.cc/150?u=amelia', read: true },
  { id: 3, name: 'Erica Smith', message: 'Got it, thank you for the quick response!', time: '08:58', unread: 0, avatar: 'https://i.pravatar.cc/150?u=erica', active: true },
  { id: 4, name: 'Nurse Station A – Ward 3', message: 'Two new admissions just arrived, updating Medlink bed status now.', time: '08:47', unread: 5, avatar: 'https://i.pravatar.cc/150?u=nurse' },
  { id: 5, name: 'Pharmacy Admin', message: 'Paracetamol 500mg stock is low, should we trigger auto-reorder?', time: '08:15', unread: 0, avatar: 'https://i.pravatar.cc/150?u=pharma', read: true },
  { id: 6, name: 'IT Support', message: "We've deployed the latest patch, please ask staff to relogin after 18:...", time: '07:55', unread: 0, avatar: 'https://i.pravatar.cc/150?u=it', read: true },
  { id: 7, name: 'Sara Kim', message: 'Can I reschedule my eczema follow-up to Friday afternoon?', time: 'Yesterday', unread: 0, avatar: 'https://i.pravatar.cc/150?u=sara', read: true },
  { id: 8, name: 'Billing & Claims Dept', message: 'Insurance claim for Daniel Wong has been submitted and is under review.', time: 'Yesterday', unread: 0, avatar: 'https://i.pravatar.cc/150?u=billing', read: true },
  { id: 9, name: "Indah Lestari's Parent", message: 'Insurance claim for Daniel Wong has been submitted and is under review.', time: 'Yesterday', unread: 0, avatar: 'https://i.pravatar.cc/150?u=parent', read: true },
];

const messages = [
  { id: 1, type: 'received', text: 'Hi, doctor. My skin is still red after using the new cream last night.', time: '08:52' },
  { id: 2, type: 'sent', text: 'Good morning, Erica. Is the redness mild or getting worse, and do you feel any burning?', time: '08:53', read: true },
  { id: 3, type: 'received', text: "It's mild, a bit warm, but no strong burning or pain so far.", time: '08:54' },
  { id: 4, type: 'sent', text: 'That can be a normal reaction during early treatment. Please avoid sun exposure and heavy makeup today.', time: '08:55', read: true },
  { id: 5, type: 'received', text: 'Okay, noted. Should I continue using it tonight or skip one day?', time: '08:56' },
  { id: 6, type: 'sent', text: 'Use a half amount tonight. If redness worsens or stings, stop and message us again.', time: '08:57', read: true },
  { id: 7, type: 'received', text: 'Got it, thank you for the quick response!', time: '08:58' },
];

const EricaInfo = {
  name: 'Erica Smith',
  status: 'last seen recently',
  avatar: 'https://i.pravatar.cc/150?u=erica',
  about: 'Follow-up dermatology patient under acne treatment, monitoring skin reaction and progress with regular online and in-person consultations.',
  media: [
    'https://images.unsplash.com/photo-1550439062-609e154f2700?w=400&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&auto=format&fit=crop&q=60'
  ],
  documents: [
    'Dermatology_Visit_Summary_2035-03...',
    'Acne_Treatment_Plan_EricaSmith.pdf',
    'Eczema_Treatment_Plan_EricaSmith.p...'
  ],
  links: [
    'https://www.coursify.com/help/login-e...',
    'https://dashboard.coursify.com/user/...',
    'https://dashboard.coursify.com/cours...'
  ]
};

const Messages = () => {
  const [activeChat, setActiveChat] = useState(3);
  const [inputText, setInputText] = useState('');

  return (
    <div className="px-6 py-4 flex flex-col gap-6 h-[calc(100vh-100px)]">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-1 overflow-hidden">
        
        {/* Left: Chat List Header & Items */}
        <div className="w-80 border-r border-gray-50 flex flex-col">
          <div className="p-4 flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search name, chat, etc" 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-1 focus:ring-teal-500"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-teal-600 p-2 rounded-xl text-white hover:bg-teal-700 transition-colors">
              <Plus size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-none">
            {chatThreads.map((chat) => (
              <div 
                key={chat.id} 
                className={`p-4 flex gap-3 cursor-pointer transition-colors relative border-b border-gray-50/50 ${
                  activeChat === chat.id ? 'bg-teal-50/30' : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                {activeChat === chat.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 rounded-r-full"></div>
                )}
                <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`text-xs font-bold truncate ${activeChat === chat.id ? 'text-teal-900' : 'text-gray-900'}`}>{chat.name}</h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-[11px] text-gray-400 truncate flex-1">{chat.message}</p>
                    {chat.unread > 0 && (
                      <span className="bg-teal-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                    {chat.read && (
                      <CheckCheck size={12} className="text-teal-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Top Bar */}
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={EricaInfo.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 leading-none">{EricaInfo.name}</h4>
                <p className="text-[10px] text-gray-400 mt-1">{EricaInfo.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <button className="hover:text-teal-600 transition-colors"><Video size={20} /></button>
              <button className="hover:text-teal-600 transition-colors"><Phone size={20} /></button>
              <button className="hover:text-teal-600 transition-colors"><MoreHorizontal size={20} /></button>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-none bg-slate-50/30">
            <div className="flex justify-center">
              <span className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-white rounded-lg border border-gray-100 shadow-sm">March 8, 2028</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} group`}>
                <div className={`flex gap-2 max-w-[70%] ${msg.type === 'sent' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.type === 'received' && (
                    <img src={EricaInfo.avatar} className="w-6 h-6 rounded-full object-cover mt-auto" />
                  )}
                  <div className="flex flex-col gap-1">
                    <div className={`p-4 rounded-2xl text-[12px] leading-relaxed relative ${
                      msg.type === 'sent' 
                        ? 'bg-teal-600 text-white rounded-tr-none shadow-md shadow-teal-600/10' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-gray-100 shadow-sm shadow-slate-200/50'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 text-[9px] text-gray-400 font-bold ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                      {msg.time}
                      {msg.type === 'sent' && msg.read && <CheckCheck size={12} className="text-teal-600" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Input Area */}
          <div className="p-4 bg-white border-t border-gray-50">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl flex items-center p-2 gap-2 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
              <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                <Smile size={18} />
              </button>
              <input 
                type="text" 
                placeholder="Type a message.." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-xs text-gray-700"
              />
              <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
                <Paperclip size={18} />
              </button>
              <button className="p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-sm shadow-teal-600/20">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Account Info Side Panel */}
        <div className="w-80 border-l border-gray-50 flex flex-col bg-white overflow-y-auto hidden xl:flex scrollbar-none">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 className="text-sm font-bold text-gray-900">Account Info</h3>
            <button className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>

          <div className="p-6 flex flex-col gap-8">
            {/* Profile Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img src={EricaInfo.avatar} className="w-24 h-24 rounded-2xl object-cover border-4 border-teal-50 shadow-sm" />
                <button className="absolute -right-2 -bottom-2 bg-white p-1.5 rounded-lg border border-gray-100 text-teal-600 shadow-sm hover:bg-teal-50 transition-colors">
                  <Edit2 size={12} />
                </button>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-bold text-gray-900 flex items-center justify-center gap-2">
                  {EricaInfo.name} 
                  <Edit2 size={12} className="text-teal-600 cursor-pointer" />
                </h4>
                <p className="text-[10px] text-gray-400 font-medium mt-1">{EricaInfo.status}</p>
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Info size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">About</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {EricaInfo.about}
              </p>
            </div>

            {/* Media */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Media (2)</span>
                <button className="text-teal-600 normal-case hover:underline">Show All</button>
              </div>
              <div className="bg-gray-50 p-1 rounded-xl flex">
                <button className="flex-1 text-[10px] font-bold py-1.5 bg-teal-600 text-white rounded-lg shadow-sm">Image (2)</button>
                <button className="flex-1 text-[10px] font-bold py-1.5 text-gray-400 hover:text-gray-600">Video</button>
                <button className="flex-1 text-[10px] font-bold py-1.5 text-gray-400 hover:text-gray-600">Audio</button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {EricaInfo.media.map((src, i) => (
                  <img key={i} src={src} className="w-full h-24 object-cover rounded-xl" />
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Documents (3)</span>
                <button className="text-teal-600 normal-case hover:underline">Show All</button>
              </div>
              <div className="space-y-2">
                {EricaInfo.documents.map((doc, i) => (
                  <div key={i} className="bg-gray-50/50 p-2 rounded-xl flex items-center gap-3 border border-gray-50 hover:border-teal-100 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-teal-100/50 rounded-lg flex items-center justify-center text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                      <FileText size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 flex-1 truncate">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Links (3)</span>
                <button className="text-teal-600 normal-case hover:underline">Show All</button>
              </div>
              <div className="space-y-2">
                {EricaInfo.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <p className="text-[10px] font-medium text-teal-600 underline truncate flex-1">{link}</p>
                    <button className="text-gray-400 hover:text-teal-600"><Copy size={12} /></button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;
