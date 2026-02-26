import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { useGetAllGames } from '@/hooks/useQueries';
import { GameCard } from './GameCard';
import { GamePlayer } from './GamePlayer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Game } from '../backend';

const FALLBACK_GAMES: (Game & { genre?: string })[] = [
  { title: 'Slope', description: 'Roll your ball down a steep slope while avoiding obstacles in this fast-paced 3D game.', embedUrl: 'https://slope-game.github.io/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Cookie Clicker', description: 'Addictive incremental game where you bake cookies and expand your cookie empire.', embedUrl: 'https://orteil.dashnet.org/cookieclicker/', thumbnailUrl: '', genre: 'Idle' },
  { title: 'Run 3', description: 'Navigate your character through a series of tunnels in this endless runner platformer.', embedUrl: 'https://www.coolmathgames.com/0-run-3/play', thumbnailUrl: '', genre: 'Runner' },
  { title: '1v1.LOL', description: 'Battle it out in this third-person shooter and building game inspired by Fortnite.', embedUrl: 'https://1v1.lol/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Retro Bowl', description: 'Manage your football team and compete in retro-style American football matches.', embedUrl: 'https://retrobowl.me/', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Drift Hunters', description: 'Customize your car and drift through challenging tracks in this realistic driving simulator.', embedUrl: 'https://drifthunters.io/', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Moto X3M', description: 'Race through insane obstacle courses on your motorbike in this thrilling stunt game.', embedUrl: 'https://www.coolmathgames.com/0-moto-x3m/play', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Subway Surfers', description: 'Dash through the subway, dodge trains, and collect coins in this endless runner.', embedUrl: 'https://poki.com/en/g/subway-surfers', thumbnailUrl: '', genre: 'Runner' },
  { title: 'Agar.io', description: 'Control a cell and consume others to grow larger in this massively multiplayer online game.', embedUrl: 'https://agar.io/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Krunker.io', description: 'Fast-paced first-person shooter with multiple game modes and maps.', embedUrl: 'https://krunker.io/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Happy Wheels', description: 'Ragdoll physics-based platform browser game featuring various characters and vehicles.', embedUrl: 'https://totaljerkface.com/happy_wheels.tjf', thumbnailUrl: '', genre: 'Physics' },
  { title: 'Geometry Dash', description: 'Rhythm-based platformer game where you control a square to avoid obstacles.', embedUrl: 'https://scratch.mit.edu/projects/105500895/', thumbnailUrl: '', genre: 'Rhythm' },
  { title: 'Tank Trouble', description: 'Classic tank multiplayer game where you battle in mazes.', embedUrl: 'https://tanktrouble.com/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Bloons Tower Defense', description: 'Tower defense game where you pop as many balloons as possible with monkey towers.', embedUrl: 'https://ninjakiwi.com/Games/Bloons-Tower-Defense-games/Bloons-Tower-Defense-5.html', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Shell Shockers', description: 'First-person shooter featuring eggs armed with weapons in multiplayer battles.', embedUrl: 'https://shellshock.io/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Wordle', description: 'Guess the hidden 5-letter word in 6 tries. A daily word puzzle phenomenon.', embedUrl: 'https://www.nytimes.com/games/wordle/index.html', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Chess', description: 'Play chess online against the computer or challenge friends in this classic strategy game.', embedUrl: 'https://www.chess.com/play/computer', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Minecraft Classic', description: 'The original browser version of Minecraft — build and explore in this iconic sandbox game.', embedUrl: 'https://classic.minecraft.net/', thumbnailUrl: '', genre: 'Sandbox' },
];

export function GamesSection() {
  const { data: backendGames, isLoading } = useGetAllGames();
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const backendValid = (backendGames ?? []).filter(
    (g) => g.embedUrl && !g.embedUrl.includes('example.com')
  );
  const fallbackFiltered = FALLBACK_GAMES.filter(
    (f) => !backendValid.some((b) => b.title.toLowerCase() === f.title.toLowerCase())
  );
  const games = [...backendValid, ...fallbackFiltered];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Gamepad2 className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 01
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          🎮 <span className="text-neon-blue neon-text-blue">Games</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Play the best unblocked browser games — no downloads, no login required. From shooters to puzzles, we've got it all.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {games.map((game, idx) => {
            const fallbackMatch = FALLBACK_GAMES.find(
              (f) => f.title.toLowerCase() === game.title.toLowerCase()
            );
            const genre = fallbackMatch?.genre ?? 'Arcade';
            return (
              <GameCard
                key={`${game.title}-${idx}`}
                game={game}
                genre={genre}
                onPlay={() => setActiveGame(game)}
              />
            );
          })}
        </div>
      )}

      {activeGame && (
        <GamePlayer game={activeGame} onClose={() => setActiveGame(null)} />
      )}
    </div>
  );
}
