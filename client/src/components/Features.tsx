import { Users, ShieldCheckIcon, BoltIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import blueReefPlanetGif from "../assets/blue-reef-static.webp";
import basicProductionGif from "../assets/basic-production-static.webp";
import friendsGif from "../assets/friends-static.webp";

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const gifRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe section title
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe each feature card with staggered delay
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          observer.observe(ref);
        }, index * 200);
      }
    });

    // Observe each GIF card with staggered delay
    gifRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(
          () => {
            observer.observe(ref);
          },
          index * 300 + 600,
        ); // Longer delay for GIFs to appear after feature cards
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-12 transition-all duration-1000"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Game Features
          </h2>
          <div className="w-24 h-1 bg-[#00CCFF] mx-auto mt-4"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Embark on space adventures with Mildors's unique features and face
            the greatest dangers in the galaxy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div
            ref={(el) => (featureRefs.current[0] = el)}
            className="bg-[#1A1A35]/40 backdrop-blur-sm border border-[#3B92D3]/20 rounded-xl p-6 hover:border-[#00CCFF]/40 transition-all duration-700 group opacity-0 translate-y-12 hover:scale-105 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-full bg-[#46237A]/20 flex items-center justify-center mb-6 group-hover:bg-[#46237A]/30 transition-all duration-300">
              <Users className="h-8 w-8 text-[#00CCFF] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Co-op Gameplay
            </h3>
            <p className="text-gray-400">
              Play with 1-4 players in an exciting game experience that
              emphasizes teamwork, collaboration, and shared victory.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            ref={(el) => (featureRefs.current[1] = el)}
            className="bg-[#1A1A35]/40 backdrop-blur-sm border border-[#3B92D3]/20 rounded-xl p-6 hover:border-[#00CCFF]/40 transition-all duration-700 group opacity-0 translate-y-12 hover:scale-105 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-full bg-[#46237A]/20 flex items-center justify-center mb-6 group-hover:bg-[#46237A]/30 transition-all duration-300">
              <ShieldCheckIcon className="h-8 w-8 text-[#00CCFF] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Survival</h3>
            <p className="text-gray-400">
              Manage oxygen, energy, and resources. Stay alive by making
              strategic decisions against enemy threats.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            ref={(el) => (featureRefs.current[2] = el)}
            className="bg-[#1A1A35]/40 backdrop-blur-sm border border-[#3B92D3]/20 rounded-xl p-6 hover:border-[#00CCFF]/40 transition-all duration-700 group opacity-0 translate-y-12 hover:scale-105 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 rounded-full bg-[#46237A]/20 flex items-center justify-center mb-6 group-hover:bg-[#46237A]/30 transition-all duration-300">
              <BoltIcon className="h-8 w-8 text-[#00CCFF] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Rescue Missions
            </h3>
            <p className="text-gray-400">
              Explore damaged spaceships, salvage valuable resources, and battle
              dangerous enemies in unknown territories.
            </p>
          </div>
        </div>

        {/* Gameplay GIFs */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Game Previews
          </h3>
          <div className="grid grid-cols-1 gap-10">
            {/* GIF 1 */}
            <div
              ref={(el) => (gifRefs.current[0] = el)}
              className="bg-[#1A1A35]/60 backdrop-blur-md border border-[#3B92D3]/30 rounded-xl overflow-hidden hover:border-[#00CCFF]/40 transition-all duration-700 transform hover:scale-[1.02] shadow-xl opacity-0 translate-y-12"
            >
              <div className="relative">
                <img
                  src={blueReefPlanetGif}
                  alt="Blue Reef Planet Gameplay"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A35]/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-6">
                  <h4 className="text-white text-lg font-medium">
                    Planet Exploration
                  </h4>
                  <p className="text-[#00CCFF] text-sm">
                    Discover alien environments
                  </p>
                </div>
              </div>
            </div>

            {/* GIF 2 */}
            <div
              ref={(el) => (gifRefs.current[1] = el)}
              className="bg-[#1A1A35]/60 backdrop-blur-md border border-[#3B92D3]/30 rounded-xl overflow-hidden hover:border-[#00CCFF]/40 transition-all duration-700 transform hover:scale-[1.02] shadow-xl opacity-0 translate-y-12"
            >
              <div className="relative">
                <img
                  src={basicProductionGif}
                  alt="Basic Production Gameplay"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A35]/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-6">
                  <h4 className="text-white text-lg font-medium">
                    Resource Management
                  </h4>
                  <p className="text-[#00CCFF] text-sm">
                    Build and manage your resources
                  </p>
                </div>
              </div>
            </div>

            {/* GIF 3 */}
            <div
              ref={(el) => (gifRefs.current[2] = el)}
              className="bg-[#1A1A35]/60 backdrop-blur-md border border-[#3B92D3]/30 rounded-xl overflow-hidden hover:border-[#00CCFF]/40 transition-all duration-700 transform hover:scale-[1.02] shadow-xl opacity-0 translate-y-12"
            >
              <div className="relative">
                <img
                  src={friendsGif}
                  alt="Friends Gameplay"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A35]/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-6">
                  <h4 className="text-white text-lg font-medium">
                    Team Collaboration
                  </h4>
                  <p className="text-[#00CCFF] text-sm">
                    Work together with friends
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-[#00CCFF]/20 to-transparent animate-pulse-slow"></div>
        <div className="absolute right-0 bottom-1/4 w-full h-px bg-gradient-to-r from-transparent via-[#46237A]/20 to-transparent animate-pulse-slow"></div>
      </div>
    </section>
  );
}
