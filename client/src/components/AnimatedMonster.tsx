import { useEffect, useRef } from "react";
import characterImage from "@assets/pngwing.com (1) (1).png";

interface AnimatedCharacterProps {
  className?: string;
  opacity?: number;
  speed?: number;
  hoverRange?: number;
  rotationRange?: number;
}

export default function AnimatedCharacter({ 
  className = "",
  opacity = 0.6,
  speed = 1,
  hoverRange = 10,
  rotationRange = 5
}: AnimatedCharacterProps) {
  const characterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const character = characterRef.current;
    if (!character) return;
    
    // Initialize position
    let currentY = 0;
    let currentRotation = 0;
    let direction = 1;
    
    // Animation timing
    const frameDuration = 1000 / 60; // 60fps
    const cycleDuration = 3000 * (1 / speed); // 3 seconds for one complete cycle, adjusted by speed
    
    // Calculate the step per frame to complete a cycle in cycleDuration
    const yStepPerFrame = (hoverRange * 2) / (cycleDuration / frameDuration);
    const rotationStepPerFrame = (rotationRange * 2) / (cycleDuration / frameDuration);
    
    let lastTimestamp = 0;
    let animationFrameId: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (elapsed >= frameDuration) {
        // Update position based on direction
        currentY += yStepPerFrame * direction;
        currentRotation += rotationStepPerFrame * direction;
        
        // Reverse direction when reaching range limits
        if (Math.abs(currentY) >= hoverRange) {
          direction *= -1;
        }
        
        // Apply the new position and rotation
        character.style.transform = `translateY(${currentY}px) rotate(${currentRotation}deg)`;
        lastTimestamp = timestamp;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, hoverRange, rotationRange]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Character container with animations */}
      <div 
        ref={characterRef} 
        className="transition-transform will-change-transform relative z-10"
        style={{ transformOrigin: 'center', opacity }}
      >
        <img 
          src={characterImage} 
          alt="Anime Character" 
          className="object-contain w-full h-full drop-shadow-lg"
        />
        
        {/* Glowing effect around the book */}
        <div className="absolute top-[40%] left-[45%] w-16 h-8 bg-red-500/30 blur-md rounded-lg opacity-70 animate-pulse"></div>
        
        {/* Sparkle effects around character */}
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-80" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-80" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-ping opacity-80" style={{ animationDuration: '2.5s' }}></div>
      </div>
    </div>
  );
}