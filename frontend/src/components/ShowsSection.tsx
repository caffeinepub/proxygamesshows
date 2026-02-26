import { useState } from 'react';
import { Tv } from 'lucide-react';
import { useGetAllShows } from '@/hooks/useQueries';
import { ShowCard } from './ShowCard';
import { VideoPlayer } from './VideoPlayer';
import { Skeleton } from '@/components/ui/skeleton';
import type { Show } from '../backend';

// Fallback shows with real public YouTube embed URLs
const FALLBACK_SHOWS: Show[] = [
  {
    title: 'Cosmos: A Spacetime Odyssey',
    description: 'Explore the universe with Neil deGrasse Tyson',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLSmQ9sTVcqKmqC6yMd_PFZi3XcFBe5dGV',
    thumbnailUrl: 'https://img.youtube.com/vi/Ld_Gy_Ib0Oc/hqdefault.jpg',
  },
  {
    title: 'TED Talks: Science',
    description: 'Inspiring talks from the world\'s greatest thinkers',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PL70DEC2B0568B5469',
    thumbnailUrl: 'https://img.youtube.com/vi/iG9CE55wbtY/hqdefault.jpg',
  },
  {
    title: 'National Geographic Shorts',
    description: 'Stunning nature and wildlife documentaries',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLivjPDlt6ApSiD2mk9Ngp-5dZ9CDDn9d0',
    thumbnailUrl: 'https://img.youtube.com/vi/LfvhJB7pgXI/hqdefault.jpg',
  },
  {
    title: 'History of the World',
    description: 'Journey through the most pivotal moments in history',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLTve67GFT3A3HnSMFBHBMFHBMFHBMFHB',
    thumbnailUrl: 'https://img.youtube.com/vi/xuCn8ux2gbs/hqdefault.jpg',
  },
  {
    title: 'Crash Course: World History',
    description: 'Fast-paced educational history series',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLBDA2A52596D59A97',
    thumbnailUrl: 'https://img.youtube.com/vi/Yocja_N5s1I/hqdefault.jpg',
  },
  {
    title: 'PBS Space Time',
    description: 'Deep dives into physics and cosmology',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLsPUh22kYmNCGaVGuGfKfJl-6RdHiCjo1',
    thumbnailUrl: 'https://img.youtube.com/vi/YNEBhwimJWs/hqdefault.jpg',
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
          Watch Shows & Docs
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Stream documentaries, educational series, and more — all in one place.
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
