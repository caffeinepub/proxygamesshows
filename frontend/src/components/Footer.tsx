import { Zap, Heart } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'zakariasadeq7site123');

  return (
    <footer className="border-t border-border bg-card/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neon-blue/15 border border-neon-blue/30 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-neon-blue" />
            </div>
            <span className="font-black text-lg text-foreground">
              zakariasadeq7<span className="text-neon-blue">site123</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href="#games" className="hover:text-neon-blue transition-colors">Games</a>
            <a href="#shows" className="hover:text-neon-blue transition-colors">Movies & TV</a>
            <a href="#proxy" className="hover:text-neon-blue transition-colors">Proxy</a>
            <a href="#music" className="hover:text-neon-blue transition-colors">Music</a>
            <a href="#apps" className="hover:text-neon-blue transition-colors">Apps</a>
            <a href="#hacks" className="hover:text-neon-blue transition-colors">Hacks</a>
            <a href="#livetv" className="hover:text-neon-blue transition-colors">Live TV</a>
          </nav>

          {/* Attribution */}
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-neon-blue fill-neon-blue" />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground/50">
          © {year} zakariasadeq7site123. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
