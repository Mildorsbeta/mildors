import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

// Mouse cursor dot component like warheirs.com
function CursorShadow() {
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      
      // Add lerp effect for smoother following with improved animation
      const target = { x: e.clientX, y: e.clientY };
      requestAnimationFrame(() => {
        const lerp = (start: number, end: number, factor: number) => {
          return start + (end - start) * factor;
        };
        
        // Increased smoothness factor for modern feel
        setDotPosition(prev => ({
          x: lerp(prev.x, target.x, 0.15),
          y: lerp(prev.y, target.y, 0.15),
        }));
      });
      
      if (!isVisible) setIsVisible(true);
      
      // Enhanced detection for interactive elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isClickable = element && (
        element.tagName === 'BUTTON' || 
        element.tagName === 'A' || 
        element.closest('a') || 
        element.closest('button') ||
        element.getAttribute('role') === 'button' ||
        element.classList.contains('interactive')
      );
      
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
      // Add a small delay before reverting to normal cursor state
      setTimeout(() => {
        setIsClicking(false);
      }, 150);
    };
    
    // Initialize dot position on first load
    setDotPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // We want to show the default cursor
    // document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor');
    };
  }, [isVisible]);

  return (
    <>
      {/* White dot cursor with regular cursor visible */}
      <div 
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${cursor.x}px`,
          top: `${cursor.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className={`rounded-full transition-all duration-200 ${
            isClicking ? 'w-3 h-3 bg-white' : 'w-2.5 h-2.5 bg-white'
          }`}
          style={{
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
          }}
        ></div>
      </div>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <CursorShadow />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
