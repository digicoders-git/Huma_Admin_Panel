import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Doctors from './components/Doctors';
import Hospitals from './components/Hospitals';
import HospitalDetails from './components/HospitalDetails';
import Specialities from './components/Specialities';
import ManageDepts from './components/ManageDepts';
import Enquiries from './components/Enquiries';
import Messages from './components/Messages';
import Notifications from './components/Notifications';
import ChangePassword from './components/ChangePassword';
import Profile from './components/Profile';
import WebsiteContent from './components/WebsiteContent';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import News from './components/News';
import Login from './components/Login';
import PatientDetails from './components/PatientDetails';
import DoctorDetails from './components/DoctorDetails';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // selectedDoctor and selectedHospital states are now handled via URL params

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  if (location.pathname === '/login') {
    return <Login onLogin={handleLogin} />;
  }

  // Map path to title
  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes('patient-details')) return 'Patient Details';
    if (path.includes('doctor-details')) return 'Doctor Details';
    if (path.includes('hospital-details')) return 'Hospital Details';
    if (path === '/appointments') return 'Appointments';
    if (path === '/patients') return 'Patients';
    if (path === '/doctors') return 'Doctors';
    if (path === '/hospitals') return 'Hospitals';
    if (path === '/depts-services') return 'Depts & Services';
    if (path === '/specialities') return 'Specialities';
    if (path === '/enquiries') return 'Enquiries';
    if (path === '/messages') return 'Messages';
    if (path === '/notifications') return 'Notifications';
    if (path === '/change-password') return 'Change Password';
    if (path === '/profile') return 'Profile';
    if (path === '/manage-content') return 'Manage Content';
    if (path === '/gallery') return 'Hospital Gallery';
    if (path === '/testimonials') return 'Patient Testimonials';
    if (path === '/news') return 'News & Announcements';
    return 'Dashboard';
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('patient')) return 'Patients';
    if (path.includes('doctor')) return 'Doctors';
    if (path.includes('hospital')) return 'Hospitals';
    if (path === '/depts-services') return 'Depts & Services';
    if (path === '/specialities') return 'Specialities';
    if (path === '/appointments') return 'Appointments';
    if (path === '/enquiries') return 'Enquiries';
    if (path === '/messages') return 'Messages';
    if (path === '/manage-content') return 'Manage Content';
    if (path === '/gallery') return 'Gallery';
    if (path === '/testimonials') return 'Testimonials';
    if (path === '/news') return 'News';
    if (path === '/change-password') return 'Change Password';
    if (path === '/dashboard') return 'Dashboard';
    return '';
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTab={getActiveTab()}
        setActiveTab={(tab) => {
          const routes = {
            'Dashboard': '/dashboard',
            'Appointments': '/appointments',
            'Patients': '/patients',
            'Doctors': '/doctors',
            'Specialities': '/specialities',
            'Enquiries': '/enquiries',
            'Messages': '/messages',
            'Manage Content': '/manage-content',
            'Gallery': '/gallery',
            'Testimonials': '/testimonials',
            'News': '/news',
            'Change Password': '/change-password'
          };
          navigate(routes[tab] || '/dashboard');
        }}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header
          setMobileMenuOpen={setMobileMenuOpen}
          setActiveTab={(tab) => {
             if (tab === 'Notifications') navigate('/notifications');
             if (tab === 'Settings') navigate('/change-password');
             if (tab === 'Profile') navigate('/profile');
          }}
          title={getHeaderTitle()}
          showSubtitle={location.pathname === '/dashboard'}
        />
        <main className="flex-1 overflow-x-hidden pt-6 pb-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients onOpenDetails={(p) => navigate(`/patient-details/${p.id || p._id}`)} />} />
            <Route path="/patient-details/:id" element={<PatientDetails onBack={() => navigate('/patients')} />} />
            <Route path="/doctors" element={<Doctors onOpenDetails={(d) => navigate(`/doctor-details/${d._id}`)} />} />
            <Route path="/doctor-details/:id" element={<DoctorDetails onBack={() => navigate('/doctors')} />} />
            <Route path="/hospitals" element={<Hospitals onOpenDetails={(h) => navigate(`/hospital-details/${h._id}`)} />} />
            <Route path="/hospital-details/:id" element={<HospitalDetails onBack={() => navigate('/hospitals')} />} />
            <Route path="/depts-services" element={<ManageDepts />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/change-password" element={<ChangePassword onBack={() => navigate('/dashboard')} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-content" element={<WebsiteContent />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/news" element={<News />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Footer removed from main for clean routing, or kept if needed globally */}
        </main>
      </div>
    </div>
  );
}

export default App;

