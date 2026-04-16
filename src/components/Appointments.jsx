import React, { useState, useEffect } from 'react';
import { 
  FileText, ShieldCheck, Clock, XSquare, 
  ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw
} from 'lucide-react';

const renderStatusBadge = (status) => {
  switch(status) {
    case 'Completed':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary/10">Completed</span>;
    case 'Ongoing':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">Ongoing</span>;
    case 'Scheduled':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-500 border border-blue-100">Scheduled</span>;
    case 'Canceled':
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-100">Canceled</span>;
    default:
      return null;
  }
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, newStatus: null, isLoading: false });

  const openConfirmStatusModal = (id, newStatus) => {
    setConfirmModal({ isOpen: true, id, newStatus, isLoading: false });
  };

  const confirmStatusChange = async () => {
    if (!confirmModal.id) return;
    const { id, newStatus } = confirmModal;
    setConfirmModal(prev => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setConfirmModal({ isOpen: false, id: null, newStatus: null, isLoading: false });
    }
  };

  const statCards = [
    { 
      title: "Total Appointments", 
      value: appointments.length.toString(), 
      trend: "All Time", 
      isPositiveTrend: true,
      desc: "All booked appointments in the system", 
      descBold: "",
      icon: FileText,
      iconColor: "text-primary",
      trendBg: "bg-primary-light"
    },
    { 
      title: "Completed", 
      value: appointments.filter(a => a.status === 'Completed').length.toString(), 
      trend: "Done", 
      isPositiveTrend: true,
      desc: "Total completed appointments: ", 
      descBold: appointments.filter(a => a.status === 'Completed').length.toString(),
      icon: ShieldCheck,
      iconColor: "text-primary",
      trendBg: "bg-primary-light"
    },
    { 
      title: "Ongoing / Scheduled", 
      value: appointments.filter(a => a.status === 'Ongoing' || a.status === 'Scheduled').length.toString(), 
      trend: "Active", 
      isPositiveTrend: true,
      desc: "Currently running or scheduled",
      descBold: "",
      icon: Clock,
      iconColor: "text-primary",
      trendBg: "bg-yellow-50 text-yellow-600"
    },
    { 
      title: "Canceled", 
      value: appointments.filter(a => a.status === 'Canceled').length.toString(), 
      trend: "Cancel", 
      isPositiveTrend: false, 
      isNegativeColor: true,
      desc: "Appointments that were canceled",
      descBold: "",
      icon: XSquare,
      iconColor: "text-primary",
      trendBg: "bg-red-50 text-red-500"
    },
  ];

  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto flex flex-col gap-6">

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                <card.icon size={18} className={card.iconColor} />
                {card.title}
              </div>
              <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-4xl font-bold text-gray-900">{card.value}</h3>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${
                card.isNegativeColor || !card.isPositiveTrend ? 'bg-red-50 text-red-500' : 'bg-primary-light text-primary'
              }`}>
                {card.isPositiveTrend ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {card.trend}
              </div>
            </div>

            <p className="text-[13px] text-gray-500 leading-tight">
              {card.desc}
              {card.descBold && <span className="font-bold text-gray-900">{card.descBold}</span>}
            </p>
          </div>
        ))}
      </div>



      {/* Appointments List View */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Appointments</h3>
          <button className="flex items-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium text-gray-600 hover:bg-gray-100">
            This Week <ChevronDown size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 text-[13px] text-gray-500 border-b border-gray-100">
                <th className="font-medium p-4 pl-6 w-12"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" /></th>
                <th className="font-medium p-4 py-3">Name ↕</th>
                <th className="font-medium p-4 py-3">Phone Number ↕</th>
                <th className="font-medium p-4 py-3">Doctor ↕</th>
                <th className="font-medium p-4 py-3">Appointment Type ↕</th>
                <th className="font-medium p-4 py-3">Notes ↕</th>
                <th className="font-medium p-4 py-3">Date ↕</th>
                <th className="font-medium p-4 py-3">Status ↕</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500 font-medium">Loading appointments...</td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500 font-medium">No appointments found.</td>
                </tr>
              ) : appointments.map((app) => (
                <tr key={app._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" /></td>
                  <td className="p-4 py-3 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <img src={app.avatar || 'https://i.pravatar.cc/150?u=12'} alt={app.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900 leading-tight">{app.name}</div>
                        <div className="text-[12px] text-gray-500 mt-0.5">{app.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 py-3 text-gray-600 font-medium whitespace-nowrap">{app.phone}</td>
                  <td className="p-4 py-3 min-w-[180px]">
                    <div className="font-semibold text-gray-900 leading-tight">{app.doctor}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{app.specialty || 'General'}</div>
                  </td>
                  <td className="p-4 py-3 font-medium text-gray-700">{app.type}</td>
                  <td className="p-4 py-3 w-[200px]">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <FileText size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">{app.notes || 'No notes'}</span>
                    </div>
                  </td>
                  <td className="p-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900 leading-tight">{app.date}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{app.time}</div>
                  </td>
                  <td className="p-4 py-3 whitespace-nowrap pr-6">
                    <select
                      value={app.status}
                      onChange={(e) => openConfirmStatusModal(app._id, e.target.value)}
                      className="px-3 py-1 rounded-full text-xs font-semibold focus:outline-none cursor-pointer border"
                      style={{
                        backgroundColor: app.status === 'Completed' ? 'rgba(153,33,32,0.1)' : app.status === 'Ongoing' ? '#992120' : app.status === 'Scheduled' ? '#EFF6FF' : '#FEF2F2',
                        color: app.status === 'Completed' ? '#992120' : app.status === 'Ongoing' ? '#FFFFFF' : app.status === 'Scheduled' ? '#3B82F6' : '#EF4444',
                        borderColor: app.status === 'Completed' ? 'rgba(153,33,32,0.1)' : app.status === 'Ongoing' ? '#992120' : app.status === 'Scheduled' ? '#DBEAFE' : '#FEE2E2',
                        appearance: 'none',
                        textAlign: 'center'
                      }}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tailwind Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Change Status</h3>
            <p className="text-sm text-gray-500 mb-6 font-medium">
              Are you sure you want to change the status to <span className="font-bold text-primary">{confirmModal.newStatus}</span>? This action will save immediately.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmModal({ isOpen: false, id: null, newStatus: null, isLoading: false })}
                disabled={confirmModal.isLoading}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                disabled={confirmModal.isLoading}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-colors disabled:opacity-50 flex items-center gap-2"
                style={{ backgroundColor: '#992120' }}
              >
                {confirmModal.isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Yes, Change it'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
