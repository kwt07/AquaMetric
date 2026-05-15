import React, { useState, useEffect } from 'react';
import { Droplet } from 'lucide-react';
import { Landing } from './components/Landing';
import { Calculator } from './components/Calculator';
import { ReportGenerator } from './components/ReportGenerator';
import { Methodology } from './components/Methodology';
import { Research } from './components/Research';
import { CalculatorState } from './lib/calculator';

type Page = 'landing' | 'calculator' | 'report' | 'methodology' | 'research';

export interface ReportState {
  companyName: string;
  reportingYear: string;
  commitmentIndex: number;
  customAction: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [researchTab, setResearchTab] = useState<string>('evaporation');
  const [visitedPages, setVisitedPages] = useState<Set<Page>>(new Set(['landing']));
  const [initialScale, setInitialScale] = useState<number>(1);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  
  const handlePageChange = (newPage: Page, extra?: string) => {
    setCurrentPage(newPage);
    if (newPage === 'research' && extra) {
      setResearchTab(extra);
    }
    if (!visitedPages.has(newPage)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setVisitedPages(prev => new Set(prev).add(newPage));
    }
  };

  const [calcState, setCalcState] = useState<CalculatorState>({
    method: 'queries',
    employeeCount: 100,
    queriesPerDay: 10,
    monthlyTokensMillions: 50,
    primaryTool: 'gpt4',
    region: 'temperate',
  });

  const [reportState, setReportState] = useState<ReportState>({
    companyName: '',
    reportingYear: new Date().getFullYear().toString(),
    commitmentIndex: 0,
    customAction: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('p') === 'calculator') {
      const newCalcState = { ...calcState };
      const method = params.get('method');
      if (method === 'queries' || method === 'tokens') newCalcState.method = method;
      
      const emp = params.get('emp');
      if (emp) newCalcState.employeeCount = parseInt(emp, 10);
      
      const qpd = params.get('qpd');
      if (qpd) newCalcState.queriesPerDay = parseInt(qpd, 10);
      
      const tokens = params.get('tokens');
      if (tokens) newCalcState.monthlyTokensMillions = parseInt(tokens, 10);
      
      const tool = params.get('tool');
      if (tool) newCalcState.primaryTool = tool as any;
      
      const region = params.get('region');
      if (region) newCalcState.region = region as any;

      const scale = params.get('scale');
      if (scale) setInitialScale(parseInt(scale, 10));

      setCalcState(newCalcState);
      setCurrentPage('calculator');
      setShouldScroll(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-navy/5 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6 overflow-hidden">
          <button 
            onClick={() => handlePageChange('landing')}
            className="flex items-center gap-2 text-navy-dark hover:opacity-80 transition-opacity shrink-0"
          >
            <Droplet className="w-6 h-6 text-teal" />
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">AquaMetric</span>
          </button>
          
          <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto hide-scrollbar pb-1 -mb-1 w-full justify-start sm:justify-end">
            <button 
              onClick={() => handlePageChange('landing')}
              className={`text-sm font-medium transition-all shrink-0 active:scale-95 px-3 sm:px-4 py-2 rounded-lg ${currentPage === 'landing' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => handlePageChange('calculator')}
              className={`text-sm font-medium transition-all shrink-0 active:scale-95 px-3 sm:px-4 py-2 rounded-lg ${currentPage === 'calculator' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => handlePageChange('report')}
              className={`text-sm font-medium transition-all shrink-0 active:scale-95 px-3 sm:px-4 py-2 rounded-lg ${currentPage === 'report' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              ESG Report
            </button>
            <button 
              onClick={() => handlePageChange('methodology')}
              className={`text-sm font-medium transition-all shrink-0 active:scale-95 px-3 sm:px-4 py-2 rounded-lg ${currentPage === 'methodology' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              Methodology
            </button>
            <button 
              onClick={() => handlePageChange('research')}
              className={`text-sm font-medium transition-all shrink-0 active:scale-95 px-3 sm:px-4 py-2 rounded-lg ${currentPage === 'research' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              The Deep Dive
            </button>
          </nav>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:flex items-center gap-2 p-8 border-b border-slate-200">
        <Droplet className="w-8 h-8 text-teal" />
        <span className="font-display font-bold text-2xl tracking-tight text-navy-dark">AquaMetric / Disclosure</span>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <Landing onStart={() => handlePageChange('calculator')} onDeepDive={() => handlePageChange('research')} onMethodology={() => handlePageChange('methodology')} />
        )}
        
        {currentPage === 'calculator' && (
          <Calculator 
            state={calcState} 
            onChange={setCalcState} 
            onNext={() => handlePageChange('report')}
            onDeepDive={() => handlePageChange('research', 'claude')}
            initialScaleMultiplier={initialScale}
            shouldScrollToResults={shouldScroll}
          />
        )}

        {currentPage === 'report' && (
          <ReportGenerator 
            state={calcState} 
            reportState={reportState}
            onChange={setReportState}
          />
        )}

        {currentPage === 'methodology' && (
          <Methodology />
        )}

        {currentPage === 'research' && (
          <Research initialTab={researchTab} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-navy/5 text-center px-6 print:py-4 print:mt-12 print:border-t-0 p-8">
        <p className="text-xs text-navy-light/50 max-w-3xl mx-auto mb-4 print:text-slate-500 print:text-left print:mb-2">
          Estimates based on Li et al. (2025) and published research. Represents Scope 1+2 data center evaporative cooling only. Scope 3 semiconductor water not included. 250 working days/year assumed. AquaMetric does not claim to be a definitive regulatory standard.
        </p>
        <p className="text-sm text-navy-light/60 font-medium tracking-wide print:text-slate-400 print:text-left">
          AQUAMETRIC &copy; {new Date().getFullYear()} — AN OPEN PROPOSAL
        </p>
      </footer>
    </div>
  );
}
