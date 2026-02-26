import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { useGetAllGames } from '@/hooks/useQueries';
import { GameCard } from './GameCard';
import { GamePlayer } from './GamePlayer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Game } from '../backend';

// Fallback unblocked/proxy-style games inspired by Hypcal/Totally Science
const FALLBACK_GAMES: Game[] = [
  {
    title: 'Slope',
    description: 'Roll your ball down a steep slope while avoiding obstacles in this fast-paced 3D game.',
    embedUrl: 'https://slope-game.github.io/',
    thumbnailUrl: '',
  },
  {
    title: 'Cookie Clicker',
    description: 'Addictive incremental game where you bake cookies and expand your cookie empire.',
    embedUrl: 'https://orteil.dashnet.org/cookieclicker/',
    thumbnailUrl: '',
  },
  {
    title: 'Run 3',
    description: 'Navigate your character through a series of tunnels in this endless runner platformer.',
    embedUrl: 'https://www.coolmathgames.com/0-run-3/play',
    thumbnailUrl: '',
  },
  {
    title: '1v1.LOL',
    description: 'Battle it out in this third-person shooter and building game inspired by Fortnite.',
    embedUrl: 'https://1v1.lol/',
    thumbnailUrl: '',
  },
  {
    title: 'Retro Bowl',
    description: 'Manage your football team and compete in retro-style American football matches.',
    embedUrl: 'https://retrobowl.me/',
    thumbnailUrl: '',
  },
  {
    title: 'Drift Hunters',
    description: 'Customize your car and drift through challenging tracks in this realistic driving simulator.',
    embedUrl: 'https://drifthunters.io/',
    thumbnailUrl: '',
  },
  {
    title: 'Moto X3M',
    description: 'Race through insane obstacle courses on your motorbike in this thrilling stunt game.',
    embedUrl: 'https://www.coolmathgames.com/0-moto-x3m/play',
    thumbnailUrl: '',
  },
  {
    title: 'Subway Surfers',
    description: 'Dash through the subway, dodge trains, and collect coins in this endless runner.',
    embedUrl: 'https://poki.com/en/g/subway-surfers',
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
          Unblocked Browser Games
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Play the best unblocked games — Slope, Run 3, Cookie Clicker, and more. No downloads, no login required.
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
