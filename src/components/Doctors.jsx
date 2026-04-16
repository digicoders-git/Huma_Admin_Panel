import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal, ChevronDown, Plus,
  MessageCircle, Phone, MoreHorizontal
} from 'lucide-react';
import AddDoctorModal from './AddDoctorModal';

// No hardcoded tabs here, they are fetched dynamically

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) =>
  status === 'Available' ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary-light text-primary">
      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
      Available
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-400">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
      Unavailable
    </span>
  );

// ── Doctor Card ───────────────────────────────────────────────────────────────
const DoctorCard = ({ doctor, onOpenDetails }) => {
  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(doctor)}
      className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden cursor-pointer ${
        doctor.selected
          ? 'border-primary shadow-md shadow-primary/10'
          : 'border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30'
      }`}
    >
      {/* Card Top: Name + Menu + Status */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-gray-900 text-[14px] leading-tight">{doctor.fullName}</h4>
          <button className="text-gray-400 hover:text-gray-700 flex-shrink-0 -mt-0.5">
            <MoreHorizontal size={18} />
          </button>
        </div>
        <StatusBadge status={doctor.status} />
      </div>

      {/* Doctor Photo */}
      <div className="flex-1 flex items-end justify-center px-4 pt-2 pb-0 min-h-[180px] bg-gradient-to-b from-gray-50/0 to-gray-50/60 overflow-hidden">
        <img
          src={doctor.avatar ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${doctor.avatar}` : `https://i.pravatar.cc/300?u=${doctor._id}`}
          alt={doctor.fullName}
          className="w-full max-w-[180px] h-[200px] object-cover object-top rounded-t-2xl"
          style={{ objectPosition: 'center top' }}
        />
      </div>

      {/* Specialty + Schedule */}
      <div className="bg-white px-4 pt-3 pb-1 text-center border-t border-gray-50">
        <p className="font-bold text-gray-900 text-[13px]">{doctor.specialization || 'General Medicine'}</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
          {doctor.workType || 'Full Time'} • {doctor.department || 'General'}
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/30 transition-colors">
            <MessageCircle size={15} />
          </button>
          <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/30 transition-colors">
            <Phone size={15} />
          </button>
        </div>
        <button className="flex-1 bg-primary-light text-primary text-[12px] font-semibold py-2 px-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
          Assign Patient
        </button>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Doctors = ({ onOpenDetails }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [docRes, deptRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/doctor`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/department`)
      ]);
      const [docData, deptData] = await Promise.all([docRes.json(), deptRes.json()]);
      
      if (docData.success) setDoctorsList(docData.data);
      if (deptData.success) setDepartments(deptData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabs = ['All', ...departments.map(d => d.name)];

  const filtered =
    activeTab === 'All'
      ? doctorsList
      : doctorsList.filter((d) => d.department === activeTab || d.specialization === activeTab);

  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        {/* ── Top Bar: Filter + Add ─────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3 mb-5">
          <button className="flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary rounded-xl text-[13px] font-semibold hover:bg-primary-light transition-colors">
            <SlidersHorizontal size={14} />
            All Status
            <ChevronDown size={14} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-semibold hover:opacity-90 transition-colors shadow-sm shadow-primary/30">
            <Plus size={15} />
            Add New Doctor
          </button>
        </div>

        {/* ── Category Tabs ─────────────────────────────────────────── */}
        <div className="flex items-center gap-0 border-b border-gray-100 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 pb-3 pt-1 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900 -mb-px'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Doctor Cards Grid ─────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-10 text-gray-400 font-semibold">Loading Doctors...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-semibold">No Doctors Found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} onOpenDetails={onOpenDetails} />
            ))}
          </div>
        )}
      </div>

      {/* Add Doctor Modal */}
      <AddDoctorModal isOpen={showModal} onClose={() => { setShowModal(false); fetchData(); }} />
    </div>
  );
};


export default Doctors;
