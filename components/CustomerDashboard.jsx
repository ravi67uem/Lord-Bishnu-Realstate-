'use client';

import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  FileText, 
  Printer, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Boxes, 
  Phone, 
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function CustomerDashboard({ 
  bookings, 
  rfqs, 
  onOpenBookingModal, 
  onOpenRfqModal 
}) {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container">
        
        {/* Dashboard Header Bar */}
        <div className="wh-card p-6 border-slate-200 bg-white mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                RS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">Rohan Sharma</h2>
                  <span className="badge-status bg-amber-100 text-amber-800 text-[10px]">
                    Verified Buyer Account
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  rohan.sharma@gmail.com · +91 98350 12345 · Gaya, Bihar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => onOpenBookingModal(null)}
                className="btn btn-primary btn-sm flex-1 md:flex-none font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Another Plot</span>
              </button>
              <button 
                onClick={onOpenRfqModal}
                className="btn btn-secondary btn-sm flex-1 md:flex-none"
              >
                <Boxes className="w-3.5 h-3.5 text-amber-600" />
                <span>Material RFQ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 mb-6">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>My Plot Bookings ({bookings.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('rfqs')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'rfqs'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Material Quotations ({rfqs.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Site Visits & Registry Calendar</span>
          </button>
        </div>

        {/* TAB 1: PLOT BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((b, idx) => (
                <div 
                  key={idx}
                  className="wh-card p-5 border-slate-200 bg-white"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                          {b.plotCode}
                        </span>
                        <span className="badge-status bg-green-100 text-green-800 text-[10px] flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          {b.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{b.plotTitle}</h3>
                      <p className="text-xs text-slate-500">Booking Reference: <strong>{b.bookingId}</strong> · Date: {b.bookingDate}</p>
                    </div>

                    <div className="text-left lg:text-right">
                      <span className="text-[11px] text-slate-400 block uppercase font-semibold">Token Amount Paid</span>
                      <strong className="text-lg font-extrabold text-amber-700">
                        ₹{b.tokenAmount.toLocaleString()}
                      </strong>
                      <span className="text-xs text-slate-500 block">via {b.paymentMode} ({b.paymentRef})</span>
                    </div>
                  </div>

                  {/* Booking Stage Progress Bar */}
                  <div className="py-4">
                    <span className="text-xs font-bold text-slate-800 block mb-2">Registry & Possession Roadmap</span>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-green-50 border border-green-200">
                        <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mb-1" />
                        <span className="font-bold text-green-900 block text-[11px]">1. Token Received</span>
                        <span className="text-[10px] text-green-700">Completed</span>
                      </div>
                      <div className="p-2 rounded bg-green-50 border border-green-200">
                        <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mb-1" />
                        <span className="font-bold text-green-900 block text-[11px]">2. Legal Search Report</span>
                        <span className="text-[10px] text-green-700">Passed</span>
                      </div>
                      <div className="p-2 rounded bg-amber-50 border border-amber-200">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mx-auto mb-1 animate-ping" />
                        <span className="font-bold text-amber-900 block text-[11px]">3. Registry Draft</span>
                        <span className="text-[10px] text-amber-700">In Progress</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <div className="w-2 h-2 rounded-full bg-slate-300 mx-auto mb-1" />
                        <span className="font-bold text-slate-600 block text-[11px]">4. Final Possession</span>
                        <span className="text-[10px] text-slate-400">Scheduled</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button 
                      onClick={() => window.print()}
                      className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>Print Allotment Certificate</span>
                    </button>

                    <a 
                      href={`https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20regarding%20my%20booking%20${b.bookingId}%20for%20plot%20${b.plotCode}%2C%20could%20you%20please%20update%20me%20on%20the%20registry%20date%3F`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm text-xs font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Relationship Officer</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">No Active Plot Bookings</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Browse our prime residential and commercial plots and reserve with an initial online token of ₹21,000.
                </p>
                <button 
                  onClick={() => onOpenBookingModal(null)}
                  className="btn btn-primary btn-sm"
                >
                  Explore Plots Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MATERIAL QUOTATIONS */}
        {activeTab === 'rfqs' && (
          <div className="space-y-4">
            {rfqs.length > 0 ? (
              rfqs.map((r, idx) => (
                <div key={idx} className="wh-card p-5 border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {r.rfqId}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">Date: {r.date}</span>
                    </div>
                    <span className="badge-status bg-blue-100 text-blue-800 text-[10px]">
                      {r.status || 'Active RFQ'}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs mb-3">
                    {r.items.map((item, i) => (
                      <div key={i} className="py-2 flex justify-between">
                        <span>{item.name} ({item.quantity} {item.unit})</span>
                        <strong className="text-slate-900">₹{(item.quantity * item.price).toLocaleString()}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Estimated Total:</span>
                    <strong className="text-amber-700 text-sm">₹{r.totalCost.toLocaleString()}</strong>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <Boxes className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">No Material Quotations Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Add cement, steel rebar, sand, or bricks to your RFQ cart to receive formal rate slips with mill discounts.
                </p>
                <button 
                  onClick={onOpenRfqModal}
                  className="btn btn-secondary btn-sm font-bold"
                >
                  Browse Building Materials
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SITE VISITS */}
        {activeTab === 'schedule' && (
          <div className="wh-card p-6 border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Book a Complimentary Guided Site Visit</h3>
            <p className="text-xs text-slate-600 max-w-lg mb-5">
              We provide free pick-and-drop cab service from Gaya Airport or Gaya Junction railway station 
              with our senior land surveyor for physical plot inspection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Upcoming Tour 1</span>
                <span className="text-slate-500 text-[11px]">Airport Road & Chandauti Enclave</span>
                <div className="mt-2 text-amber-700 font-bold">Tomorrow, 10:30 AM</div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Upcoming Tour 2</span>
                <span className="text-slate-500 text-[11px]">Bodh Gaya Expressway Commercial Plots</span>
                <div className="mt-2 text-amber-700 font-bold">This Sunday, 3:00 PM</div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Private VIP Visit</span>
                <span className="text-slate-500 text-[11px]">Personal vehicle for family inspection</span>
                <div className="mt-2 text-amber-700 font-bold">On Demand (Book 24h before)</div>
              </div>
            </div>

            <a 
              href="https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20would%20like%20to%20schedule%20a%20guided%20site%20visit%20for%20plot%20inspection."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Confirm Site Visit on WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
