import React from 'react';
import { 
  Search, Bell, Settings, Menu,
  ChevronDown, ChevronsUpDown, Info, CheckCircle2, CircleDashed
} from 'lucide-react';

const patientsData = [
  {
    id: '#PT-2035-001',
    name: 'Alicia Perth',
    avatar: 'https://i.pravatar.cc/150?u=11',
    gender: '♀',
    age: 34,
    condition: 'Hypertension',
    doctorName: 'Dr. Amelia Hart',
    doctorSpecialty: 'Cardiology',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'Discharged'
  },
  {
    id: '#PT-2035-024',
    name: 'Bima Kurnia',
    avatar: 'https://i.pravatar.cc/150?u=12',
    gender: '♂',
    age: 29,
    condition: 'Gastritis',
    doctorName: 'Dr. Rizky Pratama',
    doctorSpecialty: 'General Medicine',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'Discharged'
  },
  {
    id: '#PT-2035-053',
    name: 'Clara Wright',
    avatar: 'https://i.pravatar.cc/150?u=13',
    gender: '♀',
    age: 7,
    condition: 'Dengue Fever',
    doctorName: 'Dr. Sophia Liang',
    doctorSpecialty: 'Pediatrics',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'In Treatment'
  },
  {
    id: '#PT-2035-078',
    name: 'Daniel Wong',
    avatar: 'https://i.pravatar.cc/150?u=14',
    gender: '♂',
    age: 42,
    condition: 'Bone Fracture',
    doctorName: 'Dr. Daniel Obeng',
    doctorSpecialty: 'Orthopedics',
    type: 'Inpatient',
    admissionDate: '11 March 2035',
    location: 'Room 402B - 4th Floor',
    status: 'Admitted',
    activeRow: true
  },
  {
    id: '#PT-2035-091',
    name: 'Erica Smith',
    avatar: 'https://i.pravatar.cc/150?u=15',
    gender: '♀',
    age: 26,
    condition: 'Acne',
    doctorName: 'Dr. Nina Alvarez',
    doctorSpecialty: 'Dermatology',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'In Treatment'
  },
  {
    id: '#PT-2035-129',
    name: 'Francis Rowe',
    avatar: 'https://i.pravatar.cc/150?u=16',
    gender: '♂',
    age: 51,
    condition: 'Arrhythmia',
    doctorName: 'Dr. Amelia Hart',
    doctorSpecialty: 'Cardiology',
    type: 'Inpatient',
    admissionDate: '10 March 2035',
    location: 'Room 305A - 3rd Floor',
    status: 'Admitted'
  },
  {
    id: '#PT-2035-141',
    name: 'Grace Nathanile',
    avatar: 'https://i.pravatar.cc/150?u=17',
    gender: '♀',
    age: 31,
    condition: 'Migraine',
    doctorName: 'Dr. Rizky Pratama',
    doctorSpecialty: 'General Medicine',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'Discharged'
  },
  {
    id: '#PT-2035-152',
    name: 'Hasan Malik',
    avatar: 'https://i.pravatar.cc/150?u=18',
    gender: '♂',
    age: 47,
    condition: 'Sciatica',
    doctorName: 'Dr. Daniel Obeng',
    doctorSpecialty: 'Orthopedics',
    type: 'Inpatient',
    admissionDate: '12 March 2035',
    location: 'Room 210C - 2nd Floor',
    status: 'Admitted'
  },
  {
    id: '#PT-2035-163',
    name: 'Indah Lestari',
    avatar: 'https://i.pravatar.cc/150?u=19',
    gender: '♀',
    age: 9,
    condition: 'Viral Infection',
    doctorName: 'Dr. Sophia Liang',
    doctorSpecialty: 'Pediatrics',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'Discharged'
  },
  {
    id: '#PT-2035-175',
    name: 'Johan Greece',
    avatar: 'https://i.pravatar.cc/150?u=20',
    gender: '♂',
    age: 38,
    condition: 'Dermatitis',
    doctorName: 'Dr. Nina Alvarez',
    doctorSpecialty: 'Dermatology',
    type: 'Outpatient',
    admissionDate: '—',
    location: '—',
    status: 'In Treatment'
  },
  {
    id: '#PT-2035-188',
    name: 'Liam Becker',
    avatar: 'https://i.pravatar.cc/150?u=21',
    gender: '♂',
    age: 52,
    condition: 'Diabetes',
    doctorName: 'Dr. Rizky Pratama',
    doctorSpecialty: 'General Medicine',
    type: 'Inpatient',
    admissionDate: '11 March 2035',
    location: 'Room 108A - 1st Floor',
    status: 'Admitted'
  },
  {
    id: '#PT-2035-196',
    name: 'Mei Tan',
    avatar: 'https://i.pravatar.cc/150?u=22',
    gender: '♀',
    age: 36,
    condition: 'Pneumonia',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'Pulmonology',
    type: 'Inpatient',
    admissionDate: '09 March 2035',
    location: 'ICU 02 - 1st Floor',
    status: 'Admitted'
  }
];

const renderStatusBadge = (status) => {
  switch (status) {
    case 'Discharged':
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary-light text-primary border border-primary/20 flex items-center gap-1 w-max">
          <Info size={12} /> Discharged
        </span>
      );
    case 'In Treatment':
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary text-white flex items-center gap-1 w-max shadow-sm">
          <CircleDashed size={12} /> In Treatment
        </span>
      );
    case 'Admitted':
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary-light text-primary flex items-center gap-1 w-max">
          <CheckCircle2 size={12} /> Admitted
        </span>
      );
    default:
      return null;
  }
};

const Patients = ({ onOpenDetails }) => {
  return (
    <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto flex flex-col gap-6">
      
      {/* Appointments Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header & Filters */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between p-6 pb-4 border-b border-gray-100/0 gap-4">
          <h3 className="font-bold text-gray-900 text-lg">Appointments</h3>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-light text-primary rounded-full text-[13px] font-semibold hover:opacity-80 transition-colors whitespace-nowrap">
              Gender <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-light text-primary rounded-full text-[13px] font-semibold hover:opacity-80 transition-colors whitespace-nowrap">
              Age <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-light text-primary rounded-full text-[13px] font-semibold hover:opacity-80 transition-colors whitespace-nowrap">
              Patient Type <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-light text-primary rounded-full text-[13px] font-semibold hover:opacity-80 transition-colors whitespace-nowrap">
              Condition <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="text-[12px] text-gray-400 font-semibold border-b border-gray-100">
                <th className="font-medium pb-4 w-12 pl-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-[15px] w-[15px]" />
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Name <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Gender / Age <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Condition <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Doctor <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Patient Type <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Admission Date <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                    Location <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="font-medium pb-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 justify-end pr-2">
                    Status <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {patientsData.map((patient, index) => (
                <tr
                  key={patient.id}
                  onClick={() => onOpenDetails && onOpenDetails(patient)}
                  className={`border-b border-gray-50 last:border-0 transition-colors cursor-pointer ${
                    patient.activeRow
                      ? 'bg-primary/5 hover:bg-primary/10'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <td className="py-3.5 pl-2" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-[15px] w-[15px]" />
                  </td>
                  <td className="py-3.5 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900">{patient.name}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-700 font-medium whitespace-nowrap">
                    <span className="text-gray-500 mr-1">{patient.gender}</span> / {patient.age}
                  </td>
                  <td className="py-3.5 font-semibold text-primary">
                    {patient.condition}
                  </td>
                  <td className="py-3.5 min-w-[180px]">
                    <div className="font-semibold text-gray-900 leading-tight">{patient.doctorName}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{patient.doctorSpecialty}</div>
                  </td>
                  <td className="py-3.5 font-semibold text-gray-800">
                    {patient.type}
                  </td>
                  <td className="py-3.5 font-medium text-gray-800 whitespace-nowrap">
                    {patient.admissionDate}
                  </td>
                  <td className="py-3.5 font-medium text-gray-800 whitespace-nowrap">
                    {patient.location}
                  </td>
                  <td className="py-3.5 pr-2">
                    <div className="flex justify-end">
                      {renderStatusBadge(patient.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
