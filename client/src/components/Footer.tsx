import { Link } from "wouter";
import {
  TwitterIcon,
  YoutubeIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function Footer() {
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const footerLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add hover animation to social icons
    const socialIcons = socialIconsRef.current?.querySelectorAll("a");
    socialIcons?.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        icon.classList.add("animate-bounce-small");
        setTimeout(() => {
          icon.classList.remove("animate-bounce-small");
        }, 500);
      });
    });

    // Add subtle animation to footer links
    const footerLinks = footerLinksRef.current?.querySelectorAll("a");
    footerLinks?.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        link.classList.add("text-[#00CCFF]");
      });
      link.addEventListener("mouseleave", () => {
        link.classList.remove("text-[#00CCFF]");
      });
    });
  }, []);

  return (
    <footer className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border-t border-[#3B92D3]/30 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold text-white mb-4">Mildors</h3>
              <p className="text-gray-400">
                A 1-4 player co-op space adventure game. Explore the depths of
                space with your friends.
              </p>
            </div>

            <div
              ref={footerLinksRef}
              className="transform transition-all duration-500 hover:translate-y-[-5px]"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#gameplay"
                    className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300"
                  >
                    Gameplay
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300"
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>

            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <h3 className="text-xl font-semibold text-white mb-4">
                Social Media
              </h3>
              <div ref={socialIconsRef} className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300 hover:scale-125 transform"
                >
                  <TwitterIcon className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300 hover:scale-125 transform"
                >
                  <YoutubeIcon className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300 hover:scale-125 transform"
                >
                  <GithubIcon className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00CCFF] transition-all duration-300 hover:scale-125 transform"
                >
                  <LinkedinIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#3B92D3]/30 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Mildros. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#00CCFF] text-sm transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#00CCFF] text-sm transition-all duration-300"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#00CCFF] text-sm transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add subtle animation to footer */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes bounce-small {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .animate-bounce-small {
            animation: bounce-small 0.5s ease;
          }
        `,
        }}
      />
    </footer>
  );
}
