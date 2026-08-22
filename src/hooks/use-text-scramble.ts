import { useState, useEffect } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export function useTextScramble(text: string, duration = 1.5, delay = 0) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration * 60;
    const interval = 1000 / 60;
    
    const timer = setTimeout(() => {
      const animate = () => {
        let currentText = '';
        const progress = frame / totalFrames;

        for (let i = 0; i < text.length; i++) {
          if (progress > i / text.length) {
            currentText += text[i];
          } else {
            currentText += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setOutput(currentText);

        if (frame < totalFrames) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          setOutput(text);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, duration, delay]);

  return output;
}
