import { PlayCircleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Gameplay() {
  const titleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  // YouTube video ID
  const videoId = "xf3LB0tUJZs";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe title
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    // Observe video
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Observe each feature with staggered delay
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          observer.observe(ref);
        }, 300 + index * 200);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePlayButtonHover = () => {
    const playButton = document.querySelector('.play-button');
    playButton?.classList.add('animate-pulse');
  };

  const handlePlayButtonLeave = () => {
    const playButton = document.querySelector('.play-button');
    playButton?.classList.remove('animate-pulse');
  };
  
  const togglePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section id="gameplay" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Gameplay</h2>
          <div className="w-24 h-1 bg-[#00CCFF] mx-auto mt-4"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Everything you need to survive in the depths of space.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div 
                ref={el => featureRefs.current[0] = el}
                className="border-l-4 border-[#00CCFF] pl-4 opacity-0 translate-y-8 transition-all duration-700 transform hover:translate-x-2 hover:border-l-6"
              >
                <h3 className="text-xl font-semibold text-white">Exploration & Adventure</h3>
                <p className="text-gray-400 mt-2">
                  Explore planets, asteroids, and abandoned space stations in a vast cosmic environment. Each mission is filled with unique challenges.
                </p>
              </div>
              
              <div 
                ref={el => featureRefs.current[1] = el}
                className="border-l-4 border-[#FF7B25] pl-4 opacity-0 translate-y-8 transition-all duration-700 transform hover:translate-x-2 hover:border-l-6"
              >
                <h3 className="text-xl font-semibold text-white">Team Management</h3>
                <p className="text-gray-400 mt-2">
                  Each player has unique abilities. Contribute to the team as a pilot, engineer, doctor, or security officer.
                </p>
              </div>
              
              <div 
                ref={el => featureRefs.current[2] = el}
                className="border-l-4 border-[#46237A] pl-4 opacity-0 translate-y-8 transition-all duration-700 transform hover:translate-x-2 hover:border-l-6"
              >
                <h3 className="text-xl font-semibold text-white">Resource Management</h3>
                <p className="text-gray-400 mt-2">
                  Use limited resources wisely. Make strategic decisions for oxygen, fuel, and equipment to ensure survival.
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div 
              ref={videoRef}
              className="relative opacity-0 translate-y-8 transition-all duration-1000 w-full max-w-md rounded-lg overflow-hidden"
            >
              <div className="relative">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    className="w-full aspect-video rounded-lg shadow-xl"
                    title="YouTube game trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                ) : (
                  <div 
                    className="w-full aspect-video rounded-lg relative overflow-hidden cursor-pointer shadow-xl"
                    onClick={togglePlayVideo}
                  >
                    {/* YouTube thumbnail */}
                    <img 
                      src={thumbnailError 
                        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` 
                        : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                      }
                      alt="Video Thumbnail" 
                      className="w-full h-full object-cover"
                      onError={() => setThumbnailError(true)}
                    />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="w-16 h-16 rounded-full bg-[#00CCFF]/30 backdrop-blur-md flex items-center justify-center transition-transform duration-300 hover:scale-110">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center">
                          <PlayCircleIcon className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video label */}
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm flex items-center gap-1.5">
                      <PlayCircleIcon className="h-4 w-4" /> Oyun Videosu
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-20 top-1/3 w-80 h-80 rounded-full bg-[#46237A]/5 blur-3xl animate-pulse-slow"></div>
      </div>
    </section>
  );
}
