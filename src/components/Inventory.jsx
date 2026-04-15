import React from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  LayoutGrid, 
  TrendingDown, 
  XCircle, 
  Info,
  MoreHorizontal,
  ChevronRight,
  Minus,
  AlertCircle,
  Package
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const stats = [
  { label: 'Total Items in Stock', value: '1,280 Items', trend: '+6% vs. last month', isUp: true, icon: LayoutGrid, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Low Stock Items', value: '34 Items', trend: '-3% vs. last week', isUp: false, icon: TrendingDown, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Out-of-Stock Items', value: '7 Items', trend: '-2 items vs. last week', isUp: false, icon: XCircle, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Expiring Soon Items', value: '19 Items', trend: '+4 items vs. last month', isUp: true, icon: Info, color: 'text-teal-600', bg: 'bg-teal-50' },
];

const usageTrendData = [
  { day: 'Mon', value: 30, pct: '1.5%' },
  { day: 'Tue', value: 40, pct: '2%' },
  { day: 'Wed', value: 55, pct: '3.6%' },
  { day: 'Thu', value: 45, pct: '2.7%' },
  { day: 'Fri', value: 70, pct: '4.2%' },
  { day: 'Sat', value: 50, pct: '4%' },
  { day: 'Sun', value: 85, pct: '6.2%' },
];

const categories = [
  { name: 'Medications Stuff', pct: 40, count: 512, color: 'bg-teal-600', stripe: true },
  { name: 'Consumables (Gloves, Syringes, etc)', pct: 30, count: 384, color: 'bg-teal-400', stripe: true },
  { name: 'IV & Fluids Items', pct: 12, count: 154, color: 'bg-teal-100', stripe: false },
  { name: 'Laboratory Supplies', pct: 10, count: 128, color: 'bg-teal-500', stripe: false },
  { name: 'Medical Equipment & Accessories', pct: 8, count: 102, color: 'bg-slate-800', stripe: false },
];

const inventoryItems = [
  { 
    id: 1, 
    name: 'Surgical Gloves Nitrile Medium', 
    sku: 'GLV-NT-M', 
    category: 'Consumables', 
    availability: 'Available', 
    quantity: 320, 
    unit: 'Boxes', 
    stockPct: 80, 
    date: '30 Dec 2035', 
    status: 'Safe',
    image: 'https://images.unsplash.com/photo-1584305323472-d318e818d6e1?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 2, 
    name: 'Normal Saline 0.9% 500ml', 
    sku: 'IVF-NS-500', 
    category: 'IV & Fluids', 
    availability: 'Available', 
    quantity: 180, 
    unit: 'Bottles', 
    stockPct: 70, 
    date: '15 Nov 2035', 
    status: 'Safe',
    image: 'https://images.unsplash.com/photo-1581093458791-4e117498c484?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 3, 
    name: 'Paracetamol 500mg Tablets', 
    sku: 'MED-PARA-500', 
    category: 'Medications', 
    availability: 'Low', 
    quantity: 24, 
    unit: 'Boxes', 
    stockPct: 20, 
    date: '20 August 2035', 
    status: 'Near Expiry',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 4, 
    name: 'Ceftriaxone 1g Injection', 
    sku: 'MED-CEF-1G', 
    category: 'Medications', 
    availability: 'Available', 
    quantity: 95, 
    unit: 'Vials', 
    stockPct: 60, 
    date: '05 July 2036', 
    status: 'Safe',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100'
  },
  { 
    id: 5, 
    name: 'Rapid COVID-19 Antigen Test Kit', 
    sku: 'LAB-RAP-AG', 
    category: 'Laboratory Supplies', 
    availability: 'Out of Stock', 
    quantity: 0, 
    unit: 'Packs', 
    stockPct: 0, 
    date: '01 June 2035', 
    status: 'Expired',
    image: 'https://images.unsplash.com/photo-1614948152266-786c3f1030d0?auto=format&fit=crop&q=80&w=100'
  },
];

const activities = [
  { type: 'added', title: 'Stock added', desc: '50 boxes Surgical Gloves (Medium) to Central Store', time: '5m ago', icon: Plus, color: 'text-teal-600', bg: 'bg-teal-50' },
  { type: 'removed', title: 'Stock removed', desc: '20 bottles Normal Saline 0.9% for Emergency Dept', time: '37m ago', icon: Minus, color: 'text-red-600', bg: 'bg-red-50' },
  { type: 'transfer', title: 'Transfer', desc: '10 vials Insulin to ICU from Pharmacy', time: '2h ago', icon: ArrowUpRight, color: 'text-teal-600', bg: 'bg-teal-50' },
  { type: 'wastage', title: 'Wastage', desc: '6 packs expired Rapid Test Kits disposed', time: '4h ago', icon: Info, color: 'text-gray-400', bg: 'bg-gray-100' },
  { type: 'damaged', title: 'Damaged items report', desc: '2 units Portable BP Monitor (screen cracked)', time: 'Yesterday', icon: AlertCircle, color: 'text-gray-400', bg: 'bg-gray-100' },
  { type: 'added', title: 'Stock added', desc: '120 units N95 Masks to Isolation Ward Store', time: 'Yesterday', icon: Plus, color: 'text-teal-600', bg: 'bg-teal-50' },
  { type: 'transfer', title: 'Transfer', desc: '5 units Syringe Pump to NICU from Equipment Room', time: 'Yesterday', icon: ArrowUpRight, color: 'text-teal-600', bg: 'bg-teal-50' },
];

const Inventory = () => {
  return (
    <div className="px-6 py-4 flex flex-col gap-6">
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-400">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className={`flex items-center gap-1.5 text-[10px] font-bold ${stat.isUp ? 'text-teal-600' : 'text-red-500'}`}>
              <div className={`p-0.5 rounded ${stat.isUp ? 'bg-teal-50' : 'bg-red-50'}`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inventory Usage Trend */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-900">Inventory Usage Trend</h3>
                <h4 className="text-3xl font-bold text-gray-900 mt-2">+2,6%</h4>
                <p className="text-[10px] text-gray-400 mt-1">Inventory Usage Trend normally increase every weeks</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
              This Week <ChevronRight size={12} className="rotate-90" />
            </button>
          </div>
          <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageTrendData} margin={{ top: 20, right: 0, left: -25, bottom: 0 }} barSize={35}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-800 text-white px-2 py-1 shadow-md rounded text-[10px] font-bold flex flex-col items-center">
                          <span className="opacity-70">{payload[0].payload.pct}</span>
                          <ChevronRight size={10} className="rotate-90 text-white" />
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                  {usageTrendData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === 'Fri' || entry.day === 'Sun' ? '#3D9F9D' : '#ccf2f4'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900">Category Breakdown</h3>
            <button className="text-gray-400">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-20 flex gap-0.5 rounded-xl overflow-hidden mb-8">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className={`${cat.color} h-full relative transition-all hover:opacity-90`}
                style={{ width: `${cat.pct}%` }}
              >
                {cat.stripe && (
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)' , backgroundSize: '10px 10px'}}></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-y-4 gap-x-6">
            {categories.map((cat, i) => (
              <div key={i} className="flex gap-2">
                <div className={`w-1 rounded-full ${cat.color}`}></div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 leading-tight w-24">{cat.name}</h4>
                  <p className="text-[9px] text-gray-400 mt-1 whitespace-nowrap">
                    <span className="font-bold text-gray-900">{cat.pct}%</span> {cat.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Table and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Inventory Table */}
        <div className="lg:col-span-9 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Inventory</h3>
            <button className="text-gray-400">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                  <th className="pb-3 text-center"><input type="checkbox" className="rounded" /></th>
                  <th className="pb-3 px-2">Photo</th>
                  <th className="pb-3 px-2">Item</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Availability</th>
                  <th className="pb-3 px-2">Quantity in Stock</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-center"><input type="checkbox" className="rounded" /></td>
                    <td className="py-4 px-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                    </td>
                    <td className="py-4 px-2 min-w-[200px]">
                      <p className="text-xs font-bold text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">SKU: {item.sku}</p>
                    </td>
                    <td className="py-4 px-2 text-xs text-gray-500 font-medium">{item.category}</td>
                    <td className="py-4 px-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.availability === 'Available' ? 'bg-teal-50 text-teal-600' :
                        item.availability === 'Low' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-red-50 text-red-500'
                      }`}>
                        {item.availability}
                      </span>
                    </td>
                    <td className="py-4 px-2 min-w-[140px]">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-gray-900">{item.quantity} {item.unit}</span>
                          <span className="text-gray-400 font-medium">{item.stockPct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.stockPct < 30 ? 'bg-emerald-400' : 'bg-teal-600'}`} 
                            style={{ width: `${item.stockPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900">{item.date}</span>
                        <span className={`text-[10px] font-bold mt-0.5 ${
                          item.status === 'Safe' ? 'text-teal-600' :
                          item.status === 'Near Expiry' ? 'text-orange-500' :
                          'text-red-500'
                        }`}>{item.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button className="px-4 py-1.5 border border-gray-200 rounded-xl text-[10px] font-bold text-teal-600 hover:bg-gray-50 transition-colors">
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Activities */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900">Inventory Activities</h3>
            <button className="text-gray-400">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 relative">
            {/* Timeline line */}
            <div className="absolute left-[13px] top-6 bottom-6 w-[1px] bg-gray-100"></div>

            {activities.map((act, i) => (
              <div key={i} className="flex gap-4 relative z-10 bg-white">
                <div className={`w-7 h-7 rounded-lg ${act.bg} ${act.color} flex items-center justify-center flex-shrink-0`}>
                  <act.icon size={14} />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{act.title}</h4>
                    <span className="text-[9px] text-gray-400 whitespace-nowrap">{act.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-700 leading-tight">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Inventory;
