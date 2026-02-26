import { useState, useEffect } from 'react';
import { Globe, Gamepad2, Tv, Zap, Menu, X, Smartphone, Lock, Music, Radio } from 'lucide-react';

const navLinks = [
  { label: 'Games', href: '#games', icon: Gamepad2 },
  { label: 'Movies & TV', href: '#shows', icon: Tv },
  { label: 'Proxy', href: '#proxy', icon: Globe },
  { label: 'Music', href: '#music', icon: Music },
  { label: 'Apps', href: '#apps', icon: Smartphone },
  { label: 'Hacks', href: '#hacks', icon: Lock },
  { label: 'Live TV', href: '#livetv', icon: Radio },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['games', 'shows', 'proxy', 'music', 'apps', 'hacks', 'livetv'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getActiveStyle = (href: string) => {
    const id = href.replace('#', '');
    const isActive = activeSection === id;
    if (!isActive) return 'text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/8 border border-transparent';
    return 'bg-neon-blue/15 text-neon-blue border border-neon-blue/40 shadow-sm shadow-neon-blue/20';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-nav-bg/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-neon-blue/15'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-neon-blue/20 border border-neon-blue/50 flex items-center justify-center group-hover:bg-neon-blue/30 group-hover:shadow-md group-hover:shadow-neon-blue/30 transition-all">
              <Zap className="w-4 h-4 text-neon-blue" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground font-display">
              zakariasadeq7<span className="text-neon-blue neon-text-blue">site123</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${getActiveStyle(href)}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/10 transition-colors border border-transparent hover:border-neon-blue/30"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-nav-bg/98 backdrop-blur-md border-b border-neon-blue/15">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${getActiveStyle(href)}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
