'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp,
  Clock,
  Compass,
  FileCheck
} from 'lucide-react';

export default function Footer({ onOpenBookingModal, onOpenRfqModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-extrabold shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">LORD BISHNU</span>
                <span className="block text-[11px] text-amber-400 font-bold tracking-wider uppercase">
                  Builder & Real Estate Platform
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bihar and Jharkhand’s premier tech-powered real estate and building materials enterprise. 
              Delivering 100% legal clear-title plotted townships, factory-priced certified cement & TMT steel, 
              and transparent 24-milestone execution.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>RERA Reg: BR-RERA-2024-GAY-092</span>
              </div>
              <p className="text-[11px] text-slate-400">
                100% Mutation Verified · SBI & HDFC Pre-Approved
              </p>
            </div>
          </div>

          {/* Quick Links: Real Estate */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Prime Plots</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#plots-section" className="hover:text-amber-400 transition-colors">Gaya Airport Road Enclave</a></li>
              <li><a href="#plots-section" className="hover:text-amber-400 transition-colors">Bodh Gaya Temple Corridor</a></li>
              <li><a href="#plots-section" className="hover:text-amber-400 transition-colors">Patna - Gaya Expressway Plots</a></li>
              <li><a href="#plots-section" className="hover:text-amber-400 transition-colors">Dobhi Industrial Logistics Hub</a></li>
              <li><a href="#plots-section" className="hover:text-amber-400 transition-colors">Chandauti Bypass Villa Plots</a></li>
              <li><a href="#calculator-section" className="hover:text-amber-400 transition-colors">Cost & Plot Calculator</a></li>
            </ul>
          </div>

          {/* Quick Links: Construction Materials */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Building Materials</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#materials-section" className="hover:text-amber-400 transition-colors">UltraTech Super & Weather Plus</a></li>
              <li><a href="#materials-section" className="hover:text-amber-400 transition-colors">Tata Tiscon Fe550D TMT Steel</a></li>
              <li><a href="#materials-section" className="hover:text-amber-400 transition-colors">ACC Gold Water Shield Cement</a></li>
              <li><a href="#materials-section" className="hover:text-amber-400 transition-colors">Certified Sone River Coarse Sand</a></li>
              <li><a href="#materials-section" className="hover:text-amber-400 transition-colors">1st Class Kiln-Burnt Red Bricks</a></li>
              <li><a href="#materials-section" className="hover:text-amber-400 transition-colors">AAC Flyash Lightweight Blocks</a></li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Contact & Headquarters</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Gaya Head Office:</strong> Near Airport Road, AP Colony Corridor, Gaya, Bihar - 823001
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Patna Branch:</strong> Exhibition Road, Near Gandhi Maidan, Patna, Bihar - 800001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 94312 88204 / +91 98350 44219</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@lordbishnubuilder.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Sun: 8:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Lord Bishnu Builder & Real Estate. All rights reserved. Platform engineered by Inlite Media.
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-amber-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Floating Sticky WhatsApp & Call Direct Connect Bar */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <a 
          href="https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20am%20looking%20for%20plots%20%26%20construction%20materials%20in%20Bihar."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          title="Direct WhatsApp Helpline"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
