import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo — dark version on transparent navbar, light version on scrolled white navbar */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {isScrolled ? (
            <img
              src="/be-logo-light.png"
              alt="Brand Envoy Africa"
              className="h-10 object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          ) : (
            <img
              src="/be-logo-dark.png"
              alt="Brand Envoy Africa"
              className="h-10 object-contain"
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
          {/* Company ▾ */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-accent hover:text-primary transition-colors focus:outline-none">
              Company <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/why-us" className="w-full cursor-pointer">Why Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/who-we-serve" className="w-full cursor-pointer">Who We Serve</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/clutch-reviews" className="w-full cursor-pointer">Client Reviews</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/talk-to-us" className="w-full cursor-pointer">Talk to Us</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Services ▾ */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-accent hover:text-primary transition-colors focus:outline-none">
              Services <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild>
                <Link href="/services/creative-branding" className="w-full cursor-pointer">Creative & Branding</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/prints-fabrications" className="w-full cursor-pointer">Prints & Fabrications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/media-pr" className="w-full cursor-pointer">Media & PR</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/market-entry" className="w-full cursor-pointer">
                  <div>
                    <div>Market Entry & Distribution</div>
                    <div className="text-xs text-muted-foreground">FMCG · Agro Sourcing & Export</div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/market-research" className="w-full cursor-pointer">Market Research Consulting</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/consulting" className="w-full cursor-pointer">
                  <div>
                    <div>Consulting</div>
                    <div className="text-xs text-muted-foreground">Hourly strategy sessions</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Political Campaigns — standalone */}
          <Link
            href="/political-campaigns"
            className={`px-3 py-2 rounded-md hover:bg-accent hover:text-primary transition-colors ${
              isActive("/political-campaigns") ? "text-primary" : ""
            }`}
          >
            Political Campaigns
          </Link>

          {/* Our Work — standalone */}
          <Link
            href="/our-work"
            className={`px-3 py-2 rounded-md hover:bg-accent hover:text-primary transition-colors ${
              isActive("/our-work") ? "text-primary" : ""
            }`}
          >
            Our Work
          </Link>

          {/* Resources ▾ — lighter visual weight */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none text-sm font-normal">
              Resources <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuItem asChild>
                <Link href="/markets" className="w-full cursor-pointer">Markets We Serve</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog" className="w-full cursor-pointer">Blog</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/talk-to-us"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
          >
            Talk to Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b shadow-lg absolute top-20 left-0 w-full p-4 flex flex-col gap-1 animate-in slide-in-from-top-2 overflow-y-auto max-h-[80vh]">
          {/* Company */}
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 pt-3 pb-1">Company</div>
          <Link href="/why-us" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Why Us</Link>
          <Link href="/who-we-serve" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Who We Serve</Link>
          <Link href="/clutch-reviews" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Client Reviews</Link>
          <Link href="/talk-to-us" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Talk to Us</Link>

          {/* Services */}
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 pt-3 pb-1">Services</div>
          <Link href="/services/creative-branding" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Creative & Branding</Link>
          <Link href="/services/prints-fabrications" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Prints & Fabrications</Link>
          <Link href="/services/media-pr" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Media & PR</Link>
          <Link href="/services/market-entry" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Market Entry & Distribution</Link>
          <Link href="/services/market-research" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Market Research Consulting</Link>
          <Link href="/services/consulting" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm">Consulting <span className="text-xs text-muted-foreground ml-1">(hourly)</span></Link>

          {/* Primary standalone */}
          <div className="border-t my-2" />
          <Link href="/political-campaigns" onClick={closeMenu} className="px-3 py-2.5 font-medium hover:bg-accent rounded-md text-sm">Political Campaigns</Link>
          <Link href="/our-work" onClick={closeMenu} className="px-3 py-2.5 font-medium hover:bg-accent rounded-md text-sm">Our Work</Link>

          {/* Resources */}
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 pt-3 pb-1">Resources</div>
          <Link href="/markets" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm text-muted-foreground">Markets We Serve</Link>
          <Link href="/blog" onClick={closeMenu} className="pl-3 px-3 py-2.5 hover:bg-accent rounded-md text-sm text-muted-foreground">Blog</Link>

          <Link
            href="/talk-to-us"
            onClick={closeMenu}
            className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 py-2"
          >
            Talk to Us
          </Link>
        </div>
      )}
    </header>
  );
}
