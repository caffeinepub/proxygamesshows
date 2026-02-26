import { useState } from 'react';
import { Music } from 'lucide-react';
import { MusicCard, type MusicEntry } from './MusicCard';
import { MusicPlayer } from './MusicPlayer';

const MUSIC_STATIONS: MusicEntry[] = [
  {
    name: 'Lofi Girl',
    emoji: '🎧',
    description: 'The iconic 24/7 lofi hip hop radio — beats to relax/study to. Perfect for focus sessions.',
    embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1',
    genre: 'Lofi / Study',
  },
  {
    name: 'SomaFM — Groove Salad',
    emoji: '🥗',
    description: 'A nicely chilled plate of ambient/downtempo beats and grooves. Commercial-free internet radio.',
    embedUrl: 'https://somafm.com/player/#/now-playing/groovesalad',
    genre: 'Ambient',
  },
  {
    name: 'NTS Radio',
    emoji: '📻',
    description: 'Global online radio broadcasting 24/7 from London, Los Angeles, Shanghai, and beyond.',
    embedUrl: 'https://www.nts.live/stream/1',
    genre: 'Eclectic',
  },
  {
    name: 'KEXP Live Stream',
    emoji: '🎸',
    description: 'Seattle-based non-profit radio station known for championing independent and emerging artists.',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCNblMnMBMFnFMoRMFZwJu_A&autoplay=1',
    genre: 'Indie / Alt',
  },
  {
    name: 'BBC Radio 1',
    emoji: '🇬🇧',
    description: 'The UK\'s biggest pop and chart music station with live shows, mixes, and new music.',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCvjgXvBlbQiydffZU7m1_aw&autoplay=1',
    genre: 'Pop / Chart',
  },
  {
    name: 'Chillhop Music',
    emoji: '🦉',
    description: 'Chillhop 24/7 live radio — jazzy beats and mellow hip hop for studying and relaxing.',
    embedUrl: 'https://www.youtube.com/embed/7NOSDKb0HlU?autoplay=1',
    genre: 'Chillhop',
  },
  {
    name: 'Jazz & Blues Radio',
    emoji: '🎷',
    description: 'Classic jazz and blues 24/7 — smooth saxophone, piano, and timeless classics.',
    embedUrl: 'https://www.youtube.com/embed/Dx5qFachd3A?autoplay=1',
    genre: 'Jazz / Blues',
  },
  {
    name: 'Deep Focus',
    emoji: '🧠',
    description: 'Deep focus music for maximum concentration — ambient electronic and minimal beats.',
    embedUrl: 'https://www.youtube.com/embed/WPni755-Krg?autoplay=1',
    genre: 'Focus',
  },
];

export function MusicSection() {
  const [activeStation, setActiveStation] = useState<MusicEntry | null>(null);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Music className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 04
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          🎵 <span className="text-neon-blue neon-text-blue">Music</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Stream live radio stations and music channels — lofi, jazz, indie, pop, and more. No account needed.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MUSIC_STATIONS.map((station) => (
          <MusicCard
            key={station.name}
            station={station}
            onPlay={() => setActiveStation(station)}
          />
        ))}
      </div>

      {activeStation && (
        <MusicPlayer station={activeStation} onClose={() => setActiveStation(null)} />
      )}
    </div>
  );
}
