import React, { useState, useEffect, useRef } from "react";

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
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          timer = setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [displayedText, text, speed, started]);

  const renderText = () => {
    const targetString = "mesma frequência";
    const highlightTrigger = "na " + targetString;
    
    if (!text.includes(highlightTrigger)) {
      return displayedText;
    }

    const parts = text.split(highlightTrigger);
    const beforeText = parts[0] || "";
    
    let currentLength = 0;
    
    const beforeSegment = displayedText.slice(0, Math.min(displayedText.length, beforeText.length));
    currentLength += beforeText.length;

    // "na " part (should be white/normal)
    const naText = "na ";
    const naSegment = displayedText.length > currentLength
      ? displayedText.slice(currentLength, Math.min(displayedText.length, currentLength + naText.length))
      : "";
    currentLength += naText.length;

    // "mesma frequência" part (pink)
    const pinkText = targetString;
    const pinkSegment = displayedText.length > currentLength
      ? displayedText.slice(currentLength, Math.min(displayedText.length, currentLength + pinkText.length))
      : "";
    currentLength += pinkText.length;

    const afterSegment = displayedText.length > currentLength
      ? displayedText.slice(currentLength)
      : "";

    return (
      <>
        {beforeSegment}
        {naSegment}
        {pinkSegment && (
          <span className="text-primary glow-pink">{pinkSegment}</span>
        )}
        {afterSegment}
      </>
    );
  };

  return (
    <span ref={elementRef} className={className}>
      {renderText()}
      {started && displayedText.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
}
