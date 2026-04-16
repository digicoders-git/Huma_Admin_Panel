import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  MoreHorizontal
} from 'lucide-react';

const Departments = ({ onOpenDetails }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/department`);
      const data = await res.json();
      if (data.success) setDepartments(data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filtered = departments.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="px-6 py-4 flex flex-col gap-6">
      {/* Search and Header */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search Departments" 
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-[#992120]/20 text-sm"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
           <p className="col-span-full text-center py-10 text-gray-400">Loading departments...</p>
        ) : filtered.map((dept) => (
          <div 
            key={dept._id} 
            onClick={() => onOpenDetails && onOpenDetails(dept)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer p-6"
          >
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-gray-50 text-[#992120] rounded-xl">
                  <Building2 size={24} />
               </div>
               <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
              {dept.description || 'Medical department providing specialized care.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
