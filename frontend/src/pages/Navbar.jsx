import React, { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { useLocation } from "react-router-dom"; // Import useLocation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); 


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const isHomePage = location.pathname === "/";
  const isNotHomePage = !isHomePage;

  return (
    <div>
    
      {isHomePage && (
        <div
          className="h-screen bg-cover bg-center bg-fixed relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80')`,
          }}
        >
      
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  Farm to Table
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto">
                Discover fresh, organic produce delivered straight to your doorstep.
              </p>
              <a
                href="/explore"
                className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-full text-lg font-semibold hover:bg-yellow-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Now
              </a>
            </div>
          </div>
        </div>
      )}

    
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
        } ${isNotHomePage ? "border-b-4 border-yellow-400 shadow-lg" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
     
            <div className="flex items-center group">
              <a href="/" className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-yellow-400 transform group-hover:rotate-12 transition-transform duration-300" />
                <span className="ml-2 text-white text-xl font-bold tracking-wide group-hover:text-yellow-400 transition-colors">
                  Farm to Table
                </span>
              </a>
            </div>

   
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

           
            <div
              className={`${
                isOpen
                  ? "absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-t border-white/10"
                  : "hidden"
              } lg:relative lg:flex lg:items-center lg:space-x-8 lg:bg-transparent lg:border-none`}
            >
              <ul className="flex flex-col lg:flex-row lg:space-x-8 text-white font-medium p-4 lg:p-0">
                {["Home", "Login", "Register"].map((item) => (
                  <li key={item} className="my-2 lg:my-0">
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 lg:py-2 relative group overflow-hidden"
                    >
                      <span className="relative z-10 group-hover:text-yellow-400 transition-colors duration-300">
                        {item}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
