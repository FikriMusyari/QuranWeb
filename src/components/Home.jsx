import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react'
import Navbar from "./Navbar";
import Card from './Card/Card';
import ViewGoTo from './ViewGoTo';
import { useQuran } from '../Context/QuranContext';

  export default function Home() {
    const [selectedSurah, setSelectedSurah] = useState([])
    const [tampilKeAyat, settampilKeAyat] = useState(false)
    const { surahList, juzList } = useQuran()
    const [activeTab, setActiveTab] = useState('surah')
    const scrollref = useRef(null);
    
      const handlescroll = () => {
        if(scrollref.current) {
          window.scrollTo({
            top: scrollref.current.offsetTop,
            behavior: 'smooth'
          })
        }
      }
    
     
  return (
    <>
    <Navbar settampilKeAyat={settampilKeAyat} handle={handlescroll} />
    <div  ref={scrollref} className='bg-gradient-animation'>
      
    <div className="w-full min-h-screen lg:mb-12">
    
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-[42px] text-[#2f3535] leading-[63px] mb-12 font-cinzel-bold">Al-Qur'an Karim</h1>
    

        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00856F] z-10" size={20} />
          <input
            type="text"
            placeholder="What do I want to read?"
            className="w-full py-3 pl-12 pr-4 bg-white/80 backdrop-blur-sm rounded-full shadow-sm focus:outline-none"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
            Ctrl + Q
          </div>
        </div>


        <div className="flex justify-center gap-4 mb-16">
          <button className="px-6 py-2 bg-[#89d4d1] backdrop-blur-sm rounded-full hover:bg-white">
            Al-Mulk
          </button>
          <button className="px-6 py-2 bg-[#89d4d1] backdrop-blur-sm rounded-full hover:bg-white">
            Al-Kahf
          </button>
          <button className="px-6 py-2 bg-[#89d4d1] backdrop-blur-sm rounded-full hover:bg-white">
            Ya-Sin
          </button>
          <button className="px-6 py-2 bg-[#89d4d1] backdrop-blur-sm rounded-full hover:bg-white">
            Al-Ikhlas
          </button>
        </div>

        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-4">
            And the criminals will see the Fire and will be certain that they are
            to fall therein. And they will not find from it a way elsewhere.
          </p>
          <p className="text-gray-500">[ Al-Kahf : 53 ]</p>
        </div>
      </div>
    </div>
    <Card Surah={surahList} Juz={juzList} activeTab={activeTab} setActiveTab={setActiveTab} />
   
      <ViewGoTo
        tampilKeAyat={tampilKeAyat}
        settampilKeAyat={settampilKeAyat}
        selectedSurah={selectedSurah}
        setSelectedSurah={setSelectedSurah}
      />
      <footer className="bg-[#00856F] text-white mt-16 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center">&copy; {new Date().getFullYear()} Quran Website By Fikri Musyari</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          
        </div>
      </div>
    </footer>
    </div>
    
    </>
    
  )
}