import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { Link } from "wouter";

/**
 * Design: Investment Options Page
 * - Comparison tables with pros/cons
 * - Color-coded recommendations (green = best, yellow = acceptable, red = avoid)
 * - Actionable CTAs with external links
 */

export default function InvestmentOptions() {
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
            <span className="font-display text-xl glow-text">INVESTMENT OPTIONS</span>
            <div className="w-24" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 rounded-full glass-panel mb-6">
              <span className="text-primary font-mono text-sm">ACTIONABLE RECOMMENDATIONS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight">
              How to Invest<br />
              <span className="glow-text text-primary">in Real Silver</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comparing physical bullion, PSLV, Kinesis KAG, and mining stocks. Understanding allocated vs 
              unallocated storage, with specific recommendations based on your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8">
            <h2 className="text-2xl font-display font-bold mb-6 glow-text">Quick Comparison: All Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Option</th>
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Physical Exposure</th>
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Liquidity</th>
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Counterparty Risk</th>
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Min Investment</th>
                    <th className="text-left py-3 px-4 font-display text-muted-foreground">Verdict</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 font-display text-primary">Physical Coins/Bars</td>
                    <td className="py-4 px-4 text-primary">100% Direct</td>
                    <td className="py-4 px-4 text-amber-400">Low</td>
                    <td className="py-4 px-4 text-primary">None</td>
                    <td className="py-4 px-4">~$30</td>
                    <td className="py-4 px-4 text-primary">✓ Best</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 font-display text-primary">PSLV</td>
                    <td className="py-4 px-4 text-primary">100% Allocated</td>
                    <td className="py-4 px-4 text-primary">High</td>
                    <td className="py-4 px-4 text-amber-400">Low</td>
                    <td className="py-4 px-4">~$25</td>
                    <td className="py-4 px-4 text-primary">✓ Best</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 font-display text-emerald-400">Kinesis KAG</td>
                    <td className="py-4 px-4 text-primary">100% Allocated</td>
                    <td className="py-4 px-4 text-emerald-400">Medium</td>
                    <td className="py-4 px-4 text-amber-400">Medium</td>
                    <td className="py-4 px-4">~$1</td>
                    <td className="py-4 px-4 text-emerald-400">✓ Good</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 font-display text-destructive">SLV</td>
                    <td className="py-4 px-4 text-amber-400">100% Unallocated</td>
                    <td className="py-4 px-4 text-primary">High</td>
                    <td className="py-4 px-4 text-destructive">High</td>
                    <td className="py-4 px-4">~$70</td>
                    <td className="py-4 px-4 text-destructive">✗ Avoid</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-4 px-4 font-display">Mining Stocks</td>
                    <td className="py-4 px-4 text-amber-400">Leveraged Indirect</td>
                    <td className="py-4 px-4 text-primary">High</td>
                    <td className="py-4 px-4 text-destructive">High</td>
                    <td className="py-4 px-4">Varies</td>
                    <td className="py-4 px-4 text-amber-400">△ Aggressive</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-display text-destructive">Futures</td>
                    <td className="py-4 px-4 text-destructive">Paper (deliverable)</td>
                    <td className="py-4 px-4 text-primary">Highest</td>
                    <td className="py-4 px-4 text-destructive">Highest</td>
                    <td className="py-4 px-4">~$25k</td>
                    <td className="py-4 px-4 text-destructive">✗ Avoid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Detailed Options */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-display font-bold mb-6 glow-text">Detailed Analysis</h2>
          
          <div className="space-y-6">
            {/* Physical Silver */}
            <Card className="glass-panel p-8 border-primary/50 glow-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Option 1: Physical Silver Bullion</h3>
                  <p className="text-sm text-muted-foreground">Direct ownership of actual silver coins or bars</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-display font-bold text-primary mb-3">✓ Advantages</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>You own the actual metal (zero counterparty risk if self-stored)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Immune to paper market collapse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Can sell into physical shortage at premium prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Privacy (if bought with cash locally)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-amber-400 mb-3">✗ Disadvantages</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>High premiums over spot (currently 20-40% for coins)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Storage risk (theft, loss if self-stored)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Not tradeable (can't day trade or quickly exit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Bid-ask spread when selling back</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-lg bg-primary/10 mb-4">
                <div className="text-sm font-mono text-primary mb-2">WHERE TO BUY</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <a href="https://www.apmex.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                    APMEX.com <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://www.jmbullion.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                    JMBullion.com <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://www.sdbullion.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                    SDBullion.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="text-sm font-mono text-primary">
                <span className="text-muted-foreground">Best for:</span> Long-term holders (5+ years), those who believe the paper system will collapse, those with secure storage
              </div>
            </Card>

            {/* PSLV */}
            <Card className="glass-panel p-8 border-primary/50 glow-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Option 2: Sprott Physical Silver Trust (PSLV)</h3>
                  <p className="text-sm text-muted-foreground">Ticker: PSLV (NYSE Arca, TSX) • Expense Ratio: 0.58%</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                A closed-end trust that holds <span className="text-primary font-mono">fully-allocated, unencumbered</span> physical silver in secure vaults. 
                This is the closest thing to owning physical silver while still being tradeable on an exchange.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-display font-bold text-primary mb-3">✓ Advantages</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Fully allocated (specific bars assigned to you)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Redeemable for physical (minimum ~10,000 oz)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Tradeable on exchange (high liquidity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Transparent (bar list published online)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Government custodian (Royal Canadian Mint, not a bank)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-amber-400 mb-3">✗ Disadvantages</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Still counterparty risk (trust structure, custodian)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Higher expense ratio than SLV (0.58% vs 0.50%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Redemption minimum is high ($350k+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Tax treatment (PFIC for US investors, complex)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-lg bg-primary/10 mb-4">
                <div className="text-sm font-mono text-primary mb-2">CRITICAL ADVANTAGE</div>
                <div className="text-sm text-muted-foreground">
                  PSLV allows unitholders to redeem for physical silver on a monthly basis. This forces PSLV to maintain real physical backing 
                  and creates a floor under PSLV's price relative to physical. In a shortage, PSLV holders can band together to redeem.
                </div>
              </div>

              <div className="text-sm font-mono text-primary">
                <span className="text-muted-foreground">Best for:</span> Investors who want physical exposure with liquidity, those who don't trust SLV's structure, long-term holders comfortable with PFIC reporting
              </div>
            </Card>

            {/* Kinesis KAG */}
            <Card className="glass-panel p-8 border-emerald-400/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-emerald-400 mb-2">Option 3: Kinesis Silver (KAG)</h3>
                  <p className="text-sm text-muted-foreground">Blockchain-based silver currency • 1 KAG = 1 gram of allocated silver</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                Each KAG token represents 1 gram of silver stored in allocated vaults. You can trade KAG instantly 24/7 and redeem for physical (200 oz minimum).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-sm font-display font-bold text-emerald-400 mb-3">✓ Advantages</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Fully allocated physical backing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Instant trading 24/7 (blockchain)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Can buy fractional amounts (as low as 1 gram)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-amber-400 mb-3">✗ Disadvantages</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>New/unproven system (launched 2019)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Learning curve (blockchain/crypto interface)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>Lower liquidity than major exchanges</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-sm font-mono text-emerald-400">
                <span className="text-muted-foreground">Best for:</span> Tech-savvy investors, those who want instant liquidity + physical backing, smaller investors
              </div>
            </Card>

            {/* SLV Warning */}
            <Card className="glass-panel p-8 border-destructive/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-destructive mb-2">❌ Avoid: iShares Silver Trust (SLV)</h3>
                  <p className="text-sm text-muted-foreground">Ticker: SLV (NYSE) • Expense Ratio: 0.50%</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                SLV holds <span className="text-destructive font-mono">unallocated</span> physical silver with JPMorgan as custodian. 
                In a shortage, SLV has the right to <span className="text-destructive font-mono">cash-settle at paper prices</span> instead of delivering physical.
              </p>

              <div className="glass-panel p-4 rounded-lg bg-destructive/10">
                <div className="text-sm font-mono text-destructive mb-2">⚠ CRITICAL RISK</div>
                <div className="text-sm text-muted-foreground">
                  SLV is designed to protect the financial system, not you. It will lag physical prices, decouple when creation breaks, 
                  and ultimately cash-settle at broken paper prices while physical trades at $100-150+. You don't get the silver. You don't get the physical price.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-display font-bold mb-6 glow-text">Recommended Strategy</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-panel p-8 glow-border">
              <h3 className="text-xl font-display font-bold mb-4 text-primary">High Conviction (Squeeze Believers)</h3>
              <div className="space-y-4 text-sm">
                <div className="glass-panel p-4 rounded-lg">
                  <div className="font-mono text-primary mb-2">60-70% Physical Silver</div>
                  <div className="text-muted-foreground">
                    Accept the high premiums—they confirm the shortage. This is your "insurance" position. Store securely.
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-lg">
                  <div className="font-mono text-primary mb-2">20-30% PSLV</div>
                  <div className="text-muted-foreground">
                    Gives you liquidity if you need to exit quickly. Can accumulate toward redemption threshold.
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-lg">
                  <div className="font-mono text-amber-400 mb-2">10% Mining Stocks (Optional)</div>
                  <div className="text-muted-foreground">
                    For leveraged upside if silver explodes. Accept the higher risk.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-panel p-8">
              <h3 className="text-xl font-display font-bold mb-4 text-primary">Balanced Approach</h3>
              <div className="space-y-4 text-sm">
                <div className="glass-panel p-4 rounded-lg">
                  <div className="font-mono text-primary mb-2">50% Physical Silver</div>
                  <div className="text-muted-foreground">
                    Whatever you can afford. Start with 1 oz American Silver Eagles or 10 oz bars.
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-lg">
                  <div className="font-mono text-primary mb-2">50% PSLV</div>
                  <div className="text-muted-foreground">
                    For liquidity and ease of trading. Best compromise between physical backing and tradeability.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-8 text-center glow-border">
            <h3 className="text-2xl font-display font-bold mb-4 glow-text">The Key Distinction: Allocated vs Unallocated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              <span className="text-primary font-mono">Allocated:</span> Specific bars assigned to you. You own them.<br/>
              <span className="text-destructive font-mono">Unallocated:</span> You own a claim on a pool. You're a creditor, not an owner.
            </p>
            <p className="text-lg text-foreground mb-8">
              In a shortage, allocated wins. Unallocated gets cash-settled.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://www.apmex.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="glow-border font-display">
                  Buy Physical Silver <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
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
