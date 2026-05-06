export type AITool = 'gpt4' | 'claude' | 'gemini' | 'mixed';
export type Region = 'cool' | 'temperate' | 'arid';
export type CalculationMethod = 'queries' | 'tokens';

export interface CalculatorState {
  method: CalculationMethod;
  employeeCount: number;
  queriesPerDay: number;
  monthlyTokensMillions: number;
  primaryTool: AITool;
  region: Region;
}

// Estimated water consumption in milliliters
export interface ModelMetrics {
  mlPerQuery: Record<Region, number>;
  mlPerMillionTokens: Record<Region, number>;
}

// 1M / 130 = 7692 queries per 1M tokens for standard 100-word queries
const STANDARD_QUERIES_PER_MILLION_TOKENS = 7692;

const WATER_MODELS: Record<AITool, ModelMetrics> = {
  gpt4: {
    // True Systemic Cost (Scope 1 + Scope 2)
    // 1 query = 2.85 ml, 1M tokens = 2.19 liters (2190 ml)
    mlPerQuery: {
      cool: 1.34,      // Temperate * 0.47
      temperate: 2.85,
      arid: 8.01,      // Temperate * 2.81
    },
    mlPerMillionTokens: {
      cool: 1029.3,    // 2190 * 0.47
      temperate: 2190, 
      arid: 6153.9,    // 2190 * 2.81
    }
  },
  claude: {
    // Based on AWS WUE (0.15 L/kWh) and optimized inference speed (0.00024 kWh/query)
    // 1 query = ~1000 words (1428 tokens). 1M tokens ≈ 700 queries.
    mlPerQuery: {
      cool: 0.017,     // Temperate * 0.47
      temperate: 0.036,
      arid: 0.101,     // Temperate * 2.81
    },
    mlPerMillionTokens: {
      cool: 11.9,      // 0.017 * 700
      temperate: 25.2, // 0.036 * 700
      arid: 70.7,      // 0.101 * 700
    }
  },
  gemini: {
    mlPerQuery: {
      cool: 0.1,
      temperate: 0.26,
      arid: 0.5,
    },
    mlPerMillionTokens: {
      cool: 0.1 * STANDARD_QUERIES_PER_MILLION_TOKENS,
      temperate: 0.26 * STANDARD_QUERIES_PER_MILLION_TOKENS,
      arid: 0.5 * STANDARD_QUERIES_PER_MILLION_TOKENS,
    }
  },
  mixed: {
    // Average baseline representing an industry mix of GPT-4, Claude, and Gemini
    mlPerQuery: {
      cool: 0.49,      // (1.34 + 0.017 + 0.1) / 3
      temperate: 1.05, // (2.85 + 0.036 + 0.26) / 3
      arid: 2.87,      // (8.01 + 0.101 + 0.5) / 3
    },
    mlPerMillionTokens: {
      cool: 0.49 * STANDARD_QUERIES_PER_MILLION_TOKENS,
      temperate: 1.05 * STANDARD_QUERIES_PER_MILLION_TOKENS,
      arid: 2.87 * STANDARD_QUERIES_PER_MILLION_TOKENS,
    }
  }
};

export const calculateFootprint = (state: CalculatorState) => {
  const { method, employeeCount, queriesPerDay, monthlyTokensMillions, primaryTool, region } = state;
  
  const modelMetrics = WATER_MODELS[primaryTool];
  
  let mlPerYear = 0;
  
  if (method === 'queries') {
    const mlPerQuery = modelMetrics.mlPerQuery[region];
    const totalQueriesPerDay = employeeCount * queriesPerDay;
    const totalQueriesPerYear = totalQueriesPerDay * 250; // Assuming 250 work days
    mlPerYear = totalQueriesPerYear * mlPerQuery;
  } else {
    const mlPerMillionTokens = modelMetrics.mlPerMillionTokens[region];
    const tokensMillionsPerYear = monthlyTokensMillions * 12;
    mlPerYear = tokensMillionsPerYear * mlPerMillionTokens;
  }
  
  const litersPerYear = mlPerYear / 1000;

  
  const bottles = Math.round(litersPerYear / 0.5);
  const bathtubs = litersPerYear / 150; // Standard bathtub ~150 liters
  const humanDays = Math.round(litersPerYear / 2.5); // 2.5L per human per day

  let rating: 'Minimal' | 'Low' | 'Moderate' | 'High' | 'Critical' = 'Minimal';
  if (litersPerYear > 50) rating = 'Low';
  if (litersPerYear > 500) rating = 'Moderate';
  if (litersPerYear > 2500) rating = 'High';
  if (litersPerYear > 10000) rating = 'Critical';

  return {
    litersPerYear: Math.round(litersPerYear),
    bottles,
    bathtubs,
    humanDays,
    rating,
    mlPerQuery: method === 'queries' ? modelMetrics.mlPerQuery[region] : (modelMetrics.mlPerMillionTokens[region] / 1000000)
  };
};
