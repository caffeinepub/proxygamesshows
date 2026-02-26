import { useEffect } from 'react';
import { X, ExternalLink, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LiveTVEntry } from './LiveTVCard';

interface LiveTVPlayerProps {
  channel: LiveTVEntry;
  onClose: () => void;
}

export function LiveTVPlayer({ channel, onClose }: LiveTVPlayerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-5xl bg-card border-2 border-neon-blue/40 rounded-3xl overflow-hidden shadow-2xl shadow-neon-blue/20">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-card border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center flex-shrink-0">
            <Radio className="w-4 h-4 text-neon-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-foreground text-base truncate font-display">{channel.name}</h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-blue/20 border border-neon-blue/40 text-neon-blue text-xs font-bold flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{channel.category}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/10"
            >
              <a href={channel.embedUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Player */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={channel.embedUrl}
            title={channel.name}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
