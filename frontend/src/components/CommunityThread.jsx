import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { UseCommunityStore } from "../store/UseCommunityStore";
import Controllers from "./Controllers";

function CommunityThread({ id }) {
  const { singleCommunity, getSingleCommunity } = UseCommunityStore();

  useEffect(() => {
    getSingleCommunity(id);
  }, [id, getSingleCommunity]);

  return (
    <div className="p-4">
      {Array.isArray(singleCommunity?.threads) &&
      singleCommunity.threads.length > 0 ? (
        singleCommunity.threads.map((thread) => (
          <div key={thread._id} className="mb-4 border-0 p-4 rounded shadow space-y-2 ">
            <div>
              <button className="flex justify-center items-center cursor-pointer gap-2 text-base-content/45 hover:text-warning ">
                <span>
                  <UserCircle2 />
                </span>
                <span>Anonymous Owner</span>
              </button>
            </div>
            <h1 className="text-xl font-bold">{thread.title}</h1>
            <p className="text-gray-700">{thread.content}</p>
            <p className="text-sm text-gray-500">
              Posted on {new Date(thread.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4 mb-2" >
                <Controllers id={thread?._id} />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>No threads found</p>
      )}
    </div>
  );
}

export default CommunityThread;
