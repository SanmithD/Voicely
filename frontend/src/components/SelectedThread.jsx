import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseThreadStore } from "../store/UseThreadStore";
import Controllers from "./Controllers";
import MediaRenderer from "./MediaRenderer";

function SelectedThread() {
  const { id } = useParams();
  const { selectedThread, getThreadById } = UseThreadStore();

  useEffect(() => {
    getThreadById(id);
  }, [id]);

  if (!selectedThread?.response) {
    return <p className="p-6 text-gray-500">Loading thread...</p>;
  }

  const { content, createdAt, media, replies, _id } = selectedThread.response;

  return (
    <div className="p-[30px]">
      <div>
        <p className="flex items-center gap-3.5 font-bold">
          <UserCircle2 />
          Anonymous
        </p>
        <p className="text-gray-700 font-medium">
          Posted {new Date(createdAt).toLocaleString()}
        </p>
        <h1 className="whitespace-pre-line md:pl-5 lg:pl-5 mt-3.5">
          {content}
        </h1>
        {media && <MediaRenderer url={media} />}
        <Controllers id={_id} />
      </div>

      <div className="mt-8">
        {Array.isArray(replies) && replies.length > 0 ? (
          replies
            .slice(0, 500)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((data) => (
              <div key={data._id} className="mt-4 py-2.5 space-y-2 border-b pb-2">
                <p className="flex items-center gap-3.5 font-bold">
                  <UserCircle2 />
                  Anonymous
                </p>
                <h1 className="font-medium">{data.message}</h1>
                <p className="text-[14px] text-gray-500">
                  Commented {new Date(data.createdAt).toLocaleString()}
                </p>
              </div>
            ))
        ) : (
          <p className="text-gray-600 italic">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default SelectedThread;
