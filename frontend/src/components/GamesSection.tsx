import { useState, useMemo } from 'react';
import { Gamepad2, Search, X } from 'lucide-react';
import { useGetAllGames } from '@/hooks/useQueries';
import { GameCard } from './GameCard';
import { GamePlayer } from './GamePlayer';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import type { Game } from '../backend';

const FALLBACK_GAMES: (Game & { genre?: string })[] = [
  // Arcade
  { title: 'Slope', description: 'Roll your ball down a steep slope while avoiding obstacles in this fast-paced 3D game.', embedUrl: 'https://slope-game.github.io/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Run 3', description: 'Navigate your character through a series of tunnels in this endless runner platformer.', embedUrl: 'https://www.coolmathgames.com/0-run-3/play', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Geometry Dash', description: 'Rhythm-based platformer game where you control a square to avoid obstacles.', embedUrl: 'https://scratch.mit.edu/projects/105500895/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Flappy Bird', description: 'Tap to keep the bird flying through pipes in this notoriously addictive arcade game.', embedUrl: 'https://flappybird.io/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Dino Game', description: "Google's classic offline dinosaur runner — jump over cacti and dodge pterodactyls.", embedUrl: 'https://chromedino.com/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Pac-Man', description: 'Navigate the classic maze, eat pellets, and avoid ghosts in this timeless arcade legend.', embedUrl: 'https://www.google.com/logos/2010/pacman10-i.html', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Snake', description: 'Guide your snake to eat food and grow longer without hitting walls or yourself.', embedUrl: 'https://playsnake.org/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Tetris', description: 'Stack falling blocks to clear lines in this legendary puzzle-arcade game.', embedUrl: 'https://tetris.com/play-tetris', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Space Invaders', description: 'Defend Earth from waves of descending alien invaders in this classic shooter.', embedUrl: 'https://freeinvaders.org/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Asteroids', description: 'Pilot a spaceship and destroy asteroids and flying saucers in this retro classic.', embedUrl: 'https://www.freeasteroids.org/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Breakout', description: 'Bounce a ball to break bricks in this classic Atari arcade game.', embedUrl: 'https://elgoog.im/breakout/', thumbnailUrl: '', genre: 'Arcade' },
  { title: 'Frogger', description: 'Help the frog cross busy roads and rivers in this beloved retro arcade game.', embedUrl: 'https://www.froggerclassic.com/', thumbnailUrl: '', genre: 'Arcade' },

  // Shooter
  { title: '1v1.LOL', description: 'Battle it out in this third-person shooter and building game inspired by Fortnite.', embedUrl: 'https://1v1.lol/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Krunker.io', description: 'Fast-paced first-person shooter with multiple game modes and maps.', embedUrl: 'https://krunker.io/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Shell Shockers', description: 'First-person shooter featuring eggs armed with weapons in multiplayer battles.', embedUrl: 'https://shellshock.io/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Bullet Force', description: 'Modern military first-person shooter with multiple maps and game modes.', embedUrl: 'https://www.crazygames.com/game/bullet-force-multiplayer', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Combat Online', description: 'Intense multiplayer first-person shooter with various weapons and arenas.', embedUrl: 'https://www.crazygames.com/game/combat-online', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Warbrokers.io', description: 'Battle royale and team deathmatch shooter with vehicles and weapons.', embedUrl: 'https://warbrokers.io/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Zombs Royale', description: 'Top-down 2D battle royale game with 100 players fighting to be the last one standing.', embedUrl: 'https://zombsroyale.io/', thumbnailUrl: '', genre: 'Shooter' },
  { title: 'Surviv.io', description: 'Top-down 2D battle royale — scavenge weapons and outlast all opponents.', embedUrl: 'https://surviv.io/', thumbnailUrl: '', genre: 'Shooter' },

  // IO Games
  { title: 'Agar.io', description: 'Control a cell and consume others to grow larger in this massively multiplayer online game.', embedUrl: 'https://agar.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Slither.io', description: 'Control a snake and eat glowing orbs to grow while avoiding other snakes.', embedUrl: 'https://slither.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Diep.io', description: 'Control a tank, shoot shapes and other players to level up and upgrade your tank.', embedUrl: 'https://diep.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Moomoo.io', description: 'Gather resources, build a base, and fight other players in this survival IO game.', embedUrl: 'https://moomoo.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Wormate.io', description: 'Eat sweets to grow your worm and become the biggest in the arena.', embedUrl: 'https://wormate.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Paper.io 2', description: 'Expand your territory by drawing lines and capturing land while avoiding other players.', embedUrl: 'https://paper-io.com/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Hole.io', description: 'Control a black hole and swallow everything in the city to grow bigger.', embedUrl: 'https://hole-io.com/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Splix.io', description: 'Claim territory by drawing lines and protect your land from other players.', embedUrl: 'https://splix.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Lordz.io', description: 'Build an army of medieval soldiers and conquer the map in this real-time strategy IO game.', embedUrl: 'https://lordz.io/', thumbnailUrl: '', genre: 'IO' },
  { title: 'Starve.io', description: 'Survive the wilderness by gathering food, building shelter, and fighting other players.', embedUrl: 'https://starve.io/', thumbnailUrl: '', genre: 'IO' },

  // Puzzle
  { title: 'Wordle', description: 'Guess the hidden 5-letter word in 6 tries. A daily word puzzle phenomenon.', embedUrl: 'https://www.nytimes.com/games/wordle/index.html', thumbnailUrl: '', genre: 'Puzzle' },
  { title: '2048', description: 'Slide numbered tiles to combine them and reach the 2048 tile in this addictive puzzle.', embedUrl: 'https://play2048.co/', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Sudoku', description: 'Fill the 9x9 grid so every row, column, and box contains digits 1–9.', embedUrl: 'https://sudoku.com/', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Mahjong', description: 'Match pairs of tiles to clear the board in this classic Chinese tile-matching puzzle.', embedUrl: 'https://www.mahjong.org/', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Jigsaw Puzzles', description: 'Solve beautiful jigsaw puzzles online with hundreds of pieces and images.', embedUrl: 'https://www.jigsawplanet.com/', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Cut the Rope', description: 'Feed candy to Om Nom by cutting ropes and collecting stars in this physics puzzle.', embedUrl: 'https://www.crazygames.com/game/cut-the-rope', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Bloxorz', description: 'Roll a rectangular block across platforms and into the hole without falling off.', embedUrl: 'https://www.coolmathgames.com/0-bloxorz/play', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Unblock Me', description: 'Slide blocks to create a path for the red block to escape the board.', embedUrl: 'https://www.crazygames.com/game/unblock-me', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Crossword', description: 'Solve daily crossword puzzles with clues across and down.', embedUrl: 'https://www.nytimes.com/crosswords', thumbnailUrl: '', genre: 'Puzzle' },
  { title: 'Minesweeper', description: 'Clear the minefield without detonating any mines using logic and deduction.', embedUrl: 'https://minesweeper.online/', thumbnailUrl: '', genre: 'Puzzle' },

  // Strategy
  { title: 'Chess', description: 'Play chess online against the computer or challenge friends in this classic strategy game.', embedUrl: 'https://www.chess.com/play/computer', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Bloons Tower Defense', description: 'Tower defense game where you pop as many balloons as possible with monkey towers.', embedUrl: 'https://ninjakiwi.com/Games/Bloons-Tower-Defense-games/Bloons-Tower-Defense-5.html', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Kingdom Rush', description: 'Epic tower defense game where you defend your kingdom against waves of enemies.', embedUrl: 'https://www.crazygames.com/game/kingdom-rush', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Checkers', description: 'Classic board game of diagonal moves and jumps — capture all your opponent\'s pieces.', embedUrl: 'https://www.247checkers.com/', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Backgammon', description: 'Race your pieces around the board and bear them off before your opponent in this classic game.', embedUrl: 'https://www.247backgammon.com/', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Battleship', description: 'Sink your opponent\'s fleet before they sink yours in this classic naval strategy game.', embedUrl: 'https://www.battleshiponline.org/', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Risk', description: 'Conquer the world by deploying armies and battling opponents in this classic board game.', embedUrl: 'https://www.crazygames.com/game/risk', thumbnailUrl: '', genre: 'Strategy' },
  { title: 'Tic Tac Toe', description: 'Classic X and O game — get three in a row to win against the computer or a friend.', embedUrl: 'https://playtictactoe.org/', thumbnailUrl: '', genre: 'Strategy' },

  // Racing
  { title: 'Drift Hunters', description: 'Customize your car and drift through challenging tracks in this realistic driving simulator.', embedUrl: 'https://drifthunters.io/', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Moto X3M', description: 'Race through insane obstacle courses on your motorbike in this thrilling stunt game.', embedUrl: 'https://www.coolmathgames.com/0-moto-x3m/play', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Road Fury', description: 'Drive through traffic, collect power-ups, and destroy enemy vehicles in this road rage game.', embedUrl: 'https://www.crazygames.com/game/road-fury', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Burnout Drift', description: 'Perform epic drifts and burnouts on various tracks in this realistic car game.', embedUrl: 'https://www.crazygames.com/game/burnout-drift', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Madalin Stunt Cars 2', description: 'Drive exotic supercars and perform insane stunts on massive open tracks.', embedUrl: 'https://www.crazygames.com/game/madalin-stunt-cars-2', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Turbo Racing League', description: 'Compete in high-speed turbo car races across multiple challenging tracks.', embedUrl: 'https://www.crazygames.com/game/turbo-racing-league', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Traffic Rider', description: 'Ride a motorcycle through traffic in first-person view in this endless racing game.', embedUrl: 'https://www.crazygames.com/game/traffic-rider', thumbnailUrl: '', genre: 'Racing' },
  { title: 'Bike Racing', description: 'Race your dirt bike through challenging obstacle courses and beat your best time.', embedUrl: 'https://www.crazygames.com/game/bike-racing', thumbnailUrl: '', genre: 'Racing' },

  // Sports
  { title: 'Retro Bowl', description: 'Manage your football team and compete in retro-style American football matches.', embedUrl: 'https://retrobowl.me/', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Basketball Stars', description: 'Play 1v1 basketball against opponents in this fast-paced online sports game.', embedUrl: 'https://www.crazygames.com/game/basketball-stars', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Soccer Random', description: 'Play wacky one-button soccer with random physics and hilarious results.', embedUrl: 'https://www.crazygames.com/game/soccer-random', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Baseball 9', description: 'Build your dream baseball team and compete in leagues in this mobile-style baseball game.', embedUrl: 'https://www.crazygames.com/game/baseball-9', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Ping Pong', description: 'Classic table tennis game — rally against the AI or a friend in this fast-paced sport.', embedUrl: 'https://www.crazygames.com/game/ping-pong', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Golf Battle', description: 'Compete in real-time golf matches across beautiful courses in this multiplayer game.', embedUrl: 'https://www.crazygames.com/game/golf-battle', thumbnailUrl: '', genre: 'Sports' },
  { title: 'Stickman Soccer', description: 'Play fast-paced stickman soccer with simple controls and exciting matches.', embedUrl: 'https://www.crazygames.com/game/stickman-soccer', thumbnailUrl: '', genre: 'Sports' },

  // Runner
  { title: 'Subway Surfers', description: 'Dash through the subway, dodge trains, and collect coins in this endless runner.', embedUrl: 'https://poki.com/en/g/subway-surfers', thumbnailUrl: '', genre: 'Runner' },
  { title: 'Temple Run 2', description: 'Run from the demon monkeys through ancient temples, collecting coins and power-ups.', embedUrl: 'https://poki.com/en/g/temple-run-2', thumbnailUrl: '', genre: 'Runner' },
  { title: 'Jetpack Joyride', description: 'Fly through a secret laboratory with a jetpack, dodging missiles and zappers.', embedUrl: 'https://poki.com/en/g/jetpack-joyride', thumbnailUrl: '', genre: 'Runner' },
  { title: 'Canabalt', description: 'Leap across rooftops in this minimalist endless runner set in a crumbling city.', embedUrl: 'https://adamatomic.com/canabalt/', thumbnailUrl: '', genre: 'Runner' },
  { title: 'Bit Heroes', description: 'Dungeon-crawling RPG runner with retro pixel art and epic boss battles.', embedUrl: 'https://www.crazygames.com/game/bit-heroes', thumbnailUrl: '', genre: 'Runner' },

  // Idle
  { title: 'Cookie Clicker', description: 'Addictive incremental game where you bake cookies and expand your cookie empire.', embedUrl: 'https://orteil.dashnet.org/cookieclicker/', thumbnailUrl: '', genre: 'Idle' },
  { title: 'Adventure Capitalist', description: 'Start with a lemon stand and build a business empire in this idle clicker game.', embedUrl: 'https://www.crazygames.com/game/adventure-capitalist', thumbnailUrl: '', genre: 'Idle' },
  { title: 'Idle Miner Tycoon', description: 'Manage a mining empire, hire managers, and automate your way to riches.', embedUrl: 'https://www.crazygames.com/game/idle-miner-tycoon', thumbnailUrl: '', genre: 'Idle' },
  { title: 'Clicker Heroes', description: 'Click to defeat monsters, hire heroes, and progress through hundreds of zones.', embedUrl: 'https://www.crazygames.com/game/clicker-heroes', thumbnailUrl: '', genre: 'Idle' },
  { title: 'Realm Grinder', description: 'Build a fantasy realm, choose factions, and unlock powerful upgrades in this idle RPG.', embedUrl: 'https://www.kongregate.com/games/DivineGames/realm-grinder', thumbnailUrl: '', genre: 'Idle' },

  // Multiplayer
  { title: 'Tank Trouble', description: 'Classic tank multiplayer game where you battle in mazes.', embedUrl: 'https://tanktrouble.com/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Skribbl.io', description: 'Draw and guess words with friends in this fun online multiplayer drawing game.', embedUrl: 'https://skribbl.io/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Gartic Phone', description: 'Telephone game meets drawing — pass drawings and descriptions around the group.', embedUrl: 'https://garticphone.com/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Jackbox Games', description: 'Party games you play with your phone — trivia, drawing, and more for groups.', embedUrl: 'https://jackbox.tv/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Codenames', description: 'Team word association game — give one-word clues to help your team find secret agents.', embedUrl: 'https://codenames.game/', thumbnailUrl: '', genre: 'Multiplayer' },
  { title: 'Spades', description: 'Classic card game of tricks and bids — play with partners against opponents online.', embedUrl: 'https://www.247spades.com/', thumbnailUrl: '', genre: 'Multiplayer' },

  // Physics
  { title: 'Happy Wheels', description: 'Ragdoll physics-based platform browser game featuring various characters and vehicles.', embedUrl: 'https://totaljerkface.com/happy_wheels.tjf', thumbnailUrl: '', genre: 'Physics' },
  { title: 'Angry Birds', description: 'Launch birds at pig fortresses using a slingshot in this iconic physics puzzle game.', embedUrl: 'https://www.crazygames.com/game/angry-birds-reloaded', thumbnailUrl: '', genre: 'Physics' },
  { title: 'Stickman Ragdoll', description: 'Throw a ragdoll stickman around and watch the hilarious physics unfold.', embedUrl: 'https://www.crazygames.com/game/stickman-ragdoll', thumbnailUrl: '', genre: 'Physics' },
  { title: 'Bowmasters', description: 'Aim and shoot arrows at opponents in this physics-based archery battle game.', embedUrl: 'https://www.crazygames.com/game/bowmasters', thumbnailUrl: '', genre: 'Physics' },
  { title: 'Worms Zone', description: 'Grow your worm by eating food and use physics to trap and eliminate other worms.', embedUrl: 'https://wormszone.io/', thumbnailUrl: '', genre: 'Physics' },

  // Sandbox
  { title: 'Minecraft Classic', description: 'The original browser version of Minecraft — build and explore in this iconic sandbox game.', embedUrl: 'https://classic.minecraft.net/', thumbnailUrl: '', genre: 'Sandbox' },
  { title: 'Garry\'s Mod', description: 'Physics sandbox where you can spawn objects, build contraptions, and experiment freely.', embedUrl: 'https://www.crazygames.com/game/garrys-mod', thumbnailUrl: '', genre: 'Sandbox' },
  { title: 'Sandbox City', description: 'Open-world sandbox where you can drive, fly, and cause chaos in a virtual city.', embedUrl: 'https://www.crazygames.com/game/sandbox-city', thumbnailUrl: '', genre: 'Sandbox' },
  { title: 'WorldBox', description: 'God simulator sandbox — create worlds, spawn creatures, and watch civilizations rise and fall.', embedUrl: 'https://www.crazygames.com/game/worldbox', thumbnailUrl: '', genre: 'Sandbox' },

  // Rhythm
  { title: 'Piano Tiles', description: 'Tap the black tiles to the beat of the music without missing in this rhythm game.', embedUrl: 'https://www.crazygames.com/game/piano-tiles', thumbnailUrl: '', genre: 'Rhythm' },
  { title: 'Beat Racer', description: 'Race through a neon track that pulses to the beat of the music.', embedUrl: 'https://www.crazygames.com/game/beat-racer', thumbnailUrl: '', genre: 'Rhythm' },
  { title: 'Friday Night Funkin', description: 'Rhythm battle game where you rap-battle your way through catchy songs.', embedUrl: 'https://www.crazygames.com/game/friday-night-funkin', thumbnailUrl: '', genre: 'Rhythm' },
  { title: 'Osu!', description: 'Click circles to the beat in this popular rhythm game with thousands of community maps.', embedUrl: 'https://osu.ppy.sh/home', thumbnailUrl: '', genre: 'Rhythm' },
];

const GENRES = ['All', 'Arcade', 'Shooter', 'IO', 'Puzzle', 'Strategy', 'Racing', 'Sports', 'Runner', 'Idle', 'Multiplayer', 'Physics', 'Sandbox', 'Rhythm'];

export function GamesSection() {
  const { data: backendGames, isLoading } = useGetAllGames();
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  const backendValid = (backendGames ?? []).filter(
    (g) => g.embedUrl && !g.embedUrl.includes('example.com')
  );
  const fallbackFiltered = FALLBACK_GAMES.filter(
    (f) => !backendValid.some((b) => b.title.toLowerCase() === f.title.toLowerCase())
  );
  const allGames = [...backendValid, ...fallbackFiltered];

  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
      const fallbackMatch = FALLBACK_GAMES.find(
        (f) => f.title.toLowerCase() === game.title.toLowerCase()
      );
      const genre = fallbackMatch?.genre ?? 'Arcade';
      const matchesGenre = activeGenre === 'All' || genre === activeGenre;
      return matchesSearch && matchesGenre;
    });
  }, [allGames, search, activeGenre]);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
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
          Play 100+ unblocked browser games — no downloads, no login required. From shooters to puzzles, we've got it all.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      {/* Search + Genre Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-9 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-neon-blue/50"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 border ${
                activeGenre === genre
                  ? 'bg-neon-blue text-background border-neon-blue shadow-sm shadow-neon-blue/40'
                  : 'bg-card text-muted-foreground border-border hover:border-neon-blue/50 hover:text-neon-blue'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Showing <span className="text-neon-blue font-bold">{filteredGames.length}</span> of {allGames.length} games
        </p>
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
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">No games found</p>
          <p className="text-sm mt-1">Try a different search or genre filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGames.map((game, idx) => {
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
