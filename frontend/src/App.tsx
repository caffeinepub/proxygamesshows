import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { ProxySection } from './components/ProxySection';
import { GamesSection } from './components/GamesSection';
import { ShowsSection } from './components/ShowsSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <section id="proxy" className="scroll-mt-16">
          <ProxySection />
        </section>
        <section id="games" className="scroll-mt-16">
          <GamesSection />
        </section>
        <section id="shows" className="scroll-mt-16">
          <ShowsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
