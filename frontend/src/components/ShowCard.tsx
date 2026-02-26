import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Show } from '../backend';

interface ShowCardProps {
  show: Show;
  onWatch: () => void;
}

const SHOW_EMOJIS: Record<string, string> = {
  cosmos: '🌌',
  ted: '🎤',
  national: '🦁',
  history: '📜',
  crash: '📚',
  pbs: '🔭',
  science: '🔬',
};

function getShowEmoji(title: string): string {
  const key = title.toLowerCase();
  for (const [k, v] of Object.entries(SHOW_EMOJIS)) {
    if (key.includes(k)) return v;
  }
  return '📺';
}

export function ShowCard({ show, onWatch }: ShowCardProps) {
  const hasRealThumb = show.thumbnailUrl && !show.thumbnailUrl.includes('example.com');
  const emoji = getShowEmoji(show.title);

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-neon-purple/40 hover:shadow-lg hover:shadow-neon-purple/10 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative w-full h-44 bg-gradient-to-br from-neon-purple/5 to-background overflow-hidden">
        {hasRealThumb ? (
          <img
            src={show.thumbnailUrl}
            alt={show.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <img
              src="/assets/generated/show-thumb-default.dim_400x240.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <span className="relative text-5xl">{emoji}</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
            <div className="w-14 h-14 rounded-full bg-neon-purple/90 flex items-center justify-center shadow-lg shadow-neon-purple/40">
              <Play className="w-6 h-6 text-background fill-background ml-0.5" />
            </div>
          </div>
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-neon-purple/20 border border-neon-purple/30 rounded-full px-2.5 py-0.5 text-xs font-semibold text-neon-purple backdrop-blur-sm">
          Series
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-base mb-1 truncate">{show.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{show.description}</p>
        <Button
          onClick={onWatch}
          className="w-full h-9 rounded-xl bg-neon-purple/15 border border-neon-purple/30 text-neon-purple font-semibold text-sm hover:bg-neon-purple/25 hover:border-neon-purple/50 hover:shadow-md hover:shadow-neon-purple/20 transition-all"
          variant="ghost"
        >
          <Play className="w-3.5 h-3.5 mr-1.5 fill-neon-purple" />
          Watch Now
        </Button>
      </div>
    </div>
  );
}
