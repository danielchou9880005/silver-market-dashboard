import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, DollarSign } from "lucide-react";
import { Link } from "wouter";

/**
 * Design: Physical vs Paper Silver Page
 * - Warning-heavy design with destructive colors
 * - Side-by-side comparison tables
 * - Scenario walkthroughs with step-by-step breakdowns
 */

export default function PhysicalVsPaper() {
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
            <span className="font-display text-xl glow-text">PHYSICAL VS PAPER SILVER</span>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 rounded-full glass-panel mb-6">
              <span className="text-destructive font-mono text-sm">⚠ CRITICAL RISK ANALYSIS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight">
              The Paper Market<br />
              <span className="glow-text text-destructive">Is Breaking Down</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Understanding the 356:1 paper-to-physical ratio, SLV's cash settlement risk, 
              and why allocated storage matters in a squeeze.
            </p>
          </div>
        </div>
      </section>

      {/* Key Warning */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8 border-destructive/50 glow-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2 text-destructive">356:1 Paper-to-Physical Ratio</h3>
                <p className="text-muted-foreground mb-4">
                  For every ounce of physical silver in COMEX vaults, there are 356 ounces of paper claims. 
                  This ratio is mathematically unsustainable. When the squeeze happens, the paper market will collapse.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="glass-panel p-4 rounded-lg bg-destructive/10">
                    <div className="text-sm font-mono text-destructive mb-1">COMEX Vaults</div>
                    <div className="text-2xl font-display font-bold mb-1">30-45 days</div>
                    <div className="text-xs text-muted-foreground">Physical inventory remaining at current demand</div>
                  </div>
                  <div className="glass-panel p-4 rounded-lg bg-destructive/10">
                    <div className="text-sm font-mono text-destructive mb-1">LBMA Vaults</div>
                    <div className="text-2xl font-display font-bold mb-1">-40%</div>
                    <div className="text-xs text-muted-foreground">Inventory decline since 2020</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8">
            <h2 className="text-2xl font-display font-bold mb-6 glow-text">Physical vs Paper: The Critical Differences</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Factor</th>
                    <th className="text-left py-3 px-4 font-display text-primary">Physical Silver</th>
                    <th className="text-left py-3 px-4 font-display text-destructive">Paper Silver (SLV)</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">What you own</td>
                    <td className="py-4 px-4 text-primary">Real, tangible metal</td>
                    <td className="py-4 px-4 text-destructive">Paper claim on silver</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Storage</td>
                    <td className="py-4 px-4 text-primary">Self-custody or allocated vault</td>
                    <td className="py-4 px-4 text-destructive">Unallocated pool</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Counterparty risk</td>
                    <td className="py-4 px-4 text-primary">None (if self-stored)</td>
                    <td className="py-4 px-4 text-destructive">JPMorgan, BlackRock, APs</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">In a shortage</td>
                    <td className="py-4 px-4 text-primary">Price skyrockets</td>
                    <td className="py-4 px-4 text-destructive">Cash settlement at paper price</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Liquidity</td>
                    <td className="py-4 px-4 text-amber-400">Low (must find buyer)</td>
                    <td className="py-4 px-4 text-primary">High (trade on exchange)</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 text-muted-foreground">Premium over spot</td>
                    <td className="py-4 px-4 text-amber-400">20-40% currently</td>
                    <td className="py-4 px-4 text-primary">Tracks paper spot</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-muted-foreground">The bet</td>
                    <td className="py-4 px-4 text-primary">System breaks</td>
                    <td className="py-4 px-4 text-destructive">System holds together</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* SLV Breakdown Scenarios */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-display font-bold mb-6 glow-text">How SLV Fails: Three Scenarios</h2>
          
          <div className="space-y-6">
            {/* Scenario 1 */}
            <Card className="glass-panel p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0 font-display font-bold text-amber-400">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-amber-400">The "Premium" Phase (Happening Now)</h3>
                  <p className="text-sm text-muted-foreground mt-1">SLV starts to lag behind physical prices</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
                <div className="glass-panel p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">Physical Silver</div>
                  <div className="text-2xl font-display font-bold text-primary">$80/oz</div>
                  <div className="text-xs text-muted-foreground mt-1">Shanghai market</div>
                </div>
                <div className="glass-panel p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">COMEX Paper</div>
                  <div className="text-2xl font-display font-bold text-amber-400">$35/oz</div>
                  <div className="text-xs text-muted-foreground mt-1">Futures market</div>
                </div>
                <div className="glass-panel p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">SLV Share Price</div>
                  <div className="text-2xl font-display font-bold text-amber-400">$40/oz</div>
                  <div className="text-xs text-muted-foreground mt-1">Trading at premium</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <span className="text-amber-400 font-mono">Why:</span> APs struggle to find physical silver to create new shares. 
                Demand outstrips creation ability, so SLV trades at a premium to COMEX. 
                <span className="text-amber-400">You're making money, but losing out</span>—celebrating $40 while the real asset hits $80.
              </p>
            </Card>

            {/* Scenario 2 */}
            <Card className="glass-panel p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 font-display font-bold text-destructive">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-destructive">The "Decoupling" Phase</h3>
                  <p className="text-sm text-muted-foreground mt-1">Creation/redemption mechanism breaks</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  APs officially announce they can no longer source physical silver. The creation/redemption mechanism <span className="text-destructive font-mono">halts</span>.
                </p>
                <p>
                  SLV becomes a <span className="text-destructive font-mono">"zombie ETF"</span>—a fixed number of shares trading on sentiment, 
                  completely disconnected from silver's value. It's no longer a silver investment; it's a speculative trading vehicle with a silver-themed sticker.
                </p>
                <div className="glass-panel p-4 rounded-lg bg-destructive/10 mt-4">
                  <div className="text-xs font-mono text-destructive mb-2">⚠ CRITICAL POINT</div>
                  <div className="text-xs">
                    Physical silver continues to $100, $150, $200+ while SLV becomes untethered from the fundamental thesis. 
                    You're no longer invested in silver—you're gambling on herd mentality.
                  </div>
                </div>
              </div>
            </Card>

            {/* Scenario 3 */}
            <Card className="glass-panel p-8 border-destructive/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 font-display font-bold text-destructive pulse-glow">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-destructive">The "Cash Settlement" Collapse (Endgame)</h3>
                  <p className="text-sm text-muted-foreground mt-1">BlackRock/JPMorgan invoke termination clauses</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground mb-4">
                <p>
                  The trustee determines they can no longer operate the fund as intended. The Trust is liquidated. 
                  They sell any remaining silver at whatever price they can get. <span className="text-destructive font-mono">All shares are settled in cash</span> based on the last official paper price.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
                <div className="glass-panel p-4 rounded-lg bg-primary/10">
                  <div className="text-xs text-muted-foreground mb-2">Physical Silver Price</div>
                  <div className="text-2xl font-display font-bold text-primary">$150/oz</div>
                  <div className="text-xs text-muted-foreground mt-1">Real market value</div>
                </div>
                <div className="glass-panel p-4 rounded-lg bg-amber-400/10">
                  <div className="text-xs text-muted-foreground mb-2">Last COMEX Price</div>
                  <div className="text-2xl font-display font-bold text-amber-400">$45/oz</div>
                  <div className="text-xs text-muted-foreground mt-1">Before collapse</div>
                </div>
                <div className="glass-panel p-4 rounded-lg bg-destructive/10">
                  <div className="text-xs text-muted-foreground mb-2">You Get</div>
                  <div className="text-2xl font-display font-bold text-destructive">$45 cash</div>
                  <div className="text-xs text-muted-foreground mt-1">Per "ounce" owned</div>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-lg bg-destructive/10 mt-4">
                <div className="text-xs font-mono text-destructive mb-2">THIS IS THE TRUE CRASH</div>
                <div className="text-xs">
                  You get a check for $45 while the asset you thought you owned is worth $150. You don't get the silver. 
                  You don't get the physical price. You get a fraction of its value in devaluing dollars, permanently locked out 
                  of the physical market that has repriced to reality.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Concert Ticket Analogy */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8">
            <h3 className="text-xl font-display font-bold mb-4 glow-text">The Concert Ticket Analogy</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="glass-panel p-4 rounded-lg">
                <div className="text-xs font-mono text-primary mb-2">1. You Buy</div>
                <div className="text-muted-foreground">
                  Physical Silver = attending a legendary concert<br/>
                  SLV = a $50 ticket to that concert
                </div>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <div className="text-xs font-mono text-primary mb-2">2. The Squeeze</div>
                <div className="text-muted-foreground">
                  Concert sells out, band becomes huge overnight<br/>
                  Tickets now scalping for $500 (physical price)
                </div>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <div className="text-xs font-mono text-amber-400 mb-2">3. You Feel Good</div>
                <div className="text-muted-foreground">
                  Your $50 ticket is now "worth" $500<br/>
                  You think you're rich
                </div>
              </div>
              <div className="glass-panel p-4 rounded-lg bg-destructive/10">
                <div className="text-xs font-mono text-destructive mb-2">4. Cash Settlement</div>
                <div className="text-muted-foreground">
                  Venue cancels all tickets<br/>
                  Refunds original $50 face value<br/>
                  <span className="text-destructive">You lost $450 of real value</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* China's Role */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8 glow-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-4 text-primary">China Just Lit the Fuse</h3>
                <p className="text-muted-foreground mb-4">
                  On January 1, 2026, China's export restrictions take effect. Despite being a net importer, 
                  China controls <span className="text-primary font-mono">60-70% of global refining capacity</span>.
                </p>
                <p className="text-muted-foreground mb-4">
                  By restricting exports, China removes refined silver from global markets while continuing to import ore for domestic use. 
                  The rest of the world loses access to 60-70% of refined supply and must compete for the remaining 30-40%.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="glass-panel p-4 rounded-lg bg-primary/10">
                    <div className="text-sm font-mono text-primary mb-2">China's Strategy</div>
                    <div className="text-xs text-muted-foreground">
                      Secure domestic supply for strategic industries (solar, EVs, 5G). Let the West fight over paper claims. 
                      Expose and destroy the COMEX paper market.
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-lg bg-primary/10">
                    <div className="text-sm font-mono text-primary mb-2">The Geopolitical Play</div>
                    <div className="text-xs text-muted-foreground">
                      This isn't just about silver—it's about de-dollarization and commodity-backed power. 
                      If China breaks COMEX, it sets a precedent for oil, copper, gold.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8 text-center glow-border">
            <h3 className="text-2xl font-display font-bold mb-4 glow-text">The War Between Physical and Paper</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              SLV is designed to protect the financial system, not you. In a shortage, it will lag, decouple, 
              and cash-settle at broken paper prices. Allocated storage is the only protection.
            </p>
            <Link href="/investment-options">
              <Button size="lg" className="glow-border font-display">
                View Safe Investment Options
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
