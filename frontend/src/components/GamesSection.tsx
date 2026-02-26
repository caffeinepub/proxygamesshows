import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { useGetAllGames } from '@/hooks/useQueries';
import { GameCard } from './GameCard';
import { GamePlayer } from './GamePlayer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Game } from '../backend';

// Fallback games with real public embed URLs
const FALLBACK_GAMES: Game[] = [
  {
    title: 'Pac-Man',
    description: 'Classic arcade maze game',
    embedUrl: 'https://freepacman.org/',
    thumbnailUrl: '',
  },
  {
    title: '2048',
    description: 'Slide tiles to reach 2048',
    embedUrl: 'https://play2048.co/',
    thumbnailUrl: '',
  },
  {
    title: 'Tetris',
    description: 'Classic block stacking puzzle',
    embedUrl: 'https://tetris.com/play-tetris',
    thumbnailUrl: '',
  },
  {
    title: 'Snake',
    description: 'Classic snake game',
    embedUrl: 'https://playsnake.org/',
    thumbnailUrl: '',
  },
  {
    title: 'Minesweeper',
    description: 'Classic mine-finding puzzle',
    embedUrl: 'https://minesweeper.online/',
    thumbnailUrl: '',
  },
  {
    title: 'Sudoku',
    description: 'Number placement puzzle',
    embedUrl: 'https://sudoku.com/',
    thumbnailUrl: '',
  },
];

export function GamesSection() {
  const { data: backendGames, isLoading } = useGetAllGames();
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  // Merge backend games with fallback, deduplicate by title
  const backendValid = (backendGames ?? []).filter(
    (g) => g.embedUrl && !g.embedUrl.includes('example.com')
  );
  const fallbackFiltered = FALLBACK_GAMES.filter(
    (f) => !backendValid.some((b) => b.title.toLowerCase() === f.title.toLowerCase())
  );
  const games = [...backendValid, ...fallbackFiltered];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-neon-green/15 border border-neon-green/30 flex items-center justify-center">
            <Gamepad2 className="w-4 h-4 text-neon-green" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-neon-green">Games</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
          Play Browser Games
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Jump into classic and modern browser games — no downloads, no login required.
        </p>
      </div>

      {/* Games Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
              <Skeleton className="w-full h-44" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-9 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((game, idx) => (
            <GameCard
              key={`${game.title}-${idx}`}
              game={game}
              onPlay={() => setActiveGame(game)}
            />
          ))}
        </div>
      )}

      {/* Game Player Modal */}
      {activeGame && (
        <GamePlayer
          game={activeGame}
          onClose={() => setActiveGame(null)}
        />
      )}
    </div>
  );
}
