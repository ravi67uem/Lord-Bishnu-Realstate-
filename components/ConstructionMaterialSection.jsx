'use client';

import React, { useState, useMemo } from 'react';
import { 
  Boxes, 
  Search, 
  ShoppingCart, 
  CheckCircle, 
  Phone, 
  Plus, 
  Minus, 
  Sparkles, 
  Tag, 
  Star,
  FileText,
  Truck,
  ShieldCheck
} from 'lucide-react';

export default function ConstructionMaterialSection({ 
  materials, 
  rfqItems, 
  onAddToCart, 
  onOpenRfqModal 
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});

  const CATEGORIES = [
    'All',
    'Cement',
    'TMT Steel',
    'Bricks & Blocks',
    'Sand & Aggregates',
    'Finishing & Tiles',
    'Plumbing & Electrical'
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter(item => {
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.specs.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [materials, activeCategory, searchQuery]);

  const handleQtyChange = (id, delta, minOrder) => {
    const current = quantities[id] || minOrder;
    const next = Math.max(minOrder, current + delta);
    setQuantities({ ...quantities, [id]: next });
  };

  const handleAdd = (material) => {
    const qty = quantities[material.id] || material.minOrder;
    onAddToCart(material, qty);
  };

  return (
    <section id="materials-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="container">
        
        {/* Header (WeHouse Style) */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="eyebrow-chip mb-3">Factory Direct Building Supplies</span>
          <h2 className="heading-section mb-3">
            High-Grade Construction Materials at <span className="text-amber-600">Wholesale Prices</span>
          </h2>
          <p className="section-lede">
            Authorized supply partner for UltraTech, Tata Tiscon, ACC & certified Sone river sand. 
            Delivered directly to your construction site across Gaya, Patna & Bihar with e-challan and test reports.
          </p>
        </div>

        {/* Toolbar: Category Pills & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar & RFQ Quick Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search cement, steel, bricks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field-input pl-9 text-xs py-2"
              />
            </div>

            <button 
              onClick={onOpenRfqModal}
              className="btn btn-secondary btn-sm shrink-0 font-bold"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-600" />
              <span>RFQ Cart ({rfqItems.length})</span>
            </button>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(mat => {
            const currentQty = quantities[mat.id] || mat.minOrder;
            const inCart = rfqItems.find(item => item.id === mat.id);

            return (
              <div 
                key={mat.id}
                className="wh-card flex flex-col justify-between border-slate-200/90 bg-white"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={mat.image} 
                    alt={mat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  
                  <span className="absolute top-3 left-3 badge-status bg-slate-900/90 text-amber-300 font-bold text-[10px] border border-white/20">
                    {mat.category}
                  </span>

                  <span className="absolute top-3 right-3 badge-status bg-green-100 text-green-800 font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    {mat.stockStatus}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] text-slate-300 block">Wholesale Rate</span>
                      <div className="text-xl font-extrabold text-amber-300">
                        ₹{mat.price.toLocaleString()}
                        <span className="text-xs font-normal text-slate-200 ml-1">/ {mat.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-300 block">Min. Order</span>
                      <span className="text-xs font-bold text-white">{mat.minOrder} {mat.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                      {mat.brand}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                      {mat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {mat.description}
                    </p>

                    {/* Technical Specifications */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700 mb-4 flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{mat.specs}</span>
                    </div>
                  </div>

                  {/* Quantity Selector & Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    
                    {/* Qty Controller */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Order Quantity:</span>
                      <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                        <button 
                          onClick={() => handleQtyChange(mat.id, -1, mat.minOrder)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-700 hover:bg-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center font-bold text-slate-900 text-xs">
                          {currentQty}
                        </span>
                        <button 
                          onClick={() => handleQtyChange(mat.id, 1, mat.minOrder)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-700 hover:bg-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total Estimated Price for this Qty */}
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Item Subtotal:</span>
                      <strong className="text-slate-900 font-bold">
                        ₹{(currentQty * mat.price).toLocaleString()}
                      </strong>
                    </div>

                    {/* Buttons: Add to RFQ & WhatsApp Direct */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleAdd(mat)}
                        className={`btn btn-sm flex-1 font-bold ${
                          inCart 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'btn-primary'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{inCart ? 'Update In RFQ' : 'Add to RFQ'}</span>
                      </button>

                      <a 
                        href={`https://wa.me/919431288204?text=Hi%20Lord%20Bishnu%20Builder%2C%20I%20need%20a%20rate%20quote%20for%20${currentQty}%20${mat.unit}%20of%20${encodeURIComponent(mat.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm p-2 text-green-700 hover:border-green-500"
                        title="Direct WhatsApp Rate Confirmation"
                      >
                        <Phone className="w-3.5 h-3.5 text-green-600" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner (Delivery & Bulk Supply Guarantee) */}
        <div className="mt-12 rounded-2xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">Need Bulk Site Delivery or Full Truckloads?</h4>
              <p className="text-xs text-slate-300 max-w-xl">
                We supply large institutional projects, builders, and individual home makers with verified e-challans, 
                weighbridge slips, and mill test certificates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={onOpenRfqModal}
              className="btn btn-primary btn-sm font-bold shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Review RFQ Cart ({rfqItems.length})</span>
            </button>
            <a 
              href="tel:+919431288204" 
              className="btn btn-outline-dark btn-sm"
            >
              Call Dispatch: +91 94312 88204
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
