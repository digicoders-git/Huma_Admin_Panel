import React, { useState } from 'react';
import {
  SlidersHorizontal, ChevronDown, Plus,
  MessageCircle, Phone, MoreHorizontal
} from 'lucide-react';
import AddDoctorModal from './AddDoctorModal';

// ── Doctor Data ───────────────────────────────────────────────────────────────
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Amelia Hart',
    specialty: 'Cardiology',
    schedule: 'Monday – Friday (08:00 – 14:00)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=amelia_hart_doc',
    category: 'Cardiology',
  },
  {
    id: 2,
    name: 'Dr. Rizky Pratama',
    specialty: 'General Medicine',
    schedule: 'Monday – Saturday (09:00 – 17:00)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=rizky_pratama_doc',
    category: 'General Medicine',
  },
  {
    id: 3,
    name: 'Dr. Sophia Liang',
    specialty: 'Pediatrics',
    schedule: 'Monday – Friday (10:00 – 18:00)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=sophia_liang_doc',
    category: 'Pediatrics',
  },
  {
    id: 4,
    name: 'Dr. Daniel Obeng',
    specialty: 'Orthopedics',
    schedule: 'Mon – Thu (08:00 – 12:00) / Sat (09:00 – 13:00)',
    status: 'Unavailable',
    avatar: 'https://i.pravatar.cc/300?u=daniel_obeng_doc',
    category: 'Orthopedics',
  },
  {
    id: 5,
    name: 'Dr. Nina Alvarez',
    specialty: 'Dermatology',
    schedule: 'Tuesday – Saturday (13:00 – 20:00)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=nina_alvarez_doc',
    category: 'Dermatology',
    selected: true,
  },
  {
    id: 6,
    name: 'Dr. Arjun Mehta',
    specialty: 'Pulmonology',
    schedule: 'Monday – Friday (08:00 – 16:00)',
    status: 'Unavailable',
    avatar: 'https://i.pravatar.cc/300?u=arjun_mehta_doc',
    category: 'General Medicine',
  },
  {
    id: 7,
    name: 'Dr. Laila Hassan',
    specialty: 'Neurology',
    schedule: 'Monday – Friday (09:00 – 15:00)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=laila_hassan_doc',
    category: 'Neurology',
  },
  {
    id: 8,
    name: 'Dr. Marco Silva',
    specialty: 'Radiology',
    schedule: 'Monday – Sunday (07:00 – 13:00)',
    status: 'Unavailable',
    avatar: 'https://i.pravatar.cc/300?u=marco_silva_doc',
    category: 'General Medicine',
  },
  {
    id: 9,
    name: 'Dr. Hana Sato',
    specialty: 'Obstetrics & Gynecology',
    schedule: 'Monday – Friday (14:00 – 21:00)',
    status: 'Unavailable',
    avatar: 'https://i.pravatar.cc/300?u=hana_sato_doc',
    category: 'General Medicine',
  },
  {
    id: 10,
    name: 'Dr. Johan Müller',
    specialty: 'Oncology',
    schedule: 'Monday – Friday (08:30 – 16:30)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=johan_muller_doc',
    category: 'General Medicine',
  },
  {
    id: 11,
    name: 'Dr. Victor Rossi',
    specialty: 'Anesthesiology',
    schedule: 'Rotational (24h On / 48h Off)',
    status: 'Unavailable',
    avatar: 'https://i.pravatar.cc/300?u=victor_rossi_doc',
    category: 'General Medicine',
  },
  {
    id: 12,
    name: 'Dr. Sarah Ibrahim',
    specialty: 'Emergency Medicine',
    schedule: 'Night Shift (19:00 – 07:00)',
    status: 'Available',
    avatar: 'https://i.pravatar.cc/300?u=sarah_ibrahim_doc',
    category: 'General Medicine',
  },
];

const tabs = ['All', 'General Medicine', 'Pediatrics', 'Cardiology', 'Orthopedics', 'Dermatology', 'Neurology'];

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
          <h4 className="font-bold text-gray-900 text-[14px] leading-tight">{doctor.name}</h4>
          <button className="text-gray-400 hover:text-gray-700 flex-shrink-0 -mt-0.5">
            <MoreHorizontal size={18} />
          </button>
        </div>
        <StatusBadge status={doctor.status} />
      </div>

      {/* Doctor Photo */}
      <div className="flex-1 flex items-end justify-center px-4 pt-2 pb-0 min-h-[180px] bg-gradient-to-b from-gray-50/0 to-gray-50/60 overflow-hidden">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-full max-w-[180px] h-[200px] object-cover object-top rounded-t-2xl"
          style={{ objectPosition: 'center top' }}
        />
      </div>

      {/* Specialty + Schedule */}
      <div className="bg-white px-4 pt-3 pb-1 text-center border-t border-gray-50">
        <p className="font-bold text-gray-900 text-[13px]">{doctor.specialty}</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{doctor.schedule}</p>
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

  const filtered =
    activeTab === 'All'
      ? doctorsData
      : doctorsData.filter((d) => d.category === activeTab || d.specialty === activeTab);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onOpenDetails={onOpenDetails} />
          ))}
        </div>
      </div>

      {/* Add Doctor Modal */}
      <AddDoctorModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};


export default Doctors;
