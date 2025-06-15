import { useEffect, useState } from "react";
import Controllers from "./Controllers";
import MediaRenderer from "./MediaRenderer";

function Bookmarked({ activity }) {
  const [bookmarkedThreads, setBookmarkedThreads] = useState([]);

  useEffect(() => {
    if (Array.isArray(activity)) {
      setBookmarkedThreads(activity);
    }
  }, [activity]);

  const handleBookmarkToggle = (threadId) => {
    setBookmarkedThreads((prev) =>
      prev.filter((item) => item.threadId?._id !== threadId)
    );
  };

  return (
    <div className="w-full px-4 py-6">
      {Array.isArray(bookmarkedThreads) && bookmarkedThreads.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 space-y-4">
          {bookmarkedThreads
            .slice(0, 50)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((data) => (
              <div
                key={data?.threadId?._id}
                className="break-inside-avoid border border-zinc-300 rounded-xl shadow-md p-4 mb-4"
              >
                <h1 className="font-bold text-xl mb-1">{data.threadId?.title}</h1>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(data.threadId?.createdAt).toLocaleString()}
                </p>
                <p className="mb-2">{data.threadId?.content}</p>
                {data.threadId?.media && <MediaRenderer url={data.threadId?.media} />}
                <Controllers
                  id={data?.threadId?._id}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No threads found</p>
      )}
    </div>
  );
}

export default Bookmarked;
