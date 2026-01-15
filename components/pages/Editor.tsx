import { useState, useRef, useEffect } from 'react';
import { StatusBar } from './StatusBar';

interface EditorProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export function Editor({ isDark, onToggleDark }: EditorProps) {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [density, setDensity] = useState<'loose' | 'dense'>('loose');
  const [fontFamily, setFontFamily] = useState('Inter');
  const editorRef = useRef<HTMLDivElement>(null);

  // Load saved content and preferences on mount
  useEffect(() => {
    const savedText = localStorage.getItem('mono-text');
    const savedFontSize = localStorage.getItem('mono-fontSize');
    const savedDensity = localStorage.getItem('mono-density');
    const savedFontFamily = localStorage.getItem('mono-fontFamily');

    if (savedText) {
      setText(savedText);
      // Also set the innerText directly to ensure it displays
      if (editorRef.current) {
        editorRef.current.innerText = savedText;
      }
    }
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedDensity) setDensity(savedDensity as 'loose' | 'dense');
    if (savedFontFamily) setFontFamily(savedFontFamily);
  }, []);

  // Save content to localStorage
  useEffect(() => {
    localStorage.setItem('mono-text', text);
  }, [text]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('mono-fontSize', fontSize.toString());
    localStorage.setItem('mono-density', density);
    localStorage.setItem('mono-fontFamily', fontFamily);
  }, [fontSize, density, fontFamily]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.innerText;
    setText(newText);
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const plainText = e.clipboardData.getData('text/plain');
    
    // Use modern approach instead of deprecated execCommand
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(plainText);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Trigger input event to update state
    if (editorRef.current) {
      const event = new Event('input', { bubbles: true });
      editorRef.current.dispatchEvent(event);
    }
  };

  const updateBionicDisplay = () => {
    if (!editorRef.current) return;
    
    const currentText = editorRef.current.innerText;
    
    if (!currentText) {
      editorRef.current.innerHTML = '';
      return;
    }

    // Save cursor position as character offset
    const selection = window.getSelection();
    let cursorPosition = 0;
    
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      cursorPosition = preCaretRange.toString().length;
    }

    const words = currentText.split(/(\s+)/);
    const html = words.map((word) => {
      if (word.trim().length === 0) {
        return word;
      }

      const cleanWord = word.trim();
      const boldLength = Math.ceil(cleanWord.length / 2);
      const boldPart = cleanWord.slice(0, boldLength);
      const normalPart = cleanWord.slice(boldLength);
      
      const leadingSpace = word.match(/^\s*/)?.[0] || '';
      const trailingSpace = word.match(/\s*$/)?.[0] || '';

      return `${leadingSpace}<strong>${boldPart}</strong>${normalPart}${trailingSpace}`;
    }).join('');

    editorRef.current.innerHTML = html;

    // Restore cursor position
    const restoreCursor = (node: Node, position: number): { node: Node; offset: number } | null => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = node.textContent?.length || 0;
        if (position <= textLength) {
          return { node, offset: position };
        }
        return null;
      }

      let currentPos = 0;
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        const childText = child.textContent || '';
        const childLength = childText.length;

        if (currentPos + childLength >= position) {
          const result = restoreCursor(child, position - currentPos);
          if (result) return result;
        }

        currentPos += childLength;
      }

      return null;
    };

    const restored = restoreCursor(editorRef.current, cursorPosition);
    if (restored && selection) {
      const newRange = document.createRange();
      newRange.setStart(restored.node, restored.offset);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  useEffect(() => {
    updateBionicDisplay();
  }, [text]);

  const handleExport = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mono-export.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all text? This action cannot be undone.')) {
      setText('');
      if (editorRef.current) {
        editorRef.current.innerText = '';
      }
      localStorage.removeItem('mono-text');
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineHeight = density === 'loose' ? '2' : '1.6';

  const bgClass = isDark ? 'bg-black' : 'bg-white';
  const textClass = isDark ? 'text-neutral-100' : 'text-black';
  const gradientTopClass = isDark 
    ? 'from-black via-black/80 to-transparent' 
    : 'from-white via-white/80 to-transparent';
  const gradientBottomClass = isDark
    ? 'from-transparent via-black/80 to-black'
    : 'from-transparent via-white/80 to-white';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-500 relative`}>
      {/* Top Fade Gradient */}
      <div className={`fixed top-0 left-0 right-0 h-32 bg-gradient-to-b ${gradientTopClass} pointer-events-none z-30`} />

      {/* Editor Content */}
      <div className="px-8 py-32 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onPaste={handlePaste}
            role="textbox"
            aria-label="Text editor with bionic reading"
            aria-multiline="true"
            className={`outline-none min-h-[60vh] ${textClass} whitespace-pre-wrap caret-black dark:caret-white`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              fontFamily: fontFamily,
              maxWidth: '70ch',
              margin: '0 auto',
            }}
            data-placeholder={!text ? 'Start typing…' : ''}
          />
        </div>
      </div>

      {/* Bottom Fade Gradient */}
      <div className={`fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-b ${gradientBottomClass} pointer-events-none z-30`} />

      {/* Status Bar */}
      {text && (
        <StatusBar
          wordCount={wordCount}
          fontSize={fontSize}
          onIncreaseFontSize={() => setFontSize(Math.min(32, fontSize + 2))}
          onDecreaseFontSize={() => setFontSize(Math.max(12, fontSize - 2))}
          fontFamily={fontFamily}
          onChangeFontFamily={setFontFamily}
          density={density}
          onChangeDensity={setDensity}
          isDark={isDark}
          onToggleDark={onToggleDark}
          onExport={handleExport}
          onClear={handleClear}
        />
      )}

      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          opacity: 0.2;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}