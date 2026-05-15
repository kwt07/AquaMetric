import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, AlertTriangle, Scale, Target, Droplet, Globe, Map, Zap, ChevronRight } from 'lucide-react';

interface Props {
  initialTab?: string;
}

export function Research({ initialTab = 'evaporation' }: Props) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // If initialTab changes from outside, respect it
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'evaporation', label: 'Evaporation Misconception', icon: Droplet },
    { id: 'claude', label: "Claude's Case Study", icon: Zap },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-display font-bold text-navy-dark mb-4">The Deep Dive</h2>
          <p className="text-xl text-navy-light/80 leading-relaxed max-w-3xl">
            Understanding the ecological impact of AI requires looking beyond carbon. Water is the hidden cost of the AI boom, and the crisis is fundamentally localized.
          </p>
        </div>

        {/* The Three Scopes (Now standalone) */}
        <section className="bg-white/50 p-6 md:p-10 rounded-2xl border border-navy/5 mb-12">
          <h3 className="flex items-center gap-3 text-2xl font-display font-semibold text-navy mb-8">
            <Target className="w-6 h-6 text-teal" />
            The Three Scopes of AI Water Consumption
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Scope 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-all">
              <h4 className="text-lg font-bold text-navy mb-5 pb-5 border-b border-slate-100">
                Scope 1<br />
                <span className="text-teal text-xl font-display mt-1 block">Direct Water Usage</span>
                <span className="text-sm font-medium text-slate-400 mt-1 block uppercase tracking-wide">On-Site Cooling</span>
              </h4>
              <div className="space-y-5 text-sm text-slate-600 flex-1 leading-relaxed">
                <div><strong className="text-navy block mb-1">What it is:</strong> Water consumed and withdrawn directly at the data center to keep servers from melting down.</div>
                <div><strong className="text-navy block mb-1">The Reality:</strong> AI models run on hyper-dense GPUs generating intense heat. Massive evaporative cooling towers absorb this heat and evaporate clean, drinkable freshwater directly into the atmosphere.</div>
              </div>
              <div className="bg-red-50 text-red-900 p-4 rounded-xl mt-6 border border-red-100/50">
                <strong className="text-red-950 flex items-center gap-2 mb-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0" /> The Urgency</strong>
                <p className="text-xs leading-relaxed opacity-90">A single hyperscale center can evaporate up to 5M gallons daily. It acts like a "giant soda straw" in local aquifers, directly robbing drought-prone communities of drinking and irrigation water.</p>
              </div>
            </div>

            {/* Scope 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-all">
              <h4 className="text-lg font-bold text-navy mb-5 pb-5 border-b border-slate-100">
                Scope 2<br />
                <span className="text-orange-500 text-xl font-display mt-1 block">Indirect Usage</span>
                <span className="text-sm font-medium text-slate-400 mt-1 block uppercase tracking-wide">Electricity Generation</span>
              </h4>
              <div className="space-y-5 text-sm text-slate-600 flex-1 leading-relaxed">
                <div><strong className="text-navy block mb-1">What it is:</strong> Off-site water used by power plants to generate the massive electricity required for AI infrastructure.</div>
                <div><strong className="text-navy block mb-1">The Reality:</strong> Thermoelectric power plants (coal, natural gas, nuclear) must consume vast quantities of water to create steam to turn turbines and cool their systems.</div>
              </div>
              <div className="bg-red-50 text-red-900 p-4 rounded-xl mt-6 border border-red-100/50">
                <strong className="text-red-950 flex items-center gap-2 mb-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0" /> The Urgency</strong>
                <p className="text-xs leading-relaxed opacity-90">Electricity isn't water-neutral. Achieving "zero water" on-site by switching to air conditioning simply shifts the water burden to the local power grid, forcing it to burn more fuel and evaporate more water.</p>
              </div>
            </div>

            {/* Scope 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-all">
              <h4 className="text-lg font-bold text-navy mb-5 pb-5 border-b border-slate-100">
                Scope 3<br />
                <span className="text-orange-500 text-xl font-display mt-1 block">Indirect Usage</span>
                <span className="text-sm font-medium text-slate-400 mt-1 block uppercase tracking-wide">Hardware Supply Chain</span>
              </h4>
              <div className="space-y-5 text-sm text-slate-600 flex-1 leading-relaxed">
                <div><strong className="text-navy block mb-1">What it is:</strong> Water consumed and permanently contaminated during the manufacturing of GPUs, servers, and cooling equipment.</div>
                <div><strong className="text-navy block mb-1">The Reality:</strong> Fabricating advanced microchips is the most water-intensive phase of AI. It requires billions of liters of "ultrapure water" to rinse microscopic impurities off silicon wafers.</div>
              </div>
              <div className="bg-red-50 text-red-900 p-4 rounded-xl mt-6 border border-red-100/50">
                <strong className="text-red-950 flex items-center gap-2 mb-2 text-sm"><AlertTriangle className="w-4 h-4 shrink-0" /> The Urgency</strong>
                <p className="text-xs leading-relaxed opacity-90">This stage turns toxic. Manufacturing heavily relies on PFAS "forever chemicals." The hardware powering an AI image leaves behind poisoned water and dry wells in marginalized communities.</p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-navy mb-3">Why Understanding These Scopes Matters</h4>
            <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
              <p>Tech corporations often exploit a "data black box" by publicly reporting only their highly optimized Scope 1 water usage, making their operations appear green. But adding the immense drain of power generation (Scope 2) and the toxic manufacturing of microchips (Scope 3) reveals the undeniable true cost.</p>
              <p>We cannot allow the technology industry to trade our most finite and essential life source—clean drinking water—for computational power. Understanding these three scopes is the first step toward demanding strict, cross-scale governance and total transparency.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal ${
                      isActive 
                        ? 'bg-white text-teal shadow-sm border border-navy/5 font-medium' 
                        : 'text-navy-light hover:bg-white/50 hover:text-navy-dark'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal' : 'opacity-70'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 shrink-0 hidden md:block opacity-50" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'evaporation' && (
                <motion.div
                  key="evaporation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <section className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-navy/5">
                    <h3 className="flex items-center gap-3 text-2xl font-display font-semibold text-navy mb-6">
                      <Droplet className="w-6 h-6 text-teal" />
                      The Evaporation Misconception
                    </h3>
                    <div className="space-y-4 text-navy-light/80 leading-relaxed">
                      <strong className="text-navy block text-lg mb-2">"Isn't evaporated water just rain later? Why is it harmful?"</strong>
                      <p>
                        While water vapor eventually returns to the global ecosystem, the core issue is <em>displacement</em>. Data centers pump millions of gallons of freshwater out of hyper-local, specific aquifers or reservoirs. When this water evaporates from cooling towers, it forms clouds that travel hundreds or thousands of miles away before raining down. 
                      </p>
                      <p>
                        The local community loses its drinking water permanently, while a distant ocean or mountain range receives the rain. The water is effectively "consumed" and removed from the watershed that relied on it.
                      </p>
                    </div>
                    
                    <div className="mt-8 grid md:grid-cols-3 gap-6 pt-6 border-t border-navy/10">
                      <div>
                        <h4 className="text-blue-600 font-bold mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div> Blue Water
                        </h4>
                        <p className="text-sm text-navy-light/70">
                          Fresh surface water or groundwater (lakes, rivers, aquifers). This is what most data centers consume, putting them in direct competition with local drinking water supplies and agriculture.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-slate-500 font-bold mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-slate-500"></div> Grey Water
                        </h4>
                        <p className="text-sm text-navy-light/70">
                          Wastewater from domestic activities that can be treated and reused. Some data centers use grey water, but it requires expensive purification to prevent mineral buildup on delicate sensors.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-emerald-600 font-bold mb-2 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-600"></div> Green Water
                        </h4>
                        <p className="text-sm text-navy-light/70">
                          Rainwater stored in the soil that is used by plants and agriculture.
                        </p>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'claude' && (
                <motion.div
                  key="claude"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <section className="bg-slate-50 p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="flex items-center gap-3 text-2xl font-display font-semibold text-navy mb-6">
                      <Zap className="w-6 h-6 text-yellow-500" />
                      Claude's Case Study: Why So Little Water?
                    </h3>
                    <div className="space-y-4 text-slate-700 leading-relaxed">
                      <p>
                        <strong className="text-navy">Why does Claude appear to use so little water?</strong> Calculations show models like Claude 3.5 Sonnet as highly water-efficient. However, this is largely due to specific infrastructure choices and a direct <strong className="text-navy">trade-off between water and energy</strong>.
                      </p>
                      
                      <div className="grid md:grid-cols-1 gap-6 pt-4">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-navy mb-3">1. Saving Water = Burning Power</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            Anthropic relies on AWS, which uses very little water. But in physics, evaporating water is the most efficient way to cool servers. <span className="bg-yellow-100 text-yellow-900 font-medium px-1.5 py-0.5 rounded box-decoration-clone">Using less water requires massive air chillers</span>, which burns vastly more electricity.
                          </p>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-navy mb-3">2. The Carbon Penalty</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            Because this cooling method burns more power, and often relies on typical power grids, it swaps one crisis for another. Claude essentially <span className="bg-orange-100 text-orange-900 font-medium px-1.5 py-0.5 rounded box-decoration-clone">trades water efficiency for higher carbon emissions.</span>
                          </p>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-navy mb-3">3. The Transparency Gap</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            Unlike its peers, Anthropic publishes <span className="bg-slate-200 text-slate-900 font-medium px-1.5 py-0.5 rounded box-decoration-clone">no official environmental reports</span>. The "low water" footprint is merely an estimate based on AWS averages. Their true holistic impact remains a black box.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
