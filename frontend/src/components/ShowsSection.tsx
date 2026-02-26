import { useState } from 'react';
import { Tv } from 'lucide-react';
import { useGetAllShows } from '@/hooks/useQueries';
import { ShowCard } from './ShowCard';
import { VideoPlayer } from './VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Show } from '../backend';

// Fallback popular TV shows with YouTube trailer embeds
const FALLBACK_SHOWS: Show[] = [
  {
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turned drug kingpin in this critically acclaimed crime drama. Watch the official trailer.',
    embedUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    thumbnailUrl: 'https://img.youtube.com/vi/HhesaQXLuRY/hqdefault.jpg',
  },
  {
    title: 'The Office',
    description: 'A hilarious mockumentary sitcom about the everyday lives of office employees at Dunder Mifflin.',
    embedUrl: 'https://www.youtube.com/embed/dVHo1dU1GSo',
    thumbnailUrl: 'https://img.youtube.com/vi/dVHo1dU1GSo/hqdefault.jpg',
  },
  {
    title: 'Game of Thrones',
    description: 'Epic fantasy series of power, betrayal, and dragons based on George R.R. Martin\'s novels.',
    embedUrl: 'https://www.youtube.com/embed/BpJYNVhGf1s',
    thumbnailUrl: 'https://img.youtube.com/vi/BpJYNVhGf1s/hqdefault.jpg',
  },
  {
    title: 'Stranger Things',
    description: 'A group of kids uncover supernatural mysteries in their small Indiana town. Watch the season 1 trailer.',
    embedUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    thumbnailUrl: 'https://img.youtube.com/vi/b9EkMc79ZSU/hqdefault.jpg',
  },
  {
    title: 'Peaky Blinders',
    description: 'British crime drama following the ruthless Shelby crime family in post-WWI Birmingham.',
    embedUrl: 'https://www.youtube.com/embed/oVzVdvGIC7U',
    thumbnailUrl: 'https://img.youtube.com/vi/oVzVdvGIC7U/hqdefault.jpg',
  },
  {
    title: 'The Sopranos',
    description: 'New Jersey mob boss Tony Soprano balances family life and organized crime in this landmark HBO series.',
    embedUrl: 'https://www.youtube.com/embed/WRuHzYx-8Go',
    thumbnailUrl: 'https://img.youtube.com/vi/WRuHzYx-8Go/hqdefault.jpg',
  },
  {
    title: 'The Wire',
    description: 'Gritty crime drama exploring Baltimore through the eyes of law enforcement, drug dealers, and residents.',
    embedUrl: 'https://www.youtube.com/embed/9qK-VGjMr8g',
    thumbnailUrl: 'https://img.youtube.com/vi/9qK-VGjMr8g/hqdefault.jpg',
  },
  {
    title: 'Better Call Saul',
    description: 'The origin story of Breaking Bad\'s beloved con-man lawyer Jimmy McGill becoming Saul Goodman.',
    embedUrl: 'https://www.youtube.com/embed/HN4oydykJFc',
    thumbnailUrl: 'https://img.youtube.com/vi/HN4oydykJFc/hqdefault.jpg',
  },
  {
    title: 'The Last of Us',
    description: 'A post-apocalyptic survival drama following Joel and Ellie across a fungus-ravaged America.',
    embedUrl: 'https://www.youtube.com/embed/uLtkt8BonwM',
    thumbnailUrl: 'https://img.youtube.com/vi/uLtkt8BonwM/hqdefault.jpg',
  },
];

export function ShowsSection() {
  const { data: backendShows, isLoading } = useGetAllShows();
  const [activeShow, setActiveShow] = useState<Show | null>(null);

  // Merge backend shows with fallback, filter out placeholder URLs
  const backendValid = (backendShows ?? []).filter(
    (s) => s.embedUrl && !s.embedUrl.includes('example.com')
  );
  const fallbackFiltered = FALLBACK_SHOWS.filter(
    (f) => !backendValid.some((b) => b.title.toLowerCase() === f.title.toLowerCase())
  );
  const shows = [...backendValid, ...fallbackFiltered];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-neon-purple/15 border border-neon-purple/30 flex items-center justify-center">
            <Tv className="w-4 h-4 text-neon-purple" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-neon-purple">Shows</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
          Popular TV Shows
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Watch trailers for the greatest TV shows of all time — Breaking Bad, Game of Thrones, Stranger Things, and more.
        </p>
      </div>

      {/* Shows Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shows.map((show, idx) => (
            <ShowCard
              key={`${show.title}-${idx}`}
              show={show}
              onWatch={() => setActiveShow(show)}
            />
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {activeShow && (
        <VideoPlayer
          show={activeShow}
          onClose={() => setActiveShow(null)}
        />
      )}
    </div>
  );
}
