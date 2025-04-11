import { useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 navbar-blur bg-[#0A0A0F]/70 border-b border-[#3B92D3]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span
                className="transition-all duration-300 group-hover:scale-105 group-hover:text-[#2AFFFF]"
                style={{
                  color: "#00CCFF",
                  textShadow:
                    "0 0 10px rgba(0, 204, 255, 0.7), 0 0 20px rgba(0, 204, 255, 0.5), 0 0 30px rgba(0, 204, 255, 0.3)",
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  display: "inline-block",
                  padding: "0.2rem 0",
                }}
              >
                WWW.MILDORS.COM
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-[#00CCFF] transition-colors duration-200 hover:scale-105 transform"
            >
              Features
            </a>
            <a
              href="#gameplay"
              className="text-gray-300 hover:text-[#00CCFF] transition-colors duration-200 hover:scale-105 transform"
            >
              Gameplay
            </a>
            <a
              href="#gallery"
              className="text-gray-300 hover:text-[#00CCFF] transition-colors duration-200 hover:scale-105 transform"
            >
              Gallery
            </a>
            <a
              href="#team"
              className="text-gray-300 hover:text-[#00CCFF] transition-colors duration-200 hover:scale-105 transform"
            >
              Team
            </a>
            <a
              href="https://cdn.discordapp.com/attachments/1335268339299127306/1352792821853061141/Mildors.rar?ex=67fa54be&is=67f9033e&hm=49f5662909c22f5be335cc4011047fe103db8f72afcf8d9856c8cc3917827b45&"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-[#00CCFF] text-[#0A0A0F] font-semibold hover:bg-[#00CCFF]/90 transition-all duration-200 hover:scale-105 transform"
            >
              Download
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-[#00CCFF] transition-transform hover:scale-110 transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-[#0A0A0F]/95 navbar-blur`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#features"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-gray-300 hover:bg-[#00CCFF]/20 hover:text-white transition-all duration-200"
          >
            Features
          </a>
          <a
            href="#gameplay"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-gray-300 hover:bg-[#00CCFF]/20 hover:text-white transition-all duration-200"
          >
            Gameplay
          </a>
          <a
            href="#gallery"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-gray-300 hover:bg-[#00CCFF]/20 hover:text-white transition-all duration-200"
          >
            Gallery
          </a>
          <a
            href="#team"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-gray-300 hover:bg-[#00CCFF]/20 hover:text-white transition-all duration-200"
          >
            Team
          </a>
          <a
            href="https://cdn.discordapp.com/attachments/1335268339299127306/1352792821853061141/Mildors.rar?ex=67fa54be&is=67f9033e&hm=49f5662909c22f5be335cc4011047fe103db8f72afcf8d9856c8cc3917827b45&"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="block w-full text-left px-3 py-2 rounded-md bg-[#00CCFF] text-[#0A0A0F] font-semibold hover:bg-[#00CCFF]/90 my-2 transition-all duration-200"
          >
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}
