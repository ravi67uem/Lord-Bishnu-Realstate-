'use client';

import React from 'react';
import { Check, X, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { COMPARISON_DATA } from '../data/initialData';

export default function ComparisonSection({ onOpenBookingModal }) {
  return (
    <section id="comparison-section" className="py-16 md:py-24 bg-amber-50/60 border-b border-amber-200/40 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Heading (Matching WeHouse) */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="eyebrow-chip mb-3">Lord Bishnu vs Local Unorganized Contractors</span>
          <h2 className="heading-section mb-3">
            Where Does <span className="text-amber-600">₹8–10 Lakhs</span> Disappear With Unorganized Brokers?
          </h2>
          <p className="section-lede">
            In small variations, title ambiguities, duplicate rebar, and verbal promises that add up. 
            It is not about cheapest entry price per SFT. It is about total legal safety and cost certainty.
          </p>
        </div>

        {/* Comparison Table Desktop */}
        <div className="hidden md:block max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-3.5 px-5 text-left uppercase text-xs font-extrabold tracking-wider bg-gradient-to-r from-amber-600 to-orange-600 text-white w-2/5">
                  Lord Bishnu Builder
                </th>
                <th className="py-3.5 px-4 text-center uppercase text-xs font-bold tracking-wider bg-slate-900 text-white w-1/5">
                  Comparison Factor
                </th>
                <th className="py-3.5 px-5 text-left uppercase text-xs font-bold tracking-wider bg-slate-200 text-slate-700 w-2/5">
                  Typical Unorganized Broker / Contractor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3.5 px-5 bg-white align-middle font-medium text-slate-900">
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Check className="w-3 h-3 text-green-600" />
                      </span>
                      <span>{row.lordBishnu}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center bg-slate-50 font-bold text-slate-800 align-middle border-x border-slate-100">
                    {row.factor}
                  </td>

                  <td className="py-3.5 px-5 bg-white align-middle font-medium text-slate-600">
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <X className="w-3 h-3 text-red-600" />
                      </span>
                      <span>{row.localContractor}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards Stack */}
        <div className="md:hidden space-y-3">
          {COMPARISON_DATA.map((row, idx) => (
            <div key={idx} className="wh-card p-4 border-slate-200 bg-white shadow-sm">
              <h4 className="text-xs font-extrabold uppercase text-slate-900 mb-2.5 pb-1 border-b border-slate-100">
                {row.factor}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block mb-1">Lord Bishnu Builder</span>
                  <div className="flex items-start gap-1.5 font-semibold text-slate-900">
                    <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                    <span>{row.lordBishnu}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Typical Contractor</span>
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>{row.localContractor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Under Table */}
        <div className="text-center mt-10">
          <button 
            onClick={() => onOpenBookingModal(null)}
            className="btn btn-primary btn-lg shadow-amber font-bold"
          >
            <span>Book With 100% Certainty Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
