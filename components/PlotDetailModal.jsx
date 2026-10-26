'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  Ruler, 
  Car, 
  Calendar, 
  Sparkles, 
  Phone, 
  Share2,
  CheckCircle2,
  Navigation,
  FileCheck,
  Building
} from 'lucide-react';

export default function PlotDetailModal({ plot, onClose, onBookToken }) {
  if (!plot) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plot.title,
        text: `Check out ${plot.title} (${plot.code}) by Lord Bishnu Builder in ${plot.city}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Plot link copied to clipboard!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
              {plot.code}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              {plot.project}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-amber-600 rounded-md hover:bg-slate-200 transition-colors"
              title="Share Plot"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-200 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Hero Image & Layout Preview */}
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-inner bg-slate-900">
            <img 
              src={plot.image} 
              alt={plot.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                {plot.type} Plot · {plot.city}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {plot.title}
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/20">
                <div className="text-2xl font-extrabold text-amber-300">
                  ₹{(plot.totalPrice / 100000).toFixed(2)} Lakhs
                  <span className="text-xs font-normal text-slate-300 ml-2">(₹{plot.pricePerSqFt} / SFT)</span>
                </div>
                <div className="text-xs font-medium bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                  {plot.status === 'Available' ? 'Available for Immediate Registry' : plot.status}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Total Plot Area</span>
              <strong className="text-slate-900 text-sm block mt-0.5">{plot.areaSqFt} Sq.Ft</strong>
              <span className="text-amber-700 font-medium">({plot.areaKattha} Kattha)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Dimensions</span>
              <strong className="text-slate-900 text-sm block mt-0.5">{plot.dimensions}</strong>
              <span className="text-slate-500">Front x Depth</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Vasthu Facing</span>
              <strong className="text-slate-900 text-sm block mt-0.5 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                {plot.facing}
              </strong>
              <span className="text-green-600 font-medium">100% Auspicious</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Front Road</span>
              <strong className="text-slate-900 text-sm block mt-0.5">{plot.roadWidth}</strong>
              <span className="text-slate-500">Wide Blacktop</span>
            </div>
          </div>

          {/* Legal Compliance Status (Quotation Section 2 requirements) */}
          <div className="p-4 rounded-xl border border-green-200 bg-green-50/60">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              <h4 className="text-sm font-bold text-green-900">Legal Verification & Land Records</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-green-900">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span>RERA No: <strong>{plot.legal.reraNo}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span>Land Mutation: <strong>Government Mutation Verified</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span>Registry: <strong>Direct Seller Clean Registry</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span>Bank Loan: <strong>SBI & HDFC Home Loan Pre-Approved</strong></span>
              </div>
            </div>
          </div>

          {/* Proximity to Key Landmarks (Section 2 Distance Filters) */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-amber-600" />
              Strategic Connectivity & Distance to Landmarks
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                <span className="text-slate-600">National / State Highway:</span>
                <strong className="text-slate-900">{plot.landmarks.highway}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                <span className="text-slate-600">International Airport:</span>
                <strong className="text-slate-900">{plot.landmarks.airport}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                <span className="text-slate-600">Hospital & Medical Center:</span>
                <strong className="text-slate-900">{plot.landmarks.hospital}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                <span className="text-slate-600">Railway Station:</span>
                <strong className="text-slate-900">{plot.landmarks.railway}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center sm:col-span-2">
                <span className="text-slate-600">School / College:</span>
                <strong className="text-slate-900">{plot.landmarks.school}</strong>
              </div>
            </div>
          </div>

          {/* Township Infrastructure & Amenities */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-600" />
              Township Development & Utilities Included
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {plot.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 p-2 rounded bg-amber-50/40 border border-amber-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <a 
            href={`https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20am%20interested%20in%20Plot%20${plot.code}%20(${plot.title}).%20Can%20we%20schedule%20a%20site%20visit%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <Phone className="w-3.5 h-3.5 text-green-600" />
            <span>WhatsApp Advisor</span>
          </a>

          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="btn btn-secondary btn-sm"
            >
              Close
            </button>
            {plot.status !== 'Booked' && (
              <button 
                onClick={() => {
                  onClose();
                  onBookToken(plot);
                }}
                className="btn btn-primary btn-sm font-bold shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Online Token (₹21,000)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
