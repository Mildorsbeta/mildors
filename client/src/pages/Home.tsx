import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gameplay from "@/components/Gameplay";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Download from "@/components/Download";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href;
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <Gameplay />
      <Gallery />
      <Team />
      <Download />
    </>
  );
}
