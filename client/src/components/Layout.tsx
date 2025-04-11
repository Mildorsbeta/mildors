import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StarBackground from "./StarBackground";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="font-['Exo_2'] text-gray-100 min-h-screen bg-[#0A0A0F] relative overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        body {
          background-color: #0A0A0F;
          background-image: 
            radial-gradient(circle at 15% 25%, rgba(59, 146, 211, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 85% 75%, rgba(70, 35, 122, 0.08) 0%, transparent 25%);
          overflow-x: hidden;
        }
        
        .hero-glow {
          box-shadow: 0 0 120px 20px rgba(0, 204, 255, 0.15);
        }
        
        @keyframes stars {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: stars 3s infinite;
        }
        
        .navbar-blur {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite;
        }
        `
      }} />
      
      <StarBackground />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
