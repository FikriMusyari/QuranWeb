import React, {useEffect, useRef, useState} from 'react';
import Selector from './Selector';
import { useNavigate } from 'react-router-dom';
import { useQuran } from '../Context/QuranContext';

const ViewGoTo = ({
  tampilKeAyat,
  settampilKeAyat,
  selectedSurah,
  setSelectedSurah}) => {
    const jumpref = useRef(null);
    const [selectedVerseNumber, setSelectedVerseNumber] = useState('');
    const {verseList} = useQuran()
    const navigate = useNavigate()
  

    const filteredVerses = selectedSurah?.id 
    ? verseList.filter((verse) => verse.verse_key.startsWith(`${selectedSurah.id}:`))
    : [];

  const handleInput = (e) => {
    if(selectedSurah?.id)
      setSelectedVerseNumber(e.target.value)
  } 
  
  const handleJumpToVerse = () => {
    if (!selectedSurah?.id && !selectedVerseNumber) return 

      const GotoVerse = filteredVerses.some(
        verse => verse.verse_key === `${selectedSurah.id}:${selectedVerseNumber}`
      );

      if (GotoVerse) {
        navigate(`/${selectedSurah.id}?verse=${selectedVerseNumber}`);
        settampilKeAyat(false);
      } else {
        // Tampilkan pesan error atau lakukan penanganan lainnya
        alert(`Verse ${selectedVerseNumber} not found in Surah ${selectedSurah.name}`);
      }
    }

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (jumpref.current && !jumpref.current.contains(e.target)) {
        settampilKeAyat(false);
        setSelectedSurah(null);
        setSelectedVerseNumber('')
      }
    }

    if (tampilKeAyat) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden';
      
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto';
    };
}, [tampilKeAyat]);



  return (
    <>
      {tampilKeAyat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-[#DFEDEC] rounded-lg p-6 w-96 ${tampilKeAyat ? 'fade-in' : 'fade-out'}`} ref={jumpref}
          >
            <h2 className="text-xl font-semibold mb-6 text-center">Verse/Tafseer</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Surah
                </label>
                <Selector setSelectedSurah={setSelectedSurah} selectedSurah={selectedSurah} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type Verse Number
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 bg-[#e8f1f1] rounded-md"
                  placeholder="Select A Surah First"
                  onChange={handleInput}
                  disabled={!selectedSurah?.id}
                  value={selectedVerseNumber}
                />
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  className="flex-1 py-2 text-[#028478] bg-white border border-[#00856F] rounded-md hover:bg-[#00856F] hover:text-white transition-colors"
                  onClick={() => settampilKeAyat(false)}
                >
                  Jump To Tafseer
                </button>
                <button
                  className="flex-1 py-2 text-white bg-[#028478] rounded-md hover:bg-[#006f5c] transition-colors"
                  onClick={handleJumpToVerse}
                >
                  Jump To Verse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewGoTo;
