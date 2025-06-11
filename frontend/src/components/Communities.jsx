import { TimerIcon, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";
import { UseCommunityStore } from "../store/UseCommunityStore";

function Communities() {
    const { authUser } = UseAuthStore();
    const navigate = useNavigate();
    const { communities, getCommunities, joinCommunity } = UseCommunityStore();

    useEffect(()=>{
        getCommunities();
    },[]);

    const handleJoin = async(id) =>{
        await joinCommunity(id);
    }


  return (
    <div className="h-screen w-full" >
        <div className="overflow-y-scroll overflow-x-hidden h-screen w-full " >
            { Array.isArray(communities) && communities.length > 0 ? (
                communities.map((data)=>(
                    <div key={data?._id} onClick={()=>navigate(`/viewCommunity/${data._id}`)} className="w-full flex justify-between items-center gap-3 my-6 border-1 px-4
                    py-4 cursor-pointer rounded-2xl hover:bg-gray-500 hover:text-white
                     " >
                        <div>
                        <h1 className="text-2xl md:text-3xl lg:text-3xl font-medium font-stretch-50% " >{data.title} </h1>
                        <p className="text-base-content/40 flex items-center gap-2" ><span><UserCircle2 size={20} /></span> Total of members {data.members.length}</p>
                        <p className="text-base-content/40 flex items-center gap-2" ><span><TimerIcon size={20} /></span> Created At { new Date(data.createdAt).toLocaleDateString() } </p>
                        </div>
                        {
                            !data.members.some(member => member.userId === authUser?.profile._id) ? (
                        <div >
                            <button onClick={()=> handleJoin(data?._id)} className="h-fit w-fit py-2 px-6 bg-green-500 rounded cursor-pointer font-medium font-stretch-95% hover:bg-green-700 active:bg-green-900" >JOIN</button>
                        </div>
                            ) : ""
                        }
                    </div>
                ))
            ) : (
                <p>No community found</p>
            )}
        </div>
    </div>
  )
}

export default Communities