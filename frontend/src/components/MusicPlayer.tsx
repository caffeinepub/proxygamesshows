import { useEffect } from 'react';
import { X, ExternalLink, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MusicEntry } from './MusicCard';

interface MusicPlayerProps {
  station: MusicEntry;
  onClose: () => void;
}

export function MusicPlayer({ station, onClose }: MusicPlayerProps) {
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
      <div className="w-full max-w-4xl bg-card border-2 border-neon-blue/40 rounded-3xl overflow-hidden shadow-2xl shadow-neon-blue/20">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-card border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center flex-shrink-0">
            <Music className="w-4 h-4 text-neon-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-foreground text-base truncate font-display">{station.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{station.genre}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/10"
            >
              <a href={station.embedUrl} target="_blank" rel="noopener noreferrer">
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
            src={station.embedUrl}
            title={station.name}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
