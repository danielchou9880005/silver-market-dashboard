import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, AlertTriangle, Shield, Target } from "lucide-react";
import { Link } from "wouter";

/**
 * Design: Dark Financial Terminal - Home Page
 * - Hero with glowing headline and scanline effect
 * - Modular card grid with glass morphism
 * - Electric cyan accents for CTAs
 * - Animated data callouts
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Scanline effect overlay */}
      <div className="scanline-effect absolute inset-0 pointer-events-none z-10" />
      
      {/* Navigation */}
      <nav className="glass-panel sticky top-0 z-20 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center glow-border">
                <span className="text-primary font-display text-lg">Ag</span>
              </div>
              <span className="font-display text-xl glow-text">SILVER INTEL</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/supply-demand">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors">Supply & Demand</a>
              </Link>
              <Link href="/historical-comparison">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors">Historical Analysis</a>
              </Link>
              <Link href="/physical-vs-paper">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors">Physical vs Paper</a>
              </Link>
              <Link href="/investment-options">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors">Investment Options</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 rounded-full glass-panel mb-6">
              <span className="text-primary font-mono text-sm">MARKET ANALYSIS • DEC 2025</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black mb-6 leading-tight">
              The Silver<br />
              <span className="glow-text text-primary">Squeeze</span> Is Real
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl font-body">
              Comprehensive analysis of the structural supply deficit, China's export restrictions, 
              and the collapse of the paper silver market. This is not speculation—it's fundamental reality.
            </p>
            <div className="flex gap-4">
              <Link href="/supply-demand">
                <Button size="lg" className="glow-border font-display">
                  View Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="glass-panel">
                Download Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <Card className="glass-panel p-6 pulse-glow">
              <div className="text-4xl font-display font-black text-primary mb-2">820M</div>
              <div className="text-sm text-muted-foreground font-mono">oz Cumulative Deficit</div>
              <div className="text-xs text-muted-foreground mt-1">2021-2025</div>
            </Card>
            <Card className="glass-panel p-6 pulse-glow">
              <div className="text-4xl font-display font-black text-amber-400 mb-2">356:1</div>
              <div className="text-sm text-muted-foreground font-mono">Paper to Physical Ratio</div>
              <div className="text-xs text-muted-foreground mt-1">Unsustainable</div>
            </Card>
            <Card className="glass-panel p-6 pulse-glow">
              <div className="text-4xl font-display font-black text-emerald-400 mb-2">72%</div>
              <div className="text-sm text-muted-foreground font-mono">Byproduct Mining</div>
              <div className="text-xs text-muted-foreground mt-1">Supply Inelastic</div>
            </Card>
            <Card className="glass-panel p-6 pulse-glow">
              <div className="text-4xl font-display font-black text-primary mb-2">$150</div>
              <div className="text-sm text-muted-foreground font-mono">2030 Projection</div>
              <div className="text-xs text-muted-foreground mt-1">Base Case</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Analysis Modules */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 glow-text">Deep Dive Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/supply-demand">
              <Card className="glass-panel p-8 hover:glow-border transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:glow-border transition-all">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold mb-2">Supply & Demand Dynamics</h3>
                    <p className="text-muted-foreground mb-4">
                      Five consecutive years of structural deficits. Green energy demand (solar, EVs) 
                      overwhelming constrained byproduct supply.
                    </p>
                    <div className="flex items-center text-primary text-sm font-mono">
                      Read Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/historical-comparison">
              <Card className="glass-panel p-8 hover:glow-border transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-400/20 flex items-center justify-center group-hover:glow-border transition-all">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold mb-2">1980 & 2011 vs 2025</h3>
                    <p className="text-muted-foreground mb-4">
                      Why this rally is fundamentally different from past speculative bubbles. 
                      Comparing manipulation vs structural shortage.
                    </p>
                    <div className="flex items-center text-amber-400 text-sm font-mono">
                      Read Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/physical-vs-paper">
              <Card className="glass-panel p-8 hover:glow-border transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center group-hover:glow-border transition-all">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold mb-2">Physical vs Paper Silver</h3>
                    <p className="text-muted-foreground mb-4">
                      Understanding SLV's cash settlement risk, the 356:1 paper ratio, and why 
                      allocated storage matters in a squeeze.
                    </p>
                    <div className="flex items-center text-destructive text-sm font-mono">
                      Read Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/investment-options">
              <Card className="glass-panel p-8 hover:glow-border transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-400/20 flex items-center justify-center group-hover:glow-border transition-all">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold mb-2">Investment Options</h3>
                    <p className="text-muted-foreground mb-4">
                      Physical bullion, PSLV, Kinesis KAG, and mining stocks. Comparing allocated 
                      vs unallocated, with actionable recommendations.
                    </p>
                    <div className="flex items-center text-emerald-400 text-sm font-mono">
                      Read Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="glass-panel p-12 text-center glow-border">
            <h2 className="text-3xl font-display font-bold mb-4 glow-text">The Window Is Closing</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              China's export restrictions take effect January 1, 2026. Physical premiums are already 
              at 20-40%. The paper market is breaking down. This is your signal.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/investment-options">
                <Button size="lg" className="glow-border font-display">
                  View Investment Options <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground font-mono">
              © 2025 Silver Intel. Analysis for educational purposes only.
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              Last updated: Dec 30, 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
