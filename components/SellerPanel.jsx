'use client';

import React, { useState } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  MapPin, 
  Eye, 
  Upload, 
  Building, 
  UserCheck, 
  AlertCircle,
  FileText
} from 'lucide-react';

export default function SellerPanel({ 
  plots, 
  onAddPlot, 
  onDeletePlot, 
  onUpdatePlotStatus, 
  enquiries 
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  
  const [newPlot, setNewPlot] = useState({
    code: 'LB-GAYA-25',
    title: '',
    project: 'Lord Bishnu Green Meadows',
    location: 'Airport Road, Gaya',
    city: 'Gaya',
    type: 'Residential',
    areaSqFt: 1500,
    dimensions: '30 x 50 ft',
    facing: 'East',
    roadWidth: '40 ft Blacktop',
    pricePerSqFt: 1750,
    status: 'Available',
    landmarks: {
      highway: '0.8 km from NH-83',
      airport: '3.5 km to Gaya Airport',
      hospital: '2.0 km to City Hospital',
      railway: '5.0 km to Gaya Junction',
      school: '1.0 km to Public School'
    },
    amenities: ['40ft Wide Road', 'Street Lights', 'Boundary Wall', 'Water Line'],
    legal: {
      reraApproved: true,
      reraNo: 'BR-RERA-2024-GAY-099',
      mutationDone: true,
      titleClear: true,
      possession: 'Immediate'
    },
    image: '/images/hero-township.jpg'
  });

  const handleCreatePlot = (e) => {
    e.preventDefault();
    if (!newPlot.title || !newPlot.location) {
      alert('Please fill plot title and location.');
      return;
    }
    const created = {
      ...newPlot,
      id: `plot-${Date.now()}`,
      areaKattha: +(newPlot.areaSqFt / 1361).toFixed(2),
      totalPrice: newPlot.areaSqFt * newPlot.pricePerSqFt
    };
    onAddPlot(created);
    setShowAddModal(false);
    alert(`Plot ${created.code} successfully published to public catalog!`);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container">
        
        {/* Seller Bar */}
        <div className="wh-card p-6 border-slate-200 bg-white mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-status bg-purple-100 text-purple-800 font-bold text-xs">
                  Sales Team & Channel Partner Portal
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Listing & Inventory Control</h2>
              <p className="text-xs text-slate-500">
                Manage plot listings, update prices, change availability status, and review buyer leads.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm font-bold shadow-md flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Plot Listing</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 mb-6 text-sm font-bold">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Managed Plots ({plots.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('leads')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Customer Enquiry Leads ({enquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: PLOT INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Plot Code & Title</th>
                    <th className="p-3">Location / City</th>
                    <th className="p-3">Area & Dimensions</th>
                    <th className="p-3">Price / Rate</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plots.map(plot => (
                    <tr key={plot.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3">
                        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] mr-1">
                          {plot.code}
                        </span>
                        <strong className="text-slate-900 block mt-0.5">{plot.title}</strong>
                        <span className="text-slate-400 text-[11px]">{plot.project}</span>
                      </td>

                      <td className="p-3">
                        <span className="text-slate-700 font-medium block">{plot.location}</span>
                        <span className="text-slate-400 text-[11px]">{plot.city}</span>
                      </td>

                      <td className="p-3">
                        <span className="text-slate-900 font-bold block">{plot.areaSqFt} Sq.Ft</span>
                        <span className="text-slate-500 text-[11px]">{plot.dimensions} · {plot.facing}</span>
                      </td>

                      <td className="p-3">
                        <span className="text-slate-900 font-extrabold block">
                          ₹{(plot.totalPrice / 100000).toFixed(2)} Lakhs
                        </span>
                        <span className="text-slate-500 text-[11px]">₹{plot.pricePerSqFt} / SFT</span>
                      </td>

                      <td className="p-3">
                        <select 
                          value={plot.status}
                          onChange={(e) => onUpdatePlotStatus(plot.id, e.target.value)}
                          className="field-select text-xs py-1 px-2 font-bold cursor-pointer"
                        >
                          <option value="Available">Available</option>
                          <option value="Fast Selling">Fast Selling</option>
                          <option value="Booked">Reserved / Booked</option>
                        </select>
                      </td>

                      <td className="p-3 text-right">
                        <button 
                          onClick={() => onDeletePlot(plot.id)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BUYER LEADS */}
        {activeTab === 'leads' && (
          <div className="wh-card p-5 border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Incoming Buyer Enquiries & Site Visit Requests</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Lead Contact</th>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Location & Budget</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Direct Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enq, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-3">
                        <strong className="text-slate-900 block">{enq.name}</strong>
                        <span className="text-slate-500 text-[11px]">{enq.phone}</span>
                      </td>
                      <td className="p-3">
                        <span className="badge-status bg-amber-50 text-amber-800 text-[10px] font-bold">
                          {enq.type}
                        </span>
                        <span className="text-slate-600 block mt-1">{enq.interest}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-slate-800 font-semibold block">{enq.city}</span>
                        <span className="text-slate-500 text-[11px]">{enq.budget || 'Open'}</span>
                      </td>
                      <td className="p-3 text-slate-500 text-[11px]">
                        {enq.date}
                      </td>
                      <td className="p-3">
                        <span className="badge-status bg-green-100 text-green-800 text-[10px]">
                          {enq.status || 'Fresh Lead'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <a 
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20contacting%20Lord%20Bishnu%20Builder.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp btn-sm text-[11px] py-1 px-2"
                        >
                          WhatsApp Lead
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Plot Listing */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div 
              className="modal-content max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
                <h3 className="text-sm font-bold">Add New Verified Plot Listing</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePlot} className="p-5 space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="field-group">
                    <label className="field-label">Plot Code *</label>
                    <input 
                      type="text" 
                      required 
                      value={newPlot.code}
                      onChange={(e) => setNewPlot({ ...newPlot, code: e.target.value })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Plot Type</label>
                    <select 
                      value={newPlot.type}
                      onChange={(e) => setNewPlot({ ...newPlot, type: e.target.value })}
                      className="field-select text-xs"
                    >
                      <option value="Residential">Residential Villa</option>
                      <option value="Commercial">Commercial / Mixed Use</option>
                    </select>
                  </div>

                  <div className="field-group col-span-2">
                    <label className="field-label">Listing Title *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Greenwood Palms - Corner Villa Plot"
                      value={newPlot.title}
                      onChange={(e) => setNewPlot({ ...newPlot, title: e.target.value })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Project Name</label>
                    <input 
                      type="text" 
                      value={newPlot.project}
                      onChange={(e) => setNewPlot({ ...newPlot, project: e.target.value })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">City / Region</label>
                    <select 
                      value={newPlot.city}
                      onChange={(e) => setNewPlot({ ...newPlot, city: e.target.value })}
                      className="field-select text-xs"
                    >
                      <option value="Gaya">Gaya</option>
                      <option value="Bodh Gaya">Bodh Gaya</option>
                      <option value="Patna">Patna</option>
                      <option value="Dobhi">Dobhi</option>
                    </select>
                  </div>

                  <div className="field-group col-span-2">
                    <label className="field-label">Exact Location / Road *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Airport Road Near Army Camp, Gaya"
                      value={newPlot.location}
                      onChange={(e) => setNewPlot({ ...newPlot, location: e.target.value })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Plot Area (Sq.Ft) *</label>
                    <input 
                      type="number" 
                      required 
                      value={newPlot.areaSqFt}
                      onChange={(e) => setNewPlot({ ...newPlot, areaSqFt: Number(e.target.value) })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Rate (₹ / Sq.Ft) *</label>
                    <input 
                      type="number" 
                      required 
                      value={newPlot.pricePerSqFt}
                      onChange={(e) => setNewPlot({ ...newPlot, pricePerSqFt: Number(e.target.value) })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Dimensions</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 30 x 50 ft"
                      value={newPlot.dimensions}
                      onChange={(e) => setNewPlot({ ...newPlot, dimensions: e.target.value })}
                      className="field-input text-xs"
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Vasthu Facing</label>
                    <select 
                      value={newPlot.facing}
                      onChange={(e) => setNewPlot({ ...newPlot, facing: e.target.value })}
                      className="field-select text-xs"
                    >
                      <option value="East">East</option>
                      <option value="North">North</option>
                      <option value="North-East">North-East</option>
                      <option value="West">West</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-sm font-bold"
                  >
                    Publish Plot Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
