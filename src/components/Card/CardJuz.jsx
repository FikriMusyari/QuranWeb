import React from "react"


export default function CardJuz({Juz}) {
  console.log(Juz)

  return (
    <>
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#DFEDEC]">
      {Juz.map((jus) => (
      <div key={jus.id} className="bg-[#e8f4f2] rounded-xl p-4">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Juz  {jus.juz_number}</h2>

        <div className="bg-[#f2f9f8] border-0 mb-3">
          <div className="flex items-center p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8f4f2] mr-4">
              <span className="text-gray-500">1</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Al-Fatihah</h3>
              <p className="text-sm text-gray-500">The Opener</p>
            </div>
            <div className="text-right">
              <span className="text-xl text-gray-700 font-arabic">الفَاتِحَة</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f2f9f8] border-0">
          <div className="flex items-center p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8f4f2] mr-4">
              <span className="text-gray-500">2</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Al-Baqarah</h3>
              <p className="text-sm text-gray-500">The Cow</p>
            </div>
            <div className="text-right">
              <span className="text-xl text-gray-700 font-arabic">البَقَرَة</span>
            </div>
          </div>
        </div>
      </div>
    ))
    }
      </div>
    
     
    </>
    
  )
}
