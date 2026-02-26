import { useState } from 'react';
import { Radio } from 'lucide-react';
import { LiveTVCard, type LiveTVEntry } from './LiveTVCard';
import { LiveTVPlayer } from './LiveTVPlayer';

const LIVE_TV_CHANNELS: LiveTVEntry[] = [
  {
    name: 'NASA TV',
    emoji: '🚀',
    description: 'Watch live NASA missions, launches, spacewalks, and educational programming 24/7.',
    embedUrl: 'https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1',
    category: 'Science',
  },
  {
    name: 'ABC News Live',
    emoji: '📰',
    description: 'Live breaking news, politics, and world events from ABC News around the clock.',
    embedUrl: 'https://www.youtube.com/embed/w_Ma8oQLmSM?autoplay=1',
    category: 'News',
  },
  {
    name: 'CBS News 24/7',
    emoji: '📺',
    description: 'Free 24/7 streaming news from CBS — breaking stories, live events, and analysis.',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCVi3YzsGMXWCNi3oNZmFZjg&autoplay=1',
    category: 'News',
  },
  {
    name: 'Bloomberg TV',
    emoji: '💹',
    description: 'Live financial news, market data, and business coverage from Bloomberg Television.',
    embedUrl: 'https://www.youtube.com/embed/dp8PhLsUcFE?autoplay=1',
    category: 'Finance',
  },
  {
    name: 'DW News',
    emoji: '🌍',
    description: 'Deutsche Welle live — international news in English covering global events 24/7.',
    embedUrl: 'https://www.youtube.com/embed/pqabxBKzZ6M?autoplay=1',
    category: 'International',
  },
  {
    name: 'France 24 English',
    emoji: '🗼',
    description: 'Live international news from France 24 — covering Europe, Africa, and the world.',
    embedUrl: 'https://www.youtube.com/embed/h3MuIUNCCLI?autoplay=1',
    category: 'International',
  },
  {
    name: 'Al Jazeera English',
    emoji: '🌐',
    description: 'Award-winning international news network covering global stories with depth and context.',
    embedUrl: 'https://www.youtube.com/embed/F-POzBGOzMo?autoplay=1',
    category: 'International',
  },
  {
    name: 'Euronews',
    emoji: '🇪🇺',
    description: 'European news channel broadcasting in multiple languages — live news and analysis.',
    embedUrl: 'https://www.youtube.com/embed/RAyzAt3WoEA?autoplay=1',
    category: 'News',
  },
];

export function LiveTVSection() {
  const [activeChannel, setActiveChannel] = useState<LiveTVEntry | null>(null);

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Radio className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 07
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          📡 <span className="text-neon-blue neon-text-blue">Live TV</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Stream publicly available live TV channels — news, science, finance, and international coverage.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {LIVE_TV_CHANNELS.map((channel) => (
          <LiveTVCard
            key={channel.name}
            channel={channel}
            onWatch={() => setActiveChannel(channel)}
          />
        ))}
      </div>

      {activeChannel && (
        <LiveTVPlayer channel={activeChannel} onClose={() => setActiveChannel(null)} />
      )}
    </div>
  );
}
