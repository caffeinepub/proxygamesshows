import { Globe, Gamepad2, Tv, ChevronDown, Smartphone, Lock, Music, Radio } from 'lucide-react';

const ctaButtons = [
  { label: 'Games', href: '#games', icon: Gamepad2 },
  { label: 'Movies & TV', href: '#shows', icon: Tv },
  { label: 'Proxy', href: '#proxy', icon: Globe },
  { label: 'Music', href: '#music', icon: Music },
  { label: 'Apps', href: '#apps', icon: Smartphone },
  { label: 'Hacks', href: '#hacks', icon: Lock },
  { label: 'Live TV', href: '#livetv', icon: Radio },
];

export function HeroSection() {
  const handleScroll = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero banner image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-lg shadow-neon-blue/25">
            <img
              src="/assets/generated/nexhub-logo.dim_128x128.png"
              alt="zakariasadeq7site123 Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            Games · Shows · Proxy · Music · Apps · Hacks · Live TV
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-4 font-display leading-none">
          <span className="text-foreground">zakariasadeq7</span>
          <br />
          <span className="text-neon-blue neon-text-blue">site123</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-3 font-semibold">
          Browse freely. Play games. Watch shows. Stream music.
        </p>
        <p className="text-sm text-muted-foreground/60 mb-10 max-w-md mx-auto">
          Your all-in-one entertainment portal — play unblocked games, stream shows, access social apps, listen to music, and watch live TV.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ctaButtons.map(({ label, href, icon: Icon }) => (
            <button
              key={href}
              onClick={() => handleScroll(href)}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 border-2 bg-neon-blue/15 border-neon-blue/50 text-neon-blue hover:bg-neon-blue/25 hover:border-neon-blue hover:shadow-xl hover:shadow-neon-blue/30 hover:-translate-y-0.5"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('#games')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-neon-blue transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
