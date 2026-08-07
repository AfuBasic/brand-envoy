import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, Package, Hammer, RefreshCw, X, CheckCircle, ZoomIn } from "lucide-react";
import { organizationSchema, serviceSchema } from "@/lib/seo";

/* ─── Print product catalogue ───────────────────────────────────────── */
const PRINT_CATEGORIES = [
  {
    label: "Bags & Nylons",
    items: [
      "Tote Bags",
      "Courier Nylon (Delivery Nylon)",
      "Courier Nylon with Handle",
      "Shopping Nylon",
      "Regular Nylon",
      "Paper Bags",
      "Craft Bags",
      "String Nylon",
      "Singlet Nylon",
      "Satin Bags",
      "Ziplock Bags",
      "Wine Paper Bags",
    ],
  },
  {
    label: "Customized Boxes",
    items: [
      "Magnetic Box",
      "Slide Drawer Box",
      "Lid and Base Box",
      "Shoe Box",
      "Foldable Gift Box",
      "Ribbon Gift Box",
    ],
  },
  {
    label: "Food Packaging",
    items: [
      "Lunch Boxes (Plain)",
      "Lunch Boxes (Branded)",
      "Chinese Food Boxes",
      "Burger Packs",
      "Shawarma Wrap (Grease Proof)",
    ],
  },
  {
    label: "Branded Items & Merch",
    items: [
      "Face Caps / Branded Apparel",
      "Branded Pens",
      "Key Holders",
      "Sublimation Mugs",
      "Magic Mugs",
      "PVC Hand Fans",
      "Party Cups",
      "Satin Labels (Per Ribbon)",
      "Woven Labels",
      "Picture Frames",
    ],
  },
  {
    label: "Print & Stationery",
    items: [
      "Flyers / Handbills (A5)",
      "Flyers / Handbills (A4)",
      "Business Cards",
      "Letterhead",
      "Branded Envelopes (A4 / A5)",
      "Round Stickers (Print & Cut)",
      "Flex Banners",
      "Table Tags",
      "Invoice / Receipt Books (A5)",
    ],
  },
  {
    label: "Identity & Events",
    items: [
      "ID Cards",
      "Customize Lanyard",
      "ID Card Holders",
      "Certificates (Bulk Sticker)",
      "Corporate Gift Sets",
    ],
  },
];

const PRICING_SHEETS = [
  {
    src: "/print-rates-bags.png",
    label: "Bags, Nylons & Stationery",
    desc: "Courier nylon, paper bags, craft bags, business cards, stickers & more",
  },
  {
    src: "/print-rates-boxes.png",
    label: "Boxes, Merch & Branded Items",
    desc: "Gift boxes, mugs, tote bags, flex banners, satin labels, party cups",
  },
  {
    src: "/print-rates-food.png",
    label: "Food Packaging & Corporate Gifts",
    desc: "Lunch boxes, burger packs, flyers, face caps, BIMBUS gift sets",
  },
];

/* ─── Fabrication gallery ────────────────────────────────────────────
   Add items here as { title, image, description } when fabrication
   photos are ready. The grid renders automatically.
───────────────────────────────────────────────────────────────────── */
const FABRICATION_GALLERY: { title: string; image: string; description: string }[] = [
  // Items will be added once fabrication photos are provided.
];

/* ─── Shared quote form ─────────────────────────────────────────────── */
function QuoteForm({ type }: { type: "print" | "fabrication" }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggle = (item: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "print" && selected.size === 0) {
      setErrorMsg("Please select at least one product.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/print-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          items: type === "print" ? Array.from(selected) : [`Fabrication: ${form.notes}`],
          quantity: form.quantity,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong.");
      setStatus("success");
    } catch {
      setErrorMsg("Failed to send. Email us at business@brandsenvoy.com directly.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">Quote Request Received</h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          We'll get back to you within 24 hours with a full quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {type === "print" && (
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-5">
            What do you need? <span className="text-primary">*</span>
          </h4>
          <div className="space-y-5">
            {PRINT_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <p className="text-sm font-semibold text-foreground mb-2.5">{cat.label}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => {
                    const active = selected.has(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggle(item)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {selected.size > 0 && (
            <p className="mt-3 text-xs text-primary font-semibold">
              {selected.size} product{selected.size > 1 ? "s" : ""} selected
            </p>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text" required value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email" required value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Phone / WhatsApp</label>
          <input
            type="tel" value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="+234 800 000 0000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">
            {type === "print" ? "Approximate Quantity" : "Project Dimensions / Scale"}
          </label>
          <input
            type="text" value={form.quantity}
            onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder={type === "print" ? "e.g. 500pcs tote bags" : "e.g. 3m × 2m backdrop"}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5">
          {type === "print" ? "Additional Details" : "Describe What You Need"}
          {type === "fabrication" && <span className="text-primary"> *</span>}
        </label>
        <textarea
          rows={4}
          required={type === "fabrication"}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          placeholder={
            type === "print"
              ? "Sizes, colours, design brief, delivery timeline…"
              : "Type of structure, materials preferred, intended use, deadline, location of installation…"
          }
        />
      </div>

      {errorMsg && <p className="text-sm text-destructive font-medium">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-semibold text-base h-14 px-10 hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : <>Request a Quote <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

/* ─── Pricing sheet lightbox ─────────────────────────────────────────── */
function PricingSheetGrid() {
  const [open, setOpen] = useState<(typeof PRICING_SHEETS)[0] | null>(null);
  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        {PRICING_SHEETS.map((sheet) => (
          <button
            key={sheet.src}
            onClick={() => setOpen(sheet)}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <div className="relative rounded-xl overflow-hidden border bg-muted aspect-[3/4]">
              <img
                src={sheet.src} alt={sheet.label}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs font-bold uppercase tracking-wide">{sheet.label}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-snug px-1">{sheet.desc}</p>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={open.src} alt={open.label} className="w-full rounded-2xl" />
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Fabrication gallery lightbox ──────────────────────────────────── */
function FabricationGallery() {
  const [open, setOpen] = useState<(typeof FABRICATION_GALLERY)[0] | null>(null);

  if (FABRICATION_GALLERY.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 py-20 text-center">
        <Hammer className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
        <p className="text-muted-foreground font-medium">Fabrication portfolio coming soon.</p>
        <p className="text-sm text-muted-foreground/60 mt-1">
          Photos of completed fabrication projects will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {FABRICATION_GALLERY.map((item, i) => (
          <button
            key={i}
            onClick={() => setOpen(item)}
            className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <div className="relative rounded-xl overflow-hidden border aspect-[4/3]">
              <img
                src={item.image} alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-bold">{item.title}</p>
              </div>
            </div>
            {item.description && (
              <p className="mt-1.5 text-xs text-muted-foreground px-1 leading-snug">{item.description}</p>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl bg-black overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={open.image} alt={open.title} className="w-full rounded-2xl" />
            <div className="p-6">
              <h3 className="text-white text-xl font-bold mb-1">{open.title}</h3>
              {open.description && <p className="text-white/70 text-sm">{open.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export function PrintsFabrications() {
  return (
    <Layout
      title="Print Agency & Brand Fabrications Nigeria | Brand Envoy Africa"
      description="Branded print production and custom fabrications across Nigeria. Bags, boxes, branded merch, food packaging, exhibition stands, signage, and custom builds. View current rates and request a quote online."
      canonical="/services/prints-fabrications"
      keywords={[
        "print agency Nigeria", "printing company Lagos", "branded merchandise Nigeria",
        "custom packaging Nigeria", "tote bags printing Lagos", "flex banners Nigeria",
        "customized boxes Lagos", "branded items Nigeria", "food packaging Nigeria",
        "courier bags printing Nigeria", "business cards Lagos", "branded mugs Nigeria",
        "fabrication agency Nigeria", "branded structures Nigeria", "exhibition stand Lagos",
        "point of sale display Nigeria", "backdrop fabrication Nigeria",
        "branded canopy Nigeria", "signage fabrication Lagos", "activation display Nigeria",
        "print and fabrication agency Lagos", "brand merchandise Nigeria",
        "branded packaging agency Nigeria", "custom print Lagos",
      ]}
      structuredData={[
        organizationSchema(),
        serviceSchema(
          "Prints & Brand Fabrications",
          "Branded print production and custom physical fabrications across Nigeria: bags, boxes, branded merchandise, food packaging, exhibition stands, signage, and bespoke brand structures.",
          "/services/prints-fabrications",
          ["Nigeria", "Ghana", "Kenya"]
        ),
      ]}
    >
      {/* ── Hero ── */}
      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-none">
            Prints &<br /> Fabrications.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-0">
            We produce the physical layer of your brand: printed packaging, branded merchandise, and custom-fabricated structures. If your customers are going to touch it, wear it, carry it, or stand in front of it, we make it.
          </p>
        </div>
      </section>

      {/* ── Two-column segment overview ── */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-2xl p-8">
              <Package className="h-8 w-8 text-primary mb-5" />
              <h2 className="text-2xl font-bold mb-3">Prints</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Branded packaging, bags, stationery, merch, and food packaging. Premium quality, fast production, and affordable rates, reviewed every quarter so you're always getting a market-fair price.
              </p>
            </div>
            <div className="bg-card border rounded-2xl p-8">
              <Hammer className="h-8 w-8 text-primary mb-5" />
              <h2 className="text-2xl font-bold mb-3">Fabrications</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Custom-built brand structures: exhibition stands, branded canopies, backdrops, activation displays, signage, and bespoke physical installations. We design, build, and deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prints: Pricing Sheets ── */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Prints</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Current Rate Sheets</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                Tap any sheet to read the full price list. Prices are in Nigerian Naira. Extra colour or back print attracts additional charges where noted.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-semibold whitespace-nowrap">
              <RefreshCw className="h-4 w-4" />
              Rates reviewed every 3 months
            </div>
          </div>

          <div className="mt-8">
            <PricingSheetGrid />
          </div>
        </div>
      </section>

      {/* ── Print Quote Form ── */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="border rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Print Quote
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-2">What do you need printed?</h2>
              <p className="text-muted-foreground max-w-xl">
                Select the items, add quantity and details, and we'll respond with a full quote within 24 hours.
              </p>
            </div>
            <QuoteForm type="print" />
          </div>
        </div>
      </section>

      {/* ── Fabrications: Gallery ── */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <Hammer className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Fabrications</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Some of Our Work</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Custom structures, branded displays, and activation builds we've delivered for clients across Nigeria. Every fabrication is built to spec, on time, and on brand.
          </p>
          <FabricationGallery />
        </div>
      </section>

      {/* ── Fabrication Quote Form ── */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="border rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Fabrication Quote
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Tell us what you need built.</h2>
              <p className="text-muted-foreground max-w-xl">
                Describe the structure, its dimensions, where it'll be used, and your timeline. We'll come back with a quote and a production plan.
              </p>
            </div>
            <QuoteForm type="fabrication" />
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="bg-primary text-primary-foreground p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need the full brand build?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Strategy, visual identity, campaigns, and everything printed or built. One agency.
            </p>
            <Link
              href="/talk-to-us"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold bg-white text-primary hover:bg-white/90 h-14 px-8 transition-colors"
            >
              Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
