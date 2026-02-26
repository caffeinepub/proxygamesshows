import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { ProxySection } from './components/ProxySection';
import { GamesSection } from './components/GamesSection';
import { ShowsSection } from './components/ShowsSection';
import { AppsSection } from './components/AppsSection';
import { HacksSection } from './components/HacksSection';
import { MusicSection } from './components/MusicSection';
import { LiveTVSection } from './components/LiveTVSection';
import { SectionCardGrid } from './components/SectionCardGrid';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <SectionCardGrid />
        <section id="games" className="scroll-mt-16">
          <GamesSection />
        </section>
        <section id="proxy" className="scroll-mt-16">
          <ProxySection />
        </section>
        <section id="shows" className="scroll-mt-16">
          <ShowsSection />
        </section>
        <section id="music" className="scroll-mt-16">
          <MusicSection />
        </section>
        <section id="apps" className="scroll-mt-16">
          <AppsSection />
        </section>
        <section id="hacks" className="scroll-mt-16">
          <HacksSection />
        </section>
        <section id="livetv" className="scroll-mt-16">
          <LiveTVSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
