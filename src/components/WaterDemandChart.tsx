import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  {
    year: '2023',
    conservative: 2.1,
    high: 3.2,
  },
  {
    year: '2024',
    conservative: 3.0,
    high: 4.2,
  },
  {
    year: '2025',
    conservative: 3.8,
    high: 5.2,
  },
  {
    year: '2026',
    conservative: 4.0,
    high: 6.0,
  },
  {
    year: '2027',
    conservative: 4.2,
    high: 6.6,
  },
];

export function WaterDemandChart() {
  const [activeSeries, setActiveSeries] = useState({
    conservative: true,
    high: true,
  });

  const handleLegendClick = (dataKey: 'conservative' | 'high') => {
    setActiveSeries(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xl min-w-[220px]">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4">{label} Projection</div>
          <div className="space-y-4">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-slate-700 text-sm">
                    {entry.name === 'conservative' ? 'Conservative Estimate' : 'High Estimate'}
                  </span>
                </div>
                <div className="text-navy font-mono text-2xl font-bold pl-4">
                  {entry.value} <span className="text-slate-400 text-sm font-normal font-sans">Billion m³</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex items-center justify-center gap-6 pt-6">
        {payload.map((entry: any, index: number) => {
          const isActive = activeSeries[entry.dataKey as keyof typeof activeSeries];
          return (
            <button
              key={`item-${index}`}
              onClick={() => handleLegendClick(entry.dataKey as 'conservative' | 'high')}
              className={`flex items-center gap-2 transition-all p-2 rounded-lg hover:bg-slate-50 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}
            >
              <div 
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-navy-light text-sm font-medium">
                {entry.value === 'conservative' ? 'Conservative estimate' : 'High estimate'}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 w-full shadow-sm border border-slate-200">
      <h3 className="text-navy-light font-display font-semibold text-sm tracking-widest uppercase mb-8">
        Global AI Water Demand Projection — Billion m³/year
      </h3>
      <div className="h-72 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, dy: 10 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 13, dx: -10 }}
              tickFormatter={(value) => `${value}B`}
              domain={[0, 7]}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            />
            <Legend content={<CustomLegend />} />
            <ReferenceLine 
              x={new Date().getFullYear().toString()} 
              stroke="#0f172a" 
              strokeOpacity={0.2} 
              strokeDasharray="4 4" 
              label={{ position: 'top', value: 'CURRENT YEAR', fill: '#0f172a', fontSize: 10, fontWeight: 700, opacity: 0.5 }} 
            />
            <Bar 
              dataKey="conservative" 
              fill="#0d9488" 
              radius={[4, 4, 0, 0]} 
              barSize={40} 
              hide={!activeSeries.conservative}
            />
            <Bar 
              dataKey="high" 
              fill="#1e40af" 
              radius={[4, 4, 0, 0]} 
              barSize={40} 
              hide={!activeSeries.high}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-teal-600 font-display text-sm font-semibold uppercase tracking-wider mb-2">Regional Spike (2030)</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Localized impacts are accelerating sharply. In Texas alone, data center water consumption is projected to soar from 49 billion gallons in 2025 to <strong className="text-navy font-medium">399 billion gallons annually by 2030</strong>.
          </p>
        </div>
        <div>
          <h4 className="text-teal-600 font-display text-sm font-semibold uppercase tracking-wider mb-2">Long-Term Scope 3 (2035-2050)</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Upstream semiconductor water usage is projected to double by 2035. By 2050, the broader AI ecosystem's total water footprint is predicted to <strong className="text-navy font-medium">more than double</strong> its current 23B m³ baseline.
          </p>
        </div>
      </div>
    </div>
  );
}
