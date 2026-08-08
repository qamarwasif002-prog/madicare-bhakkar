import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DoctorsSection } from './components/DoctorsSection';
import { ServicesSection } from './components/ServicesSection';
import { AppointmentSection } from './components/AppointmentSection';
import { QuickCallBanner } from './components/QuickCallBanner';
import { LocationSection } from './components/LocationSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AppointmentsListModal } from './components/AppointmentsListModal';
import { SubmittedAppointment } from './types';

export default function App() {
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string>('');
  const [submittedRequests, setSubmittedRequests] = useState<SubmittedAppointment[]>([]);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState<boolean>(false);

  // Load stored requests from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('medicare_bhakkar_requests');
      if (saved) {
        setSubmittedRequests(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read saved requests:', e);
    }
  }, []);

  const handleAppointmentSubmitted = (newRequest: SubmittedAppointment) => {
    const updated = [newRequest, ...submittedRequests];
    setSubmittedRequests(updated);
    try {
      localStorage.setItem('medicare_bhakkar_requests', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save request:', e);
    }
  };

  const handleDeleteRequest = (id: string) => {
    const updated = submittedRequests.filter((r) => r.id !== id);
    setSubmittedRequests(updated);
    try {
      localStorage.setItem('medicare_bhakkar_requests', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update saved requests:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f5f5] text-slate-800 flex flex-col selection:bg-teal-600 selection:text-white font-sans">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenMyRequests={() => setIsRequestsModalOpen(true)}
        requestCount={submittedRequests.length}
      />

      {/* Main One-Page Section Flow */}
      <main className="flex-grow">
        <Hero />
        
        <DoctorsSection
          onSelectDoctorToBook={(docName) => setSelectedDoctorForBooking(docName)}
        />
        
        <ServicesSection
          onSelectDoctorToBook={(docName) => setSelectedDoctorForBooking(docName)}
        />

        <AppointmentSection
          selectedDoctorName={selectedDoctorForBooking}
          onAppointmentSubmitted={handleAppointmentSubmitted}
        />

        <QuickCallBanner />

        <LocationSection />

        <WhyChooseUs />

        <TestimonialsSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Submitted Requests Drawer / Modal */}
      <AppointmentsListModal
        isOpen={isRequestsModalOpen}
        onClose={() => setIsRequestsModalOpen(false)}
        appointments={submittedRequests}
        onDeleteRequest={handleDeleteRequest}
      />
    </div>
  );
}
