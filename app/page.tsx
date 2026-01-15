'use client';

import { useState } from "react";
import { Editor } from "@/components/pages/Editor";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? "dark" : ""}>
      <Editor isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />
    </div>
  );
}
