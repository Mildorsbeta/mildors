import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import team1Image from "../assets/team/team1.jpg";
import team2Image from "../assets/team/team2.jpg";
import team3Image from "../assets/team/team3.png";
import team4Image from "../assets/team/team4.webp";

const teamMembers = [
  {
    name: "awonera",
    role: "Producer",
    image: team1Image,
    socialLinks: [
      { icon: <GithubIcon className="h-5 w-5" />, url: "#" },
      { icon: <TwitterIcon className="h-5 w-5" />, url: "#" },
    ],
  },
  {
    name: "dase",
    role: "Developer",
    image: team2Image,
    socialLinks: [
      { icon: <GithubIcon className="h-5 w-5" />, url: "#" },
      { icon: <LinkedinIcon className="h-5 w-5" />, url: "#" },
    ],
  },
  {
    name: "haqument",
    role: "Consultant",
    image: team3Image,
    socialLinks: [
      { icon: <GithubIcon className="h-5 w-5" />, url: "#" },
      { icon: <YoutubeIcon className="h-5 w-5" />, url: "#" },
    ],
  },
  {
    name: "qrosy",
    role: "Community Manager",
    image: team4Image,
    socialLinks: [
      { icon: <GithubIcon className="h-5 w-5" />, url: "#" },
      { icon: <InstagramIcon className="h-5 w-5" />, url: "#" },
    ],
  },
];

export default function Team() {
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<Array<HTMLDivElement | null>>([]);

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

    // Observe section title
    if (sectionTitleRef.current) {
      observer.observe(sectionTitleRef.current);
    }

    // Observe each team member card with staggered delay
    memberRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(
          () => {
            observer.observe(ref);
          },
          200 + index * 150,
        );
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="team" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionTitleRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-1000"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Development Team
          </h2>
          <div className="w-24 h-1 bg-[#00CCFF] mx-auto mt-4"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Meet the creative team behind Mildors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (memberRefs.current[index] = el)}
              className="bg-[#1A1A35]/30 backdrop-blur-sm border border-[#3B92D3]/20 rounded-xl p-6 text-center hover:border-[#00CCFF]/40 transition-all duration-700 transform hover:-translate-y-2 opacity-0 translate-y-8 hover:shadow-lg hover:shadow-[#00CCFF]/10"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#00CCFF]/30 hover:border-[#00CCFF]/60 transition-all duration-300 hover:scale-105 transform">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-[#00CCFF] text-sm mt-1">{member.role}</p>
              <div className="mt-4 flex justify-center space-x-3">
                {member.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300 hover:scale-125 transform"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#00CCFF]/10 to-transparent"></div>
        <div className="absolute -left-40 bottom-40 w-80 h-80 rounded-full bg-[#46237A]/5 blur-3xl animate-pulse-slow"></div>
      </div>
    </section>
  );
}
