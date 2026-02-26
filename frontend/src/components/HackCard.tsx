interface HackCardProps {
  hack: {
    emoji: string;
    title: string;
    description: string;
    category: string;
  };
}

export function HackCard({ hack }: HackCardProps) {
  return (
    <div className="group bg-card border-2 border-border rounded-2xl p-5 hover:border-neon-blue/50 hover:shadow-xl hover:shadow-neon-blue/15 hover:-translate-y-1 transition-all duration-300">
      {/* Category badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-blue/15 border border-neon-blue/35 text-neon-blue text-xs font-bold mb-4">
        {hack.category}
      </div>

      {/* Emoji + Title */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl flex-shrink-0">{hack.emoji}</span>
        <h3 className="font-black text-foreground text-base font-display leading-tight">{hack.title}</h3>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">{hack.description}</p>
    </div>
  );
}
