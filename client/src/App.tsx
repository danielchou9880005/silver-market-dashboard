import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import Dashboard from "@/pages/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SupplyDemand from "./pages/SupplyDemand";
import HistoricalComparison from "./pages/HistoricalComparison";
import PhysicalVsPaper from "./pages/PhysicalVsPaper";
import InvestmentOptions from "./pages/InvestmentOptions";

/**
 * Design: Dark Financial Terminal with Cyberpunk Undertones
 * - Deep space black (#0d0d0d) backgrounds
 * - Electric cyan (#00d9ff) accents and interactive elements
 * - Orbitron font for futuristic headlines
 * - JetBrains Mono for terminal-style data
 * - Glass morphism with backdrop blur
 * - Glowing borders and pulsing animations
 */
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/home" component={Home} />
      <Route path={"/supply-demand"} component={SupplyDemand} />
      <Route path={"/historical-comparison"} component={HistoricalComparison} />
      <Route path={"/physical-vs-paper"} component={PhysicalVsPaper} />
      <Route path={"/investment-options"} component={InvestmentOptions} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
