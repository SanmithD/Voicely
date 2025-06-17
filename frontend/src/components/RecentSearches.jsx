import { X } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/UseSearchStore";


function RecentSearches(){
  const navigate = useNavigate();
  const { getRecentSearch, recent, clearHistory } = useSearchStore();

  useEffect(()=>{
    getRecentSearch();
  },[]);

  const removeData = async(id) =>{
    await clearHistory(id);
    await getRecentSearch();
  }

  const scrollToThread = (id) => {
  const el = document.getElementById(`thread-${id}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    toast.error("Thread not found on screen");
  }
};


  return (
  <div className="h-screen overflow-y-scroll w-full p-4">
    <h2 className=" font-semibold text-lg mb-3">Recent Search</h2>
    { 
    Array.isArray(recent) && recent.length > 0 ? (
      recent.slice(0, 10).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data) =>(
        <div key={data?._id} onClick={()=>{scrollToThread(data._id); navigate(`/selectedThread/${data._id}`)}} className="relative flex flex-col gap-1 cursor-pointer hover:bg-gray-500 active:bg-gray-500 rounded-md px-6 py-3 duration-300 " >
          <button onClick={()=>removeData(data?._id)}  className="absolute px-2 py-2 top-0 right-0 hover:text-red-500 cursor-pointer" ><X/></button>
          <p className="text-[16px] " >{data?.data}</p>
          <p className="text-[14px] text-gray-700 font-bold " >{ new Date(data.createdAt).toLocaleString() } </p>
        </div>
      ))
    ) : (
      <p>No recent searches</p>
    )
    }
  </div>
);

};

export default RecentSearches;
