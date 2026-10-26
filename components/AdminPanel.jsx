'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BarChart3, 
  Building2, 
  Boxes, 
  Users, 
  CreditCard, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Settings,
  Edit2,
  Trash2
} from 'lucide-react';

export default function AdminPanel({ 
  plots, 
  materials, 
  bookings, 
  enquiries, 
  onUpdateMaterialPrice, 
  onUpdateBookingStatus,
  onUpdatePlotStatus
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('overview');
  const [editingMatId, setEditingMatId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  // Analytics Metrics
  const totalPlotInventoryValue = plots.reduce((acc, p) => acc + p.totalPrice, 0);
  const totalTokensCollected = bookings.reduce((acc, b) => acc + b.tokenAmount, 0);
  const availablePlotsCount = plots.filter(p => p.status === 'Available').length;
  const bookedPlotsCount = plots.filter(p => p.status === 'Booked').length;

  const handleSavePrice = (matId) => {
    if (newPrice && !isNaN(newPrice)) {
      onUpdateMaterialPrice(matId, Number(newPrice));
      setEditingMatId(null);
      setNewPrice('');
    }
  };

  return (
    <div className="py-10 bg-slate-100 min-h-screen">
      <div className="container">
        
        {/* Admin Header */}
        <div className="wh-card p-6 border-slate-300 bg-slate-900 text-white mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-status bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold">
                  MASTER ADMINISTRATOR PRIVILEGES
                </span>
                <span className="text-xs text-slate-400">Company ID: LBB-CORP-01</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Lord Bishnu Builder Central Executive Console
              </h2>
              <p className="text-xs text-slate-400">
                Single integrated management console for Construction Materials supply chain & Real Estate plot listings.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total Land Inventory</span>
              <div className="text-xl font-mono font-bold text-amber-400">
                ₹{(totalPlotInventoryValue / 10000000).toFixed(2)} Crores
              </div>
            </div>
          </div>
        </div>

        {/* Executive KPI Stats (Section 6 dashboard statistics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Total Plots</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{plots.length}</div>
            <div className="text-[11px] text-green-700 mt-1 font-medium">
              {availablePlotsCount} Available · {bookedPlotsCount} Reserved
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Tokens Collected</span>
              <CreditCard className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              ₹{(totalTokensCollected / 1000).toFixed(1)}k
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              {bookings.length} Confirmed Token Receipts
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Material Catalog</span>
              <Boxes className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{materials.length} SKUs</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">
              Cement, Steel, Bricks, Aggregates
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
              <span>Active Leads</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{enquiries.length}</div>
            <div className="text-[11px] text-amber-700 mt-1 font-medium">
              High-intent Buyer Enquiries
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 text-xs sm:text-sm font-bold overflow-x-auto pb-1">
          <button 
            onClick={() => setActiveAdminTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'overview'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Bookings ({bookings.length})</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('materials')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'materials'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Manage Material Prices & SKUs</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('plots')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'plots'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Manage Plot Land Bank ({plots.length})</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('leads')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'leads'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Lead Inquiries CRM ({enquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: BOOKING & TOKEN MANAGEMENT */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            <div className="wh-card p-5 border-slate-200 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Token Payment Records & Approvals</h3>
                  <p className="text-xs text-slate-500">Verify online token receipts, schedule registries, or update status</p>
                </div>
                <button 
                  onClick={() => alert('Exporting token records to CSV...')}
                  className="btn btn-secondary btn-sm text-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-green-700" />
                  <span>Export Report</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Booking ID</th>
                      <th className="p-3">Allottee Name & Contact</th>
                      <th className="p-3">Plot Code & Value</th>
                      <th className="p-3">Token Paid</th>
                      <th className="p-3">Payment Mode</th>
                      <th className="p-3">Workflow Status</th>
                      <th className="p-3 text-right">Approve / Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="p-3">
                          <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {b.bookingId}
                          </span>
                          <span className="text-[11px] text-slate-400 block mt-1">{b.bookingDate}</span>
                        </td>

                        <td className="p-3">
                          <strong className="text-slate-900 block">{b.customerName}</strong>
                          <span className="text-slate-500 text-[11px]">{b.customerPhone}</span>
                        </td>

                        <td className="p-3">
                          <strong className="text-slate-800 block">{b.plotCode}</strong>
                          <span className="text-slate-500 text-[11px]">
                            ₹{(b.totalPlotValue / 100000).toFixed(2)} Lakhs
                          </span>
                        </td>

                        <td className="p-3">
                          <strong className="text-green-700 font-bold block text-sm">
                            ₹{b.tokenAmount.toLocaleString()}
                          </strong>
                          <span className="text-slate-400 text-[10px]">{b.tokenType}</span>
                        </td>

                        <td className="p-3">
                          <span className="text-slate-700 font-medium block">{b.paymentMode}</span>
                          <span className="text-slate-400 text-[10px] font-mono">{b.paymentRef}</span>
                        </td>

                        <td className="p-3">
                          <span className="badge-status bg-green-100 text-green-800 text-[10px] font-bold">
                            {b.status}
                          </span>
                        </td>

                        <td className="p-3 text-right">
                          <select 
                            value={b.status}
                            onChange={(e) => onUpdateBookingStatus(b.bookingId, e.target.value)}
                            className="field-select text-xs py-1 px-2 font-bold cursor-pointer"
                          >
                            <option value="Token Verified">Token Verified</option>
                            <option value="Registry Scheduled">Registry Scheduled</option>
                            <option value="Registry Complete">Registry Complete</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE MATERIAL PRICES */}
        {activeAdminTab === 'materials' && (
          <div className="wh-card p-5 border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Wholesale Construction Material Price Master</h3>
                <p className="text-xs text-slate-500">Edit live factory prices displayed to customers across Bihar</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Material & Brand</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Min Order</th>
                    <th className="p-3">Current Price (₹)</th>
                    <th className="p-3 text-right">Quick Price Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {materials.map(mat => (
                    <tr key={mat.id} className="hover:bg-slate-50/70">
                      <td className="p-3">
                        <strong className="text-slate-900 block">{mat.name}</strong>
                        <span className="text-amber-700 text-[11px] font-semibold">{mat.brand}</span>
                      </td>

                      <td className="p-3">
                        <span className="badge-status bg-slate-100 text-slate-700 text-[10px]">
                          {mat.category}
                        </span>
                      </td>

                      <td className="p-3 text-slate-700 font-medium">
                        {mat.unit}
                      </td>

                      <td className="p-3 text-slate-500">
                        {mat.minOrder} {mat.unit}
                      </td>

                      <td className="p-3">
                        {editingMatId === mat.id ? (
                          <input 
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="field-input text-xs w-28 py-1"
                            placeholder={mat.price}
                          />
                        ) : (
                          <strong className="text-sm font-extrabold text-slate-900">
                            ₹{mat.price.toLocaleString()}
                          </strong>
                        )}
                      </td>

                      <td className="p-3 text-right">
                        {editingMatId === mat.id ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => handleSavePrice(mat.id)}
                              className="btn btn-primary btn-sm text-[11px] py-1 px-2.5 font-bold"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => setEditingMatId(null)}
                              className="btn btn-secondary btn-sm text-[11px] py-1 px-2.5"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              setEditingMatId(mat.id);
                              setNewPrice(mat.price);
                            }}
                            className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 ml-auto text-xs"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Rate</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE PLOTS */}
        {activeAdminTab === 'plots' && (
          <div className="wh-card p-5 border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Master Real Estate Plot Inventory</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Code & Title</th>
                    <th className="p-3">Project & City</th>
                    <th className="p-3">Area (SFT / Kattha)</th>
                    <th className="p-3">Total Value</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Status Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plots.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/70">
                      <td className="p-3">
                        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                          {p.code}
                        </span>
                        <strong className="text-slate-900 block mt-0.5">{p.title}</strong>
                      </td>
                      <td className="p-3">
                        <span className="text-slate-800 font-medium block">{p.project}</span>
                        <span className="text-slate-500 text-[11px]">{p.city}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{p.areaSqFt} SFT</span>
                        <span className="text-amber-700 text-[11px]">{p.areaKattha} Kattha</span>
                      </td>
                      <td className="p-3 font-extrabold text-slate-900">
                        ₹{(p.totalPrice / 100000).toFixed(2)} Lakhs
                      </td>
                      <td className="p-3">
                        <span className={`badge-status text-[10px] ${
                          p.status === 'Available' ? 'badge-available' :
                          p.status === 'Fast Selling' ? 'badge-fast-selling' : 'badge-booked'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <select 
                          value={p.status}
                          onChange={(e) => onUpdatePlotStatus(p.id, e.target.value)}
                          className="field-select text-xs py-1 px-2 font-bold cursor-pointer"
                        >
                          <option value="Available">Set Available</option>
                          <option value="Fast Selling">Set Fast Selling</option>
                          <option value="Booked">Set Reserved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LEADS */}
        {activeAdminTab === 'leads' && (
          <div className="wh-card p-5 border-slate-200 bg-white">
            <h3 className="text-sm font-bold text-slate-900 mb-3">All Registered Buyer Leads & RFQs</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Phone & Email</th>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enq, i) => (
                    <tr key={i} className="hover:bg-slate-50/70">
                      <td className="p-3 font-bold text-slate-900">{enq.name}</td>
                      <td className="p-3">
                        <span className="block text-slate-800">{enq.phone}</span>
                        <span className="text-[11px] text-slate-400">{enq.email}</span>
                      </td>
                      <td className="p-3">
                        <span className="badge-status bg-amber-50 text-amber-800 text-[10px] font-bold">
                          {enq.type}
                        </span>
                        <span className="text-slate-600 block mt-1">{enq.interest}</span>
                      </td>
                      <td className="p-3 text-slate-800">{enq.city}</td>
                      <td className="p-3 text-slate-500 text-[11px]">{enq.date}</td>
                      <td className="p-3 text-right">
                        <a 
                          href={`tel:${enq.phone.replace(/[^0-9]/g, '')}`}
                          className="btn btn-secondary btn-sm text-[11px] py-1 px-2.5"
                        >
                          Call Lead
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
