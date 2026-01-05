/**
 * Delivery Stress Index Calculator
 * 
 * Calculates a 0-100 index indicating stress in the silver delivery market
 * Based on multiple factors:
 * - COMEX registered inventory levels
 * - Open interest vs inventory ratio
 * - Shanghai premium over COMEX
 * - CME margin requirement changes
 * - ETF divergence
 */

interface StressIndexData {
  index: number; // 0-100 score
  level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  factors: {
    inventoryScore: number;
    coverageScore: number;
    premiumScore: number;
    marginScore: number;
  };
  interpretation: string;
  timestamp: Date;
}

export function calculateDeliveryStressIndex(data: {
  registeredInventory: number; // Million oz
  openInterest?: number; // Number of contracts
  shanghaiPremium: number; // USD per oz
  marginChangePercent: number; // Percentage
}): StressIndexData {
  
  // Factor 1: Inventory Level (0-30 points)
  // Lower inventory = higher stress
  const inventoryScore = calculateInventoryScore(data.registeredInventory);
  
  // Factor 2: Coverage Ratio (0-35 points)
  // Lower coverage = higher stress
  const coverageScore = calculateCoverageScore(
    data.registeredInventory,
    data.openInterest || 180000 // Default to recent open interest
  );
  
  // Factor 3: Shanghai Premium (0-20 points)
  // Higher premium = higher stress (indicates physical shortage)
  const premiumScore = calculatePremiumScore(data.shanghaiPremium);
  
  // Factor 4: Margin Changes (0-15 points)
  // Higher margin increases = higher stress
  const marginScore = calculateMarginScore(data.marginChangePercent);
  
  // Total stress index (0-100)
  const index = Math.min(100, Math.round(
    inventoryScore + coverageScore + premiumScore + marginScore
  ));
  
  // Determine stress level
  let level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  let interpretation: string;
  
  if (index < 40) {
    level = 'LOW';
    interpretation = 'Normal market conditions. Adequate inventory and healthy delivery mechanisms.';
  } else if (index < 60) {
    level = 'MODERATE';
    interpretation = 'Elevated stress. Inventory declining but delivery system functioning.';
  } else if (index < 80) {
    level = 'HIGH';
    interpretation = 'Significant stress. Inventory critically low. Delivery delays possible.';
  } else {
    level = 'CRITICAL';
    interpretation = 'Extreme stress. Force majeure risk. Physical shortage imminent.';
  }
  
  return {
    index,
    level,
    factors: {
      inventoryScore,
      coverageScore,
      premiumScore,
      marginScore
    },
    interpretation,
    timestamp: new Date()
  };
}

function calculateInventoryScore(inventory: number): number {
  // Historical context:
  // 200M+ oz = healthy (0 points)
  // 100-200M oz = normal (5-15 points)
  // 50-100M oz = concerning (15-25 points)
  // <50M oz = critical (25-30 points)
  
  if (inventory >= 200) return 0;
  if (inventory >= 150) return 5;
  if (inventory >= 100) return 12;
  if (inventory >= 75) return 18;
  if (inventory >= 50) return 24;
  return 30;
}

function calculateCoverageScore(inventory: number, openInterest: number): number {
  // Coverage ratio = Inventory / (Open Interest * 5000 oz per contract)
  const totalOzClaimed = openInterest * 5000 / 1_000_000; // Convert to million oz
  const coverageRatio = inventory / totalOzClaimed;
  
  // Coverage ratio interpretation:
  // >0.5 (50%+) = healthy (0 points)
  // 0.3-0.5 (30-50%) = moderate (10-20 points)
  // 0.15-0.3 (15-30%) = high stress (20-30 points)
  // <0.15 (15%) = critical (30-35 points)
  
  if (coverageRatio >= 0.5) return 0;
  if (coverageRatio >= 0.3) return 15;
  if (coverageRatio >= 0.15) return 25;
  return 35;
}

function calculatePremiumScore(premium: number): number {
  // Shanghai premium over COMEX:
  // <$0.50/oz = normal (0 points)
  // $0.50-$2/oz = elevated (5-10 points)
  // $2-$5/oz = high (10-15 points)
  // >$5/oz = extreme (15-20 points)
  
  if (premium < 0.5) return 0;
  if (premium < 2) return 7;
  if (premium < 5) return 13;
  return 20;
}

function calculateMarginScore(changePercent: number): number {
  // CME margin requirement changes:
  // <20% increase = normal (0 points)
  // 20-50% increase = moderate (5 points)
  // 50-100% increase = high (10 points)
  // >100% increase = extreme (15 points)
  
  if (changePercent < 20) return 0;
  if (changePercent < 50) return 5;
  if (changePercent < 100) return 10;
  return 15;
}
