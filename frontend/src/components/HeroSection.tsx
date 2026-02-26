import { Globe, Gamepad2, Tv, ChevronDown } from 'lucide-react';

const ctaButtons = [
  { label: 'Web Proxy', href: '#proxy', icon: Globe, color: 'cyan' },
  { label: 'Games', href: '#games', icon: Gamepad2, color: 'green' },
  { label: 'Shows', href: '#shows', icon: Tv, color: 'purple' },
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
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-green/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-neon-purple/8 rounded-full blur-3xl pointer-events-none" />

      {/* Hero banner image */}
      <div className="absolute inset-0 opacity-15">
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
          <div className="w-20 h-20 rounded-2xl bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center shadow-lg shadow-neon-cyan/20">
            <img
              src="/assets/generated/nexhub-logo.dim_128x128.png"
              alt="NexHub Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-4">
          <span className="text-foreground">Nex</span>
          <span className="text-neon-cyan drop-shadow-[0_0_20px_oklch(0.85_0.2_195)]">Hub</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-3 font-medium">
          Browse freely. Play games. Watch shows.
        </p>
        <p className="text-sm text-muted-foreground/60 mb-10 max-w-md mx-auto">
          Your all-in-one entertainment portal — access the web, play browser games, and stream your favorite shows.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {ctaButtons.map(({ label, href, icon: Icon, color }) => (
            <button
              key={href}
              onClick={() => handleScroll(href)}
              className={`group flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                color === 'cyan'
                  ? 'bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/25 hover:border-neon-cyan/60 hover:shadow-lg hover:shadow-neon-cyan/20'
                  : color === 'green'
                  ? 'bg-neon-green/10 border-neon-green/30 text-neon-green hover:bg-neon-green/20 hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/20'
                  : 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 hover:border-neon-purple/50 hover:shadow-lg hover:shadow-neon-purple/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('#proxy')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-neon-cyan transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
