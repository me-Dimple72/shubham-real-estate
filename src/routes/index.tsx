import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bath, BedDouble, MapPin, Maximize, Search, Star, Phone, Mail } from "lucide-react";
import hero from "@/assets/hero.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shubham Estate — Luxury Real Estate" },
      { name: "description", content: "Discover curated luxury properties with Shubham Estate. Villas, penthouses and coastal homes, handpicked by expert advisors." },
      { property: "og:title", content: "Shubham Estate — Luxury Real Estate" },
      { property: "og:description", content: "Curated luxury villas, penthouses and coastal homes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Property = { img: string; title: string; place: string; price: string;  area: string; type: string };
const properties: Property[] = [
  { img: hero, title: "The Grand Kothi", place: "Sector-14, Hisar", price: "", area: "5400 sq ft", type: "Premium Residence" },
  { img: p2, title: "Skyline Penthouse", place: "Hisar", price: "",  area: "6,200 sq ft", type: "Penthouse" },
  { img: p3, title: "Garden Villa", place: "Sector 9-11", price: "",  area: "3,600 sq ft", type: "Villa" },
  { img: p1, title: "Green Farm", place: "Bagla Road, Hisar", price: "",  area: "11000 sq ft", type: "Farmland" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1800, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

function Index() {
  useReveal();
  const [filter, setFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const list = filter === "All" ? properties : properties.filter((p) => p.type === filter);

  return (
    <div className="overflow-x-hidden">
      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 py-3 text-foreground shadow-soft backdrop-blur" : "py-6 text-ink-foreground"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-display text-5xl tracking-wide">Shubham Estate

</a>
          <nav className="hidden gap-10 text-sm md:flex">
            {["Properties", "Services", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="group relative">
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href="#contact" className="border border-current px-5 py-2 text-sm transition hover:bg-brass hover:text-accent-foreground hover:border-brass">Book a visit</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden text-ink-foreground">
        <img src={hero} alt="Luxury villa with infinity pool at sunset" width={1920} height={1088} className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24">
    
          <h1 className="animate-rise max-w-4xl text-6xl leading-[0.95] md:text-8xl" style={{ animationDelay: ".15s" }}>
            Homes that <em className="text-brass">feel</em> like arrival.
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-lg opacity-80" style={{ animationDelay: ".3s" }}>
            Premium residences, agricultural & farmland, commercial properties and private client advisory across the city.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); document.getElementById("properties")?.scrollIntoView(); }} className="animate-rise mt-10 grid max-w-3xl grid-cols-1 gap-px bg-border/30 text-foreground md:grid-cols-[1fr_1fr_1fr_auto]" style={{ animationDelay: ".45s" }}>
            {[["Location", "Sec-14, Bagla Road…"], ["Type", "Villa, Penthouse"], ["Budget", "₹Cr"]].map(([l, ph]) => (
              <label key={l} className="bg-background px-5 py-4">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">{l}</span>
                <input placeholder={ph} className="w-full bg-transparent text-sm outline-none" />
              </label>
            ))}
            <button className="flex items-center justify-center gap-2 bg-brass px-8 py-4 text-sm font-medium text-accent-foreground transition hover:brightness-110">
              <Search className="h-4 w-4" /> Search
            </button>
          </form>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y bg-ink py-5 text-ink-foreground">
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap font-display text-2xl italic">
          {Array(2).fill(["Sector 14", "Sector 33", "Sector 9-11", "Bagla Road", "Model Town", "Sector 1-4", "Sirsa Road", "Sector 16-17"]).flat().map((c, i) => (
            <span key={i} className="flex items-center gap-16">{c}<span className="text-brass">✦</span></span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section id="about" className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2">
        <div className="reveal">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-brass">About us</p>
          <h2 className="text-5xl leading-tight md:text-6xl">Two decades of placing families in extraordinary homes.</h2>
        </div>
        <div className="reveal space-y-10">
          <p className="text-lg text-muted-foreground">We work closely with every client, matching them with the right properties that rarely reach the open market. Every listing is personally inspected by our advisors.</p>
          <div className="grid grid-cols-3 gap-6 border-t pt-10">
            {[ [25, "+", "Years"], [100, "%", "Client return"]].map(([v, s, l]) => (
              <div key={l as string}>
                <div className="font-display text-5xl text-primary"><Counter to={v as number} suffix={s as string} /></div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties */}
      <section id="properties" className="bg-secondary py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-brass">Featured listings</p>
              <h2 className="text-5xl md:text-6xl">Selected residences</h2>
            </div>
            <div className="flex gap-2">
              {["All", "Premium Residence", "Farmland", "Villa"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`border px-4 py-2 text-sm transition ${filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {list.map((p, i) => (
              <article key={p.title} className="group animate-rise bg-card shadow-soft" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-110" />
                  <span className="absolute left-4 top-4 bg-background px-3 py-1 text-[10px] uppercase tracking-widest">{p.type}</span>
                  <span className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-brass text-accent-foreground opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight /></span>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl">{p.title}</h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.place}</p>
                    </div>
                    <p className="font-display text-2xl text-primary">{p.price}</p>
                  </div>
                  <div className="mt-6 flex gap-6 border-t pt-5 text-sm text-muted-foreground">
                    
                    <span className="flex items-center gap-2"><Maximize className="h-4 w-4" />{p.area}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-28">
        <div className="reveal mb-16 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-brass">Services</p>
          <h2 className="text-5xl md:text-6xl">Everything, handled.</h2>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {[
            ["01", "Buying", "Off-market access, due diligence and negotiation on your behalf. We shortlist the right homes, land or shops in Hisar, check every document, arrange site visits and secure the best price for you."],
            ["02", "Selling", "Private viewings and a vetted buyer network.We price your property right, present it beautifully and handle every enquiry until the deal is closed."],
            ["03", "Advisory", "Valuations, legal coordination and long-term portfolio guidance.From registry and paperwork to investment advice on farmland and commercial property, we guide you at every step."],
          ].map(([n, t, d], i) => (
            <div key={n} className="reveal group bg-background p-10 transition-colors duration-500 hover:bg-ink hover:text-ink-foreground" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="font-display text-brass text-xl">{n}</span>
              <h3 className="mt-10 text-4xl">{t}</h3>
              <p className="mt-4 text-muted-foreground transition group-hover:text-ink-foreground/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-ink py-32 text-ink-foreground">
        <div className="reveal mx-auto max-w-4xl px-6 text-center">
          <div className="mb-8 flex justify-center gap-1 text-brass">{Array(5).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
          <blockquote className="font-display text-4xl italic leading-snug md:text-5xl">“They found us a home we didn't know existed — and made the whole process feel effortless.”</blockquote>
          <p className="mt-8 text-sm uppercase tracking-widest opacity-60">Raghav Agarwal · Hisar</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2">
        <div className="reveal">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-brass">Contact</p>
          <h2 className="text-5xl md:text-6xl">Schedule a private viewing.</h2>
          <div className="mt-10 space-y-4 text-xl text-foreground">
            <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-brass" />+91 99963-60695, +91 80535-91515</p>
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-brass" />shubhamestater@gmail.com</p>
            <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brass" />#291, Pocket-A, Sector 14, Hisar</p>
          </div>
        </div>


        <form
  onSubmit={(e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text =
      `New enquiry from website\n` +
      `Name: ${d.get("Full name")}\n` +
      `Email: ${d.get("Email")}\n` +
      `Phone: ${d.get("Phone")}\n` +
      `Message: ${d.get("message") || "-"}`;
    window.open(`https://wa.me/918053591515?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }}
  className="reveal space-y-6"
>
  {["Full name", "Email", "Phone"].map((f) => (
    <input key={f} name={f} required placeholder={f} className="w-full border-b bg-transparent py-3 outline-none transition focus:border-brass" />
  ))}
  <textarea name="message" placeholder="Tell us what you're looking for" rows={4} className="w-full border-b bg-transparent py-3 outline-none transition focus:border-brass" />
  <button className="bg-primary px-10 py-4 text-sm text-primary-foreground transition hover:bg-brass hover:text-accent-foreground">
    {sent ? "Thank you — we'll be in touch" : "Send enquiry"}
  </button>
</form>


      </section>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 text-sm text-muted-foreground">
          <span className="font-display text-xl text-foreground">Shubham Estate<span className="text-brass">.</span></span>
          <span>© 2026 Shubham Estate. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
