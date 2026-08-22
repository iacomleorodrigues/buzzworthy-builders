import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingEffect({
  text,
  className = "",
  speed = 50,
  delay = 500,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, started]);

  return (
    <span className={className}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
}
