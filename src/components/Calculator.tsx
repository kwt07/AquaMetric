import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalculatorState, calculateFootprint, AITool, Region } from '../lib/calculator';
import { Droplet, Users, Zap, Cloud, GlassWater, Waves, AlertCircle, BarChart3, MapPin, Hash, Globe2, Info, Share2, Check } from 'lucide-react';

const InfoTooltip = ({ content }: { content: React.ReactNode }) => (
  <div className="group relative flex items-center cursor-help">
    <Info className="w-4 h-4 text-navy/40 hover:text-navy/70 transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-navy text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl pointer-events-none text-center leading-relaxed">
      {content}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy"></div>
    </div>
  </div>
);

interface Props {
  state: CalculatorState;
  onChange: (state: CalculatorState) => void;
  onNext: () => void;
  onDeepDive?: () => void;
  initialScaleMultiplier?: number;
  shouldScrollToResults?: boolean;
}

export function Calculator({ state, onChange, onNext, onDeepDive, initialScaleMultiplier = 1, shouldScrollToResults = false }: Props) {
  const result = calculateFootprint(state);

  const updateState = (updates: Partial<CalculatorState>) => {
    onChange({ ...state, ...updates });
  };

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(initialScaleMultiplier);
  const [copiedShare, setCopiedShare] = useState(false);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScrollToResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [shouldScrollToResults]);

  const scaledLiters = result.litersPerYear * scaleMultiplier;
  const scaledBottles = result.bottles * scaleMultiplier;
  const scaledBathtubs = result.bathtubs * scaleMultiplier;
  const scaledHumanDays = result.humanDays * scaleMultiplier;

  const handleShare = async () => {
    const text = `I just calculated our organization's AI water footprint: ${scaledLiters.toLocaleString(undefined, { maximumFractionDigits: 0 })} liters of fresh water per year using AquaMetric.\n\nEvery AI query has a water bill. Measure yours to bring transparency to AI's systemic cost.`;
    
    const shareUrl = new URL(window.location.origin + window.location.pathname);
    shareUrl.searchParams.set('p', 'calculator');
    shareUrl.searchParams.set('method', state.method || 'queries');
    shareUrl.searchParams.set('emp', state.employeeCount.toString());
    shareUrl.searchParams.set('qpd', state.queriesPerDay.toString());
    shareUrl.searchParams.set('tokens', state.monthlyTokensMillions.toString());
    shareUrl.searchParams.set('tool', state.primaryTool || 'gpt4');
    shareUrl.searchParams.set('region', state.region || 'temperate');
    shareUrl.searchParams.set('scale', scaleMultiplier.toString());

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AquaMetric: AI Water Footprint',
          text: text,
          url: shareUrl.toString(),
        });
      } else {
        await navigator.clipboard.writeText(text + '\n' + shareUrl.toString());
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  const handleDetectClimate = () => {
    setDetectError(null);
    if (!navigator.geolocation) {
      setDetectError("Geolocation is not supported by your browser.");
      return;
    }
    
    setIsDetecting(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          
          if (!response.ok) throw new Error("Weather API failed");
          
          const data = await response.json();
          const temp = data.current_weather?.temperature;
          
          if (typeof temp === 'number') {
            let newRegion: Region = 'temperate';
            if (temp < 15) newRegion = 'cool';
            else if (temp > 28) newRegion = 'arid';
            updateState({ region: newRegion });
          } else {
            setDetectError("Could not determine temperature.");
          }
        } catch (error) {
          console.error(error);
          setDetectError("Failed to fetch climate data.");
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error(error);
        if (error.code === error.PERMISSION_DENIED) {
           setDetectError("Location access denied. If you are viewing this in a preview, you may need to open the app in a new tab.");
        } else {
           setDetectError("Unable to retrieve location. Please select manually.");
        }
        setIsDetecting(false);
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-display font-bold text-navy-dark mb-2">Calculator</h2>
        <p className="text-navy-light/70">Estimate the indirect freshwater consumption of your organization's AI usage.</p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-navy/5">
          
          {/* Method Toggle */}
          <div className="flex bg-paper p-1 rounded-xl border border-navy/5">
            <button
              onClick={() => updateState({ method: 'queries' })}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                state.method === 'queries' ? 'bg-white text-navy shadow-sm' : 'text-navy-light/70 hover:text-navy hover:bg-white/50'
              }`}
            >
              By Employee (Queries)
            </button>
            <button
              onClick={() => updateState({ method: 'tokens' })}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                state.method === 'tokens' ? 'bg-white text-navy shadow-sm' : 'text-navy-light/70 hover:text-navy hover:bg-white/50'
              }`}
            >
              By API Usage (Tokens)
            </button>
          </div>

          {state.method === 'queries' ? (
            <>
              {/* Employee Count */}
              <div>
                <label className="flex items-center gap-2 font-medium text-navy-dark mb-3">
                  <Users className="w-4 h-4 text-teal" />
                  <div>
                    <span>Number of Employees using AI</span>
                  </div>
                  <InfoTooltip content="The total number of staff members in your organization who regularly use AI tools in their daily workflow." />
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" 
                    max="5000" 
                    step="1"
                    value={state.employeeCount}
                    onChange={(e) => updateState({ employeeCount: parseInt(e.target.value) || 1 })}
                    className="flex-1 h-2 bg-paper-dark rounded-lg appearance-none cursor-pointer accent-teal"
                  />
                  <input 
                    type="number" 
                    value={state.employeeCount}
                    onChange={(e) => updateState({ employeeCount: parseInt(e.target.value) || 1 })}
                    className="w-24 px-3 py-2 bg-paper border border-navy/10 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-teal/50"
                  />
                </div>
              </div>

              {/* Queries per Day */}
              <div>
                <label className="flex items-center gap-2 font-medium text-navy-dark mb-3">
                  <Zap className="w-4 h-4 text-teal" />
                  <div>
                    <span>Average Daily Queries per Employee</span>
                  </div>
                  <InfoTooltip content="A 'query' represents a single prompt and response (e.g., sending one message to an AI assistant or generating one image). It assumes an average length of ~130 tokens. For highly complex or long prompts, select the 'By API Usage (Tokens)' method instead." />
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    step="1"
                    value={state.queriesPerDay}
                    onChange={(e) => updateState({ queriesPerDay: parseInt(e.target.value) || 1 })}
                    className="flex-1 h-2 bg-paper-dark rounded-lg appearance-none cursor-pointer accent-teal"
                  />
                  <input 
                    type="number" 
                    value={state.queriesPerDay}
                    onChange={(e) => updateState({ queriesPerDay: parseInt(e.target.value) || 1 })}
                    className="w-24 px-3 py-2 bg-paper border border-navy/10 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-teal/50"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Monthly Tokens */}
              <div>
                <label className="flex items-center gap-2 font-medium text-navy-dark mb-3">
                  <Hash className="w-4 h-4 text-teal" />
                  <div>
                    <span>Monthly Token Volume (Millions)</span>
                  </div>
                  <InfoTooltip content="Total input/output tokens processed. One million tokens is roughly 750,000 words. Used to accurately gauge API or programmatic usage." />
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" 
                    max="2000" 
                    step="1"
                    value={state.monthlyTokensMillions}
                    onChange={(e) => updateState({ monthlyTokensMillions: parseFloat(e.target.value) || 1 })}
                    className="flex-1 h-2 bg-paper-dark rounded-lg appearance-none cursor-pointer accent-teal"
                  />
                  <input 
                    type="number" 
                    value={state.monthlyTokensMillions}
                    onChange={(e) => updateState({ monthlyTokensMillions: parseFloat(e.target.value) || 1 })}
                    className="w-24 px-3 py-2 bg-paper border border-navy/10 rounded-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-teal/50"
                  />
                </div>
                <p className="text-xs text-navy-light/60 mt-2">
                  1 Million tokens ≈ ~7,700 standard 100-word generations.
                </p>
              </div>
            </>
          )}

          {/* AI Tool */}
          <div>
            <label className="flex items-center gap-2 font-medium text-navy-dark mb-3">
              <Cloud className="w-4 h-4 text-teal" />
              <div>
                <span>Primary AI Tool Used</span>
              </div>
              <InfoTooltip content="Different foundational models have vastly different infrastructure demands. GPT-4 and Gemini often leverage high-water cooling setups, while Claude relies heavily on energy-intensive air cooling." />
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['gpt4', 'claude', 'gemini', 'mixed'] as AITool[]).map(tool => (
                <button
                  key={tool}
                  onClick={() => updateState({ primaryTool: tool })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    state.primaryTool === tool 
                      ? 'bg-navy text-white border-navy' 
                      : 'bg-white text-navy-light border-navy/10 hover:border-navy/30 hover:bg-paper'
                  }`}
                >
                  {tool === 'gpt4' ? 'GPT-4 (OpenAI)' : 
                   tool === 'claude' ? 'Claude (Anthropic)' : 
                   tool === 'gemini' ? 'Gemini (Google)' : 'Mixed / Unknown'}
                </button>
              ))}
            </div>
            {state.primaryTool === 'claude' && (
              <div className="mt-3 p-3 bg-yellow-50/80 text-yellow-800 text-sm rounded-lg border border-yellow-200 leading-relaxed flex gap-2 items-start">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span>Claude's infrastructure trades local water efficiency for higher energy consumption. See <button onClick={onDeepDive} className="font-bold underline decoration-yellow-400 hover:text-yellow-900 transition-colors cursor-pointer">The Deep Dive</button> for the full carbon trade-off.</span>
              </div>
            )}
          </div>

          {/* Region */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 font-medium text-navy-dark">
                <Droplet className="w-4 h-4 text-teal" />
                <div>
                  <span>Data Center Region (Approximate)</span>
                </div>
                <InfoTooltip content="Location dictates water consumption. Arid regions (like Arizona or Texas) require significantly more water to cool servers than temperate (Virginia) or cool (Nordic) climates." />
              </label>
              <button 
                onClick={handleDetectClimate}
                disabled={isDetecting}
                className="flex items-center gap-1.5 text-xs font-medium text-teal hover:text-teal-dark transition-colors px-2 py-1 rounded-md hover:bg-teal/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MapPin className={`w-3.5 h-3.5 ${isDetecting ? 'animate-pulse' : ''}`} />
                {isDetecting ? 'Detecting...' : 'Detect Climate'}
              </button>
            </div>
            {detectError && (
              <div className="mb-3 p-2 bg-red-50 text-red-600 text-xs rounded-md border border-red-100 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{detectError}</span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              {(['cool', 'temperate', 'arid'] as Region[]).map(region => (
                <button
                  key={region}
                  onClick={() => updateState({ region: region })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border capitalize ${
                    state.region === region 
                      ? 'bg-navy text-white border-navy' 
                      : 'bg-white text-navy-light border-navy/10 hover:border-navy/30 hover:bg-paper'
                  }`}
                >
                  {region === 'arid' ? 'Hot & Arid' : region}
                </button>
              ))}
            </div>
            <p className="text-xs text-navy-light/60 mt-2">
              Evaporative cooling demands more water in hotter climates (e.g., Texas, Arizona).
            </p>
          </div>

        </div>

        {/* Dashboard / Outputs */}
        <div ref={resultsRef} className="lg:col-span-7">
          <div className="bg-navy p-6 md:p-8 rounded-2xl text-white shadow-xl h-full flex flex-col relative overflow-hidden">
            <h3 className="font-display font-medium text-teal-400 mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
              <BarChart3 className="w-4 h-4" /> Estimated Annual Footprint
            </h3>
            <div className="mb-8">
              <div className="text-sm text-white/60 mb-2 font-medium">Total Freshwater Consumed (Liters/Year)</div>
              <div className="text-6xl md:text-7xl font-display font-bold tracking-tight">
                {scaledLiters.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="text-2xl text-white/40 ml-2 font-normal">L</span>
              </div>
              <div className="text-xs text-teal-100/60 mt-4 flex items-center gap-2 bg-white/5 w-fit px-3 py-2 rounded-lg border border-white/10">
                <AlertCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>AI water is indirect but permanent — evaporated, not recycled.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <GlassWater className="w-6 h-6 text-teal-400 mb-3" />
                <div className="text-2xl font-bold font-mono mb-1">{scaledBottles.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className="text-xs text-white/60 leading-tight">Standard 500ml<br/>water bottles</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <Waves className="w-6 h-6 text-teal-400 mb-3" />
                <div className="text-2xl font-bold font-mono mb-1">
                  {scaledBathtubs < 0.1 ? '< 0.1' : scaledBathtubs.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
                <div className="text-xs text-white/60 leading-tight">Standard bathtubs<br/>equivalent</div>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-start gap-4 mb-8 ${
              result.rating === 'Minimal' && scaleMultiplier === 1 ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20' :
              result.rating === 'Low' && scaleMultiplier === 1 ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
              result.rating === 'Moderate' && scaleMultiplier === 1 ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20' :
              (result.rating === 'High' || scaleMultiplier > 10) && scaleMultiplier <= 1000 ? 'bg-orange-500/10 text-orange-300 border border-orange-500/20' :
              'bg-red-500/10 text-red-300 border border-red-500/20'
            }`}>
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-sm mb-1 uppercase tracking-wider">
                  {scaleMultiplier > 1 ? 'Scaled Impact' : `Impact Rating: ${result.rating}`}
                </div>
                <div className="text-sm opacity-80 leading-relaxed">
                  This usage consumes enough drinking water to sustain one human for <strong>{scaledHumanDays.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> days.
                  {scaledLiters > 2500000 && (
                    <span className="block mt-2 pt-2 border-t border-current/20">
                      That's equivalent to draining <strong>{(scaledLiters / 2500000).toLocaleString(undefined, { maximumFractionDigits: 1 })} Olympic-sized swimming pools</strong>.
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-auto mb-6">
              <p className="text-sm text-white/70 leading-relaxed">
                <strong className="text-white">Think this is a small amount?</strong> You're not prompting alone. Generative AI is deployed at an explosive global rate. When humanity generates tens of billions of automated queries daily, this macro-level extraction scales to millions of gallons drained from local communities.
              </p>
            </div>

            <div className="bg-black/20 p-5 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-teal-400" />
                  Scale Up Scenario
                </h4>
                <div className="text-sm font-medium text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded">
                  {scaleMultiplier}x
                </div>
              </div>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Individual or small team usage can look misleadingly small. Slide to see the impact if an entire enterprise or industry adopted this rate.
              </p>
              <input 
                type="range" 
                min="1" 
                max="10000" 
                step="1"
                value={scaleMultiplier}
                onChange={(e) => setScaleMultiplier(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400 mb-2"
              />
              <div className="flex justify-between text-xs text-white/40 font-medium">
                <span>1x (Current)</span>
                <span>10,000x (Industry)</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onNext}
                className="flex-1 bg-teal hover:bg-teal-light text-navy-dark px-6 py-4 rounded-xl font-bold transition-all text-center"
              >
                Generate ESG Report Paragraph
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-bold transition-all border border-white/5"
              >
                {copiedShare ? <Check className="w-5 h-5 text-teal-400" /> : <Share2 className="w-5 h-5" />}
                {copiedShare ? 'Copied Link' : 'Share Results'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
