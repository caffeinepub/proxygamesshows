import { useState, useRef } from 'react';
import { Globe, ArrowRight, RefreshCw, X, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ProxySection() {
  const [inputUrl, setInputUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const normalizeUrl = (url: string): string => {
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  };

  const handleGo = () => {
    setError('');
    const normalized = normalizeUrl(inputUrl);
    if (!normalized) {
      setError('Please enter a URL.');
      return;
    }
    try {
      new URL(normalized);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return;
    }
    setLoading(true);
    setIframeUrl(normalized);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGo();
  };

  const handleClear = () => {
    setIframeUrl('');
    setInputUrl('');
    setError('');
  };

  const handleRefresh = () => {
    if (iframeRef.current && iframeUrl) {
      iframeRef.current.src = iframeUrl;
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center">
            <Globe className="w-4 h-4 text-neon-cyan" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan">Web Proxy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
          Browse the Web
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Enter any URL below to load it directly in the browser. Access sites freely and privately.
        </p>
      </div>

      {/* URL Input Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter a URL... (e.g., https://example.com)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/50 h-11 rounded-xl focus-visible:ring-neon-cyan/40 focus-visible:border-neon-cyan/50"
            />
          </div>
          <div className="flex gap-2">
            {iframeUrl && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  className="h-11 w-11 rounded-xl border-border hover:border-neon-cyan/40 hover:text-neon-cyan"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClear}
                  className="h-11 w-11 rounded-xl border-border hover:border-destructive/40 hover:text-destructive"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button
              onClick={handleGo}
              className="h-11 px-6 rounded-xl bg-neon-cyan text-background font-bold hover:bg-neon-cyan/90 hover:shadow-lg hover:shadow-neon-cyan/30 transition-all"
            >
              Go
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Iframe Container */}
      {iframeUrl && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-neon-green/60" />
            </div>
            <div className="flex-1 bg-background border border-border rounded-lg px-3 py-1 text-xs text-muted-foreground truncate">
              {iframeUrl}
            </div>
          </div>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                  <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              className="w-full h-[600px] border-0"
              title="Web Proxy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </div>
        </div>
      )}

      {!iframeUrl && (
        <div className="border-2 border-dashed border-border rounded-2xl h-64 flex flex-col items-center justify-center text-muted-foreground/50 gap-3">
          <Globe className="w-10 h-10" />
          <p className="text-sm">Enter a URL above and click Go to start browsing</p>
        </div>
      )}
    </div>
  );
}
