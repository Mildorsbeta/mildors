import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Import optimized game images
import game1Image from "../assets/optimized/game1.webp";
import game2Image from "../assets/optimized/game2.webp";
import game3Image from "../assets/optimized/game3.webp";
import game4Image from "../assets/optimized/game4.webp";
import game5Image from "../assets/optimized/game5.webp";

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // Game gallery images with actual image paths
  const galleryImages = [
    {
      id: 1,
      title: "Picnic in the Garden",
      description: "Share special moments with friends in peaceful environments",
      color: "from-[#1A1A35] to-[#46237A]/40",
      image: game1Image
    },
    {
      id: 2,
      title: "Desert Exploration",
      description: "Navigate through harsh desert environments with your rover",
      color: "from-[#46237A]/40 to-[#1A1A35]",
      image: game2Image
    },
    {
      id: 3,
      title: "Space Farming",
      description: "Grow plants and manage resources in your space station",
      color: "from-[#3B92D3]/40 to-[#1A1A35]",
      image: game3Image
    },
    {
      id: 4,
      title: "Mystery Monolith",
      description: "Discover ancient alien artifacts and uncover their secrets",
      color: "from-[#1A1A35] to-[#3B92D3]/40",
      image: game4Image
    },
    {
      id: 5,
      title: "Alien Conversations",
      description: "Meet and communicate with strange extraterrestrial beings",
      color: "from-[#00CCFF]/30 to-[#1A1A35]",
      image: game5Image
    }
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

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

    // Observe section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe gallery container
    if (galleryRef.current) {
      setTimeout(() => {
        observer.observe(galleryRef.current!);
      }, 300);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">GALLERY</h2>
          <div className="w-24 h-1 bg-[#FFCC00] mx-auto mt-4"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Explore the universe of Mildors through stunning visuals
          </p>
        </div>
        
        <div 
          ref={galleryRef}
          className="relative opacity-0 translate-y-8 transition-all duration-700"
        >
          {/* Modern, draggable carousel */}
          <div className="bg-[#0a0a0f]/60 backdrop-blur-sm p-6 rounded-lg border border-[#ffffff]/5">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {galleryImages.map((image) => (
                  <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/20 transition-all duration-300 hover:border-[#FFCC00]/50 hover:shadow-lg hover:shadow-[#FFCC00]/10">
                      {/* Image placeholder with subtle shine effect on hover */}
                      <div 
                        className={`w-full h-full flex items-center justify-center overflow-hidden`}
                      >
                        {/* Game image */}
                        <img 
                          src={image.image} 
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Shine effect */}
                        <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-center p-4 transform transition-all duration-300 group-hover:scale-105">
                            <h3 className="text-xl text-white font-bold mb-2">{image.title}</h3>
                            <p className="text-[#00CCFF] text-sm max-w-xs">{image.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom info bar that appears on hover */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold">{image.title}</h3>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-5 h-5 bg-[#FFCC00]/0 group-hover:bg-[#FFCC00]/80 transition-all duration-300 transform origin-bottom-left rotate-0 group-hover:rotate-45"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center mt-4">
                <CarouselPrevious className="relative inset-auto mx-2 bg-black/40 hover:bg-black/60 border-none text-white" />
                <div className="flex gap-1">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        current === index 
                          ? 'bg-[#FFCC00] w-6' 
                          : 'bg-white/30 w-3 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <CarouselNext className="relative inset-auto mx-2 bg-black/40 hover:bg-black/60 border-none text-white" />
              </div>
            </Carousel>
            
            <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-4">
              <p className="text-sm text-gray-400">
                <span className="text-[#FFCC00] font-semibold">{current + 1}</span> of {count} images
              </p>
              <p className="text-sm text-gray-400">
                Drag to explore or use the navigation controls
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-[#46237A]/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute right-40 bottom-1/3 w-60 h-60 rounded-full bg-[#FFCC00]/5 blur-3xl animate-pulse-slow"></div>
      </div>
    </section>
  );
}