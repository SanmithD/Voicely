import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseCommunityStore } from "../store/UseCommunityStore";
import CommunityThread from "./CommunityThread";

function ViewCommunity() {
    const { id } = useParams();
    console.log(id);
    const { singleCommunity, getSingleCommunity } = UseCommunityStore();

    console.log(singleCommunity);

    const fetchCommunity = async() =>{
        await getSingleCommunity(id);
    }

    useEffect(()=>{
        fetchCommunity();
    },[]);

  return (
    <div className="p-6 space-y-5 " >
        <div className="w-full flex flex-col gap-4" >
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-medium " >{singleCommunity?.community.title} </h1>
            <p className="text-base-content/40" >{singleCommunity?.community.description} </p>
            <div>
            <button className="flex justify-center items-center cursor-pointer gap-2 text-base-content/45 hover:text-warning " ><span><UserCircle2/></span><span>Anonymous Owner</span></button>
            </div>
            <p className="text-base-content/40" >Community created at { new Date(singleCommunity?.community.createdAt).toLocaleDateString() } </p>
            {/* <p className="text-base-content/40">Total members { singleCommunity.community.members.length } </p> */}
        </div>
        <hr />
        {/* post new community thread */}
        <div>
           
        </div>
        <div>
            <CommunityThread id={id} />
        </div>
    </div>
  )
}

export default ViewCommunity