import { useNavigate } from "react-router-dom";


function CardPage() {

  const navigate = useNavigate()

  const pages = Array.from({ length: 604 }, (_, i) => ({
    id: i + 1,
    page: i + 1,
  }));
  const handleClick = (pageIdCard) => {
    navigate(`/page/${pageIdCard}`);
  };
  

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {pages.map((pages) => (
          <div
            key={pages.id}
            className="bg-[#DFEDEC] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:bg-[#D0E3E2] cursor-pointer group"
            onClick={() => handleClick(pages.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-200 rounded-lg rotate-45 flex items-center justify-center text-primary transform transition-all duration-300 group-hover:bg-[#028478]">
                  <div className="transform -rotate-45">{pages.id}</div>
                </div>
                <div className="ml-3">
                  <h3 className="text-[12px] leading-[16px] font-inter4 text-gray-900">
                    Page {pages.page}
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
  );
}

export default CardPage;