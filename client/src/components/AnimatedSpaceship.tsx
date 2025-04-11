import { useEffect, useRef } from 'react';
import spaceshipImage from '../assets/spaceship.png';

interface AnimatedSpaceshipProps {
  className?: string;
  speed?: number;
  hoverRange?: number;
  rotationRange?: number;
}

export default function AnimatedSpaceship({ 
  className = "", 
  speed = 2, 
  hoverRange = 10,
  rotationRange = 3
}: AnimatedSpaceshipProps) {
  const spaceshipRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let position = 0;
    let rotation = 0;
    let horizontalPosition = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Hover animation (up and down)
      position = Math.sin(elapsed / (1000 / speed)) * hoverRange;
      
      // Slight rotation
      rotation = Math.sin(elapsed / (1500 / speed)) * rotationRange;
      
      // Slight horizontal drift (slower than vertical)
      horizontalPosition = Math.sin(elapsed / (2000 / speed)) * (hoverRange / 2);
      
      if (spaceshipRef.current) {
        spaceshipRef.current.style.transform = `translate(${horizontalPosition}px, ${position}px) rotate(${rotation}deg)`;
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [speed, hoverRange, rotationRange]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Enhanced glow effects */}
      <div className="absolute -inset-4 bg-[#00CCFF]/5 blur-2xl rounded-full animate-pulse-glow"></div>
      <div className="absolute inset-0 bg-[#00CCFF]/10 blur-xl rounded-full"></div>
      
      <div 
        ref={spaceshipRef} 
        className="transition-transform will-change-transform relative z-10"
        style={{ transformOrigin: 'center' }}
      >
        <img 
          src={spaceshipImage} 
          alt="Spaceship" 
          className="object-contain w-full h-full drop-shadow-lg"
        />
        
        {/* Enhanced engine thruster glow effect */}
        <div className="absolute -bottom-2 left-1/3 w-12 h-10 bg-[#00CCFF] blur-xl rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-3 left-1/3 w-10 h-8 bg-[#00CCFF]/80 blur-lg rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute -bottom-4 left-1/3 w-8 h-6 bg-white/70 blur-md rounded-full opacity-60 animate-pulse"></div>
        
        {/* Enhanced particle trail */}
        <div className="absolute -bottom-8 left-1/3 flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="rounded-full bg-[#00CCFF]/80 opacity-80"
              style={{
                width: `${Math.max(3 - i * 0.3, 0.5)}px`,
                height: `${Math.max(3 - i * 0.3, 0.5)}px`,
                animation: `fadeOut 2s infinite ${i * 0.15}s`,
                transform: `translateY(${i * 6}px) translateX(${Math.sin(i) * 5}px)`
              }}
            ></div>
          ))}
        </div>
        
        {/* Light reflections */}
        <div className="absolute top-1/4 left-1/4 w-10 h-2 bg-white/40 blur-sm rounded-full rotate-45 opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-1.5 bg-white/30 blur-sm rounded-full rotate-[30deg] opacity-50"></div>
        
        {/* Cockpit glow */}
        <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-yellow-400/40 blur-sm rounded-full opacity-70"></div>
      </div>
    </div>
  );
}