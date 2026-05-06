import React from 'react';
import { motion } from 'motion/react';
import { Droplet, ArrowRight, BarChart3, Globe2 } from 'lucide-react';
import { WaterDemandChart } from './WaterDemandChart';

interface Props {
  onStart: () => void;
}

export function Landing({ onStart }: Props) {
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

          <div className="p-6 md:p-8 bg-navy rounded-2xl text-white mb-10 shadow-xl shadow-navy/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Droplet className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <p className="font-display text-3xl md:text-4xl font-medium leading-tight mb-6">
                1 Million GPT-4 tokens = <span className="text-teal-400">up to 6.15 liters</span> of drinking water.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 flex gap-3 items-start backdrop-blur-sm">
                <div className="p-1.5 bg-teal-400/10 rounded-lg shrink-0">
                  <Droplet className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1 uppercase tracking-wider">The True Systemic Cost</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Corporate disclosures often only count direct cooling (e.g., 0.32ml/query). But when including the massive water footprint of the power plants generating electricity for the GPUs (Scope 2), the true average consumption skyrockets to <span className="text-teal-400">2.85ml</span> per query, and up to <span className="text-teal-400">6.15 liters</span> per million tokens in arid regions.
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

          <button
            onClick={onStart}
            className="group inline-flex items-center gap-2 bg-navy hover:bg-navy-dark text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-navy"
          >
            Calculate Your Organization's Footprint
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              This is a proof-of-concept and an open proposal — not a final authority. Just as carbon emissions became a global KPI, AI water consumption can follow. AquaMetric demonstrates what measuring and reporting this metric could look like. We invite corporations, policymakers, and ESG standard bodies to adopt and formalize this framework.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
