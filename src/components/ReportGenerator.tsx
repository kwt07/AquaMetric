import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalculatorState, calculateFootprint } from '../lib/calculator';
import { Copy, Check, FileText, ChevronDown, Info, Download } from 'lucide-react';
import { ReportState } from '../App';

interface Props {
  state: CalculatorState;
  reportState: ReportState;
  onChange: (state: ReportState) => void;
}

const COMMITMENT_ACTIONS = [
  'monitor and disclose this metric annually within our ESG report',
  'set a reduction target for AI-associated water use by 2027',
  'evaluate and migrate to lower-water AI model options where feasible',
  'advocate for industry-wide standardization of AI water consumption metrics'
];

const COMMITMENT_LABELS = [
  'Monitor & disclose annually',
  'Set reduction target by 2027',
  'Evaluate lower-water AI options',
  'Advocate for industry standards',
  'Other (custom)'
];

export function ReportGenerator({ state, reportState, onChange }: Props) {
  const result = calculateFootprint(state);
  const [copied, setCopied] = useState(false);
  
  const { companyName, reportingYear, commitmentIndex, customAction } = reportState;

  const updateState = (updates: Partial<ReportState>) => {
    onChange({ ...reportState, ...updates });
  };

  const displayCompany = companyName.trim() || '[Your Organization]';
  
  const actionText = commitmentIndex === COMMITMENT_ACTIONS.length 
    ? (customAction.trim() || '[your custom commitment]') 
    : COMMITMENT_ACTIONS[commitmentIndex];

  const reportText = `In ${reportingYear}, ${displayCompany}'s use of AI language model tools generated an estimated indirect freshwater consumption of approximately ${result.litersPerYear.toLocaleString()} liters (${(result.litersPerYear / 1000).toFixed(1)} cubic meters), attributable to evaporative cooling in the data centers processing our AI queries. This figure is equivalent to the annual drinking water requirement of approximately ${result.humanDays.toLocaleString()} individuals, or ${result.bottles.toLocaleString()} standard 500ml water bottles. This consumption is classified as "blue water" — potable surface and groundwater extracted from the local hydrological basins of our data center providers. ${displayCompany} acknowledges AI-attributed water use as an emerging material environmental metric, distinct from and additive to existing carbon disclosure. In response, ${displayCompany} commits to ${actionText}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 print:py-0 print:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-8 print:hidden">
          <h2 className="text-3xl font-display font-bold text-navy-dark mb-2">ESG Report Generator</h2>
          <p className="text-navy-light/70">
            Generate disclosure-ready language for your sustainability report, based on your calculator results.
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-navy/5 mb-8 print:hidden">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy-light/70 mb-2">
                Company / Organization
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corporation"
                value={companyName}
                onChange={(e) => updateState({ companyName: e.target.value })}
                className="w-full px-4 py-3 bg-paper border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy placeholder:text-navy/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy-light/70 mb-2">
                Reporting Year
              </label>
              <input
                type="text"
                value={reportingYear}
                onChange={(e) => updateState({ reportingYear: e.target.value })}
                className="w-full px-4 py-3 bg-paper border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-navy-light/70 mb-2">
              Commitment Action
            </label>
            <div className="relative">
              <select
                value={commitmentIndex}
                onChange={(e) => updateState({ commitmentIndex: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-paper border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy appearance-none cursor-pointer transition-all pr-12"
              >
                {COMMITMENT_LABELS.map((label, idx) => (
                  <option key={idx} value={idx}>{label}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-navy/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          {commitmentIndex === COMMITMENT_ACTIONS.length && (
            <div className="mt-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy-light/70 mb-2">
                Custom Commitment Action
              </label>
              <input
                type="text"
                placeholder="e.g. offset our water footprint by supporting local water conservation projects by 2030"
                value={customAction}
                onChange={(e) => updateState({ customAction: e.target.value })}
                className="w-full px-4 py-3 bg-paper border border-navy/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/50 text-navy placeholder:text-navy/30 transition-all"
              />
            </div>
          )}
        </div>

        {/* Output Block */}
        <div className="bg-navy print:bg-white rounded-2xl p-6 md:p-8 shadow-xl print:shadow-none mb-8 relative overflow-hidden group print:mb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10 print:mb-8">
            <h3 className="text-teal-400 print:text-teal font-display font-semibold text-sm uppercase tracking-wider">
              ESG Disclosure Draft
            </h3>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3 print:hidden">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm border border-white/5 hover:border-white/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy text'}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-teal hover:bg-teal-light text-navy px-4 py-2 rounded-lg font-medium transition-all text-sm shadow-sm"
              >
                <Download className="w-4 h-4" />
                Save PDF
              </button>
            </div>
          </div>

          <div className="relative z-10 pl-6 border-l-2 border-teal/30 print:border-teal">
            <p className="text-white/90 print:text-slate-800 font-serif text-lg leading-relaxed md:leading-loose">
              {reportText}
            </p>
          </div>
        </div>

        {/* Context Block */}
        <div className="bg-paper p-6 md:p-8 rounded-2xl border border-navy/5 print:hidden">
          <h3 className="flex items-center gap-2 text-teal-dark font-display font-semibold text-sm uppercase tracking-wider mb-4">
            <Info className="w-4 h-4" />
            Why this belongs in your ESG report
          </h3>
          <p className="text-navy-light/80 leading-relaxed md:text-lg">
            Token usage has already become an employee KPI at leading organizations. Carbon has become a global corporate KPI through decades of standardization. <strong className="text-navy font-semibold">AI water consumption is the next measurable environmental metric waiting to be standardized.</strong> Companies that begin tracking today will be ahead of incoming regulatory requirements — just as early carbon disclosers were better positioned when reporting became mandatory.
          </p>
        </div>

      </motion.div>
    </div>
  );
}
