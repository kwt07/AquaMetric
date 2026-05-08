import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, ArrowRight, BarChart3, BookOpen, ChevronDown, ChevronUp, Zap, Wind, Database, MapPin } from 'lucide-react';
import { WaterDemandChart } from './WaterDemandChart';

interface Props {
  onStart: () => void;
  onDeepDive: () => void;
  onMethodology: () => void;
}

export function Landing({ onStart, onDeepDive, onMethodology }: Props) {
  const [showAssumptions, setShowAssumptions] = useState(false);

  return (
    <div className="min-h-[80vh] relative">
      {/* Background Fluid Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] z-0">
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-navy">
          <path d="M0 200C240 100 480 300 720 200C960 100 1200 300 1440 200V800H0V200Z" fill="currentColor"/>
          <path d="M0 350C240 250 480 450 720 350C960 250 1200 450 1440 350V800H0V350Z" fill="currentColor" fillOpacity="0.6"/>
          <path d="M0 500C240 400 480 600 720 500C960 400 1200 600 1440 500V800H0V500Z" fill="currentColor" fillOpacity="0.3"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-navy-dark leading-[1.1] mb-6 tracking-tight">
              Every AI query has a <span className="text-teal">water bill.</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-light/80 leading-relaxed mb-8">
              Data centers cool servers by evaporating freshwater. Measure your organization's indirect water footprint and bring transparency to AI's systemic cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStart}
                className="group inline-flex justify-center items-center gap-2 bg-teal hover:bg-teal-light text-navy-dark px-8 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow"
              >
                Calculate Your Footprint
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onMethodology}
                className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-navy px-8 py-4 rounded-xl font-semibold transition-all shadow-sm border border-slate-200"
              >
                See Methodology
              </button>
            </div>
          </div>

          {/* Key Number Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-teal/20 group-hover:h-full transition-all duration-500 ease-out z-0"></div>
              <div className="relative z-10">
                <div className="text-4xl font-display font-bold text-navy-dark mb-2">6.15 L</div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Max Footprint</div>
                <p className="text-sm text-slate-600 font-medium">Per 1 Million GPT-4 tokens generated in arid, water-stressed regions.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-teal/20 group-hover:h-full transition-all duration-500 ease-out z-0"></div>
              <div className="relative z-10">
                <div className="text-4xl font-display font-bold text-navy-dark mb-2">2.85 ml</div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 flex items-center gap-1.5"><Droplet className="w-4 h-4"/> Avg. Per Query</div>
                <p className="text-sm text-slate-600 font-medium">Global average (Scope 1+2), including power plant cooling for GPU energy.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-teal/20 group-hover:h-full transition-all duration-500 ease-out z-0"></div>
              <div className="relative z-10">
                <div className="text-4xl font-display font-bold text-navy-dark mb-2">101M m³</div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3 flex items-center gap-1.5"><Database className="w-4 h-4"/> Scope 3 Example</div>
                <p className="text-sm text-slate-600 font-medium">Annual water consumption of TSMC (2023) producing the chips enabling AI.</p>
              </div>
            </div>
          </div>

          {/* Methodology Summary */}
          <div className="bg-navy rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Wind className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-lg font-bold mb-6 text-teal-400">How AI Drinks Water</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4 text-teal-300">
                    <Database className="w-5 h-5"/>
                  </div>
                  <h4 className="font-semibold mb-2">1. Computation</h4>
                  <p className="text-sm text-white/70">LLMs run on racks of specialized GPUs. Generating responses demands massive electricity and generates intense heat.</p>
                  <div className="hidden md:block absolute top-5 left-12 w-full h-px bg-gradient-to-r from-teal-400/50 to-transparent"></div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4 text-teal-300">
                    <Zap className="w-5 h-5"/>
                  </div>
                  <h4 className="font-semibold mb-2">2. Power Gen (Scope 2)</h4>
                  <p className="text-sm text-white/70">The electricity powering the servers relies heavily on thermoelectric power plants, which evaporate water to cool their generators.</p>
                  <div className="hidden md:block absolute top-5 left-12 w-full h-px bg-gradient-to-r from-teal-400/50 to-transparent"></div>
                </div>
                <div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4 text-teal-300">
                    <Droplet className="w-5 h-5"/>
                  </div>
                  <h4 className="font-semibold mb-2">3. Data Center (Scope 1)</h4>
                  <p className="text-sm text-white/70">To prevent the servers from melting down, cooling towers evaporate clean, potable freshwater into the atmosphere.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="mb-12">
            <WaterDemandChart />
          </div>

          <div className="flex justify-center mb-16">
            <button
              onClick={onStart}
              className="group inline-flex justify-center items-center gap-2 bg-navy hover:bg-navy-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl"
            >
              Start Calculator
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Deep Dive CTA Card */}
          <div className="bg-slate-100 p-6 md:p-8 rounded-2xl border border-slate-200 relative overflow-hidden group mb-12">
            <div className="md:flex items-center justify-between gap-8">
              <div className="mb-6 md:mb-0">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2 text-navy-dark">Want to understand the full picture?</h3>
                <p className="text-slate-600">
                  Explore the <strong>Three Scopes of AI Water</strong> and the <strong>Evaporation Misconception</strong>.
                </p>
              </div>
              <button
                onClick={onDeepDive}
                className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-navy px-6 py-3 rounded-lg font-bold transition-all shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-teal-600" />
                Explore The Deep Dive
              </button>
            </div>
          </div>
          
          {/* Source / Assumptions Collapse */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-navy">Sources & Underlying Assumptions</span>
              {showAssumptions ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            <AnimatePresence>
              {showAssumptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      This is a proof-of-concept and an open proposal — not a final authority. AquaMetric demonstrates what measuring and reporting this metric could look like.
                    </p>
                    <ul className="text-sm text-slate-600 list-disc pl-5 space-y-2">
                      <li><strong>Scope:</strong> Calculations currently encompass Scope 1 (Data Center Cooling) and Scope 2 (Power Generation Cooling) only.</li>
                      <li><strong>Volume:</strong> "Global Average" assumes ~2.85ml per query. "Arid Region" assumes ~6.15L per 1 Million Tokens based on Li et al. (2025).</li>
                      <li><strong>Format:</strong> 1 Million Tokens is approximated as ~7,692 standard queries.</li>
                      <li><strong>Equivalencies:</strong> Bathtub = 150 liters; Bottle = 0.5 liters; Human daily minimum survivable drinking water = ~3 liters.</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
