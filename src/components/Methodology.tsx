import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, AlertTriangle, Target } from 'lucide-react';

export function Methodology() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold text-navy-dark mb-4">Methodology</h2>
          <p className="text-xl text-navy-light/80 leading-relaxed">
            AquaMetric does not claim to be a definitive regulatory standard. It is a proof-of-concept and an open proposal for standardized AI water footprint calculation.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h3 className="flex items-center gap-2 text-2xl font-display font-semibold text-navy mb-4">
              <BookOpen className="w-6 h-6 text-teal" />
              Calculation Logic & Data Sources
            </h3>
            <div className="space-y-4 max-w-none text-navy-light/80 leading-relaxed">
              <p>
                The calculations in this tool are derived from published research on the water footprint of artificial intelligence, taking into account both direct and indirect system costs.
              </p>
              <ul className="list-disc pl-5 space-y-4">
                <li><strong className="text-navy">Base Metric & Systemic Cost:</strong> Corporate disclosures often only report Scope 1 water use. However, environmental research insists on "The True Systemic Cost" (Scope 1 + Scope 2), incorporating the massive water evaporated by power plants generating electricity for GPUs. Under this comprehensive lens, an average query for models like GPT-4 consumes about 2.85 ml of water.</li>
                
                <li><strong className="text-navy">Token Conversion:</strong> We standardize volume using a ratio where 1 Million tokens equates to approximately 7,692 standard queries (assuming ~130 tokens or 100 words per query). This translates to around 2.19 liters per million tokens globally footprint.</li>
                
                <li><strong className="text-navy">Regional Multiplier:</strong> Geography heavily dictates water usage for direct cooling. Data centers in "Hot & Arid" regions require significantly more evaporative cooling than those in "Cool" regions. Incorporating regional multipliers on top of the systemic cost brings the arid region usage up to approximately 6.15 liters per million tokens.</li>
                
                <li><strong className="text-navy">Model Specific Variations:</strong>
                  <ul className="list-[circle] pl-5 mt-2 space-y-2">
                    <li><strong className="text-navy">GPT-4:</strong> Benchmarked using standard environmental models for top-tier unoptimized AI model size (2.85 ml/query systemic).</li>
                    <li><strong className="text-navy">Claude (3.5):</strong> Adjusted based on AWS infrastructure efficiency (WUE of 0.15 L/kWh) and optimized inference speed calculations.</li>
                    <li><strong className="text-navy">Gemini:</strong> Adjusted as a highly optimized system utilizing Google's TPU architecture.</li>
                  </ul>
                </li>
                <li><strong className="text-navy">Scope Boundaries & Limitations:</strong> AquaMetric measures Scope 1+2 water only — direct data center evaporative cooling and the footprint of power plants generating the consumed electricity. Scope 3 (semiconductor supply chain) is not yet included. TSMC alone consumed 101 million cubic metres in 2023. The true footprint is considerably larger. This tool is honest about this limitation.</li>
              </ul>
            </div>
          </section>

          {/* References */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-navy/5">
            <h3 className="flex items-center gap-2 text-2xl font-display font-semibold text-navy mb-6">
              <BookOpen className="w-6 h-6 text-teal" />
              References
            </h3>
            <ul className="space-y-3 text-sm text-navy-light/80 leading-relaxed">
              <li>Li, P., Yang, J., Islam, M. A., &amp; Ren, S. (2025). Making AI less "thirsty." arXiv:2304.03271.</li>
              <li>Gorey, J. (2025). Data drain: The land and water impacts of the AI boom. Lincoln Institute of Land Policy.</li>
              <li>Smull, E. (2026). The water footprint of AI. Breckinridge Capital Advisors.</li>
              <li>Miller, C. (2025). The real environmental footprint of generative AI. Online Learning Consortium.</li>
              <li>Bithell, T. (2025). Water usage in semiconductor manufacturing. Silicon Semiconductor.</li>
              <li>Laudisio et al. (2025). Beneath the surface: Water stress in data centers. S&amp;P Global Ratings.</li>
              <li>Pine, M. (2026). Why AI's water problem might actually be an opportunity. World Economic Forum.</li>
              <li>Jong, A. S. Y., Tan, S. Y., Koh, Y. Y., &amp; Lee, Q. H. (2025). AI in the Cloud, Drought on the Ground. Research Paper.</li>
            </ul>
          </section>
        </div>

      </motion.div>
    </div>
  );
}
