'use client';

import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Compass, 
  Maximize2, 
  CheckCircle, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  FileText,
  Navigation,
  Check,
  Eye
} from 'lucide-react';

export default function PlotListingSection({ 
  plots, 
  onSelectPlot, 
  onBookToken, 
  selectedCity 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [maxPrice, setMaxPrice] = useState(12000000); // 1.2 Crore
  const [minArea, setMinArea] = useState(600);
  const [selectedFacing, setSelectedFacing] = useState('All');
  const [unitMode, setUnitMode] = useState('sqft'); // 'sqft' or 'kattha'

  // Filter plots
  const filteredPlots = useMemo(() => {
    return plots.filter(plot => {
      // City match
      if (selectedCity && selectedCity !== 'All' && !plot.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      // Type match
      if (selectedType !== 'All' && plot.type !== selectedType) {
        return false;
      }
      // Status match
      if (selectedStatus !== 'All' && plot.status !== selectedStatus) {
        return false;
      }
      // Facing match
      if (selectedFacing !== 'All' && !plot.facing.includes(selectedFacing)) {
        return false;
      }
      // Price match
      if (plot.totalPrice > maxPrice) {
        return false;
      }
      // Area match
      if (plot.areaSqFt < minArea) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches = 
          plot.title.toLowerCase().includes(query) ||
          plot.location.toLowerCase().includes(query) ||
          plot.project.toLowerCase().includes(query) ||
          plot.code.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [plots, selectedCity, selectedType, selectedStatus, selectedFacing, maxPrice, minArea, searchQuery]);

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section id="plots-section" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="container">
        
        {/* Section Heading (WeHouse Style) */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="eyebrow-chip mb-3">Verified Real Estate Land Bank</span>
          <h2 className="heading-section mb-3">
            Discover Prime Clear-Title Plots in <span className="text-amber-600">Bihar & Jharkhand</span>
          </h2>
          <p className="section-lede">
            Each plot is RERA registered, vetted for 100% legal mutation, demarcated with wide blacktop roads, 
            and ready for immediate registry and construction.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="wh-card p-5 mb-10 border-slate-200/90 shadow-md bg-slate-50/70">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by colony, airport road, project, or code..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field-input pl-10 text-sm"
              />
            </div>

            {/* Type Dropdown */}
            <div className="md:col-span-2">
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="field-select text-sm"
              >
                <option value="All">All Plot Types</option>
                <option value="Residential">Residential Villa</option>
                <option value="Commercial">Commercial Hub</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="md:col-span-2">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="field-select text-sm"
              >
                <option value="All">All Availability</option>
                <option value="Available">Available Now</option>
                <option value="Fast Selling">Fast Selling</option>
                <option value="Booked">Reserved / Booked</option>
              </select>
            </div>

            {/* Facing Filter */}
            <div className="md:col-span-2">
              <select 
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="field-select text-sm"
              >
                <option value="All">Any Facing (Vasthu)</option>
                <option value="East">East Facing</option>
                <option value="North">North Facing</option>
                <option value="North-East">North-East (Ishan)</option>
                <option value="West">West Facing</option>
              </select>
            </div>

            {/* Unit Toggle & Reset */}
            <div className="md:col-span-2 flex items-center justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setUnitMode(unitMode === 'sqft' ? 'kattha' : 'sqft')}
                className="btn btn-secondary btn-sm text-xs font-bold"
                title="Toggle Area Display between Sq.Ft and Kattha"
              >
                Unit: {unitMode === 'sqft' ? 'Sq.Ft' : 'Kattha'}
              </button>
            </div>

          </div>

          {/* Secondary Filter Row: Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-slate-200 text-xs">
            {/* Price Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Maximum Budget:</span>
                <span className="text-amber-600 font-bold">{formatPrice(maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min={1000000} 
                max={15000000} 
                step={200000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-slate-400 text-[10px] mt-0.5">
                <span>₹10 Lakhs</span>
                <span>₹1.5 Crores</span>
              </div>
            </div>

            {/* Minimum Area Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Min Area Size:</span>
                <span className="text-amber-600 font-bold">
                  {unitMode === 'sqft' ? `${minArea} Sq.Ft` : `${(minArea / 1361).toFixed(2)} Kattha`}
                </span>
              </div>
              <input 
                type="range" 
                min={600} 
                max={4000} 
                step={100}
                value={minArea}
                onChange={(e) => setMinArea(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-slate-400 text-[10px] mt-0.5">
                <span>600 SFT (0.44 Kattha)</span>
                <span>4,000 SFT (2.94 Kattha)</span>
              </div>
            </div>
          </div>

          {/* Result Count and Applied Chips */}
          <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Showing <strong>{filteredPlots.length}</strong> matching plot listings</span>
            {(selectedCity !== 'All' || selectedType !== 'All' || searchQuery) && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                  setSelectedStatus('All');
                  setSelectedFacing('All');
                  setMaxPrice(12000000);
                  setMinArea(600);
                }}
                className="text-amber-600 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlots.map((plot) => (
            <div 
              key={plot.id}
              className="wh-card flex flex-col group overflow-hidden border border-slate-200/90"
            >
              {/* Card Image & Overlay Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img 
                  src={plot.image} 
                  alt={plot.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="badge-status bg-slate-900/90 text-white font-mono text-[10px] border border-white/20">
                    {plot.code}
                  </span>
                  {plot.tag && (
                    <span className="badge-status bg-amber-500 text-slate-950 font-bold text-[10px]">
                      {plot.tag}
                    </span>
                  )}
                </div>

                {/* Status Badge Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  {plot.status === 'Available' && (
                    <span className="badge-status badge-available">Available</span>
                  )}
                  {plot.status === 'Fast Selling' && (
                    <span className="badge-status badge-fast-selling flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      Fast Selling
                    </span>
                  )}
                  {plot.status === 'Booked' && (
                    <span className="badge-status badge-booked">Reserved / Booked</span>
                  )}
                </div>

                {/* Bottom Overlay: Price */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
                  <div>
                    <span className="text-xs text-amber-300 font-medium">All-Inclusive Price</span>
                    <div className="text-xl font-extrabold text-white">
                      {formatPrice(plot.totalPrice)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-300 font-medium block">Rate</span>
                    <span className="text-xs font-bold text-amber-300">₹{plot.pricePerSqFt} / SFT</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Project & Title */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{plot.project}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-amber-600 transition-colors">
                    {plot.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3.5 line-clamp-1">
                    {plot.location}
                  </p>

                  {/* Dimension & Spec Grid */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs mb-3.5">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Plot Size</span>
                      <strong className="text-slate-800">
                        {unitMode === 'sqft' 
                          ? `${plot.areaSqFt} Sq.Ft` 
                          : `${plot.areaKattha} Kattha (${plot.areaSqFt} SFT)`}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Dimensions</span>
                      <strong className="text-slate-800">{plot.dimensions}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Vasthu Facing</span>
                      <strong className="text-slate-800 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-amber-500" />
                        {plot.facing}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Road Width</span>
                      <strong className="text-slate-800">{plot.roadWidth}</strong>
                    </div>
                  </div>

                  {/* Proximity Highlights */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Navigation className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate"><strong>Highway:</strong> {plot.landmarks.highway}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Check className="w-3 h-3 text-green-600 shrink-0" />
                      <span className="truncate"><strong>RERA:</strong> {plot.legal.reraNo}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button 
                    onClick={() => onSelectPlot(plot)}
                    className="btn btn-secondary btn-sm flex-1 text-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>View Layout</span>
                  </button>

                  {plot.status !== 'Booked' ? (
                    <button 
                      onClick={() => onBookToken(plot)}
                      className="btn btn-primary btn-sm flex-1 text-xs font-bold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Book (₹21k)</span>
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="btn btn-secondary btn-sm flex-1 text-xs bg-slate-100 text-slate-400 cursor-not-allowed border-none"
                    >
                      Reserved
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredPlots.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No plots match your current filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your price range, preferred facing, or selecting &quot;All Locations&quot; from the top bar.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedStatus('All');
                setMaxPrice(12000000);
                setMinArea(600);
              }}
              className="btn btn-primary btn-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
