import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "wouter";

/**
 * Design: Historical Comparison Page
 * - Timeline-style layout comparing three eras
 * - Warning colors for past bubbles, success colors for current fundamentals
 * - Side-by-side comparison tables
 */

export default function HistoricalComparison() {
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
            <span className="font-display text-xl glow-text">HISTORICAL COMPARISON</span>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 rounded-full glass-panel mb-6">
              <span className="text-amber-400 font-mono text-sm">1980 • 2011 • 2025</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight">
              Why This Time<br />
              <span className="glow-text text-primary">Is Different</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comparing the current silver rally to the Hunt Brothers manipulation (1980) and the 
              QE speculation bubble (2011). The 2025 squeeze is fundamentally different.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Comparison */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1980 */}
            <Card className="glass-panel p-6 border-destructive/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-display font-black text-destructive">1980</div>
                  <div className="text-xs text-muted-foreground font-mono">Hunt Brothers</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Peak Price</div>
                  <div className="text-lg font-display font-bold">$49.45</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Driver</div>
                  <div>Market manipulation by 3 brothers</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Outcome</div>
                  <div className="text-destructive">Crashed 90% by 1982</div>
                </div>
              </div>
            </Card>

            {/* 2011 */}
            <Card className="glass-panel p-6 border-amber-400/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-display font-black text-amber-400">2011</div>
                  <div className="text-xs text-muted-foreground font-mono">QE Speculation</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Peak Price</div>
                  <div className="text-lg font-display font-bold">$48.70</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Driver</div>
                  <div>Investment-driven bubble, QE fears</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Outcome</div>
                  <div className="text-amber-400">Multi-year bear market</div>
                </div>
              </div>
            </Card>

            {/* 2025 */}
            <Card className="glass-panel p-6 border-primary/50 glow-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center pulse-glow">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-display font-black text-primary">2025</div>
                  <div className="text-xs text-muted-foreground font-mono">Structural Deficit</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Current Price</div>
                  <div className="text-lg font-display font-bold">$30-35</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Driver</div>
                  <div>Real physical deficit, green energy</div>
                </div>
                <div>
                  <div className="text-muted-foreground font-mono mb-1">Outlook</div>
                  <div className="text-primary">Sustainable rally</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8">
            <h2 className="text-2xl font-display font-bold mb-6 glow-text">Key Differences</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Factor</th>
                    <th className="text-left py-3 px-4 font-display text-destructive">1980</th>
                    <th className="text-left py-3 px-4 font-display text-amber-400">2011</th>
                    <th className="text-left py-3 px-4 font-display text-primary">2025</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Primary Driver</td>
                    <td className="py-4 px-4">Market manipulation</td>
                    <td className="py-4 px-4">Investment speculation</td>
                    <td className="py-4 px-4 text-primary">Physical shortage</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Supply-Demand</td>
                    <td className="py-4 px-4">Artificial shortage (hoarding)</td>
                    <td className="py-4 px-4">Weak industrial demand</td>
                    <td className="py-4 px-4 text-primary">820M oz real deficit</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Industrial Demand</td>
                    <td className="py-4 px-4">Low (photography)</td>
                    <td className="py-4 px-4">Moderate (electronics)</td>
                    <td className="py-4 px-4 text-primary">Record (solar, EVs, AI)</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Supply Response</td>
                    <td className="py-4 px-4">Could increase</td>
                    <td className="py-4 px-4">Could increase</td>
                    <td className="py-4 px-4 text-primary">72% byproduct (inelastic)</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Regulatory Action</td>
                    <td className="py-4 px-4 text-destructive">Forced liquidation</td>
                    <td className="py-4 px-4 text-amber-400">Margin hikes killed rally</td>
                    <td className="py-4 px-4 text-primary">Confirms shortage</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Fundamental Support</td>
                    <td className="py-4 px-4 text-destructive">None</td>
                    <td className="py-4 px-4 text-amber-400">Weak</td>
                    <td className="py-4 px-4 text-primary">Strong (structural)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">Outcome</td>
                    <td className="py-4 px-4 text-destructive">Collapse (-90%)</td>
                    <td className="py-4 px-4 text-amber-400">Bear market (-70%)</td>
                    <td className="py-4 px-4 text-primary">Sustainable rally</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Deep Dive Cards */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-panel p-8">
              <h3 className="text-xl font-display font-bold mb-4 text-destructive">1980: Pure Manipulation</h3>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  The Hunt Brothers (Nelson Bunker Hunt, William Herbert Hunt, and Lamar Hunt) attempted to corner 
                  the silver market by accumulating <span className="text-foreground font-mono">1/3 of global supply</span>.
                </p>
                <p>
                  They created an artificial shortage through hoarding. When regulators changed exchange rules and 
                  margin calls forced liquidation, the price collapsed <span className="text-destructive font-mono">90% by 1982</span>.
                </p>
                <div className="glass-panel p-4 rounded-lg bg-destructive/10">
                  <div className="text-xs font-mono text-destructive mb-2">NO FUNDAMENTAL SUPPORT</div>
                  <div className="text-xs">
                    The moment the manipulation ended, the price returned to fundamental levels. There was no 
                    industrial demand floor to support elevated prices.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-panel p-8">
              <h3 className="text-xl font-display font-bold mb-4 text-amber-400">2011: Speculation Bubble</h3>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  The 2011 rally was driven by investment speculation fueled by QE fears and inflation concerns. 
                  Heavily leveraged retail speculators piled in on margin.
                </p>
                <p>
                  CME raised margins <span className="text-foreground font-mono">5 times in 2 weeks (+84%)</span>, 
                  forcing liquidations. Weak industrial demand provided no floor, leading to a multi-year bear market.
                </p>
                <div className="glass-panel p-4 rounded-lg bg-amber-400/10">
                  <div className="text-xs font-mono text-amber-400 mb-2">WEAK FUNDAMENTALS</div>
                  <div className="text-xs">
                    Industrial demand was moderate but not growing. When investment demand evaporated, 
                    there was no structural support to prevent the collapse.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-panel p-8 lg:col-span-2 glow-border">
              <h3 className="text-xl font-display font-bold mb-4 text-primary">2025: Structural Reality</h3>
              <div className="space-y-4 text-muted-foreground text-sm">
                <p>
                  The 2025 rally is fundamentally different. It's driven by a <span className="text-primary font-mono">real physical deficit</span> of 
                  820+ million ounces over 5 years, equivalent to nearly one full year of global production.
                </p>
                <p>
                  Industrial demand is at record levels (700+ Moz), driven by solar panels (197 Moz), EVs, and AI data centers. 
                  This demand is <span className="text-primary font-mono">price-inelastic</span>—factories must have silver regardless of cost.
                </p>
                <p>
                  Supply cannot respond because <span className="text-primary font-mono">70% is byproduct</span> of other metals. 
                  New primary silver mines take 10-15 years to develop. Even at $150/oz, supply remains constrained.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="glass-panel p-4 rounded-lg bg-primary/10">
                    <div className="text-xs font-mono text-primary mb-2">✓ REAL DEFICIT</div>
                    <div className="text-xs">
                      820M oz cumulative shortage documented by Silver Institute
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-lg bg-primary/10">
                    <div className="text-xs font-mono text-primary mb-2">✓ STRUCTURAL DEMAND</div>
                    <div className="text-xs">
                      Green energy transition is non-cyclical, multi-decade trend
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-lg bg-primary/10">
                    <div className="text-xs font-mono text-primary mb-2">✓ INELASTIC SUPPLY</div>
                    <div className="text-xs">
                      72% byproduct mining means supply cannot respond to price
                    </div>
                  </div>
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
            <h2 className="text-2xl font-display font-bold mb-6 glow-text">Scenario Analysis: 2025-2030</h2>
            <div className="mb-4">
              <img 
                src="/images/silver_fundamental_projections.png" 
                alt="Silver Fundamental Projections 2025-2030" 
                className="w-full rounded-lg"
              />
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              Seven scenarios based on fundamental factors. Even the bear case shows +22% due to structural deficit floor. 
              Probability-weighted projection: $123/oz by 2030.
            </p>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8 text-center glow-border">
            <h3 className="text-2xl font-display font-bold mb-4 glow-text">This Is Not 1980 or 2011</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Past crashes were driven by speculation and manipulation. The 2025 rally is driven by 
              fundamental physical shortage. The structural deficit provides a durable floor.
            </p>
            <Link href="/physical-vs-paper">
              <Button size="lg" className="glow-border font-display">
                Understand Physical vs Paper
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
