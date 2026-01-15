import { useState } from 'react';

interface StatusBarProps {
  wordCount: number;
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  fontFamily: string;
  onChangeFontFamily: (font: string) => void;
  density: 'loose' | 'dense';
  onChangeDensity: (density: 'loose' | 'dense') => void;
  isDark: boolean;
  onToggleDark: () => void;
  onExport: () => void;
  onClear: () => void;
}

export function StatusBar({
  wordCount,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  fontFamily,
  onChangeFontFamily,
  density,
  onChangeDensity,
  isDark,
  onToggleDark,
  onExport,
  onClear,
}: StatusBarProps) {
  const [showMenu, setShowMenu] = useState(false);

  const bgClass = isDark ? 'bg-black/90' : 'bg-white/90';
  const textClass = isDark ? 'text-neutral-100' : 'text-black';
  const separatorClass = isDark ? 'border-neutral-100/10' : 'border-black/10';

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 ${bgClass} backdrop-blur-sm`}>
      {/* Subtle top separator */}
      <div className={`h-px ${separatorClass} border-t`} />
      
      <div className="px-4 sm:px-8 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Single column stack */}
          <div className="flex flex-col gap-4 sm:hidden">
            {/* Row 1: Word count + Menu */}
            <div className="flex items-center justify-between">
              <div className={`${textClass} opacity-40 text-sm`}>
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`${textClass} opacity-40 hover:opacity-100 transition-opacity tracking-[0.2em] text-sm`}
                aria-label="Toggle menu"
                aria-expanded={showMenu}
              >
                •••
              </button>
            </div>

            {/* Row 2: Zoom + Font */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onDecreaseFontSize}
                  className={`${textClass} hover:opacity-50 transition-opacity px-2 text-sm`}
                  aria-label="Decrease font size"
                >
                  −
                </button>
                <div className={`${textClass} opacity-40 min-w-[2.5ch] text-center text-sm`}>
                  {fontSize}
                </div>
                <button
                  onClick={onIncreaseFontSize}
                  className={`${textClass} hover:opacity-50 transition-opacity px-2 text-sm`}
                  aria-label="Increase font size"
                >
                  +
                </button>
              </div>

              <select
                value={fontFamily}
                onChange={(e) => onChangeFontFamily(e.target.value)}
                className={`${bgClass} ${textClass} outline-none cursor-pointer hover:opacity-50 transition-opacity appearance-none bg-transparent text-sm`}
                aria-label="Select font family"
              >
                <option value="Inter">Inter</option>
                <option value="Geist">Geist</option>
                <option value="ui-sans-serif">System</option>
                <option value="Georgia">Georgia</option>
                <option value="ui-monospace">Mono</option>
              </select>
            </div>

            {/* Row 3: Density */}
            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={() => onChangeDensity('loose')}
                className={`${textClass} hover:opacity-50 transition-opacity text-sm ${
                  density === 'loose' ? 'opacity-100' : 'opacity-30'
                }`}
                aria-label="Set loose line spacing"
                aria-pressed={density === 'loose'}
              >
                Loose
              </button>
              <span className={`${textClass} opacity-20 text-sm`}>/</span>
              <button
                onClick={() => onChangeDensity('dense')}
                className={`${textClass} hover:opacity-50 transition-opacity text-sm ${
                  density === 'dense' ? 'opacity-100' : 'opacity-30'
                }`}
                aria-label="Set dense line spacing"
                aria-pressed={density === 'dense'}
              >
                Dense
              </button>
            </div>

            {/* Expandable Menu */}
            {showMenu && (
              <div className={`flex flex-col gap-3 pt-3 ${separatorClass} border-t text-sm`}>
                <div className="flex items-center gap-3 justify-center">
                  <button
                    onClick={() => { onToggleDark(); setShowMenu(false); }}
                    className={`${textClass} hover:opacity-50 transition-opacity ${
                      !isDark ? 'opacity-100' : 'opacity-30'
                    }`}
                    aria-label="Switch to light mode"
                    aria-pressed={!isDark}
                  >
                    Light
                  </button>
                  <span className={`${textClass} opacity-20`}>/</span>
                  <button
                    onClick={() => { onToggleDark(); setShowMenu(false); }}
                    className={`${textClass} hover:opacity-50 transition-opacity ${
                      isDark ? 'opacity-100' : 'opacity-30'
                    }`}
                    aria-label="Switch to dark mode"
                    aria-pressed={isDark}
                  >
                    Dark
                  </button>
                </div>
                <button
                  onClick={() => { onExport(); setShowMenu(false); }}
                  className={`${textClass} hover:opacity-50 transition-opacity`}
                  aria-label="Export text to file"
                >
                  Export
                </button>
                <button
                  onClick={() => { onClear(); setShowMenu(false); }}
                  className={`${textClass} hover:opacity-50 transition-opacity`}
                  aria-label="Clear all text"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden sm:flex items-center justify-between gap-8">
            {/* Word Count */}
            <div className={`${textClass} opacity-40`}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </div>

            {/* Controls Group */}
            <div className="flex items-center gap-8 lg:gap-12">
              {/* Zoom Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onDecreaseFontSize}
                  className={`${textClass} hover:opacity-50 transition-opacity px-2`}
                  aria-label="Decrease font size"
                >
                  −
                </button>
                <div className={`${textClass} opacity-40 min-w-[3ch] text-center`}>
                  {fontSize}
                </div>
                <button
                  onClick={onIncreaseFontSize}
                  className={`${textClass} hover:opacity-50 transition-opacity px-2`}
                  aria-label="Increase font size"
                >
                  +
                </button>
              </div>

              {/* Font Selector */}
              <div>
                <select
                  value={fontFamily}
                  onChange={(e) => onChangeFontFamily(e.target.value)}
                  className={`${bgClass} ${textClass} outline-none cursor-pointer hover:opacity-50 transition-opacity appearance-none bg-transparent`}
                  aria-label="Select font family"
                >
                  <option value="Inter">Inter</option>
                  <option value="Geist">Geist</option>
                  <option value="ui-sans-serif">System</option>
                  <option value="Georgia">Georgia</option>
                  <option value="ui-monospace">Mono</option>
                </select>
              </div>

              {/* Density Toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onChangeDensity('loose')}
                  className={`${textClass} hover:opacity-50 transition-opacity ${
                    density === 'loose' ? 'opacity-100' : 'opacity-30'
                  }`}
                  aria-label="Set loose line spacing"
                  aria-pressed={density === 'loose'}
                >
                  Loose
                </button>
                <span className={`${textClass} opacity-20`}>/</span>
                <button
                  onClick={() => onChangeDensity('dense')}
                  className={`${textClass} hover:opacity-50 transition-opacity ${
                    density === 'dense' ? 'opacity-100' : 'opacity-30'
                  }`}
                  aria-label="Set dense line spacing"
                  aria-pressed={density === 'dense'}
                >
                  Dense
                </button>
              </div>

              {/* Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={`${textClass} opacity-40 hover:opacity-100 transition-opacity tracking-[0.2em]`}
                  aria-label="Toggle menu"
                  aria-expanded={showMenu}
                >
                  •••
                </button>

                {/* Desktop Dropdown Menu */}
                {showMenu && (
                  <div className={`absolute bottom-full right-0 mb-4 ${bgClass} ${separatorClass} border backdrop-blur-sm py-3 px-4 space-y-3 min-w-[120px]`}>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { onToggleDark(); setShowMenu(false); }}
                        className={`${textClass} hover:opacity-50 transition-opacity ${
                          !isDark ? 'opacity-100' : 'opacity-30'
                        }`}
                        aria-label="Switch to light mode"
                        aria-pressed={!isDark}
                      >
                        Light
                      </button>
                      <span className={`${textClass} opacity-20`}>/</span>
                      <button
                        onClick={() => { onToggleDark(); setShowMenu(false); }}
                        className={`${textClass} hover:opacity-50 transition-opacity ${
                          isDark ? 'opacity-100' : 'opacity-30'
                        }`}
                        aria-label="Switch to dark mode"
                        aria-pressed={isDark}
                      >
                        Dark
                      </button>
                    </div>
                    <button
                      onClick={() => { onExport(); setShowMenu(false); }}
                      className={`${textClass} hover:opacity-50 transition-opacity block w-full text-left`}
                      aria-label="Export text to file"
                    >
                      Export
                    </button>
                    <button
                      onClick={() => { onClear(); setShowMenu(false); }}
                      className={`${textClass} hover:opacity-50 transition-opacity block w-full text-left`}
                      aria-label="Clear all text"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
