import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    performance: false,
    targeting: false,
    functionality: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("brand-envoy-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("brand-envoy-cookie-consent", JSON.stringify({
      necessary: true,
      performance: true,
      targeting: true,
      functionality: true
    }));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem("brand-envoy-cookie-consent", JSON.stringify({
      necessary: true,
      performance: false,
      targeting: false,
      functionality: false
    }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("brand-envoy-cookie-consent", JSON.stringify(preferences));
    setShowPreferences(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <h4 className="text-foreground font-semibold text-base mb-1">Cookie Preferences</h4>
            <p>
              We use cookies to enhance your experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={() => setShowPreferences(true)}>
              Manage Preferences
            </Button>
            <Button variant="secondary" onClick={handleDeclineAll}>
              Decline All
            </Button>
            <Button onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie settings below. You can change these at any time.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="necessary" checked disabled />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="necessary" className="font-medium">Strictly Necessary</label>
                <p className="text-xs text-muted-foreground">Required for the website to function properly. Cannot be disabled.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="performance" 
                checked={preferences.performance}
                onCheckedChange={(checked) => setPreferences(prev => ({...prev, performance: checked === true}))}
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="performance" className="font-medium cursor-pointer">Performance</label>
                <p className="text-xs text-muted-foreground">Helps us understand how visitors interact with our site.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="functionality" 
                checked={preferences.functionality}
                onCheckedChange={(checked) => setPreferences(prev => ({...prev, functionality: checked === true}))}
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="functionality" className="font-medium cursor-pointer">Functionality</label>
                <p className="text-xs text-muted-foreground">Enables personalized features and settings.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="targeting" 
                checked={preferences.targeting}
                onCheckedChange={(checked) => setPreferences(prev => ({...prev, targeting: checked === true}))}
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="targeting" className="font-medium cursor-pointer">Targeting</label>
                <p className="text-xs text-muted-foreground">Used to deliver relevant ads and track ad campaign performance.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowPreferences(false)}>Cancel</Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}