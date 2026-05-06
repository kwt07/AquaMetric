import React, { useState } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-navy/5 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2 text-navy-dark hover:opacity-80 transition-opacity"
          >
            <Droplet className="w-6 h-6 text-teal" />
            <span className="font-display font-bold text-xl tracking-tight">AquaMetric</span>
          </button>
          
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('landing')}
              className={`text-sm font-medium transition-all active:scale-95 px-4 py-2 rounded-lg ${currentPage === 'landing' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setCurrentPage('calculator')}
              className={`text-sm font-medium transition-all active:scale-95 px-4 py-2 rounded-lg ${currentPage === 'calculator' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setCurrentPage('report')}
              className={`text-sm font-medium transition-all active:scale-95 px-4 py-2 rounded-lg ${currentPage === 'report' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              ESG Report
            </button>
            <button 
              onClick={() => setCurrentPage('methodology')}
              className={`text-sm font-medium transition-all active:scale-95 px-4 py-2 rounded-lg ${currentPage === 'methodology' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              Methodology
            </button>
            <button 
              onClick={() => setCurrentPage('research')}
              className={`text-sm font-medium transition-all active:scale-95 px-4 py-2 rounded-lg ${currentPage === 'research' ? 'text-teal bg-white shadow-sm' : 'text-navy-light hover:text-navy hover:bg-white/50 hover:shadow-sm'}`}
            >
              The Deep Dive
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <Landing onStart={() => setCurrentPage('calculator')} />
        )}
        
        {currentPage === 'calculator' && (
          <Calculator 
            state={calcState} 
            onChange={setCalcState} 
            onNext={() => setCurrentPage('report')}
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
          <Research />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-navy/5 text-center px-6 print:hidden">
        <p className="text-xs text-navy-light/50 max-w-3xl mx-auto mb-4">
          Estimates based on Li et al. (2025) and published research. Represents Scope 1+2 data center evaporative cooling only. Scope 3 semiconductor water not included. 250 working days/year assumed.
        </p>
        <p className="text-sm text-navy-light/60 font-medium tracking-wide">
          AQUAMETRIC &copy; {new Date().getFullYear()} — AN OPEN PROPOSAL
        </p>
      </footer>
    </div>
  );
}
