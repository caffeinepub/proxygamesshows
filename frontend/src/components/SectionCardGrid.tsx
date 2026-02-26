import { Gamepad2, Globe, Tv, Music, Smartphone, Zap, Radio } from 'lucide-react';

interface SectionCard {
  id: string;
  anchor: string;
  icon: React.ElementType;
  emoji: string;
  title: string;
  description: string;
}

const SECTION_CARDS: SectionCard[] = [
  {
    id: 'games',
    anchor: '#games',
    icon: Gamepad2,
    emoji: '🎮',
    title: 'Games',
    description: 'Play any of our 1200+ unblocked games, no downloads, no blocks',
  },
  {
    id: 'proxy',
    anchor: '#proxy',
    icon: Globe,
    emoji: '🌐',
    title: 'Proxy',
    description: 'Access any site with our built-in web proxy — browse freely',
  },
  {
    id: 'shows',
    anchor: '#shows',
    icon: Tv,
    emoji: '🎬',
    title: 'Movies & TV',
    description: 'Watch any movie or TV show you would like',
  },
  {
    id: 'music',
    anchor: '#music',
    icon: Music,
    emoji: '🎵',
    title: 'Music',
    description: 'Stream the library or jump into live radio stations',
  },
  {
    id: 'apps',
    anchor: '#apps',
    icon: Smartphone,
    emoji: '📱',
    title: 'Apps',
    description: 'Useful tools and utilities like calculators, extensions',
  },
  {
    id: 'hacks',
    anchor: '#hacks',
    icon: Zap,
    emoji: '⚡',
    title: 'Hacks',
    description: 'Browser tricks, keyboard shortcuts, and tech life hacks',
  },
  {
    id: 'livetv',
    anchor: '#livetv',
    icon: Radio,
    emoji: '📡',
    title: 'Live TV',
    description: 'Stream publicly available live TV channels through our player',
  },
];

export function SectionCardGrid() {
  const handleCardClick = (anchor: string) => {
    const id = anchor.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-foreground font-display mb-3">
          What do you want to{' '}
          <span className="text-neon-blue neon-text-blue">explore?</span>
        </h2>
        <p className="text-muted-foreground text-base">
          Choose a section below to get started
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTION_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.anchor)}
              className="group flex flex-col items-center text-center p-8 bg-card border-2 border-border rounded-3xl hover:border-neon-blue/60 hover:shadow-xl hover:shadow-neon-blue/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Icon Badge */}
              <div className="w-20 h-20 rounded-2xl bg-neon-blue/20 border-2 border-neon-blue/50 flex items-center justify-center mb-5 group-hover:bg-neon-blue/30 group-hover:shadow-lg group-hover:shadow-neon-blue/30 transition-all duration-300">
                <Icon className="w-9 h-9 text-neon-blue" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-neon-blue neon-text-blue font-display mb-2">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
