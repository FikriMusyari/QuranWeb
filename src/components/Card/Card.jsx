

import Tab from '../Tab';
import CardJuz from './CardJuz';
import CardPage from './CardPage';
import CardSurah from './CardSurah';

function Card({Surah, Juz, activeTab, setActiveTab}) {

  
  const renderContent = () => {
    if (activeTab === 'surah') {
      return <CardSurah Surah={Surah} />;
    } else if (activeTab === 'juz') {
      return <CardJuz Juz={Juz} />;
    } else if (activeTab === 'page') {
      return <CardPage />;
    }
  };
  
  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#DFEDEC]">
        {/* Tabs */}
        <div className='text-[24px] leading-[32px] font-inter2 text-[#2f3535]'>Quran Kareem</div>
       <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
      </main>
  )
}

export default Card