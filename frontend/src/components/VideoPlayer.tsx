import { useEffect } from 'react';
import { X, Maximize2, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Show } from '../backend';

interface VideoPlayerProps {
  show: Show;
  onClose: () => void;
}

export function VideoPlayer({ show, onClose }: VideoPlayerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neon-purple/20 bg-background/80">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neon-purple/15 border border-neon-purple/30 flex items-center justify-center">
            <Tv className="w-3.5 h-3.5 text-neon-purple" />
          </div>
          <span className="font-bold text-foreground">{show.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(show.embedUrl, '_blank')}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-neon-purple hover:bg-neon-purple/10"
            title="Open in new tab"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Video iframe */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-neon-purple/20 shadow-2xl shadow-neon-purple/10">
          <iframe
            src={show.embedUrl}
            className="w-full h-full border-0"
            title={show.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Description */}
      {show.description && (
        <div className="px-4 sm:px-8 pb-4 text-center">
          <p className="text-muted-foreground text-sm">{show.description}</p>
        </div>
      )}
    </div>
  );
}
