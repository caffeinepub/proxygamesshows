import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Show } from '../backend';

interface ShowCardProps {
  show: Show;
  badge?: string;
  onWatch: () => void;
}

const SHOW_EMOJIS: Record<string, string> = {
  breaking: '⚗️',
  office: '📋',
  game: '🐉',
  stranger: '👾',
  peaky: '🎩',
  sopranos: '🍝',
  wire: '🔌',
  saul: '⚖️',
  'last of us': '🍄',
  witcher: '⚔️',
  dark: '🌀',
  narcos: '💊',
  money: '💰',
  squid: '🦑',
  inception: '🌀',
  interstellar: '🚀',
  'dark knight': '🦇',
  pulp: '🎬',
};

function getShowEmoji(title: string): string {
  const key = title.toLowerCase();
  for (const [k, v] of Object.entries(SHOW_EMOJIS)) {
    if (key.includes(k)) return v;
  }
  return '📺';
}

export function ShowCard({ show, badge = 'Series', onWatch }: ShowCardProps) {
  const hasRealThumb = show.thumbnailUrl && !show.thumbnailUrl.includes('example.com');
  const emoji = getShowEmoji(show.title);
  const isMovie = badge === 'Movie';

  return (
    <div className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-neon-blue/50 hover:shadow-xl hover:shadow-neon-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Thumbnail */}
      <div
        className="relative w-full h-44 bg-gradient-to-br from-neon-blue/5 via-background to-neon-purple/5 overflow-hidden"
        onClick={onWatch}
      >
        {hasRealThumb ? (
          <img
            src={show.thumbnailUrl}
            alt={show.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <img
              src="/assets/generated/show-thumb-default.dim_400x240.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-5xl drop-shadow-lg">{emoji}</span>
            </div>
          </>
        )}

        {/* Hover play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <div className="w-14 h-14 rounded-full bg-neon-blue border-2 border-neon-blue/80 flex items-center justify-center shadow-2xl shadow-neon-blue/60">
              <Play className="w-6 h-6 text-background fill-background ml-0.5" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div
          className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm border ${
            isMovie
              ? 'bg-neon-purple/20 border-neon-purple/40 text-neon-purple'
              : 'bg-neon-blue/20 border-neon-blue/40 text-neon-blue'
          }`}
        >
          {badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-black text-foreground text-base mb-1.5 truncate font-display">{show.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{show.description}</p>
        <Button
          onClick={onWatch}
          className="w-full h-9 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 text-neon-blue font-bold text-sm hover:bg-neon-blue/25 hover:border-neon-blue/70 hover:shadow-lg hover:shadow-neon-blue/25 transition-all"
          variant="ghost"
        >
          <Play className="w-3.5 h-3.5 mr-1.5 fill-neon-blue" />
          Watch Now
        </Button>
      </div>
    </div>
  );
}
