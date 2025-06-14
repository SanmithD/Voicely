import { AudioLines } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Communities from "../components/Communities";
import { UseAuthStore } from "../store/UseAuthStore";
import { UseCommunityStore } from "../store/UseCommunityStore";

function Community() {

  const { authUser } = UseAuthStore();
  const { createCommunity } = UseCommunityStore();
  const [communityData, setCommunityData] = useState({
    ownerId: authUser?._id,
    title: "",
    description: ""
  });

  const handleCreate = async() =>{
    if(!communityData){
      toast.error("Fill the data")
    }
    await createCommunity(communityData);
    setCommunityData({ title: "", description: "" });
  }

  return (
    <div className="h-screen sm:mb-10 px-6 py-4 md:flex lg:flex gap-7 md:gap-[50px] lg:gap-[60px]  " >
      <div className="flex flex-col w-[100%] md:w-[70%] lg:w-[70%] space-y-10 " >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium flex justify-center items-center gap-7 " >
          <span><AudioLines className="size-9 animate-pulse " /> </span> Create Community</h1>
        <div className="flex flex-col space-y-9" >
        <div>
          <input type="text" name="title" id="title" placeholder="Title" onChange={(e)=>setCommunityData({ ...communityData, title: e.target.value })} value={communityData.title} 
          className="w-full pl-3 py-2 border-2 rounded outline-0 "
          />
        </div>
        <div>
          <textarea type="text" name="description" id="description" placeholder="Description..." rows={5} onChange={(e)=>setCommunityData({ ...communityData, description: e.target.value })} value={communityData.description}
          className="w-full pl-3 py-2 border-2 rounded outline-0 " 
            />
        </div>
        <button onClick={handleCreate} className="w-fit h-fit px-4 py-2 rounded-2xl bg-blue-500 text-2xl md:text-3xl lg:text-3xl font-medium
        cursor-pointer hover:bg-blue-300 active:bg-blue-800
         " >Create</button>
        </div>
      </div>
      
      {/*fetch all communities*/}
      <div className="w-full " >
        <Communities/>
      </div>
    </div>
  )
}

export default Community