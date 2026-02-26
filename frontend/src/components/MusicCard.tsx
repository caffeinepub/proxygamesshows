import { Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MusicEntry {
  name: string;
  emoji: string;
  description: string;
  embedUrl: string;
  genre: string;
}

interface MusicCardProps {
  station: MusicEntry;
  onPlay: () => void;
}

export function MusicCard({ station, onPlay }: MusicCardProps) {
  return (
    <div className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-neon-blue/50 hover:shadow-xl hover:shadow-neon-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Icon Area */}
      <div
        className="relative w-full h-36 bg-gradient-to-br from-neon-blue/10 via-background to-neon-blue/5 flex items-center justify-center"
        onClick={onPlay}
      >
        <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {station.emoji}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <div className="w-14 h-14 rounded-full bg-neon-blue border-2 border-neon-blue/80 flex items-center justify-center shadow-2xl shadow-neon-blue/60">
              <Headphones className="w-6 h-6 text-background" />
            </div>
          </div>
        </div>
        {/* Genre badge */}
        <div className="absolute top-3 left-3 bg-neon-blue/20 border border-neon-blue/40 rounded-full px-2.5 py-0.5 text-xs font-bold text-neon-blue backdrop-blur-sm">
          {station.genre}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-black text-foreground text-base mb-1.5 truncate font-display">{station.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{station.description}</p>
        <Button
          onClick={onPlay}
          className="w-full h-9 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 text-neon-blue font-bold text-sm hover:bg-neon-blue/25 hover:border-neon-blue/70 hover:shadow-lg hover:shadow-neon-blue/25 transition-all"
          variant="ghost"
        >
          <Headphones className="w-3.5 h-3.5 mr-1.5" />
          Listen
        </Button>
      </div>
    </div>
  );
}
