'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustMarquee from '../components/TrustMarquee';
import PlotListingSection from '../components/PlotListingSection';
import PlotDetailModal from '../components/PlotDetailModal';
import TokenBookingModal from '../components/TokenBookingModal';
import ConstructionMaterialSection from '../components/ConstructionMaterialSection';
import RfqModal from '../components/RfqModal';
import CostCalculator from '../components/CostCalculator';
import ComparisonSection from '../components/ComparisonSection';
import EMonitoringSection from '../components/EMonitoringSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CustomerDashboard from '../components/CustomerDashboard';
import SellerPanel from '../components/SellerPanel';
import AdminPanel from '../components/AdminPanel';
import Footer from '../components/Footer';

import { 
  INITIAL_PLOTS, 
  INITIAL_MATERIALS, 
  INITIAL_BOOKINGS, 
  INITIAL_ENQUIRIES 
} from '../data/initialData';

import { Building2, Boxes, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Application State
  const [activeView, setActiveView] = useState('customer'); // 'customer', 'dashboard', 'seller', 'admin'
  const [selectedCity, setSelectedCity] = useState('All');
  const [plots, setPlots] = useState(INITIAL_PLOTS);
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  const [rfqItems, setRfqItems] = useState([]);
  
  // Modals state
  const [activeModalPlot, setActiveModalPlot] = useState(null);
  const [bookingModalPlot, setBookingModalPlot] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // RFQ Handlers
  const handleAddToCart = (material, quantity) => {
    setRfqItems(prev => {
      const existing = prev.find(item => item.id === material.id);
      if (existing) {
        return prev.map(item => item.id === material.id ? { ...item, quantity } : item);
      }
      return [...prev, { ...material, quantity }];
    });
    showToast(`Added ${quantity} ${material.unit} of ${material.name} to RFQ Cart`);
  };

  const handleRemoveFromRfq = (id) => {
    setRfqItems(prev => prev.filter(item => item.id !== id));
    showToast('Removed item from RFQ Cart');
  };

  const handleClearRfq = () => {
    setRfqItems([]);
    showToast('Cleared RFQ Cart');
  };

  const handleSubmitRfq = (rfqData) => {
    setEnquiries(prev => [
      {
        id: rfqData.rfqId,
        name: rfqData.customer.name,
        phone: rfqData.customer.phone,
        email: rfqData.customer.email,
        type: 'Material RFQ',
        interest: `${rfqData.items.length} materials (Est. ₹${rfqData.totalCost.toLocaleString()})`,
        city: rfqData.customer.deliveryCity,
        date: rfqData.date,
        status: 'Quote Dispatched'
      },
      ...prev
    ]);
    showToast('Material RFQ transmitted to Gaya central depot!');
  };

  // Plot & Booking Handlers
  const handleOpenBookingModal = (plot) => {
    setBookingModalPlot(plot || plots[0]);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking) => {
    // 1. Add to bookings
    setBookings(prev => [newBooking, ...prev]);
    // 2. Mark plot as booked
    setPlots(prev => prev.map(p => p.id === newBooking.plotId ? { ...p, status: 'Booked' } : p));
    showToast(`Token for Plot ${newBooking.plotCode} confirmed! Reference: ${newBooking.bookingId}`);
  };

  const handleAddPlot = (newPlot) => {
    setPlots(prev => [newPlot, ...prev]);
    showToast(`Plot ${newPlot.code} published successfully!`);
  };

  const handleDeletePlot = (plotId) => {
    setPlots(prev => prev.filter(p => p.id !== plotId));
    showToast('Plot listing removed');
  };

  const handleUpdatePlotStatus = (plotId, newStatus) => {
    setPlots(prev => prev.map(p => p.id === plotId ? { ...p, status: newStatus } : p));
    showToast(`Plot status updated to ${newStatus}`);
  };

  const handleUpdateMaterialPrice = (matId, newPrice) => {
    setMaterials(prev => prev.map(m => m.id === matId ? { ...m, price: newPrice } : m));
    showToast('Wholesale material rate updated in live master catalog');
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.bookingId === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Booking ${bookingId} status updated to ${newStatus}`);
  };

  const handleLeadCapture = (lead) => {
    setEnquiries(prev => [{ id: `lead-${Date.now()}`, ...lead }, ...prev]);
    showToast(`Thank you, ${lead.name}! Your enquiry has been received.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-500/40 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar 
        activeView={activeView}
        setActiveView={setActiveView}
        rfqCount={rfqItems.length}
        onOpenRfqModal={() => setIsRfqModalOpen(true)}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* ROLE-BASED VIEW OR MAIN CUSTOMER VIEW */}
      {activeView === 'customer' && (
        <main className="flex-1">
          {/* Section 1: Hero Section */}
          <HeroSection 
            onEnquirySubmit={handleLeadCapture}
          />

          {/* Section: Trust Marquee & Regulatory Approvals */}
          <TrustMarquee />

          {/* Section: Dual Vertical Fast Switcher Banner */}
          <section className="py-6 bg-slate-900 text-white border-b border-slate-800">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Vertical 1: Verified Plot Listings */}
                <a 
                  href="#plots-section"
                  className="p-5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/60 border border-slate-700/70 hover:border-amber-500 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Business Vertical 1</span>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        Online Plot Listings & Token Booking
                      </h3>
                      <p className="text-xs text-slate-400">100% Clear-Title Plots in Gaya, Bodh Gaya & Patna</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Vertical 2: Building Materials Catalog */}
                <a 
                  href="#materials-section"
                  className="p-5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/60 border border-slate-700/70 hover:border-amber-500 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <Boxes className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Business Vertical 2</span>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        Construction Material Supply
                      </h3>
                      <p className="text-xs text-slate-400">UltraTech Cement, Tata Tiscon Rebar & Sone Sand</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </a>

              </div>
            </div>
          </section>

          {/* Section 2: Online Plot Listing & Property Search (Quotation Section 2) */}
          <PlotListingSection 
            plots={plots}
            onSelectPlot={(p) => setActiveModalPlot(p)}
            onBookToken={(p) => handleOpenBookingModal(p)}
            selectedCity={selectedCity}
          />

          {/* Section 3: Construction Material Section (Quotation Section 1) */}
          <ConstructionMaterialSection 
            materials={materials}
            rfqItems={rfqItems}
            onAddToCart={handleAddToCart}
            onOpenRfqModal={() => setIsRfqModalOpen(true)}
          />

          {/* Section 4: Instant Plot & Construction Cost Calculator (WeHouse Inspired) */}
          <CostCalculator 
            onOpenBookingModal={handleOpenBookingModal}
          />

          {/* Section 5: Why Lord Bishnu vs Others (WeHouse Inspired Comparison Table) */}
          <ComparisonSection 
            onOpenBookingModal={handleOpenBookingModal}
          />

          {/* Section 6: E-Monitoring & 250+ Quality Checkpoints (WeHouse Inspired) */}
          <EMonitoringSection 
            onOpenBookingModal={handleOpenBookingModal}
          />

          {/* Section 7: Verified Client Testimonials */}
          <TestimonialsSection />
        </main>
      )}

      {/* CUSTOMER DASHBOARD VIEW (Quotation Section 4) */}
      {activeView === 'dashboard' && (
        <main className="flex-1">
          <CustomerDashboard 
            bookings={bookings}
            rfqs={enquiries.filter(e => e.type === 'Material RFQ')}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenRfqModal={() => setIsRfqModalOpen(true)}
          />
        </main>
      )}

      {/* SELLER & SALES TEAM PANEL (Quotation Section 5) */}
      {activeView === 'seller' && (
        <main className="flex-1">
          <SellerPanel 
            plots={plots}
            onAddPlot={handleAddPlot}
            onDeletePlot={handleDeletePlot}
            onUpdatePlotStatus={handleUpdatePlotStatus}
            enquiries={enquiries}
          />
        </main>
      )}

      {/* ADMIN CONSOLE VIEW (Quotation Section 6) */}
      {activeView === 'admin' && (
        <main className="flex-1">
          <AdminPanel 
            plots={plots}
            materials={materials}
            bookings={bookings}
            enquiries={enquiries}
            onUpdateMaterialPrice={handleUpdateMaterialPrice}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onUpdatePlotStatus={handleUpdatePlotStatus}
          />
        </main>
      )}

      {/* Modals */}
      {activeModalPlot && (
        <PlotDetailModal 
          plot={activeModalPlot}
          onClose={() => setActiveModalPlot(null)}
          onBookToken={(p) => handleOpenBookingModal(p)}
        />
      )}

      {isBookingModalOpen && (
        <TokenBookingModal 
          plot={bookingModalPlot}
          plots={plots}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {isRfqModalOpen && (
        <RfqModal 
          rfqItems={rfqItems}
          onClose={() => setIsRfqModalOpen(false)}
          onRemoveItem={handleRemoveFromRfq}
          onClearCart={handleClearRfq}
          onSubmitRfq={handleSubmitRfq}
        />
      )}

      {/* Global Footer */}
      <Footer 
        onOpenBookingModal={handleOpenBookingModal}
        onOpenRfqModal={() => setIsRfqModalOpen(true)}
      />

    </div>
  );
}
