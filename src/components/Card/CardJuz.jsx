import React from "react"
import { useNavigate } from "react-router-dom"

export default function CardJuz({ Juz }) {
  const navigate = useNavigate();

  // Always use sequential 1-30 numbering for juz
  const juzData = Array.from({ length: 30 }, (_, i) => {
    const juzNumber = i + 1;
    const apiJuz = Juz && Juz.find(j => j.juz_number === juzNumber);

    return {
      id: juzNumber,
      juz_number: juzNumber,
      verse_mapping: apiJuz?.verse_mapping || null
    };
  });

  const handleClick = (juzIdCard) => {
    navigate(`/juz/${juzIdCard}`);
  };

  return (
    <>
   
   <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {juzData.map((juzItem) => (
          <div
            key={juzItem.id}
            className="bg-[#DFEDEC] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:bg-[#D0E3E2] cursor-pointer group"
            onClick={() => handleClick(juzItem.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-200 rounded-lg rotate-45 flex items-center justify-center text-primary transform transition-all duration-300 group-hover:bg-[#028478]">
                  <div className="transform -rotate-45">{juzItem.id}</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-[12px] leading-[16px] font-inter4 text-gray-900">
                    Juz {juzItem.juz_number}
                  </h3>
                  <p className="text-sm text-gray-500 font-inter1">
                  </p>
                </div>
              </div>
              <div className="text-[20px] leading-[28px] font-inter1">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
     
    </>
    
  )
}
