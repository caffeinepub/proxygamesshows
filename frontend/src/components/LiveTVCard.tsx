import { Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface LiveTVEntry {
  name: string;
  emoji: string;
  description: string;
  embedUrl: string;
  category: string;
}

interface LiveTVCardProps {
  channel: LiveTVEntry;
  onWatch: () => void;
}

export function LiveTVCard({ channel, onWatch }: LiveTVCardProps) {
  return (
    <div className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-neon-blue/50 hover:shadow-xl hover:shadow-neon-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Icon Area */}
      <div
        className="relative w-full h-36 bg-gradient-to-br from-neon-blue/10 via-background to-neon-blue/5 flex items-center justify-center"
        onClick={onWatch}
      >
        <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {channel.emoji}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <div className="w-14 h-14 rounded-full bg-neon-blue border-2 border-neon-blue/80 flex items-center justify-center shadow-2xl shadow-neon-blue/60">
              <Tv className="w-6 h-6 text-background" />
            </div>
          </div>
        </div>
        {/* Live badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-neon-blue/20 border border-neon-blue/40 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
          <span className="text-xs font-bold text-neon-blue">LIVE</span>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-card/80 border border-border rounded-full px-2.5 py-0.5 text-xs font-bold text-muted-foreground backdrop-blur-sm">
          {channel.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-black text-foreground text-base mb-1.5 truncate font-display">{channel.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{channel.description}</p>
        <Button
          onClick={onWatch}
          className="w-full h-9 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 text-neon-blue font-bold text-sm hover:bg-neon-blue/25 hover:border-neon-blue/70 hover:shadow-lg hover:shadow-neon-blue/25 transition-all"
          variant="ghost"
        >
          <Tv className="w-3.5 h-3.5 mr-1.5" />
          Watch Live
        </Button>
      </div>
    </div>
  );
}
