

export default function Tab({activeTab, setActiveTab}) {
    return (
        <>
        <div className="flex p-3 justify-end mt-6 mb-8">
            <div className="bg-[#D0E3E2] rounded-full shadow-sm flex p-1">
                <button
                    className={`px-6 py-2 rounded-full text-[14px] leading-[20px] transition-all duration-300 ease-in-out ${
                        activeTab === 'surah' ? 'bg-[#00856F] text-white font-inter3' : 'font-inter1 text-gray-600'
                    }`}
                    onClick={() => setActiveTab('surah')}
                >
                    Surah
                </button>
                <button
                    className={`px-6 py-2 rounded-full text-[14px] leading-[20px] transition-all duration-300 ease-in-out ${
                        activeTab === 'juz' ? 'bg-[#00856F] text-white font-inter3' : 'font-inter1 text-gray-600'
                    }`}
                    onClick={() => setActiveTab('juz')}
                >
                    Juz
                </button>
                <button
                    className={`px-6 py-2 rounded-full text-[14px] leading-[20px] transition-all duration-300 ease-in-out ${
                        activeTab === 'page' ? 'bg-[#00856F] text-white font-inter3' : 'font-inter1 text-gray-600'
                    }`}
                    onClick={() => setActiveTab('page')}
                >
                    Page
                </button>
            </div>
        </div>
        </>
    )
}