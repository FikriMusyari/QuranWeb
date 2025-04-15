import { createContext, useState, useEffect, useContext } from "react";

const QuranContext = createContext();

export const QuranProvider = ({ children }) => {
  const [surahList, setSurahList] = useState([]);
  const [juzList, setJuzList] = useState([]);
  const [verseList, setVerseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translation, setTranslation] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState(null);


  const fetchSurahById = async (id) => {
    try {
      const res = await fetch(`https://api.quran.com/api/v4/chapters/${id}`);
      const data = await res.json();
      return data.chapter;
    } catch (error) {
      console.error("Failed to fetch surah by ID:", error);
      return null;
    }
  };

  const fetchPageById = async (id) => {
    try {
      const res = await fetch(`https://api.quran.com/api/v4//verses/by_page/${id}`);
      const data = await res.json();
      return data.verses;
    } catch (error) {
      console.error("Failed to fetch Page by ID:", error);
      return null;
    }
  };
  
  const fetchAudioByVerseKey = async (verseKey) => {  
    try {
      if (currentPlayingVerse === verseKey && isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
        return;
      } 
      if (currentAudio && isPlaying) {
        currentAudio.pause();
      }
      const response = await fetch(`https://api.quran.com/api/v4/recitations/6/by_ayah/${verseKey}`);
      const data = await response.json();
      const audioUrl = data.audio_files?.[0]?.url;

      if (audioUrl) {
        const fullAudioUrl = audioUrl.startsWith('//') ? 'https:' + audioUrl : audioUrl;
        const audio = new Audio(fullAudioUrl);
        const surahId = verseKey.split(':')[0];     
      // Filter hanya ayat dalam surah yang sama
      const versesInSurah = verseList.filter(v => v.verse_key.startsWith(`${surahId}:`));
        audio.addEventListener('play', () => {
          setIsPlaying(true);
          setCurrentPlayingVerse(verseKey);
        });
        audio.addEventListener('pause', () => {
          setIsPlaying(false);
        });
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentPlayingVerse(null);
          
          const currentVerseIndex = versesInSurah.findIndex(v => v.verse_key === verseKey);
        if (currentVerseIndex !== -1 && currentVerseIndex < versesInSurah.length - 1) {
          const nextVerseKey = versesInSurah[currentVerseIndex + 1].verse_key;
          fetchAudioByVerseKey(nextVerseKey);
        }
      });

        setCurrentAudio(audio);
        audio.play();
      } else {
        console.warn('No audio URL found for this verse');
      }
    } catch (err) {
      console.error('Error fetching recitation:', err);
    }
  };
  
  
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.removeEventListener('play', () => {});
        currentAudio.removeEventListener('pause', () => {});
        currentAudio.removeEventListener('ended', () => {});
      }
    };
  }, [currentAudio]);
  
 

  useEffect(() => {
    const SurahList = async () => {
      try {
        const res = await fetch("https://api.quran.com/api/v4/chapters");
        const data = await res.json();
        setSurahList(data.chapters);
      } catch (err) {
        console.error("Gagal ambil surah list:", err);
      }
    };

    const JuzList = async () => {
      try {
        const res = await fetch("https://api.quran.com/api/v4/juzs");
        const data = await res.json();
        setJuzList(data.juzs);
      } catch (err) {
        console.error("Gagal ambil juz list:", err);
      }
    };

    const VerseList = async () => {
      try {
        const res = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani");
        const data = await res.json();
        setVerseList(data.verses);
      } catch (err) {
        console.error("Gagal ambil verses (uthmani):", err);
      }
    };

    const TranslationList = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/quran/en.asad");
        const data = await res.json();
        const allverse = data.data.surahs.reduce((acc, surah) => {
          return acc.concat(surah.ayahs);
        }, []);
        
        setTranslation(allverse);
      } catch (err) {
        console.error("Gagal ambil Translation", err);
      }
    };

    const fetchAll = async () => {
      await Promise.all([SurahList(), JuzList(), VerseList(), TranslationList()]);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return (
    <QuranContext.Provider value={{ surahList, loading, verseList, juzList, translation, fetchSurahById, fetchAudioByVerseKey, fetchPageById, isPlaying, currentPlayingVerse }}>
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = () => useContext(QuranContext);
