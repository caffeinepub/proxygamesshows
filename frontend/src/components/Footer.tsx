import { Zap, Heart } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'nexhub');

  return (
    <footer className="border-t border-border bg-card/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-neon-cyan" />
            </div>
            <span className="font-black text-lg text-foreground">
              Nex<span className="text-neon-cyan">Hub</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#proxy" className="hover:text-neon-cyan transition-colors">Proxy</a>
            <a href="#games" className="hover:text-neon-green transition-colors">Games</a>
            <a href="#shows" className="hover:text-neon-purple transition-colors">Shows</a>
          </nav>

          {/* Attribution */}
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-neon-cyan fill-neon-cyan" />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground/50">
          © {year} NexHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
