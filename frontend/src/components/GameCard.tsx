import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Game } from '../backend';

interface GameCardProps {
  game: Game;
  onPlay: () => void;
}

const GAME_EMOJIS: Record<string, string> = {
  'pac-man': '👾',
  '2048': '🔢',
  tetris: '🟦',
  snake: '🐍',
  minesweeper: '💣',
  sudoku: '🔢',
  chess: '♟️',
};

function getGameEmoji(title: string): string {
  const key = title.toLowerCase();
  for (const [k, v] of Object.entries(GAME_EMOJIS)) {
    if (key.includes(k)) return v;
  }
  return '🎮';
}

export function GameCard({ game, onPlay }: GameCardProps) {
  const hasRealThumb = game.thumbnailUrl && !game.thumbnailUrl.includes('example.com');
  const emoji = getGameEmoji(game.title);

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-neon-green/40 hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative w-full h-44 bg-gradient-to-br from-neon-green/5 to-background overflow-hidden">
        {hasRealThumb ? (
          <img
            src={game.thumbnailUrl}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <img
              src="/assets/generated/game-thumb-default.dim_400x240.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <span className="relative text-5xl">{emoji}</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
            <div className="w-14 h-14 rounded-full bg-neon-green/90 flex items-center justify-center shadow-lg shadow-neon-green/40">
              <Play className="w-6 h-6 text-background fill-background ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-base mb-1 truncate">{game.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{game.description}</p>
        <Button
          onClick={onPlay}
          className="w-full h-9 rounded-xl bg-neon-green/15 border border-neon-green/30 text-neon-green font-semibold text-sm hover:bg-neon-green/25 hover:border-neon-green/50 hover:shadow-md hover:shadow-neon-green/20 transition-all"
          variant="ghost"
        >
          <Play className="w-3.5 h-3.5 mr-1.5 fill-neon-green" />
          Play Now
        </Button>
      </div>
    </div>
  );
}
