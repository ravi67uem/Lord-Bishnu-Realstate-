'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingCart, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  SlidersHorizontal,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  rfqCount, 
  onOpenRfqModal, 
  selectedCity, 
  setSelectedCity,
  onOpenBookingModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const CITIES = ['Gaya', 'Bodh Gaya', 'Patna', 'Dobhi', 'Ranchi'];

  const handleNavClick = (sectionId) => {
    setActiveView('customer');
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all border-b border-slate-100">
      {/* Top Announcement & Role Selector Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              RERA Approved & 100% Clear Title Registry
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400" />
              +91 94312 88204 / +91 98350 44219
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
              <Mail className="w-3 h-3 text-amber-400" />
              contact@lordbishnubuilder.com
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* City Dropdown */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-amber-300 text-xs">
              <MapPin className="w-3 h-3" />
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-amber-300 text-xs outline-none cursor-pointer font-medium"
              >
                <option value="All" className="bg-slate-800 text-white">All Locations</option>
                {CITIES.map(c => (
                  <option key={c} value={c} className="bg-slate-800 text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-full border border-slate-700">
              <button 
                onClick={() => setActiveView('customer')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  activeView === 'customer' 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button 
                onClick={() => setActiveView('dashboard')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  activeView === 'dashboard' 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveView('seller')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  activeView === 'seller' 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Seller Panel
              </button>
              <button 
                onClick={() => setActiveView('admin')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  activeView === 'admin' 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveView('customer')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-950 leading-none">
                  LORD BISHNU
                </span>
                <span className="text-xs uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                  Builder
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                Real Estate & Construction Materials
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button 
              onClick={() => handleNavClick('plots-section')} 
              className="hover:text-amber-600 transition-colors"
            >
              Verified Plots
            </button>
            <button 
              onClick={() => handleNavClick('materials-section')} 
              className="hover:text-amber-600 transition-colors"
            >
              Building Materials
            </button>
            <button 
              onClick={() => handleNavClick('calculator-section')} 
              className="hover:text-amber-600 transition-colors"
            >
              Cost Estimator
            </button>
            <button 
              onClick={() => handleNavClick('comparison-section')} 
              className="hover:text-amber-600 transition-colors"
            >
              Why Lord Bishnu
            </button>
            <button 
              onClick={() => handleNavClick('emonitoring-section')} 
              className="hover:text-amber-600 transition-colors"
            >
              E-Monitoring
            </button>
            <button 
              onClick={() => handleNavClick('testimonials-section')} 
              className="hover:text-amber-600 transition-colors"
            >
              Reviews
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* RFQ Cart Button */}
            <button 
              onClick={onOpenRfqModal}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-600 text-sm font-semibold transition-colors"
              title="View Material Quotation List"
            >
              <ShoppingCart className="w-4 h-4 text-amber-600" />
              <span>RFQ Cart</span>
              {rfqCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {rfqCount}
                </span>
              )}
            </button>

            {/* Book Token CTA */}
            <button 
              onClick={() => onOpenBookingModal(null)}
              className="btn btn-primary btn-sm shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Token (₹21k)</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2.5 pb-2">
            <button 
              onClick={() => handleNavClick('plots-section')} 
              className="text-left py-1.5 text-sm font-semibold text-slate-800"
            >
              Verified Plots
            </button>
            <button 
              onClick={() => handleNavClick('materials-section')} 
              className="text-left py-1.5 text-sm font-semibold text-slate-800"
            >
              Building Materials Catalog
            </button>
            <button 
              onClick={() => handleNavClick('calculator-section')} 
              className="text-left py-1.5 text-sm font-semibold text-slate-800"
            >
              Smart Cost Estimator
            </button>
            <button 
              onClick={() => handleNavClick('comparison-section')} 
              className="text-left py-1.5 text-sm font-semibold text-slate-800"
            >
              Why Lord Bishnu vs Others
            </button>
            <button 
              onClick={() => handleNavClick('emonitoring-section')} 
              className="text-left py-1.5 text-sm font-semibold text-slate-800"
            >
              E-Monitoring & Quality Checks
            </button>
            <button 
              onClick={() => handleNavClick('testimonials-section')} 
              className="text-left py-1.5 text-sm font-semibold text-slate-800"
            >
              Client Testimonials
            </button>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenRfqModal(); }}
                className="btn btn-secondary btn-sm flex-1"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-amber-600" />
                RFQ Cart ({rfqCount})
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenBookingModal(null); }}
                className="btn btn-primary btn-sm flex-1"
              >
                Book Token
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
