import { Search as Find, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/UseSearchStore";

export const Search = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(20);
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { search, searchItem, saveHistory } = useSearchStore();

  const searchData = async () => {
    if (!searchText.trim()) return;
    await search(searchText.trim());
    setIsVisible(true);
  };

  const saveInHistory = async (id) => {
    if (!id) return toast.error("not found");
    await saveHistory(id);
  };

  const scrollToThread = (id) => {
    const el = document.getElementById(`thread-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      toast.error("Thread not found on screen");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full relative">
      <div className="flex justify-center items-center w-full max-w-md px-2">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={searchText}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
              searchData();
            }
          }}
          onClick={() => setIsVisible(true)}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-[300px] lg:w-[300px] py-2 pl-3 border-b-1 outline-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={searchData}
          className="p-2 bg-gray-200 border-2 border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300"
        >
          <Find className="size-5 text-gray-600" />
        </button>
      </div>

      {isVisible ? (
        <div className="absolute top-16 z-40 w-full max-w-md h-[400px] bg-gray-800 overflow-y-auto border border-gray-200 rounded-md shadow-lg px-3 py-2">
          <button
            className="sticky top-0 px-2 py-1.5 rounded-md z-50 bg-gray-950 "
            onClick={() => setIsVisible(false)}
          >
            <X />{" "}
          </button>
          {Array.isArray(searchItem) && searchItem.length > 0 ? (
            searchItem
              .slice(0, limit)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((data) => (
                <div
                  key={data._id}
                  onClick={() => {
                    scrollToThread(data._id);
                    setIsVisible(false); 
                    saveInHistory(data._id); 
                    navigate(`/selectedThread/${data?._id}`)
                  }}
                  className="p-3 border-b last:border-none hover:bg-gray-700 cursor-pointer rounded-md"
                >
                  <h2 className="font-semibold ">{data.title}</h2>
                  {/* <p className="text-sm text-gray-700 mt-1">{data.content}</p> */}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(data.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500 py-4">No results found</p>
          )}
          <button
            onClick={() => setLimit(400)}
            className="text-blue-500 pl-3 cursor-pointer my-2 "
          >
            See all
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
