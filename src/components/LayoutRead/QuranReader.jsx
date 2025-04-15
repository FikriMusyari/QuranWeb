import { Book, Search, Menu, X,  CirclePlay, CirclePause } from "lucide-react"
import { useQuran } from "../../Context/QuranContext";
import { useNavigate, useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Tab from "../Tab"
import BismillahSvg from '../../assets/bismillah.svg';

export default function QuranReader() {
  const navigate = useNavigate()
  const { translation, surahList, loading, verseList, fetchSurahById, fetchAudioByVerseKey, isPlaying, currentPlayingVerse } = useQuran();
  const { surahId } = useParams();
  const [activeSurah, setActiveSurah] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('surah');
  const [searchParams] = useSearchParams();
  const verseNumber = searchParams.get("verse"); 
  
  const contentref = useRef(null)
  const verseRefs = useRef({})

  useEffect(() => {
    const getSurah = async () => {
      const surah = await fetchSurahById(surahId);
      setActiveSurah(surah);
    }
    if(surahId) getSurah();
  }, [surahId]);

  useEffect(() => {
    if (verseNumber) {
      // Scroll ke ayat yang dituju setelah komponen selesai render
      setTimeout(() => {
        const verseElement = verseRefs.current[`verse-${verseNumber}`];
        if (verseElement) {
          verseElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          
          // Optional: Tambahkan highlight sementara
          verseElement.classList.add("bg-[#DFEDEC]", "transition-colors");
          setTimeout(() => {
            verseElement.classList.remove("bg-[#DFEDEC]");
          }, 3000);
        }
      }, 100);
    }
  }, [verseNumber, surahId]);

  const handleSurahClick = (surah) => {
    setActiveSurah(surah);
    navigate(`/${surah.id}`)
    setIsMenuOpen(false);

    if(contentref.current) {
      contentref.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const CapitalFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  if (loading || !activeSurah) return <div>Loading...</div>; 

  const verseFilt = verseList.filter((verse) =>
    verse.verse_key.startsWith(`${surahId}:`)
  )

  const translate = translation.filter((trs) => (
    verseFilt.some((verse) => verse.id === trs.number)
  ))


  return (
    <div className="flex h-screen bg-[#f0f4f4]">
      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div 
        className={`fixed lg:static z-30 h-full w-80 bg-gradient-animation bg-[#f0f4f4] overflow-y-auto transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex justify-end p-4 lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search By Surah"
              className="w-full py-2 pl-9 pr-4 bg-white rounded-md text-sm"
            />
            <div className="absolute left-3 top-2.5">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="p-3 space-y-3">
          {surahList.map((surah) => (
            <div 
              key={surah.id} 
              className={`bg-[#DFEDEC] p-3 rounded-lg cursor-pointer hover:bg-[#D0E3E2] transition-colors group  ${Number.parseInt(surahId) === surah.id ? "border-2 border-teal-700" : ""}`}
              onClick={() => handleSurahClick(surah)} 
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-200 rounded-lg rotate-45 flex items-center justify-center text-primary transform transition-all duration-300 group-hover:bg-[#028478]">
                    <div className="transform -rotate-45">
                      {surah.id}
                    </div>
                  </div>
                  
                  <div className="ml-3">
                    <h3 className="text-[12px] leading-[16 px] font-inter4 text-gray-900">{surah.name_complex}</h3>
                    <p className="text-sm text-gray-500 font-inter1">{surah.translated_name.name}</p>
                  </div>
                </div>
                
                <div className="ml-8 font-inter1 text-[20px] leading-[28px]">{surah.name_arabic}</div>
              </div>
            </div>
          ))}
        </div>  
      </div>

      <div className="flex-1 flex flex-col">
       
        <header className="bg-gradient-animation p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="bg-teal-600 text-white p-2 rounded mr-3">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Quran Kareem</h1>
              <p className="text-xs text-gray-600">Read, Memorize, and Learn The Quran</p>
            </div>
          </Link>
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />  
          </button>
        </header>

        {/* Content Area */}
        <div ref={contentref} className="flex-1 overflow-y-auto p-8">
          <div className="w-auto mx-auto">
            {/* Surah Header */}
            <div key={activeSurah} className="mb-6 flex flex-col items-center justify-center text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{activeSurah.name_simple}</h1>
              <p className="text-gray-600">Verse - {activeSurah.verses_count}, {CapitalFirst(activeSurah.revelation_place)}</p>
              {activeSurah.id >= 2 && (
                <img src={BismillahSvg} alt="Bismillah" className="w-[220px] h-[45px]" />
              )}
            </div>
            
            {/* VerseList */}
            {verseFilt.map((verse) => {
              const verseNum = verse.verse_key.split(":")[1];
              const translation = translate.find((trs) => trs.number === verse.id);
              return (
                <div key={verse.id}  ref={(el) => (verseRefs.current[`verse-${verseNum}`] = el)}
                id={`verse-${verseNum}`} className="mb-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-teal-600 font-medium">{verse.verse_key}</span>
                    <div className="flex gap-3">
                      <button className="text-gray-400" onClick={() => fetchAudioByVerseKey(verse.verse_key)}>
                      {currentPlayingVerse === verse.verse_key && isPlaying ? (
                        <CirclePause size={20} />
                      ) : (
                        <CirclePlay size={20} />
                      )}
                      </button>
                      <button className="text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end mb-2">
                    <div className="relative">
                      <span className="text-[30px] leading-[44px] font-serif text-right">{verse.text_uthmani}</span>
                    </div>
                  </div>
                  <div key={activeSurah} className="font-inter3 text-[11px] leading-[16px] text-[#343a40cc] ">{CapitalFirst(activeSurah.translated_name.language_name)}</div>
                  <div className="text-gray-700">{translation.text}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}