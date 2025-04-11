import { useEffect, useRef } from "react";
import colorfulBubbleBg from "../assets/bubble-bg-optimized.webp";

export default function Download() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonsRefs = useRef<Array<HTMLElement | null>>([]);
  const platformRefs = useRef<Array<HTMLElement | null>>([]);

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
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Observe each button with staggered delay
    buttonsRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(
          () => {
            observer.observe(ref);
          },
          500 + index * 150,
        );
      }
    });

    // Observe each platform link with staggered delay
    platformRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(
          () => {
            observer.observe(ref);
          },
          800 + index * 100,
        );
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="download" className="py-20 relative">
      {/* Colorful Bubble Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-80">
          <img
            src={colorfulBubbleBg}
            alt="Colorful Abstract Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0A0A1A]/40 backdrop-blur-[1px]"></div>
      </div>

      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="bg-gradient-to-r from-[#1A1A35]/80 via-[#46237A]/40 to-[#1A1A35]/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-[#3B92D3]/30 shadow-2xl hover:shadow-[#00CCFF]/10 hover:border-[#00CCFF]/30 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              ref={contentRef}
              className="p-8 lg:p-12 flex flex-col justify-center opacity-0 translate-y-8 transition-all duration-1000"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                System Requirements
              </h2>
              <p className="mt-4 text-gray-300">
                Make sure your system meets these requirements to enjoy the best
                Mildors experience.
              </p>

              <div className="mt-8 space-y-6">
                <div
                  ref={(el) => (buttonsRefs.current[0] = el)}
                  className="bg-[#1A1A35]/70 p-5 rounded-md border border-[#3B92D3]/30 hover:border-[#00CCFF]/40 transition-all duration-300 opacity-0 translate-y-8"
                >
                  <h3 className="flex items-center text-xl font-semibold text-[#00CCFF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z"></path>
                    </svg>
                    Windows
                  </h3>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <p className="text-gray-400 text-sm">Minimum</p>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li>OS: Windows 10 64-bit</li>
                        <li>Processor: Intel Core i3-3470</li>
                        <li>Memory: 3 GB RAM</li>
                        <li>Graphics: NVIDIA GT 730</li>
                        <li>Storage: 100 MB available</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Recommended</p>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li>OS: Windows 11 64-bit</li>
                        <li>Processor: Intel Core 5-8600K</li>
                        <li>Memory: 16 GB RAM</li>
                        <li>Graphics: NVIDIA RTX 2060</li>
                        <li>Storage: 1 GB SSD</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => (platformRefs.current[0] = el)}
                  className="bg-[#1A1A35]/70 p-5 rounded-md border border-[#3B92D3]/30 hover:border-[#00CCFF]/40 transition-all duration-300 opacity-0 translate-y-8"
                >
                  <h3 className="text-xl font-semibold text-[#00CCFF]">
                    Additional Requirements
                  </h3>
                  <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                    <li>Network: Broadband Internet connection</li>
                    <li>
                      Input: Keyboard and mouse, gamepad (Xbox or PlayStation
                      controller recommended)
                    </li>
                    <li>Audio: DirectX compatible sound card</li>
                    <li>
                      Additional Notes: 4-player co-op requires all players to
                      have their own copy of the game
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-0 flex items-center justify-center">
              <div
                ref={imageRef}
                className="rounded-lg overflow-hidden shadow-lg w-full h-full opacity-0 translate-y-8 transition-all duration-1000 hover:shadow-xl hover:shadow-[#00CCFF]/10 transform hover:scale-[1.02]"
              >
                <div className="bg-[#1A1A35]/90 p-6 h-full">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Launch
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Join the Mildors early access and be among the first to
                    explore the universe.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="https://cdn.discordapp.com/attachments/1335268339299127306/1352792821853061141/Mildors.rar?ex=67fa54be&is=67f9033e&hm=49f5662909c22f5be335cc4011047fe103db8f72afcf8d9856c8cc3917827b45&"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-8 py-3 w-full bg-[#00CCFF] hover:bg-[#00CCFF]/90 text-[#0A0A0F] font-semibold rounded-md transition-all duration-300 shadow-lg shadow-[#00CCFF]/20 hover:scale-105 transform"
                    >
                      Download Now
                    </a>

                    <div className="grid grid-cols-3 gap-4">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#3B92D3]/30 hover:border-[#00CCFF]/40 p-3 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#1A1A35]/50 transform hover:scale-105"
                      >
                        <span className="text-white">Steam</span>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#3B92D3]/30 hover:border-[#00CCFF]/40 p-3 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#1A1A35]/50 transform hover:scale-105"
                      >
                        <span className="text-white">Epic</span>
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#3B92D3]/30 hover:border-[#00CCFF]/40 p-3 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-[#1A1A35]/50 transform hover:scale-105"
                      >
                        <span className="text-white">GOG</span>
                      </a>
                    </div>

                    <div className="mt-6 p-4 bg-[#46237A]/30 rounded-md border border-[#46237A]/40">
                      <p className="text-sm text-gray-300">
                        Release Date:{" "}
                        <span className="text-[#00CCFF]">
                          Steam/Epic/GOG release date: May 2025
                        </span>
                      </p>
                      <p className="text-sm text-gray-300 mt-1">
                        Early Access:{" "}
                        <span className="text-[#00CCFF]">
                          Early/Beta Access: Available Now
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00CCFF]/10 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#46237A]/10 to-transparent animate-pulse-slow"></div>
      </div>
    </section>
  );
}
