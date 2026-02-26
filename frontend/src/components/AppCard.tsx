import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AppEntry {
  name: string;
  emoji: string;
  url: string;
  color: 'green' | 'cyan' | 'purple' | 'orange' | 'pink' | 'yellow';
  description: string;
}

interface AppCardProps {
  app: AppEntry;
  onOpen: () => void;
}

export function AppCard({ app, onOpen }: AppCardProps) {
  return (
    <div
      className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-neon-blue/60 hover:shadow-xl hover:shadow-neon-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={onOpen}
    >
      {/* App Icon Area */}
      <div className="relative w-full h-36 bg-neon-blue/10 flex items-center justify-center">
        <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {app.emoji}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-black text-foreground text-base mb-1.5 truncate font-display">{app.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{app.description}</p>
        <Button
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="w-full h-9 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 text-neon-blue font-bold text-sm hover:bg-neon-blue/25 hover:border-neon-blue/70 hover:shadow-lg hover:shadow-neon-blue/25 transition-all"
          variant="ghost"
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
          Open App
        </Button>
      </div>
    </div>
  );
}
