import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpenText, Moon } from 'lucide-react';

const Navbar = ({settampilKeAyat, handle}) => {

  const [scroll, setScroll] = useState(true);


  useEffect(() => {

    const scrollHandler = () => {
      setScroll(window.pageYOffset > 20);
    };
    window.addEventListener('scroll', scrollHandler);
    
    scrollHandler(); 
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  
  return (
    <nav className={`sticky top-0 left-0 w-full transition-all duration-300 z-10 ${scroll ? 'bg-[#DFEDEC] bg-opacity-100 backdrop-blur-none' : 'bg-[#DFEDEC] bg-opacity-80 backdrop-blur-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpenText className="text-[#00856F]" size={24} />
          <span className="text-[20px] leading-[20px] font-vietnam-bold text-[#2f3535]">
            Quran Kareem
            <p className="text-[#343a40] text-[10px] leading-[15px]">Read, Memorize, and Learn Quran</p>
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-10">
          <NavLink to="/" className="nav-link" onClick={handle}>
            Home
          </NavLink>
          <NavLink to="/1" className="nav-link">
            Read Quran
          </NavLink>
          <NavLink to="/" className="nav-link" onClick={() => settampilKeAyat(true)}>
            GoTo Verse
          </NavLink>
          <button ><Moon /></button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar
