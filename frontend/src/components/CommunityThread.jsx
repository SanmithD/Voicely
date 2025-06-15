import { Trash2, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { UseAuthStore } from "../store/UseAuthStore";
import { UseCommunityStore } from "../store/UseCommunityStore";
import { UseThreadStore } from "../store/UseThreadStore";
import Controllers from "./Controllers";
import MediaRenderer from "./MediaRenderer";

function CommunityThread({ id }) {
  const { singleCommunity, getSingleCommunity } = UseCommunityStore();
  const { authUser } = UseAuthStore();
  const { deleteThreadPost } = UseThreadStore();

  useEffect(() => {
    getSingleCommunity(id);
  }, [id, getSingleCommunity]);

  const deleteThread = async (id) => {
    await deleteThreadPost(id);
    await getSingleCommunity(id);
  };


  return (
    <div className="p-4">
      {Array.isArray(singleCommunity?.threads) &&
      singleCommunity.threads.length > 0 ? (
        singleCommunity.threads
          .slice(0, 100)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((thread) => (
            <div
              key={thread._id}
              className="mb-4 border-0 p-4 rounded shadow space-y-2 "
            >
              <div className="flex justify-between">
                <button className="flex justify-center items-center cursor-pointer gap-2 text-base-content/45 hover:text-warning">
                  <span>
                    <UserCircle2 />
                  </span>
                  <span>Anonymous Owner</span>
                </button>
                {(singleCommunity?.community.ownerId === authUser?.profile._id ||
                  thread?.userId === authUser?.profile._id) && (
                  <button onClick={() => deleteThread(thread._id)}>
                    <span className="text-red-500 hover:animate-pulse cursor-pointer">
                      <Trash2 />
                    </span>
                  </button>
                )}
              </div>
              <h1 className="text-xl font-bold">{thread.title}</h1>
              <p className="text-gray-400">{thread.content}</p>
              {thread.media && (
                <div>
                  <MediaRenderer url={thread.media} />
                </div>
              )}
              <p className="text-sm text-gray-500">
                Posted on {new Date(thread.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 mb-2">
                <Controllers id={thread._id} communityId={id} />
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
