'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Building, 
  Boxes, 
  Award, 
  Compass, 
  Star,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function HeroSection({ onEnquirySubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requirement: 'Plot Purchase',
    timeframe: '0-3 months',
    city: 'Gaya',
    phone: '',
    sizeOrQty: '1800 sq.ft (1.3 Kattha)',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.name || !formData.email)) {
      alert('Please enter your full name and email address.');
      return;
    }
    if (step === 2 && !formData.phone) {
      alert('Please enter your mobile number.');
      return;
    }
    setStep(step + 1);
  };

  const handleSendOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setOtpSent(true);
    setFormData({ ...formData, otp: '8942' }); // auto-fill demo OTP
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onEnquirySubmit) {
      onEnquirySubmit({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: formData.requirement,
        interest: `${formData.sizeOrQty} in ${formData.city}`,
        city: formData.city,
        date: new Date().toLocaleString(),
        status: 'Fresh Lead'
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-100">
      {/* Decorative Blur Spheres (inspired by WeHouse ambient glow) */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-orange-400/15 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Messaging & Authority */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pulsing Tagline Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-sm text-slate-800 text-xs sm:text-sm font-semibold mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span>Bihar & Jharkhand’s No.1 Tech-Integrated Builder & Material Hub</span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-hero text-slate-950 mb-4">
              Build Your Dream on Solid Ground with{' '}
              <span className="relative inline-block text-amber-600">
                Lord Bishnu
                <svg 
                  className="absolute -bottom-1.5 left-0 w-full text-orange-500" 
                  viewBox="0 0 260 10" 
                  fill="none" 
                  preserveAspectRatio="none"
                >
                  <path d="M2 7C65 2.5 140 2 258 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-7 leading-relaxed">
              Explore 100% legally clear-title plots in prime growth corridors, or source factory-direct 
              certified cement and TMT steel under one reliable roof. Transparent. Timely. RERA-approved.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-9">
              <a 
                href="#plots-section" 
                className="btn btn-primary btn-lg shadow-amber w-full sm:w-auto"
              >
                <span>Explore Prime Plots</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="#materials-section" 
                className="btn btn-secondary btn-lg w-full sm:w-auto"
              >
                <Boxes className="w-4 h-4 text-amber-600" />
                <span>Building Materials</span>
              </a>

              <a 
                href="#calculator-section" 
                className="btn btn-secondary btn-lg w-full sm:w-auto hidden md:inline-flex"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Cost Estimator</span>
              </a>
            </div>

            {/* Hero Stats Bar (WeHouse style) */}
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-slate-200/90 bg-white/90 shadow-md backdrop-blur-sm divide-x divide-y sm:divide-y-0 divide-slate-100 overflow-hidden">
                <div className="p-3.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 leading-none">500+</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Plots Handled</div>
                  </div>
                </div>

                <div className="p-3.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 leading-none">100%</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Clear Title</div>
                  </div>
                </div>

                <div className="p-3.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 leading-none">250+</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Quality Checks</div>
                  </div>
                </div>

                <div className="p-3.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-slate-900 leading-none">100%</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Vasthu Ready</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Dynamic Multi-Step Quick Consultation Form (WeHouse inspired) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="wh-card p-6 border-slate-200/90 shadow-xl bg-white relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
              
              {!isSubmitted ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Start Your Property Journey</h3>
                      <p className="text-xs text-slate-500">Get verified plot catalogue or material rate card</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-800">
                      Step {step} of 3
                    </span>
                  </div>

                  {/* Step Progress Dots */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`} />
                    <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`} />
                    <div className={`h-1.5 rounded-full flex-1 transition-all ${step >= 3 ? 'bg-amber-500' : 'bg-slate-200'}`} />
                  </div>

                  <form onSubmit={step === 3 ? handleSubmit : handleNext}>
                    {/* Step 1: Name, Email & Requirement */}
                    {step === 1 && (
                      <div className="space-y-3.5">
                        <div className="field-group">
                          <label className="field-label">Full Name *</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. Ramesh Chandra" 
                            value={formData.name} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="field-input"
                          />
                        </div>

                        <div className="field-group">
                          <label className="field-label">Email Address *</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="you@example.com" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="field-input"
                          />
                        </div>

                        <div className="field-group">
                          <label className="field-label">Primary Requirement</label>
                          <select 
                            value={formData.requirement}
                            onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                            className="field-select"
                          >
                            <option value="Plot Purchase">Buy Residential / Villa Plot</option>
                            <option value="Commercial Plot">Commercial / Highway Plot</option>
                            <option value="Construction Materials">Construction Materials (Wholesale)</option>
                            <option value="Full Plot & Construction">Turnkey: Plot + Home Construction</option>
                          </select>
                        </div>

                        <div className="field-group">
                          <label className="field-label">When do you plan to start?</label>
                          <select 
                            value={formData.timeframe}
                            onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                            className="field-select"
                          >
                            <option value="0-3 months">Within 3 Months (Immediate)</option>
                            <option value="3-6 months">3 to 6 Months</option>
                            <option value="6-12 months">6 to 12 Months</option>
                            <option value="Planning Phase">Exploring / Investment Only</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Preferred City & Phone */}
                    {step === 2 && (
                      <div className="space-y-3.5">
                        <div className="field-group">
                          <label className="field-label">Preferred Location / City *</label>
                          <select 
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="field-select"
                          >
                            <option value="Gaya">Gaya (Airport Road / Chandauti / Bypass)</option>
                            <option value="Bodh Gaya">Bodh Gaya (Temple Highway / Expressway)</option>
                            <option value="Patna">Patna - Gaya Corridor</option>
                            <option value="Dobhi">Dobhi Industrial Zone (GT Road NH-19)</option>
                            <option value="Ranchi">Ranchi / Outer Ring Road</option>
                          </select>
                        </div>

                        <div className="field-group">
                          <label className="field-label">Phone Number *</label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 border border-r-0 border-slate-200 rounded-l-md bg-slate-50 text-slate-600 text-sm font-semibold">
                              +91
                            </span>
                            <input 
                              type="tel" 
                              required 
                              placeholder="98XXXXXXXX" 
                              value={formData.phone} 
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="field-input rounded-l-none"
                            />
                          </div>
                          <span className="text-[11px] text-slate-500">We will send verification OTP & site brochure.</span>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Size / Requirements & OTP Verification */}
                    {step === 3 && (
                      <div className="space-y-3.5">
                        <div className="field-group">
                          <label className="field-label">Approx Plot Size / Material Quantity</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 1800 sq.ft OR 300 Bags Cement" 
                            value={formData.sizeOrQty} 
                            onChange={(e) => setFormData({ ...formData, sizeOrQty: e.target.value })}
                            className="field-input"
                          />
                        </div>

                        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-800">
                              Verify Phone ({formData.phone || 'Enter in Step 2'})
                            </span>
                            {!otpSent ? (
                              <button 
                                type="button" 
                                onClick={handleSendOtp}
                                className="text-xs text-amber-700 font-bold hover:underline"
                              >
                                Send OTP
                              </button>
                            ) : (
                              <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                OTP Sent (8942)
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="4-digit OTP" 
                              value={formData.otp} 
                              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                              className="field-input text-center text-sm font-bold tracking-widest"
                              maxLength={6}
                            />
                            <button 
                              type="button" 
                              onClick={() => alert('Mobile Number Verified!')}
                              className="btn btn-secondary btn-sm shrink-0"
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2 mt-5">
                      {step > 1 && (
                        <button 
                          type="button" 
                          onClick={() => setStep(step - 1)}
                          className="btn btn-secondary btn-sm"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                      )}

                      <button 
                        type="submit" 
                        className="btn btn-primary btn-sm flex-1 font-bold"
                      >
                        {step === 3 ? (
                          <>
                            <span>Get My Smart Plan & Brochure</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Continue</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 text-center mt-3 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Zero spam guarantee. Dedicated advisor will contact you within 2 hrs.
                    </p>
                  </form>
                </div>
              ) : (
                /* Success State (WeHouse style) */
                <div className="py-6 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Thank You, {formData.name}!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mb-4">
                    Your enquiry for <strong>{formData.requirement}</strong> in <strong>{formData.city}</strong> has been logged. Our Senior Project Consultant is preparing your layout map and rate card.
                  </p>

                  <a 
                    href={`https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(formData.requirement)}%20in%20${encodeURIComponent(formData.city)}.%20Please%20share%20the%20details.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm w-full mb-3"
                  >
                    <span>Connect on WhatsApp Instantly</span>
                  </a>

                  <button 
                    type="button" 
                    onClick={() => { setIsSubmitted(false); setStep(1); }}
                    className="text-xs text-slate-500 hover:text-amber-600 underline"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
