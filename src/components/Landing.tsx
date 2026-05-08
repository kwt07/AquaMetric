import React from 'react';
import { motion } from 'motion/react';
import { Droplet, ArrowRight, BarChart3, Globe2, BookOpen } from 'lucide-react';
import { WaterDemandChart } from './WaterDemandChart';

interface Props {
  onStart: () => void;
  onDeepDive: () => void;
}

export function Landing({ onStart, onDeepDive }: Props) {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-navy-dark leading-[1.1] mb-6 tracking-tight">
            Every AI query has a <span className="text-teal">water bill.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-navy-light/80 mb-10 max-w-2xl leading-relaxed">
            Data centers cool servers by evaporating freshwater. The cloud is a hot, physical industrial machine.
          </p>

          <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-2xl text-navy mb-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none text-navy">
              <Droplet className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <p className="font-display text-3xl md:text-4xl font-medium leading-tight mb-6">
                1 Million GPT-4 tokens = <span className="text-teal-600 font-bold">up to 6.15 liters</span> of drinking water.
              </p>
              
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 md:p-5 flex gap-3 items-start">
                <div className="p-1.5 bg-teal-50 border border-teal-100 rounded-lg shrink-0">
                  <Droplet className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-navy-dark font-medium text-sm mb-1 uppercase tracking-wider">The True Systemic Cost</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Corporate disclosures often only count direct cooling (e.g., 0.32ml/query). But when including the massive water footprint of the power plants generating electricity for the GPUs (Scope 2), the true average consumption skyrockets to <strong className="text-teal-700">2.85ml</strong> per query, and up to <strong className="text-teal-700">6.15 liters</strong> per million tokens in arid regions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="flex items-center gap-2 font-display font-semibold text-lg mb-2 text-navy">
                <Globe2 className="w-5 h-5 text-teal" />
                Invisible Global Scale
              </h3>
              <p className="text-navy-light/70 text-sm leading-relaxed">
                The rapid adoption of AI has created a massive digital footprint. While the technology feels abstract and weightless, it relies on highly resource-intensive physical infrastructure.
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-display font-semibold text-lg mb-2 text-navy">
                <BarChart3 className="w-5 h-5 text-teal" />
                Hyper-Localized Cost
              </h3>
              <p className="text-navy-light/70 text-sm leading-relaxed">
                The water costs are hyper-localized, draining specific aquifers. A single hyperscale data center can consume up to 5 million gallons of community freshwater daily.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <WaterDemandChart />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={onStart}
              className="flex-1 group inline-flex justify-center items-center gap-2 bg-teal hover:bg-teal-light text-navy-dark px-8 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow"
            >
              Calculate Your Footprint
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Deep Dive CTA Card */}
          <div className="bg-navy p-6 md:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group mb-12">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] transition-opacity group-hover:opacity-[0.06] pointer-events-none scale-150 -translate-y-10 translate-x-10">
              <BookOpen className="w-40 h-40" />
            </div>
            <div className="relative z-10 md:flex items-center justify-between gap-8">
              <div className="mb-6 md:mb-0">
                <h3 className="font-display text-2xl md:text-3xl font-medium mb-2">Want to understand the full picture?</h3>
                <p className="text-navy-light/80 text-white/70">
                  Explore the <strong>Three Scopes of AI Water</strong> and the <strong>Evaporation Misconception</strong>.
                </p>
              </div>
              <button
                onClick={onDeepDive}
                className="shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-lg font-medium transition-all group/btn"
              >
                Explore The Deep Dive
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              This is a proof-of-concept and an open proposal — not a final authority. Just as carbon emissions became a global KPI, AI water consumption can follow. AquaMetric demonstrates what measuring and reporting this metric could look like. We invite corporations, policymakers, and ESG standard bodies to adopt and formalize this framework.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
