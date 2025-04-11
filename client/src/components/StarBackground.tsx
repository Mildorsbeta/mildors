import { useEffect, useRef } from "react";

export default function StarBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear existing stars
    container.innerHTML = '';
    
    // Create various star types
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      
      // Randomly assign different star sizes and opacities for variety
      const size = Math.random() < 0.8 ? 2 : Math.random() < 0.95 ? 3 : 4;
      const opacity = 0.2 + Math.random() * 0.6;
      
      // Apply star styles
      star.classList.add('star');
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = opacity.toString();
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animationDuration = `${3 + Math.random() * 4}s`;
      
      // Add occasional shooting star
      if (Math.random() < 0.1) {
        star.classList.add('shooting-star');
        star.style.animationDuration = `${4 + Math.random() * 6}s`;
        star.style.animationDelay = `${Math.random() * 20}s`;
      } else if (Math.random() < 0.05) {
        // Add occasional twinkling star with faster animation
        star.classList.add('twinkle-star');
        star.style.animationDuration = `${1 + Math.random() * 2}s`;
      }
      
      container.appendChild(star);
    }
    
    // Create subtle nebula effect
    for (let i = 0; i < 3; i++) {
      const nebula = document.createElement('div');
      nebula.classList.add('nebula');
      nebula.style.top = `${Math.random() * 100}%`;
      nebula.style.left = `${Math.random() * 100}%`;
      nebula.style.width = `${150 + Math.random() * 200}px`;
      nebula.style.height = `${150 + Math.random() * 200}px`;
      nebula.style.opacity = (0.03 + Math.random() * 0.06).toString();
      nebula.style.animationDuration = `${30 + Math.random() * 40}s`;
      nebula.style.animationDelay = `${Math.random() * 10}s`;
      
      // Randomly assign colors
      const colorVariants = ['#3B92D3', '#46237A', '#00CCFF'];
      const color = colorVariants[Math.floor(Math.random() * colorVariants.length)];
      nebula.style.backgroundColor = color;
      
      container.appendChild(nebula);
    }
    
    // Add mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const stars = container.querySelectorAll('.star');
      const nebulas = container.querySelectorAll('.nebula');
      
      stars.forEach((star) => {
        const starElement = star as HTMLElement;
        const moveX = (x - 0.5) * 2; // -1 to 1
        const moveY = (y - 0.5) * 2; // -1 to 1
        starElement.style.transform = `translate(${moveX * 3}px, ${moveY * 3}px)`;
      });
      
      nebulas.forEach((nebula) => {
        const nebulaElement = nebula as HTMLElement;
        const moveX = (x - 0.5) * 2; // -1 to 1
        const moveY = (y - 0.5) * 2; // -1 to 1
        nebulaElement.style.transform = `translate(${moveX * 10}px, ${moveY * 10}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={containerRef}
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        id="stars-container"
      />
      
      {/* First shooting star - top long diagonal direction (based on screenshot) */}
      <div className="fixed z-[1] pointer-events-none top-[12%] left-[15%]">
        <div className="shooting-star-custom shooting-star-1"></div>
      </div>
      
      {/* Second shooting star - short diagonal direction (based on screenshot) */}
      <div className="fixed z-[1] pointer-events-none top-[19%] left-[35%]">
        <div className="shooting-star-custom shooting-star-2"></div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes stars {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.1; transform: scale(1); }
        }
        
        @keyframes shooting {
          0% { 
            transform: translateX(0) translateY(0); 
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% { 
            transform: translateX(200px) translateY(200px); 
            opacity: 0;
          }
        }
        
        @keyframes nebula-pulse {
          0% { transform: scale(1); opacity: 0.04; }
          50% { transform: scale(1.1); opacity: 0.07; }
          100% { transform: scale(1); opacity: 0.04; }
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: stars 3s infinite;
          transition: transform 0.2s ease-out;
        }
        
        .twinkle-star {
          animation: twinkle 2s infinite;
        }
        
        .shooting-star {
          width: 3px !important;
          height: 3px !important;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1)) !important;
          border-radius: 0 !important;
          animation: shooting 8s linear infinite !important;
        }
        
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: nebula-pulse 30s infinite;
          transition: transform 0.8s ease-out;
        }
        
        /* Custom Shooting Stars */
        @keyframes shootingStar1 {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(500px) translateY(120px);
            opacity: 0;
          }
        }
        
        @keyframes shootingStar2 {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px) translateY(120px);
            opacity: 0;
          }
        }
        
        .shooting-star-custom {
          position: absolute;
          height: 3px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
          filter: drop-shadow(0 0 6px white);
          transform-origin: left center;
        }
        
        .shooting-star-1 {
          width: 180px;
          animation: shootingStar1 8s linear infinite;
          animation-delay: 1s;
          transform: rotate(15deg);
        }
        
        .shooting-star-2 {
          width: 120px;
          animation: shootingStar2 7s linear infinite;
          animation-delay: 4s;
          transform: rotate(30deg);
        }
      `}} />
    </>
  );
}
