import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import { Home } from './pages/Home';
import { WhyUs } from './pages/WhyUs';
import { WhoWeServe } from './pages/WhoWeServe';
import { OurWork } from './pages/OurWork';
import { TalkToUs } from './pages/TalkToUs';
import { MarketsWeServe } from './pages/MarketsWeServe';
import { PoliticalCampaigns } from './pages/PoliticalCampaigns';
import { CreativeBranding } from './pages/services/CreativeBranding';
import { PrintsFabrications } from './pages/services/PrintsFabrications';
import { MediaPR } from './pages/services/MediaPR';
import { MarketEntry } from './pages/services/MarketEntry';
import { MarketResearch } from './pages/services/MarketResearch';
import { Consulting } from './pages/services/Consulting';
import { AffiliateMarketing } from './pages/AffiliateMarketing';
import { AffiliateAdmin } from './pages/AffiliateAdmin';
import { ClutchReviews } from './pages/ClutchReviews';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function ExternalBlogRedirect() {
  useEffect(() => {
    window.location.href = "https://brandsenvoy.com/blog/";
  }, []);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/why-us" component={WhyUs} />
        <Route path="/who-we-serve" component={WhoWeServe} />
        <Route path="/our-work" component={OurWork} />
        <Route path="/talk-to-us" component={TalkToUs} />
        <Route path="/markets" component={MarketsWeServe} />
        <Route path="/political-campaigns" component={PoliticalCampaigns} />

        {/* Services */}
        <Route path="/services/creative-branding" component={CreativeBranding} />
        <Route path="/services/prints-fabrications" component={PrintsFabrications} />
        <Route path="/services/media-pr" component={MediaPR} />
        <Route path="/services/market-entry" component={MarketEntry} />
        <Route path="/services/market-research" component={MarketResearch} />
        <Route path="/services/consulting" component={Consulting} />

        {/* Reviews */}
        <Route path="/clutch-reviews" component={ClutchReviews} />

        {/* Affiliates */}
        <Route path="/affiliate-marketing" component={AffiliateMarketing} />
        <Route path="/affiliate-admin" component={AffiliateAdmin} />

        {/* External Blog Redirect */}
        <Route path="/blog" component={ExternalBlogRedirect} />
        <Route path="/blog/:slug" component={ExternalBlogRedirect} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
        <SonnerToaster position="top-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
