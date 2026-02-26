import { useState } from 'react';
import { Tv } from 'lucide-react';
import { useGetAllShows } from '@/hooks/useQueries';
import { ShowCard } from './ShowCard';
import { VideoPlayer } from './VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Show } from '../backend';

const FALLBACK_SHOWS: (Show & { badge?: string })[] = [
  { title: 'Breaking Bad', description: 'A high school chemistry teacher turned drug kingpin in this critically acclaimed crime drama.', embedUrl: 'https://www.youtube.com/embed/HhesaQXLuRY', thumbnailUrl: 'https://img.youtube.com/vi/HhesaQXLuRY/hqdefault.jpg', badge: 'Series' },
  { title: 'The Office', description: 'A hilarious mockumentary sitcom about the everyday lives of office employees at Dunder Mifflin.', embedUrl: 'https://www.youtube.com/embed/dVHo1dU1GSo', thumbnailUrl: 'https://img.youtube.com/vi/dVHo1dU1GSo/hqdefault.jpg', badge: 'Series' },
  { title: 'Game of Thrones', description: "Epic fantasy series of power, betrayal, and dragons based on George R.R. Martin's novels.", embedUrl: 'https://www.youtube.com/embed/BpJYNVhGf1s', thumbnailUrl: 'https://img.youtube.com/vi/BpJYNVhGf1s/hqdefault.jpg', badge: 'Series' },
  { title: 'Stranger Things', description: 'A group of kids uncover supernatural mysteries in their small Indiana town.', embedUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU', thumbnailUrl: 'https://img.youtube.com/vi/b9EkMc79ZSU/hqdefault.jpg', badge: 'Series' },
  { title: 'Peaky Blinders', description: 'British crime drama following the ruthless Shelby crime family in post-WWI Birmingham.', embedUrl: 'https://www.youtube.com/embed/oVzVdvGIC7U', thumbnailUrl: 'https://img.youtube.com/vi/oVzVdvGIC7U/hqdefault.jpg', badge: 'Series' },
  { title: 'The Sopranos', description: 'New Jersey mob boss Tony Soprano balances family life and organized crime in this landmark HBO series.', embedUrl: 'https://www.youtube.com/embed/WRuHzYx-8Go', thumbnailUrl: 'https://img.youtube.com/vi/WRuHzYx-8Go/hqdefault.jpg', badge: 'Series' },
  { title: 'The Wire', description: 'Gritty crime drama exploring Baltimore through the eyes of law enforcement, drug dealers, and residents.', embedUrl: 'https://www.youtube.com/embed/9qK-VGjMr8g', thumbnailUrl: 'https://img.youtube.com/vi/9qK-VGjMr8g/hqdefault.jpg', badge: 'Series' },
  { title: 'Better Call Saul', description: "The origin story of Breaking Bad's beloved con-man lawyer Jimmy McGill becoming Saul Goodman.", embedUrl: 'https://www.youtube.com/embed/HN4oydykJFc', thumbnailUrl: 'https://img.youtube.com/vi/HN4oydykJFc/hqdefault.jpg', badge: 'Series' },
  { title: 'The Last of Us', description: 'A post-apocalyptic survival drama following Joel and Ellie across a fungus-ravaged America.', embedUrl: 'https://www.youtube.com/embed/uLtkt8BonwM', thumbnailUrl: 'https://img.youtube.com/vi/uLtkt8BonwM/hqdefault.jpg', badge: 'Series' },
  { title: 'The Witcher', description: 'Fantasy drama based on the book series, following monster hunter Geralt of Rivia.', embedUrl: 'https://www.youtube.com/embed/ndl1W4ltcmg', thumbnailUrl: 'https://img.youtube.com/vi/ndl1W4ltcmg/hqdefault.jpg', badge: 'Series' },
  { title: 'Dark', description: 'German sci-fi thriller about families uncovering a time travel conspiracy spanning generations.', embedUrl: 'https://www.youtube.com/embed/ESEUoa-mz2c', thumbnailUrl: 'https://img.youtube.com/vi/ESEUoa-mz2c/hqdefault.jpg', badge: 'Series' },
  { title: 'Narcos', description: 'Drama series chronicling the rise and fall of drug cartels in Colombia.', embedUrl: 'https://www.youtube.com/embed/U7elNhHwgBU', thumbnailUrl: 'https://img.youtube.com/vi/U7elNhHwgBU/hqdefault.jpg', badge: 'Series' },
  { title: 'Money Heist', description: 'Spanish drama about a criminal mastermind leading a group of robbers for the perfect heist.', embedUrl: 'https://www.youtube.com/embed/p_PJbmrX4uk', thumbnailUrl: 'https://img.youtube.com/vi/p_PJbmrX4uk/hqdefault.jpg', badge: 'Series' },
  { title: 'Squid Game', description: "Korean thriller series about contestants competing in deadly children's games for a cash prize.", embedUrl: 'https://www.youtube.com/embed/oqxAJKy0ii4', thumbnailUrl: 'https://img.youtube.com/vi/oqxAJKy0ii4/hqdefault.jpg', badge: 'Series' },
  { title: 'Inception', description: 'Mind-bending thriller film by Christopher Nolan about dreams within dreams.', embedUrl: 'https://www.youtube.com/embed/YoHD9XEInc0', thumbnailUrl: 'https://img.youtube.com/vi/YoHD9XEInc0/hqdefault.jpg', badge: 'Movie' },
  { title: 'Interstellar', description: 'Epic sci-fi adventure about astronauts traveling through a wormhole in search of a new home for humanity.', embedUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E', thumbnailUrl: 'https://img.youtube.com/vi/zSWdZVtXT7E/hqdefault.jpg', badge: 'Movie' },
  { title: 'The Dark Knight', description: 'Batman faces the Joker in this iconic superhero crime thriller by Christopher Nolan.', embedUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY', thumbnailUrl: 'https://img.youtube.com/vi/EXeTwQWrcwY/hqdefault.jpg', badge: 'Movie' },
  { title: 'Pulp Fiction', description: "Quentin Tarantino's iconic crime anthology weaving together multiple stories in Los Angeles.", embedUrl: 'https://www.youtube.com/embed/s7EdQ4FqbhY', thumbnailUrl: 'https://img.youtube.com/vi/s7EdQ4FqbhY/hqdefault.jpg', badge: 'Movie' },
];

export function ShowsSection() {
  const { data: backendShows, isLoading } = useGetAllShows();
  const [activeShow, setActiveShow] = useState<Show | null>(null);

  const backendValid = (backendShows ?? []).filter(
    (s) => s.embedUrl && !s.embedUrl.includes('example.com')
  );
  const fallbackFiltered = FALLBACK_SHOWS.filter(
    (f) => !backendValid.some((b) => b.title.toLowerCase() === f.title.toLowerCase())
  );
  const shows = [...backendValid, ...fallbackFiltered];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Tv className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 03
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          📺 <span className="text-neon-blue neon-text-blue">TV Shows & Movies</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Watch trailers for the greatest TV shows and movies of all time — Breaking Bad, Game of Thrones, Inception, and more.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {shows.map((show, idx) => {
            const fallbackMatch = FALLBACK_SHOWS.find(
              (f) => f.title.toLowerCase() === show.title.toLowerCase()
            );
            const badge = fallbackMatch?.badge ?? 'Series';
            return (
              <ShowCard
                key={`${show.title}-${idx}`}
                show={show}
                badge={badge}
                onWatch={() => setActiveShow(show)}
              />
            );
          })}
        </div>
      )}

      {activeShow && (
        <VideoPlayer show={activeShow} onClose={() => setActiveShow(null)} />
      )}
    </div>
  );
}
