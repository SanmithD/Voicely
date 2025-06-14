import { UserCircle2Icon } from "lucide-react";
import { useEffect } from "react";
import { UseThreadStore } from "../store/UseThreadStore";
import Controllers from "./Controllers";
import MediaRenderer from "./MediaRenderer";

function SingleThread() {
  const { getSingleThread, singleThread } = UseThreadStore();

  useEffect(() => {
    getSingleThread();
  }, [getSingleThread]);

  return (
    <div className="w-full px-4 py-6">
      {Array.isArray(singleThread) && singleThread.length > 0 ? (
        <div className="columns-1 sm:columns-1 lg:columns-2 gap-4 space-y-4">
          {singleThread
            .slice(0,50)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((data) => (
              <div
                key={data?._id}
                className="break-inside-avoid border border-zinc-300 rounded-xl shadow-md p-4 mb-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <UserCircle2Icon className="w-6 h-6 text-zinc-600" />
                  <span className="text-sm font-medium text-zinc-700">
                    Anonymous
                  </span>
                </div>
                <p className="text-xs text-zinc-500 ml-9 mb-2">
                  {new Date(data.createdAt).toLocaleString()}
                </p>
                <h2 className="text-lg font-semibold ml-9 mb-1">{data.title}</h2>
                <p className="text-sm text-zinc-500 ml-9 mb-3">{data.content}</p>
                {data.media && (
                  <div className="mt-2">
                    <MediaRenderer url={data.media} />
                  </div>
                )}
                <div className="my-3" >
                    <Controllers id={data._id}/>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-zinc-500">No threads found</p>
      )}
    </div>
  );
}

export default SingleThread;
