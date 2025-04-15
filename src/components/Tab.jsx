

export default function Tab({activeTab, setActiveTab}) {
    return (
        <>
        <div className="flex p-3 justify-end mt-6 mb-8">
            <div className="bg-[#D0E3E2] rounded-full shadow-sm flex p-1">
                <button
                    className={'px-6 py-2 rounded-full text-[14px] leading-[20px] transition-all duration-300 ease-in-out' +
                        (activeTab === 'surah' ? 'bg-primary font-inter3 border rounded-full' : 'font-inter1')}
                    onClick={() => setActiveTab('surah')}
                >
                    Surah
                </button>
                <button
                    className={'px-6 py-2 rounded-full text-[14px] leading-[20px]' +
                        (activeTab === 'juz' ? 'bg-primary font-inter3 border rounded-full' : 'font-inter1')}
                    onClick={() => setActiveTab('juz')}
                >
                    Juz
                </button>
                <button
                    className={'px-6 py-2 rounded-full text-[14px] leading-[20px]' +
                        (activeTab === 'page' ? 'bg-primary font-inter3 border rounded-full' : 'font-inter1')}
                    onClick={() => setActiveTab('page')}
                >
                    Page
                </button>
            </div>
        </div>
        </>
    )
}