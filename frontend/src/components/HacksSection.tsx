import { Zap } from 'lucide-react';
import { HackCard } from './HackCard';

const HACKS = [
  { emoji: '🎮', title: 'Infinite Lives in Cookie Clicker', description: 'Open the console (F12) and type: Game.cookies = Infinity to get unlimited cookies instantly.', category: 'Game Cheats' },
  { emoji: '🎯', title: 'Slope Speed Hack', description: 'In Slope, use browser zoom (Ctrl+/-) to adjust the game viewport and change your perceived speed.', category: 'Game Cheats' },
  { emoji: '🏆', title: 'Chess.com Analysis Mode', description: 'After any game, click "Learn from this game" to get full computer analysis of every move for free.', category: 'Game Cheats' },
  { emoji: '⚡', title: 'Krunker.io Aim Assist', description: 'Go to Settings > Controls and enable "Auto-aim" for easier targeting in multiplayer matches.', category: 'Game Cheats' },
  { emoji: '🌐', title: 'Bypass Paywalls', description: 'Add "12ft.io/" before any news URL to bypass most paywalls and read articles for free.', category: 'Browser Tricks' },
  { emoji: '🔍', title: 'Google Cache Trick', description: 'Type "cache:" before any URL in Google to view a cached version of blocked or down websites.', category: 'Browser Tricks' },
  { emoji: '🎭', title: 'Incognito Extensions', description: 'Enable extensions in incognito mode: Settings > Extensions > toggle "Allow in incognito" for each.', category: 'Browser Tricks' },
  { emoji: '📌', title: 'Pin Any Tab', description: 'Right-click any browser tab and select "Pin tab" to keep it small and always visible on the left.', category: 'Browser Tricks' },
  { emoji: '⌨️', title: 'Ctrl+Shift+T', description: 'Accidentally closed a tab? Press Ctrl+Shift+T (Cmd+Shift+T on Mac) to instantly reopen it.', category: 'Keyboard Shortcuts' },
  { emoji: '🔎', title: 'Ctrl+F Find Anything', description: 'Press Ctrl+F on any webpage to instantly search for any word or phrase on that page.', category: 'Keyboard Shortcuts' },
  { emoji: '🖥️', title: 'F11 Full Screen', description: 'Press F11 to toggle full-screen mode in any browser — great for games and videos.', category: 'Keyboard Shortcuts' },
  { emoji: '📋', title: 'Ctrl+Shift+V Paste Plain', description: 'Use Ctrl+Shift+V to paste text without any formatting — removes fonts, colors, and styles.', category: 'Keyboard Shortcuts' },
  { emoji: '🔋', title: 'Dark Mode Everywhere', description: 'Install the "Dark Reader" Chrome extension to force dark mode on every website automatically.', category: 'Tech & Life Hacks' },
  { emoji: '📶', title: 'Speed Up Slow WiFi', description: 'Change your DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google) for faster, more reliable browsing.', category: 'Tech & Life Hacks' },
  { emoji: '🎵', title: 'YouTube Ad Skip', description: 'Install uBlock Origin extension to block all YouTube ads and enjoy uninterrupted videos.', category: 'Tech & Life Hacks' },
  { emoji: '💾', title: 'Free Cloud Storage', description: 'Stack free tiers: Google Drive (15GB) + OneDrive (5GB) + Dropbox (2GB) = 22GB free storage.', category: 'Tech & Life Hacks' },
];

export function HacksSection() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/15 border-2 border-neon-blue/40 flex items-center justify-center shadow-md shadow-neon-blue/20">
            <Zap className="w-5 h-5 text-neon-blue" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-neon-blue neon-text-blue">
            Section 06
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-3 font-display leading-tight">
          ⚡ <span className="text-neon-blue neon-text-blue">Hacks & Tips</span>
        </h2>
        <p className="text-muted-foreground max-w-xl text-base">
          Browser tricks, keyboard shortcuts, game cheats, and tech life hacks to level up your experience.
        </p>
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['Game Cheats', 'Browser Tricks', 'Keyboard Shortcuts', 'Tech & Life Hacks'].map((cat) => (
          <span
            key={cat}
            className="px-3 py-1 rounded-full bg-neon-blue/15 border border-neon-blue/35 text-neon-blue text-xs font-bold"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {HACKS.map((hack, idx) => (
          <HackCard key={idx} hack={hack} />
        ))}
      </div>
    </div>
  );
}
