'use client';

import React, { useState } from 'react';
import { 
  Camera, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Smartphone, 
  Video, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function EMonitoringSection({ onOpenBookingModal }) {
  const [activeTab, setActiveTab] = useState('cctv');

  const MILESTONES = [
    { title: "Stage 01: Plot Demarcation & Soil Test", status: "Completed", date: "Day 10", checks: "Bearing capacity 180 kN/m²" },
    { title: "Stage 02: Excavation & Anti-Termite", status: "Completed", date: "Day 24", checks: "Chemical barrier certified" },
    { title: "Stage 03: RCC Footing & Plinth Beam", status: "In Progress", date: "Day 45", checks: "M25 concrete cube test 28.4 N/mm²" },
    { title: "Stage 04: Ground Floor RCC Slab Casting", status: "Upcoming", date: "Day 75", checks: "Tata Tiscon 550D rebar inspection" },
    { title: "Stage 05: 1st Class Red Brick Masonry", status: "Upcoming", date: "Day 110", checks: "Mortar 1:4 batch ratio verified" },
    { title: "Stage 06: Final Finishing & Handover", status: "Upcoming", date: "Day 180", checks: "100-Point Pre-Delivery Inspection" }
  ];

  return (
    <section id="emonitoring-section" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="eyebrow-chip mb-3">Smart Construction Intelligence</span>
          <h2 className="heading-section mb-3">
            E-Monitoring & 250+ Quality Checkpoints — <span className="text-amber-600">Track From Your Phone</span>
          </h2>
          <p className="section-lede">
            Whether you are in Gaya, Patna, Delhi, or abroad — inspect every truckload of cement, every rebar cage, 
            and daily milestone progress in real time with high-definition CCTV feeds and certified lab test logs.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Left: Interactive Simulated CCTV / App Dashboard */}
          <div className="lg:col-span-7">
            <div className="wh-card border-slate-900 bg-slate-950 text-white p-5 rounded-2xl shadow-2xl relative overflow-hidden">
              
              {/* Camera Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-wider text-red-400">
                    LIVE CCTV · CAM 02 (GAYA AIRPORT ROAD ENCLAVE)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">1080P HD</span>
                  <span>11:24:08 AM</span>
                </div>
              </div>

              {/* Feed Image */}
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img 
                  src="/images/hero-township.jpg" 
                  alt="Live Construction Camera Feed"
                  className="w-full h-full object-cover"
                />
                
                {/* On-Screen Telemetry HUD */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-white">
                  <div>Project: Lord Bishnu Green Meadows</div>
                  <div className="text-amber-400">Active Task: Plinth Shuttering & Steel Cage Check</div>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-green-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>QC Passed by Er. S. Kumar (Site Engineer)</span>
                </div>
              </div>

              {/* Controls bar below camera */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveTab('cctv')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'cctv' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Site Cameras (3 Active)
                  </button>
                  <button 
                    onClick={() => setActiveTab('reports')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      activeTab === 'reports' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Lab Test Reports
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  AES-256 Encrypted Client Feed
                </span>
              </div>

            </div>
          </div>

          {/* Right: Milestone Checklist & Quality Proof */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              <span>Live Milestone Progress & Lab Audit</span>
            </h3>

            <div className="space-y-2.5">
              {MILESTONES.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    {m.status === 'Completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    ) : m.status === 'In Progress' ? (
                      <span className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="text-slate-900 block leading-snug">{m.title}</strong>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{m.checks}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    m.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    m.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button 
                onClick={() => onOpenBookingModal(null)}
                className="btn btn-primary btn-sm w-full font-bold shadow-md"
              >
                <span>Request Live Site Visit / Portal Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* 4 Feature Cards (WeHouse Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <strong className="text-xs font-bold text-slate-900">24x7 HD Site CCTV</strong>
            <p className="text-[11px] text-slate-500 mt-1">Live camera streams accessible via our mobile dashboard.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <strong className="text-xs font-bold text-slate-900">250+ Quality Checks</strong>
            <p className="text-[11px] text-slate-500 mt-1">Concrete cube compression, rebar tensile & sand silt tests.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <strong className="text-xs font-bold text-slate-900">10-Year Warranty</strong>
            <p className="text-[11px] text-slate-500 mt-1">Backed by registered structural liability guarantee agreement.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <strong className="text-xs font-bold text-slate-900">Zero Cost Overruns</strong>
            <p className="text-[11px] text-slate-500 mt-1">Fixed stamped BOQ ensures you never pay unexpected extra bills.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
