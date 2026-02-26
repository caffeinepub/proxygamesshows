import { useEffect } from 'react';
import { X, Maximize2, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Game } from '../backend';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

export function GamePlayer({ game, onClose }: GamePlayerProps) {
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
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neon-green/20 bg-background/80">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neon-green/15 border border-neon-green/30 flex items-center justify-center">
            <Gamepad2 className="w-3.5 h-3.5 text-neon-green" />
          </div>
          <span className="font-bold text-foreground">{game.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(game.embedUrl, '_blank')}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-neon-green hover:bg-neon-green/10"
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

      {/* Game iframe */}
      <div className="flex-1 relative">
        <iframe
          src={game.embedUrl}
          className="w-full h-full border-0"
          title={game.title}
          allow="fullscreen; autoplay"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
