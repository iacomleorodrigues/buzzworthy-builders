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
    if (!text.includes("na mesma frequência")) {
      return displayedText;
    }

    const parts = text.split("na mesma frequência");
    const before = parts[0];
    const target = "na mesma frequência";
    const after = parts[1];

    let currentLength = 0;
    
    const beforeSegment = before ? displayedText.slice(0, before.length) : "";
    currentLength += before.length;

    const targetSegment = displayedText.length > currentLength 
      ? displayedText.slice(currentLength, currentLength + target.length)
      : "";
    currentLength += target.length;

    const afterSegment = displayedText.length > currentLength
      ? displayedText.slice(currentLength)
      : "";

    return (
      <>
        {beforeSegment}
        {targetSegment && (
          <span className="text-primary glow-pink">{targetSegment}</span>
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
