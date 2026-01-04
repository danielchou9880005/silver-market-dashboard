import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "wouter";

/**
 * Design: Supply & Demand Analysis Page
 * - Data-heavy layout with charts and tables
 * - Glowing callouts for critical insights
 * - Terminal-style data presentation
 */

export default function SupplyDemand() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="scanline-effect absolute inset-0 pointer-events-none z-10" />
      
      {/* Navigation */}
      <nav className="glass-panel sticky top-0 z-20 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-display">Back to Home</span>
              </Button>
            </Link>
            <span className="font-display text-xl glow-text">SUPPLY & DEMAND ANALYSIS</span>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 rounded-full glass-panel mb-6">
              <span className="text-primary font-mono text-sm">STRUCTURAL DEFICIT ANALYSIS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight">
              820 Million Ounces<br />
              <span className="glow-text text-primary">Cumulative Deficit</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Five consecutive years of supply shortages (2021-2025) have created a structural 
              imbalance equivalent to nearly one full year of global silver production.
            </p>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-panel p-6 glow-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-destructive mb-1">-820M oz</div>
                  <div className="text-sm text-muted-foreground font-mono">Cumulative Deficit</div>
                  <div className="text-xs text-muted-foreground mt-1">2021-2025</div>
                </div>
              </div>
            </Card>

            <Card className="glass-panel p-6 glow-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-emerald-400 mb-1">+142%</div>
                  <div className="text-sm text-muted-foreground font-mono">Solar Demand Growth</div>
                  <div className="text-xs text-muted-foreground mt-1">2014-2024</div>
                </div>
              </div>
            </Card>

            <Card className="glass-panel p-6 glow-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-400/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-amber-400 mb-1">72%</div>
                  <div className="text-sm text-muted-foreground font-mono">Byproduct Mining</div>
                  <div className="text-xs text-muted-foreground mt-1">Supply Inelastic</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8">
            <h2 className="text-2xl font-display font-bold mb-6 glow-text">Price Projections: Real vs Nominal</h2>
            <div className="mb-4">
              <img 
                src="/images/silver_dual_axis_chart.png" 
                alt="Silver Price Projections - Real vs Nominal" 
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              Dual-axis chart showing inflation-adjusted (real) and nominal silver prices through 2030. 
              Base case projects $124 nominal ($108 real purchasing power).
            </p>
          </Card>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-panel p-8">
              <h3 className="text-xl font-display font-bold mb-4 text-primary">The Byproduct Problem</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Only <span className="text-foreground font-mono">27.8%</span> of silver comes from primary silver mines. 
                  The remaining <span className="text-foreground font-mono">72.2%</span> is a byproduct of lead, zinc, copper, and gold mining.
                </p>
                <p>
                  This means higher silver prices cannot easily stimulate production. Supply is dictated by base metal economics, 
                  not silver prices. When copper or zinc demand falls, silver supply falls—regardless of silver's price.
                </p>
                <div className="glass-panel p-4 rounded-lg mt-4">
                  <div className="text-sm font-mono text-amber-400">⚠ CRITICAL INSIGHT</div>
                  <div className="text-sm mt-2">
                    Supply is fundamentally inelastic. Even at $150/oz, new primary silver mines take 10-15 years to develop.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-panel p-8">
              <h3 className="text-xl font-display font-bold mb-4 text-emerald-400">Green Energy Demand</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="text-foreground font-mono">Solar panels</span> consumed 197.6 Moz in 2024, 
                  a <span className="text-emerald-400 font-mono">142% increase</span> from 2014.
                </p>
                <p>
                  <span className="text-foreground font-mono">Electric vehicles</span> use 67-79% more silver than traditional vehicles 
                  (25-50 grams per EV). Projections suggest EVs will overtake ICE vehicles as the primary automotive silver consumer by 2027.
                </p>
                <div className="glass-panel p-4 rounded-lg mt-4">
                  <div className="text-sm font-mono text-emerald-400">✓ PROJECTION</div>
                  <div className="text-sm mt-2">
                    Solar could consume 40% of global silver supply by 2030. This is non-cyclical, structural demand.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Table */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8">
            <h3 className="text-xl font-display font-bold mb-6 glow-text">Annual Supply-Demand Balance</h3>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-muted-foreground">Year</th>
                    <th className="text-right py-3 px-4 text-muted-foreground">Supply (Moz)</th>
                    <th className="text-right py-3 px-4 text-muted-foreground">Demand (Moz)</th>
                    <th className="text-right py-3 px-4 text-muted-foreground">Balance (Moz)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4">2021</td>
                    <td className="text-right py-3 px-4">1,048</td>
                    <td className="text-right py-3 px-4">1,214</td>
                    <td className="text-right py-3 px-4 text-destructive">-166</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4">2022</td>
                    <td className="text-right py-3 px-4">1,039</td>
                    <td className="text-right py-3 px-4">1,242</td>
                    <td className="text-right py-3 px-4 text-destructive">-203</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4">2023</td>
                    <td className="text-right py-3 px-4">1,045</td>
                    <td className="text-right py-3 px-4">1,228</td>
                    <td className="text-right py-3 px-4 text-destructive">-183</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4">2024</td>
                    <td className="text-right py-3 px-4">1,052</td>
                    <td className="text-right py-3 px-4">1,256</td>
                    <td className="text-right py-3 px-4 text-destructive">-204</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4">2025E</td>
                    <td className="text-right py-3 px-4">1,058</td>
                    <td className="text-right py-3 px-4">1,268</td>
                    <td className="text-right py-3 px-4 text-destructive">-210</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-3 px-4 text-primary">Total</td>
                    <td className="text-right py-3 px-4">5,242</td>
                    <td className="text-right py-3 px-4">6,208</td>
                    <td className="text-right py-3 px-4 text-destructive glow-text">-966</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              Source: World Silver Survey 2025, Silver Institute
            </p>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8 text-center">
            <h3 className="text-2xl font-display font-bold mb-4 glow-text">This Is Not Speculation</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The structural deficit is real, documented, and accelerating. Green energy demand is non-cyclical. 
              Supply cannot respond. The collision is inevitable.
            </p>
            <Link href="/investment-options">
              <Button size="lg" className="glow-border font-display">
                View Investment Options
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">← Back to Home</a>
            </Link>
            <div className="text-sm text-muted-foreground font-mono">
              Last updated: Dec 30, 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
