'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Phone, 
  Truck, 
  Building, 
  FileText,
  MapPin
} from 'lucide-react';

export default function RfqModal({ 
  rfqItems, 
  onClose, 
  onRemoveItem, 
  onClearCart, 
  onSubmitRfq 
}) {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    siteAddress: '',
    pinCode: '823001',
    deliveryCity: 'Gaya'
  });
  const [submitted, setSubmitted] = useState(false);
  const [rfqRef, setRfqRef] = useState('');

  const totalEstimatedCost = rfqItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      alert('Please fill your name and contact phone number.');
      return;
    }
    const newRef = `RFQ-LBB-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqRef(newRef);
    setSubmitted(true);

    if (onSubmitRfq) {
      onSubmitRfq({
        rfqId: newRef,
        customer,
        items: rfqItems,
        totalCost: totalEstimatedCost,
        date: new Date().toLocaleDateString(),
        status: 'Quotation Dispatched'
      });
    }
  };

  const getWhatsAppMessage = () => {
    let msg = `Hi Lord Bishnu Builder, I need a formal price quote for the following materials:\n\n`;
    rfqItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.brand}) - ${item.quantity} ${item.unit} @ ₹${item.price} = ₹${(item.quantity * item.price).toLocaleString()}\n`;
    });
    msg += `\nTotal Estimated Amount: ₹${totalEstimatedCost.toLocaleString()}`;
    msg += `\nDelivery Site: ${customer.deliveryCity || 'Gaya'}, Pin: ${customer.pinCode || '823001'}`;
    return encodeURIComponent(msg);
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
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">Request For Quotation (RFQ) Cart</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Wholesale Construction Material Dispatch</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!submitted ? (
            rfqItems.length > 0 ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Itemized Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                  <div className="max-h-56 overflow-y-auto divide-y divide-slate-100">
                    {rfqItems.map(item => (
                      <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                        <div className="flex-1 min-w-0">
                          <strong className="text-slate-900 block truncate">{item.name}</strong>
                          <span className="text-slate-500 text-[11px]">
                            {item.quantity} {item.unit} x ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <strong className="text-slate-900 font-bold">
                            ₹{(item.quantity * item.price).toLocaleString()}
                          </strong>
                          <button 
                            type="button" 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary footer */}
                  <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">Estimated Material Subtotal:</span>
                    <span className="text-amber-700 text-sm">₹{totalEstimatedCost.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery & Customer Info */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    Delivery Site & Customer Details
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="field-group">
                      <label className="field-label">Contact Person Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Anand Kumar" 
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="field-input text-xs"
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Mobile Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="10-digit number" 
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="field-input text-xs"
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Delivery City / District</label>
                      <select 
                        value={customer.deliveryCity}
                        onChange={(e) => setCustomer({ ...customer, deliveryCity: e.target.value })}
                        className="field-select text-xs"
                      >
                        <option value="Gaya">Gaya District</option>
                        <option value="Bodh Gaya">Bodh Gaya</option>
                        <option value="Patna">Patna Region</option>
                        <option value="Dobhi">Dobhi / Sherghati</option>
                        <option value="Jehanabad">Jehanabad</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Site Pin Code</label>
                      <input 
                        type="text" 
                        placeholder="823001" 
                        value={customer.pinCode}
                        onChange={(e) => setCustomer({ ...customer, pinCode: e.target.value })}
                        className="field-input text-xs"
                      />
                    </div>

                    <div className="field-group sm:col-span-2">
                      <label className="field-label">Site Address / Landmark</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Near Gaya Airport Road, Plot No 42" 
                        value={customer.siteAddress}
                        onChange={(e) => setCustomer({ ...customer, siteAddress: e.target.value })}
                        className="field-input text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={onClearCart} 
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Clear Cart
                  </button>

                  <div className="flex items-center gap-2">
                    <a 
                      href={`https://wa.me/919431288204?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm text-xs font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp RFQ</span>
                    </a>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-sm font-bold text-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Official Quotation</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">Your RFQ Cart is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                  Browse our Construction Material catalog and click &quot;Add to RFQ&quot; on cement, TMT steel, sand, or bricks.
                </p>
                <button 
                  onClick={onClose} 
                  className="btn btn-primary btn-sm"
                >
                  Browse Materials
                </button>
              </div>
            )
          ) : (
            /* Success Screen */
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Quotation Request Logged!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto mb-3">
                Reference <strong>{rfqRef}</strong> has been transmitted to our Gaya Central Material Dispatch Depot. 
                Our dispatch manager will call you within 60 minutes with freight and mill test reports.
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono mb-4 text-slate-700">
                Total Estimate: ₹{totalEstimatedCost.toLocaleString()} · {rfqItems.length} Material Batches
              </div>

              <div className="flex items-center justify-center gap-2">
                <a 
                  href={`https://wa.me/919431288204?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm text-xs font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send Quotation to WhatsApp</span>
                </a>
                <button 
                  onClick={onClose} 
                  className="btn btn-secondary btn-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
