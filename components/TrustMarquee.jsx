'use client';

import React from 'react';
import { Shield, Building, Award, CheckCircle, Landmark, FileCheck } from 'lucide-react';

export default function TrustMarquee() {
  const TRUST_BADGES = [
    { icon: <Landmark className="w-4 h-4 text-amber-500" />, text: "SBI Home Loans Approved" },
    { icon: <Shield className="w-4 h-4 text-amber-500" />, text: "RERA Bihar Registered" },
    { icon: <Landmark className="w-4 h-4 text-amber-500" />, text: "HDFC & ICICI Approved Projects" },
    { icon: <FileCheck className="w-4 h-4 text-amber-500" />, text: "100% Land Mutation Guaranteed" },
    { icon: <Building className="w-4 h-4 text-amber-500" />, text: "Direct Tata Tiscon Mill Stockist" },
    { icon: <Award className="w-4 h-4 text-amber-500" />, text: "UltraTech Cement Authorized Dealer" },
    { icon: <CheckCircle className="w-4 h-4 text-amber-500" />, text: "Zero Title Dispute Guarantee" },
    { icon: <Landmark className="w-4 h-4 text-amber-500" />, text: "PNB Housing Finance Partner" }
  ];

  return (
    <div className="bg-slate-900 py-3.5 border-y border-slate-800 text-white overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {TRUST_BADGES.concat(TRUST_BADGES).map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 whitespace-nowrap px-4 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs font-medium text-slate-200"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
