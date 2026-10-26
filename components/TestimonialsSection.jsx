'use client';

import React from 'react';
import { Star, Quote, CheckCircle, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/initialData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="eyebrow-chip mb-3">Happy Plot Owners & Builders</span>
          <h2 className="heading-section mb-3">
            Real Stories from Proud <span className="text-amber-600">Land & Home Owners</span>
          </h2>
          <p className="section-lede">
            Because in real estate and construction, reputation is earned through transparent registry, 
            zero litigations, and delivering exactly what was promised.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div 
              key={item.id}
              className="wh-card p-6 border-slate-200 bg-white flex flex-col justify-between"
            >
              <div>
                {/* Rating & Plot Code */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                    {item.plotCode}
                  </span>
                </div>

                {/* Quote */}
                <Quote className="w-8 h-8 text-amber-300/60 mb-2" />
                <p className="text-xs sm:text-sm text-slate-600 italic mb-6 leading-relaxed">
                  &quot;{item.review}&quot;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold flex items-center justify-center text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </h4>
                  <p className="text-[11px] text-slate-500">{item.role} · {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
