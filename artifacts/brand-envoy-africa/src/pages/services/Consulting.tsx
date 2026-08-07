import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { useState } from "react";
import { Clock, Calendar, Video, MessageSquare, Mail, Monitor, Check, ArrowRight, Info } from "lucide-react";
import { serviceSchema, organizationSchema } from "@/lib/seo";

type Band = "morning" | "evening";
type Day = 0 | 1 | 2; // Mon=0, Tue=1, Wed=2

const DAY_LABELS = ["Monday", "Tuesday", "Wednesday"];
const DAY_SHORT = ["Mon", "Tue", "Wed"];

const MEETING_MODES = [
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "email", label: "Email", icon: Mail },
  { id: "google-meet", label: "Google Meet", icon: Video },
  { id: "zoom", label: "Zoom", icon: Monitor },
  { id: "teams", label: "Microsoft Teams", icon: Monitor },
];

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  topic: string;
  involvement: string;
  hours: number;
  meetingMode: string;
  day: Day | null;
  band: Band | null;
}

const EMPTY_FORM: BookingForm = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  involvement: "",
  hours: 1,
  meetingMode: "",
  day: null,
  band: null,
};

const CONSULTING_SCHEMAS = [
  organizationSchema(),
  serviceSchema(
    "Strategy Consulting",
    "Hourly strategy consulting sessions with Brand Envoy Africa: brand positioning, market entry, campaign strategy, and more.",
    "/services/consulting",
    ["Nigeria", "Ghana", "Kenya", "South Africa"]
  ),
];

export function Consulting() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof BookingForm, value: BookingForm[keyof BookingForm]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const step1Complete = form.day !== null && form.band !== null;
  const step2Complete =
    form.name.trim() &&
    form.email.trim() &&
    form.topic.trim() &&
    form.involvement.trim() &&
    form.hours >= 1 &&
    form.meetingMode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment step placeholder — in production this triggers Paystack
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout
        title="Consulting Request Received | Brand Envoy Africa"
        description="Your strategy consulting request with Brand Envoy Africa has been received. A payment link will be sent to confirm your slot."
        canonical="/services/consulting"
      >
        <section className="py-24 min-h-[70vh] flex items-center justify-center bg-background">
          <div className="text-center max-w-xl px-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Request Received.</h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Your consulting request for{" "}
              <strong>{form.hours} hour{form.hours > 1 ? "s" : ""}</strong> on{" "}
              <strong>{DAY_LABELS[form.day!]}</strong>, {form.band === "morning" ? "8:00 to 9:00 AM WAT" : "7:00 to 11:00 PM WAT"} has been received.
            </p>
            <p className="text-muted-foreground mb-10">
              We'll send a payment link to <strong>{form.email}</strong> within 2 hours to confirm the slot. Your session is held pending payment.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      title="Strategy Consulting Sessions | Brand Envoy Africa"
      description="Book an hourly strategy consulting session with Brand Envoy Africa. Direct access to senior strategic thinking: brand positioning, market entry, campaign strategy, and more."
      canonical="/services/consulting"
      keywords={[
        "strategy consulting Nigeria", "brand consulting Africa", "marketing consultant Lagos",
        "brand strategy consultant Nigeria", "business consulting Africa",
        "market entry consulting Nigeria", "brand consultant Lagos",
        "marketing strategy session Nigeria", "hourly consulting Africa",
        "strategic consulting Nigeria", "brand advisor Africa",
        "marketing consulting Ghana", "brand strategy Kenya",
        "campaign strategy consultant Nigeria", "consulting agency Lagos",
        "African market consultant", "brand positioning consultant Nigeria",
        "strategic advisor Africa", "consulting session Africa", "Brand Envoy Africa consulting",
      ]}
      structuredData={CONSULTING_SCHEMAS}
    >
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">

          {/* Header */}
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Consulting.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">
            Direct access to Brand Envoy's strategic thinking, billed by the hour. You come with a challenge; we come with a framework and a plan.
          </p>

          {/* Availability notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex gap-4 items-start mb-12">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Availability:</span> Monday, Tuesday, and Wednesday only. Two time bands:{" "}
              <span className="font-medium text-foreground">8:00 to 9:00 AM WAT</span> (early bird) and{" "}
              <span className="font-medium text-foreground">7:00 to 11:00 PM WAT</span> (international-friendly evening). Slots are confirmed only after payment clears.
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step === n
                      ? "bg-primary text-primary-foreground"
                      : step > n
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > n ? <Check className="h-4 w-4" /> : n}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === n ? "text-foreground" : "text-muted-foreground"}`}>
                  {n === 1 ? "Choose a slot" : n === 2 ? "Your details" : "Payment"}
                </span>
                {n < 3 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Step 1 — Slot selection */}
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Pick a day and time band.</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {DAY_LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => set("day", i as Day)}
                    className={`rounded-xl border-2 p-6 text-left transition-all ${
                      form.day === i
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-bold text-sm uppercase tracking-wider">{DAY_SHORT[i]}</span>
                    </div>
                    <div className="text-lg font-semibold">{label}</div>
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => set("band", "morning")}
                  className={`rounded-xl border-2 p-6 text-left transition-all ${
                    form.band === "morning"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-bold">Morning</span>
                  </div>
                  <div className="text-2xl font-black mb-1">8:00 to 9:00 AM</div>
                  <div className="text-sm text-muted-foreground">West Africa Time (WAT / UTC+1)</div>
                </button>
                <button
                  onClick={() => set("band", "evening")}
                  className={`rounded-xl border-2 p-6 text-left transition-all ${
                    form.band === "evening"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-bold">Evening</span>
                  </div>
                  <div className="text-2xl font-black mb-1">7:00 to 11:00 PM</div>
                  <div className="text-sm text-muted-foreground">West Africa Time, international-friendly</div>
                </button>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={!step1Complete}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next: Your Details <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Details form */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-8">
              <div className="bg-muted/50 rounded-xl px-5 py-4 flex flex-wrap gap-4 text-sm">
                <span className="font-semibold">{DAY_LABELS[form.day!]}</span>
                <span className="text-muted-foreground">·</span>
                <span>{form.band === "morning" ? "8:00 to 9:00 AM WAT" : "7:00 to 11:00 PM WAT"}</span>
                <button type="button" onClick={() => setStep(1)} className="ml-auto text-primary text-xs font-semibold hover:underline">
                  Change slot
                </button>
              </div>

              <h2 className="text-2xl font-bold">Tell us about the session.</h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email address *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone / WhatsApp</label>
                  <input
                    type="tel" value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Hours needed *</label>
                  <input
                    type="number" required min={1} max={4} value={form.hours}
                    onChange={(e) => set("hours", parseInt(e.target.value) || 1)}
                    className="w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Max 4 hours per session. Evening band max 4 hrs.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">What do you want to be consulted on? *</label>
                <textarea
                  required value={form.topic}
                  onChange={(e) => set("topic", e.target.value)}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Describe the challenge, opportunity, or decision you need strategic input on. The more specific, the more useful the session."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">How do you want to be involved in the session? *</label>
                <textarea
                  required value={form.involvement}
                  onChange={(e) => set("involvement", e.target.value)}
                  rows={3}
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="E.g. I want to listen and take notes / I want to co-develop the strategy / I'll have my team present / etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Preferred meeting mode *</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {MEETING_MODES.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id} type="button"
                        onClick={() => set("meetingMode", m.id)}
                        className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
                          form.meetingMode === m.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/40 text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={!step2Complete}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next: Payment <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3 — Payment (Paystack placeholder) */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-muted/50 rounded-xl px-5 py-4 flex flex-wrap gap-4 text-sm">
                <span className="font-semibold">{DAY_LABELS[form.day!]}</span>
                <span className="text-muted-foreground">·</span>
                <span>{form.band === "morning" ? "8:00 to 9:00 AM WAT" : "7:00 to 11:00 PM WAT"}</span>
                <span className="text-muted-foreground">·</span>
                <span>{form.hours} hour{form.hours > 1 ? "s" : ""}</span>
                <span className="text-muted-foreground">·</span>
                <span className="capitalize">{MEETING_MODES.find(m => m.id === form.meetingMode)?.label}</span>
              </div>

              <h2 className="text-2xl font-bold">Confirm and Pay.</h2>

              <div className="bg-card border rounded-2xl p-8 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <div className="font-bold text-lg">Strategy Consulting Session</div>
                    <div className="text-muted-foreground text-sm">{form.hours} hour{form.hours > 1 ? "s" : ""} · {DAY_LABELS[form.day!]}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Rate set by Brand Envoy Africa</div>
                    <div className="text-2xl font-black text-primary">TBD</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
                  <div className="font-semibold mb-1">Payment gateway pending configuration</div>
                  <p>
                    Paystack integration is ready to connect once consulting rates are confirmed. Submit your request now and we'll send a Paystack payment link to{" "}
                    <strong>{form.email}</strong> within 2 hours. Your slot is held for 24 hours pending payment.
                  </p>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Slot is not confirmed until payment clears
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Full refund if we need to reschedule on our end
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    Session notes and agreed actions sent to you within 24 hours after the call
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Submit Request <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
