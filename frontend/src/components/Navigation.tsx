import { useState, useEffect } from 'react';
import { Globe, Gamepad2, Tv, Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Proxy', href: '#proxy', icon: Globe },
  { label: 'Games', href: '#games', icon: Gamepad2 },
  { label: 'Shows', href: '#shows', icon: Tv },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['proxy', 'games', 'shows'];
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-nav-bg/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-neon-cyan/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-colors">
              <Zap className="w-4 h-4 text-neon-cyan" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">
              Nex<span className="text-neon-cyan">Hub</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-nav-bg/98 backdrop-blur-md border-b border-neon-cyan/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
