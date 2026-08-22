import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: string;
  duration?: number;
}

export function CountUp({ end, duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  // Parse the number from the string (e.g., "+137" -> 137, "+83%" -> 83, "+R$2MM" -> 2)
  const numericMatch = end.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  
  const prefix = end.split(numericMatch?.[0] || '')[0] || '';
  const suffix = end.split(numericMatch?.[0] || '')[1] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (outQuad)
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={countRef}>
      {prefix}{count}{suffix}
    </span>
  );
}
