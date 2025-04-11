import { useEffect, useRef } from "react";
import AnimatedSpaceship from "./AnimatedSpaceship";
import AnimatedMonster from "./AnimatedMonster";
import spaceBackground from "../assets/ar2ljg.webp";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation classes after component mounts
    const elements = [
      { ref: titleRef, delay: 0 },
      { ref: subtitleRef, delay: 200 },
      { ref: descRef, delay: 400 },
      { ref: buttonsRef, delay: 600 },
      { ref: imageRef, delay: 800 },
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current?.classList.add("opacity-100", "translate-y-0");
          ref.current?.classList.remove("opacity-0", "translate-y-4");
        }, delay);
      }
    });
  }, []);

  return (
    <header className="relative pt-20 lg:pt-28 pb-20 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[3]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left -ml-[60px]">
            <div>
              <h2
                ref={subtitleRef}
                className="text-[#00CCFF] uppercase tracking-wider font-medium text-sm sm:text-base opacity-0 translate-y-4 transition-all duration-700 px-3 py-1.5 inline-block"
                style={{
                  background: "rgba(0, 10, 20, 0.7)",
                  border: "1px solid #00CCFF",
                  borderRadius: "4px",
                  boxShadow: "0 0 10px rgba(0, 204, 255, 0.3)",
                  letterSpacing: "0.15em",
                }}
              >
                A New Adventure in the Depths of Space
              </h2>
              <h1
                ref={titleRef}
                className="mt-2 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight opacity-0 translate-y-4 transition-all duration-700 relative"
                style={{
                  textShadow:
                    "3px 3px 0px #00CCFF, -1px -1px 0px #00CCFF, 0px 6px 10px rgba(0, 204, 255, 0.4)",
                  letterSpacing: "0.05em",
                  WebkitTextStroke: "1px #00CCFF",
                  transform: "scaleY(1.1)",
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  filter: "drop-shadow(0 0 5px rgba(0, 204, 255, 0.3))",
                }}
              >
                MILDORS
              </h1>
              <p className="mt-4 text-xl sm:text-2xl text-gray-300">
                1-4 Player Space Adventure
              </p>
            </div>
            <p
              ref={descRef}
              className="text-gray-400 max-w-lg mx-auto lg:mx-0 opacity-0 translate-y-4 transition-all duration-700"
            ></p>
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 translate-y-4 transition-all duration-700"
            >
              <a
                href="https://cdn.discordapp.com/attachments/1335268339299127306/1352792821853061141/Mildors.rar?ex=67fa54be&is=67f9033e&hm=49f5662909c22f5be335cc4011047fe103db8f72afcf8d9856c8cc3917827b45&"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#00CCFF] hover:bg-[#00CCFF]/90 text-[#0A0A0F] font-semibold rounded-md transition-all duration-300 shadow-lg shadow-[#00CCFF]/20 hover:scale-105 hover:-translate-y-1 transform"
              >
                Download Now
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-full max-w-md opacity-0 translate-y-4 transition-all duration-700"
            >
              <div
                className="rounded-lg shadow-2xl hero-glow p-6 w-full aspect-[3/4] backdrop-blur-sm border border-[#3B92D3]/20 overflow-hidden flex items-center justify-center"
                style={{
                  backgroundImage: `url(${spaceBackground})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay gradient to ensure content visibility */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A35]/40 to-[#46237A]/20 z-0"></div>

                <div className="relative z-10">
                  <AnimatedSpaceship
                    className="w-full max-w-sm transform scale-150"
                    speed={1.5}
                    hoverRange={12}
                  />
                </div>

                {/* Moon 1 - Large (blue-ish) - Repositioned & More Transparent */}
                <div
                  className="absolute top-[5%] right-[5%] w-32 h-32 rounded-full overflow-hidden shadow-2xl opacity-40"
                  style={{
                    animation: "float 10s ease-in-out infinite",
                    boxShadow: "0 0 20px rgba(59, 146, 211, 0.2)",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-[#1A233A] relative">
                    {/* Moon craters */}
                    <div className="absolute top-1/4 left-1/4 w-5 h-5 rounded-full bg-gray-800/60"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-gray-800/50"></div>
                    <div className="absolute top-2/3 left-1/3 w-4 h-4 rounded-full bg-gray-800/70"></div>
                    <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-gray-800/60"></div>
                    {/* Surface details */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#3B92D3]/10"></div>
                  </div>
                </div>

                {/* Moon 2 - Medium (rocky) - More Transparent */}
                <div
                  className="absolute bottom-[15%] left-[5%] w-24 h-24 rounded-full overflow-hidden shadow-xl opacity-30"
                  style={{
                    animation: "float 15s ease-in-out infinite reverse",
                    boxShadow: "0 0 15px rgba(150, 150, 150, 0.15)",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#6D5C54] to-[#473833] relative">
                    {/* Moon craters */}
                    <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-[#3C322E]/60"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-[#3C322E]/70"></div>
                    <div className="absolute top-1/2 left-1/4 w-5 h-5 rounded-full bg-[#3C322E]/50"></div>
                    {/* Surface details */}
                    <div className="absolute left-0 right-0 top-1/3 h-px bg-[#8A746A]/30"></div>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                  </div>
                </div>

                {/* Moon 3 - Small (icy) - Repositioned & More Transparent */}
                <div
                  className="absolute top-[15%] left-[15%] w-14 h-14 rounded-full overflow-hidden shadow-lg opacity-25"
                  style={{
                    animation: "float 12s ease-in-out infinite",
                    animationDelay: "-3s",
                    boxShadow: "0 0 10px rgba(177, 211, 236, 0.2)",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#B1D3EC] to-[#7097B3] relative">
                    {/* Icy surface details */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMTAgMTBMMTUgMTVNMjAgNUwyNSAxME0zMCAyMEwzNSAyNU00MCAzNUw0NSA0ME0xMCAzNUw1IDQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-40"></div>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/30"></div>
                  </div>
                </div>

                {/* Distant gas giant - More Transparent */}
                <div
                  className="absolute top-[8%] left-[70%] w-10 h-10 rounded-full overflow-hidden opacity-30"
                  style={{
                    animation: "float 20s ease-in-out infinite",
                    animationDelay: "-5s",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#E8C899] to-[#D98E64] relative">
                    {/* Surface bands */}
                    <div className="absolute top-1/4 inset-x-0 h-px bg-[#E9B87C]/50"></div>
                    <div className="absolute top-2/4 inset-x-0 h-px bg-[#E9B87C]/40"></div>
                    <div className="absolute top-3/4 inset-x-0 h-px bg-[#E9B87C]/60"></div>
                  </div>
                </div>
              </div>

              {/* Release info - positioned at center below image */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-[#1A1A35] p-3 px-8 rounded-md border border-[#00CCFF]/60 shadow-lg shadow-[#00CCFF]/10 transition-all duration-300 z-[4]">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#00CCFF] animate-pulse"></div>
                  <span className="text-base font-medium text-white">
                    BETA ACCESS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-[#46237A]/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -left-20 bottom-20 w-72 h-72 rounded-full bg-[#3B92D3]/10 blur-3xl animate-pulse-slow"></div>

        {/* Large cosmic monster in background */}
        <div className="absolute bottom-0 right-[calc(40%+16px)] w-[65vw] max-w-[700px] h-[70vh] z-[5]">
          <AnimatedMonster
            className="w-full h-full"
            opacity={0.4}
            speed={0.3}
            hoverRange={4}
            rotationRange={2}
          />
        </div>
      </div>
    </header>
  );
}
