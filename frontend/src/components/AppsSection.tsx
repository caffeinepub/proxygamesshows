import { useState, useRef } from 'react';
import { Smartphone, RefreshCw, X, AlertCircle } from 'lucide-react';
import { AppCard, type AppEntry } from './AppCard';
import { Button } from '@/components/ui/button';

const APPS: AppEntry[] = [
  { name: 'TikTok', emoji: '🎵', url: 'https://www.tiktok.com', color: 'pink', description: 'Short-form video platform. Discover trending videos, music, and creators.' },
  { name: 'Snapchat', emoji: '👻', url: 'https://web.snapchat.com', color: 'yellow', description: 'Send snaps, chat with friends, and explore Stories on the web.' },
  { name: 'Instagram', emoji: '📸', url: 'https://www.instagram.com', color: 'purple', description: 'Share photos and videos, follow friends, and explore trending content.' },
  { name: 'YouTube', emoji: '▶️', url: 'https://www.youtube.com', color: 'orange', description: 'Watch videos, music, live streams, and more from creators worldwide.' },
  { name: 'Discord', emoji: '💬', url: 'https://discord.com/app', color: 'purple', description: 'Chat, voice, and video with your friends and communities.' },
  { name: 'Twitter / X', emoji: '🐦', url: 'https://x.com', color: 'cyan', description: 'Follow news, trends, and conversations happening right now.' },
  { name: 'Reddit', emoji: '🤖', url: 'https://www.reddit.com', color: 'orange', description: 'Explore communities, memes, news, and discussions on any topic.' },
  { name: 'Spotify', emoji: '🎧', url: 'https://open.spotify.com', color: 'green', description: 'Stream millions of songs, podcasts, and playlists.' },
];

export function AppsSection() {
  const [activeApp, setActiveApp] = useState<AppEntry | null>(null);
  const [iframeError, setIframeError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleOpenApp = (app: AppEntry) => {
    setActiveApp(app);
    setIframeError(false);
  };

  const handleRefresh = () => {
    if (!iframeRef.current || !activeApp) return;
    setIsRefreshing(true);
    setIframeError(false);
    iframeRef.current.src = activeApp.url;
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleClose = () => {
    setActiveApp(null);
    setIframeError(false);
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Smartphone className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 05
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          📱 <span className="text-neon-blue neon-text-blue">Apps</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Access your favorite social apps and tools directly in the browser — no installs needed.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {APPS.map((app) => (
          <AppCard key={app.name} app={app} onOpen={() => handleOpenApp(app)} />
        ))}
      </div>

      {/* Inline App Viewer */}
      {activeApp && (
        <div className="mt-8 rounded-3xl overflow-hidden border-2 border-neon-blue/40 shadow-2xl shadow-neon-blue/15">
          {/* Browser Chrome */}
          <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-neon-yellow/60" />
              <div className="w-3 h-3 rounded-full bg-neon-blue/60" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-background/60 rounded-xl px-3 py-1.5 border border-border text-sm text-muted-foreground">
              <span className="text-base">{activeApp.emoji}</span>
              <span className="truncate">{activeApp.url}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/10"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* iframe */}
          <div className="relative w-full h-[600px] bg-background">
            {iframeError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
                <AlertCircle className="w-12 h-12 text-neon-blue/50" />
                <div>
                  <p className="font-bold text-foreground mb-1">Unable to load {activeApp.name}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    This app blocks embedding. Open it directly in a new tab instead.
                  </p>
                  <a
                    href={activeApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-blue/15 border border-neon-blue/40 text-neon-blue text-sm font-bold hover:bg-neon-blue/25 transition-colors"
                  >
                    Open {activeApp.name} in New Tab
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={activeApp.url}
                title={activeApp.name}
                className="w-full h-full border-0"
                onError={() => setIframeError(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
