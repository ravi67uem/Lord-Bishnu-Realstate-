'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building, 
  Download, 
  Printer, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TokenBookingModal({ plot, plots, onClose, onBookingSuccess }) {
  const [selectedPlot, setSelectedPlot] = useState(plot || (plots && plots[0]) || null);
  const [step, setStep] = useState(1);
  const [tokenAmount, setTokenAmount] = useState(21000);
  const [tokenPlan, setTokenType] = useState('Standard Hold (₹21,000)');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [customer, setCustomer] = useState({
    name: 'Rohan Sharma',
    phone: '9835012345',
    email: 'rohan.sharma@gmail.com',
    address: 'AP Colony, Gaya, Bihar - 823001',
    panOrAadhar: 'ABCDE1234F',
    nomineeName: 'Priya Sharma (Wife)'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!selectedPlot) return null;

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.email) {
      alert('Please fill all required personal details for the allotment deed.');
      return;
    }
    setStep(2);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const bookingRef = `LBB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking = {
        bookingId: bookingRef,
        plotId: selectedPlot.id,
        plotCode: selectedPlot.code,
        plotTitle: selectedPlot.title,
        customerName: customer.name,
        customerPhone: `+91 ${customer.phone}`,
        customerEmail: customer.email,
        customerAddress: customer.address,
        panOrAadhar: customer.panOrAadhar,
        nomineeName: customer.nomineeName,
        city: selectedPlot.city,
        tokenAmount: tokenAmount,
        tokenType: tokenPlan,
        paymentMode: paymentMethod.toUpperCase(),
        paymentRef: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'Token Verified',
        totalPlotValue: selectedPlot.totalPrice
      };

      setConfirmedBooking(newBooking);
      setStep(3);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      if (onBookingSuccess) {
        onBookingSuccess(newBooking);
      }
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">Online Plot Token & Allotment</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Official RERA Token Booking Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-amber-500 text-white' : 'bg-green-600 text-white'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-slate-900' : 'text-slate-500'}>Buyer Information</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className="flex items-center gap-2 font-semibold">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-amber-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-slate-900' : 'text-slate-400'}>Token Payment</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className="flex items-center gap-2 font-semibold">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-slate-300 text-slate-600">
                3
              </span>
              <span className="text-slate-400">Confirmation Slip</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Buyer Details & Plot Review */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              {/* Selected Plot Summary Box */}
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded text-[10px]">
                    {selectedPlot.code}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{selectedPlot.title}</h4>
                  <p className="text-slate-600 text-[11px]">{selectedPlot.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Plot Value</span>
                  <strong className="text-base font-extrabold text-amber-700">
                    ₹{(selectedPlot.totalPrice / 100000).toFixed(2)} Lakhs
                  </strong>
                  <span className="text-[10px] text-slate-500 block">
                    {selectedPlot.areaSqFt} SFT ({selectedPlot.areaKattha} Kattha)
                  </span>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="field-group">
                  <label className="field-label">Full Name (as per Registry) *</label>
                  <input 
                    type="text" 
                    required 
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">PAN or Aadhar Number (for Registry KYC)</label>
                  <input 
                    type="text" 
                    value={customer.panOrAadhar}
                    onChange={(e) => setCustomer({ ...customer, panOrAadhar: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="field-group sm:col-span-2">
                  <label className="field-label">Full Permanent / Current Address *</label>
                  <input 
                    type="text" 
                    required 
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="field-input"
                  />
                </div>

                <div className="field-group sm:col-span-2">
                  <label className="field-label">Nominee Name & Relationship</label>
                  <input 
                    type="text" 
                    value={customer.nomineeName}
                    onChange={(e) => setCustomer({ ...customer, nomineeName: e.target.value })}
                    className="field-input"
                  />
                </div>
              </div>

              {/* Token Plan Selector */}
              <div className="pt-2">
                <label className="field-label mb-2 block">Choose Token Booking Amount</label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button 
                    type="button"
                    onClick={() => {
                      setTokenAmount(21000);
                      setTokenType('Standard Hold (₹21,000)');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tokenAmount === 21000 
                        ? 'border-amber-500 bg-amber-50/80 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800">Standard Hold</div>
                    <div className="text-base font-extrabold text-amber-700 mt-1">₹21,000</div>
                    <div className="text-[10px] text-slate-500 mt-1">Locks plot for 14 days</div>
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      setTokenAmount(51000);
                      setTokenType('Priority Advance (₹51,000)');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tokenAmount === 51000 
                        ? 'border-amber-500 bg-amber-50/80 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800">Priority Allotment</div>
                    <div className="text-base font-extrabold text-amber-700 mt-1">₹51,000</div>
                    <div className="text-[10px] text-slate-500 mt-1">Immediate title deed draft</div>
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      const advance = Math.round(selectedPlot.totalPrice * 0.1);
                      setTokenAmount(advance);
                      setTokenType('10% Confirmation Advance');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tokenAmount > 51000 
                        ? 'border-amber-500 bg-amber-50/80 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800">10% Advance</div>
                    <div className="text-base font-extrabold text-amber-700 mt-1">
                      ₹{(Math.round(selectedPlot.totalPrice * 0.1) / 100000).toFixed(2)}L
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Guarantees registry date</div>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm font-bold"
                >
                  <span>Proceed to Payment (₹{tokenAmount.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Payable Token Amount:</span>
                  <div className="text-xl font-extrabold text-slate-900">
                    ₹{tokenAmount.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Plot Code:</span>
                  <div className="font-bold text-amber-700">{selectedPlot.code}</div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2.5">
                <label className="field-label block">Select Secure Payment Mode</label>
                
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Instant UPI (GPay / PhonePe / Paytm / BHIM)</div>
                      <div className="text-[11px] text-slate-500">Zero surcharge, instant token confirmation</div>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-amber-600" />
                </label>

                {/* QR Code Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'qr' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'qr'}
                      onChange={() => setPaymentMethod('qr')}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Scan Dynamic UPI QR Code</div>
                      <div className="text-[11px] text-slate-500">Scan with any mobile banking or UPI app</div>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-amber-600" />
                </label>

                {/* NetBanking Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Net Banking (SBI / HDFC / ICICI / PNB / BoB)</div>
                      <div className="text-[11px] text-slate-500">Direct RTGS / NEFT / IMPS corporate gateway</div>
                    </div>
                  </div>
                  <Building className="w-5 h-5 text-amber-600" />
                </label>

                {/* Card Option */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Debit / Credit Card</div>
                      <div className="text-[11px] text-slate-500">Visa, MasterCard, RuPay with 256-bit SSL</div>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </label>
              </div>

              {/* Payment Details Preview */}
              {paymentMethod === 'qr' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
                  <div className="w-32 h-32 bg-white p-2 rounded-lg border border-slate-200 shadow-sm mb-2 flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-slate-900" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">Scan to pay ₹{tokenAmount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">UPI ID: lordbishnubuilder@sbi</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="btn btn-secondary btn-sm"
                  disabled={isProcessing}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button 
                  type="button" 
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="btn btn-primary btn-sm font-bold shadow-md"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting Gateway...
                    </span>
                  ) : (
                    <span>Confirm & Pay ₹{tokenAmount.toLocaleString()}</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Booking Confirmation & Official Printable Receipt */}
          {step === 3 && confirmedBooking && (
            <div className="space-y-5">
              <div className="text-center py-2">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Allotment Token Confirmed!</h3>
                <p className="text-xs text-slate-600">
                  Congratulations! Plot <strong>{confirmedBooking.plotCode}</strong> is now reserved in your name.
                </p>
              </div>

              {/* Formal Printable Receipt Card */}
              <div id="printable-receipt" className="p-5 rounded-2xl border-2 border-slate-800 bg-white shadow-md text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-950 uppercase tracking-tight">
                      LORD BISHNU BUILDER & REAL ESTATE
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      RERA Reg: BR-RERA-2024-GAY-092 · Gaya Head Office, Bihar
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Booking Reference</span>
                    <strong className="text-sm font-mono text-amber-700">{confirmedBooking.bookingId}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Allottee Name:</span>
                    <strong className="text-slate-900">{confirmedBooking.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contact Phone:</span>
                    <strong className="text-slate-900">{confirmedBooking.customerPhone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Selected Plot:</span>
                    <strong className="text-slate-900">{confirmedBooking.plotTitle} ({confirmedBooking.plotCode})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location / City:</span>
                    <strong className="text-slate-900">{selectedPlot.location}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Token Amount Paid:</span>
                    <strong className="text-green-700 text-sm">₹{confirmedBooking.tokenAmount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payment Mode & Ref:</span>
                    <strong className="text-slate-900">{confirmedBooking.paymentMode} ({confirmedBooking.paymentRef})</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Timestamp: {confirmedBooking.bookingDate}</span>
                  <span className="text-green-700 font-bold uppercase">Status: Official Token Verified</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button 
                  onClick={handlePrint}
                  className="btn btn-secondary btn-sm flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt Slip</span>
                </button>

                <div className="flex items-center gap-2">
                  <a 
                    href={`https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20have%20completed%20online%20token%20booking%20for%20Plot%20${confirmedBooking.plotCode}%20with%20Booking%20ID%20${confirmedBooking.bookingId}.%20Please%20verify.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    Send to WhatsApp
                  </a>
                  <button 
                    onClick={onClose}
                    className="btn btn-primary btn-sm font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
