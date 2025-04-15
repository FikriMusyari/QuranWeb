import { useState } from 'react';
import Select from 'react-select';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useQuran } from '../Context/QuranContext';

const Selector = ({setSelectedSurah, SelectedSurah}) => {
 
  const [isOpen, setIsOpen] = useState(false);
  const {surahList} = useQuran()

  const surahOptions = surahList.map((surah) => ({
    id: surah.id,
    name: surah.name_simple,
  }));

  const handleSelectChange = (surahopsi) => {
        setSelectedSurah(surahopsi)
  };


  const toggleChevron = (e) => {
    setIsOpen(!isOpen)
  }

  const customStyle = {
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 200,

      width: '350px',
    }),
    
}

  return (
    <div className="relative">
      <Select
        className="w-full p-2 bg-[#CBDEDD] rounded-md"
        value={SelectedSurah}
        onChange={handleSelectChange}
        options={surahOptions}
        placeholder="Select Surah"
        isSearchable
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        menuIsOpen={isOpen}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        styles={customStyle}
      />
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={toggleChevron}
      >
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </div>
    </div>
  )
}

export default Selector