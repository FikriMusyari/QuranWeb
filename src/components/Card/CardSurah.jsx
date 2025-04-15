import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardSurah({ Surah }) {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleClick = (surahIdCard) => {
    navigate(`/${surahIdCard}`);
  };

  const displayesurah = showAll ? Surah : Surah.slice(0, 20);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {displayesurah.map((surah) => (
          <div
            key={surah.id}
            className="bg-[#DFEDEC] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:bg-[#D0E3E2] cursor-pointer group"
            onClick={() => handleClick(surah.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-200 rounded-lg rotate-45 flex items-center justify-center text-primary transform transition-all duration-300 group-hover:bg-[#028478]">
                  <div className="transform -rotate-45">{surah.id}</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-[12px] leading-[16px] font-inter4 text-gray-900">
                    {surah.name_complex}
                  </h3>
                  <p className="text-sm text-gray-500 font-inter1">
                    {surah.translated_name.name}
                  </p>
                </div>
              </div>
              <div className="text-[20px] leading-[28px] font-inter1">
                {surah.name_arabic}
              </div>
            </div>
          </div>
        ))}

        {Surah.length > 20 && (
          <div
            className="bg-[#DFEDEC] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:bg-[#D0E3E2] cursor-pointer flex items-center justify-center"
            onClick={() => setShowAll(!showAll)}
          >
            <div className="text-center">
              <div className="text-[#028478] font-inter4">
                {showAll ? "Show Less" : "Show More"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}