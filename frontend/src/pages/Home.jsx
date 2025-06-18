import { Loader, UserCircle2 } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Controllers from "../components/Controllers";
import MediaRenderer from "../components/MediaRenderer";
import { UseThreadStore } from "../store/UseThreadStore";

const RecentSearches = lazy(() => import("../components/RecentSearches"));

function Home() {
  const navigate = useNavigate();
  const { singleThread, getSingleThread } = UseThreadStore();

  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(40);

  useEffect(()=>{
    getSingleThread();
  },[]);

  const loadMore = () => {
    setNext((prevNext) => prevNext + 20);
  };

  const sortedThreads = Array.isArray(singleThread)
    ? [...singleThread].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="flex">
      <div className="flex flex-col gap-4 md:w-[70%] h-screen overflow-y-auto ml-3.5 pr-4">
        {sortedThreads.length > 0 ? (
          sortedThreads.slice(prev, next).map((data, index) => (
            <div
              key={data.id || index}
              onClick={() => navigate(`/selectedThread/${data?._id}`)}
              className="border-0 border-b border-gray-200 p-3 rounded space-y-2 cursor-pointer"
            >
              <p className="flex items-center gap-1.5 font-medium">
                <UserCircle2 className="size-6" />
                Anonymous
              </p>
              <p className="text-[14px] text-gray-600 font-extrabold">
                {new Date(data.createdAt).toLocaleString()}
              </p>
              <h1 className="text-lg font-semibold">{data.title}</h1>
              <p className="text-gray-500">
                {data.content.length > 200
                  ? `${data.content.substring(0, 200)}...`
                  : data.content}
              </p>
              {data.media && (
                <div>
                  <MediaRenderer url={data.media} />
                </div>
              )}
              <div className="my-2">
                <Controllers
                  id={data?._id}
                  onClick={() => navigate(`/selectedThread/${data?._id}`)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader className="size-8 animate-spin duration-700" />
          </div>
        )}
        {sortedThreads.length > next && (
          <p
            onClick={loadMore}
            className="text-center text-blue-600 cursor-pointer hover:underline"
          >
            Load more
          </p>
        )}
      </div>

      <div className="hidden md:block w-[30%] border-l border-gray-300 px-4">
        <Suspense fallback={<p>Loading...</p>}>
          <RecentSearches />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
