'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Sliders, 
  FileSpreadsheet, 
  ShieldCheck,
  Building2,
  PieChart
} from 'lucide-react';

export default function CostCalculator({ onOpenBookingModal }) {
  const [plotArea, setPlotArea] = useState(1500);
  const [floors, setFloors] = useState(2); // 1 = Ground, 2 = G+1, 3 = G+2, 4 = G+3
  const [selectedTier, setSelectedTier] = useState('premium');
  const [includePlot, setIncludePlot] = useState(false);
  const [plotRate, setPlotRate] = useState(1850);

  const TIERS = {
    standard: {
      name: 'Standard / Economy',
      rate: 1550,
      badge: 'Value Assured',
      cement: 'PPC Grade 43 Cement',
      steel: 'Fe500 Secondary Steel',
      flooring: 'Vitrified Tiles (2x2 ft)',
      warranty: '5 Years Structural'
    },
    premium: {
      name: 'Premium Classic',
      rate: 1850,
      badge: 'Most Popular',
      cement: 'UltraTech Weather Plus / ACC Gold',
      steel: 'Tata Tiscon / Kamdhenu Fe550D',
      flooring: 'Glazed Vitrified (2x4 ft)',
      warranty: '10 Years Structural + 2 Yrs MEP'
    },
    luxury: {
      name: 'Smart Luxury Villa',
      rate: 2250,
      badge: 'Executive',
      cement: 'UltraTech Super / RMC',
      steel: 'Tata Tiscon Super Ductile 550D',
      flooring: 'Italian Marble Look GVT + Teak Doors',
      warranty: '15 Years Structural + 3 Yrs Smart MEP'
    }
  };

  const currentTier = TIERS[selectedTier];
  const totalBuiltUp = plotArea * floors;
  const constructionCost = totalBuiltUp * currentTier.rate;
  const plotCost = includePlot ? (plotArea * plotRate) : 0;
  const totalBudget = constructionCost + plotCost;

  // Breakdown percentages
  const materialCost = Math.round(constructionCost * 0.55);
  const laborCost = Math.round(constructionCost * 0.25);
  const finishingCost = Math.round(constructionCost * 0.12);
  const engineeringCost = Math.round(constructionCost * 0.08);

  const formatLakhs = (num) => {
    return `₹${(num / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section id="calculator-section" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="eyebrow-chip mb-3">Interactive Construction Planner</span>
          <h2 className="heading-section mb-3">
            Instant Plot & Home Construction <span className="text-amber-600">Cost Calculator</span>
          </h2>
          <p className="section-lede">
            Inspired by transparent BOQ standards. Estimate exact materials, labor, and milestone allocations 
            before spending a single rupee. No hidden contractor escalation.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Plot Area Slider */}
            <div className="wh-card p-5 border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-800">Plot Footprint Area</label>
                <span className="text-base font-extrabold text-amber-600">
                  {plotArea} Sq.Ft <span className="text-xs text-slate-500 font-normal">({(plotArea / 1361).toFixed(2)} Kattha)</span>
                </span>
              </div>
              <input 
                type="range" 
                min={600} 
                max={4000} 
                step={50}
                value={plotArea}
                onChange={(e) => setPlotArea(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>600 SFT (Small Villa)</span>
                <span>1,500 SFT (Standard)</span>
                <span>4,000 SFT (Mansion)</span>
              </div>
            </div>

            {/* 2. Number of Floors */}
            <div className="wh-card p-5 border-slate-200">
              <label className="text-sm font-bold text-slate-800 mb-2.5 block">Number of Floors to Construct</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { count: 1, label: 'Ground (G)' },
                  { count: 2, label: 'G + 1 Floor' },
                  { count: 3, label: 'G + 2 Floors' },
                  { count: 4, label: 'G + 3 Floors' }
                ].map(item => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setFloors(item.count)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      floors === item.count
                        ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Total Built-up Construction Area: <strong>{totalBuiltUp} Sq.Ft</strong>
              </p>
            </div>

            {/* 3. Package Tier Selector */}
            <div className="wh-card p-5 border-slate-200">
              <label className="text-sm font-bold text-slate-800 mb-2.5 block">Choose Construction Package Tier</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(TIERS).map(key => {
                  const t = TIERS[key];
                  const isSelected = selectedTier === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedTier(key)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50/80 shadow-md ring-1 ring-amber-500' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 uppercase">
                        {t.badge}
                      </span>
                      <div className="text-xs font-bold text-slate-900 mt-2">{t.name}</div>
                      <div className="text-lg font-extrabold text-amber-700 mt-1">₹{t.rate} <span className="text-xs font-normal text-slate-500">/ SFT</span></div>
                      
                      <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
                        <div>• {t.cement}</div>
                        <div>• {t.steel}</div>
                        <div>• {t.flooring}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Include Land / Plot Purchase Cost Toggle */}
            <div className="wh-card p-4 border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="include-plot"
                  checked={includePlot}
                  onChange={(e) => setIncludePlot(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
                <label htmlFor="include-plot" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Include Plot Land Purchase Cost in Budget
                </label>
              </div>

              {includePlot && (
                <div className="text-right text-xs">
                  <span className="text-slate-500">Plot Rate: ₹{plotRate}/SFT</span>
                  <div className="font-bold text-slate-900">{formatLakhs(plotCost)}</div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Estimate Card & Milestone Schedule */}
          <div className="lg:col-span-5">
            <div className="wh-card p-6 border-slate-200 shadow-xl bg-gradient-to-b from-white to-amber-50/30 sticky top-24">
              
              <div className="border-b border-slate-100 pb-4 mb-4">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Total Estimated Project Cost
                </span>
                <div className="text-3xl font-extrabold text-slate-950 mt-1">
                  {formatLakhs(totalBudget)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on <strong>{totalBuiltUp} SFT</strong> Built-up ({currentTier.name}) {includePlot && `+ ${plotArea} SFT Plot`}
                </p>
              </div>

              {/* Cost Split Itemization */}
              <div className="space-y-2.5 text-xs mb-5">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Primary Materials (Cement, TMT Steel, Sand, Bricks):</span>
                  <strong className="text-slate-900">{formatLakhs(materialCost)}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">RCC Casting, Masonry & Skilled Labor:</span>
                  <strong className="text-slate-900">{formatLakhs(laborCost)}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Finishing, Vitrified Tiles & Sanitaryware:</span>
                  <strong className="text-slate-900">{formatLakhs(finishingCost)}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Architecture, Vasthu & Structural Audit:</span>
                  <strong className="text-slate-900">{formatLakhs(engineeringCost)}</strong>
                </div>

                {includePlot && (
                  <div className="flex justify-between items-center py-1 border-b border-amber-200 bg-amber-100/40 px-2 rounded font-bold">
                    <span className="text-amber-900">Plot Land Acquisition:</span>
                    <strong className="text-amber-900">{formatLakhs(plotCost)}</strong>
                  </div>
                )}
              </div>

              {/* 24 Milestone Guarantee Box (WeHouse inspired) */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 mb-5 text-xs text-slate-800">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>24 Milestone Staged Payment Plan</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  You only release payments after our structural engineer validates each milestone inspection with lab test certificates. Zero advance lock-in.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <a 
                  href={`https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20used%20your%20Online%20Cost%20Calculator%20for%20a%20${plotArea}%20SFT%20plot%20(${floors}%20Floors%2C%20${currentTier.name})%20with%20estimated%20budget%20of%20${encodeURIComponent(formatLakhs(totalBudget))}.%20Please%20share%20detailed%20BOQ.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm w-full font-bold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Estimate to WhatsApp</span>
                </a>

                <button 
                  onClick={() => onOpenBookingModal(null)}
                  className="btn btn-primary btn-sm w-full font-bold shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Initial Token or Plot (₹21k)</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
