import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="/be-logo-dark.png"
                alt="Brand Envoy Africa"
                className="h-12 object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Africa's most innovative marketing agency. Proof-led strategies connecting brands to markets across Nigeria, Ghana, Kenya, and beyond.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/brandenvoy7" target="_blank" rel="noopener noreferrer" aria-label="Brand Envoy on X" className="text-muted hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/brandenvoy/" target="_blank" rel="noopener noreferrer" aria-label="Brand Envoy on Instagram" className="text-muted hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="https://ng.linkedin.com/company/brandenvoy-mobi" target="_blank" rel="noopener noreferrer" aria-label="Brand Envoy on LinkedIn" className="text-muted hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.youtube.com/channel/UCt-E4z593DqK7Ap3fuYxNnA" target="_blank" rel="noopener noreferrer" aria-label="Brand Envoy on YouTube" className="text-muted hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/why-us" className="hover:text-primary transition-colors">Why Us</Link></li>
              <li><Link href="/who-we-serve" className="hover:text-primary transition-colors">Who We Serve</Link></li>
              <li><Link href="/our-work" className="hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link href="/markets" className="hover:text-primary transition-colors">Markets We Serve</Link></li>
              <li><a href="https://brandsenvoy.com/blog/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Blog</a></li>

            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/services/creative-branding" className="hover:text-primary transition-colors">Creative & Branding</Link></li>
              <li><Link href="/services/prints-fabrications" className="hover:text-primary transition-colors">Prints & Fabrications</Link></li>
              <li><Link href="/services/media-pr" className="hover:text-primary transition-colors">Media & PR</Link></li>
              <li><Link href="/services/market-entry" className="hover:text-primary transition-colors">Market Entry & Distribution</Link></li>
              <li><Link href="/services/market-research" className="hover:text-primary transition-colors">Market Research</Link></li>
              <li><Link href="/political-campaigns" className="hover:text-primary transition-colors">Political Campaigns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <span className="block text-white/50 text-xs uppercase tracking-wider mb-1">Business Inquiries</span>
                <a href="mailto:business@brandsenvoy.com" className="hover:text-primary transition-colors">business@brandsenvoy.com</a>
              </li>
              <li>
                <span className="block text-white/50 text-xs uppercase tracking-wider mb-1">General</span>
                <a href="mailto:dsfbrandenvoy@gmail.com" className="hover:text-primary transition-colors">dsfbrandenvoy@gmail.com</a>
              </li>
              <li className="pt-2">
                <span className="block text-white/50 text-xs uppercase tracking-wider mb-1">Headquarters</span>
                <address className="not-italic">Lagos, Nigeria</address>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© {new Date().getFullYear()} Brand Envoy Africa. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">·</span>
            <p>
              Built by{" "}
              <a
                href="https://brandsenvoy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
              >
                Brand Envoy Africa
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}