import {
  Bookmark,
  MessageCircle,
  MessageCircleCode,
  Share2Icon,
  ThumbsUpIcon,
  UserCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UseBookmarkStore } from "../store/UseBookmarkStore";
import { UseCommunityStore } from "../store/UseCommunityStore";
import { UseThreadStore } from "../store/UseThreadStore";

function Controllers({ id, communityId }) {
  const [color, setColor] = useState("gray-500");
  const [message, setMessage] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const { singleCommunity, getSingleCommunity } = UseCommunityStore();
  const { giveLike, likes, comment, shareThread } = UseThreadStore();
  const { addBookmark, bookmark, fetchBookmark } = UseBookmarkStore();
  const likeData = likes?.[id];

  const isBookmarked = bookmark?.some((item) => item.threadId === id);

  const handleLike = async () => {
    await giveLike(id);
  };

  const sendComment = async () => {
    await comment({ id, message });
    await getSingleCommunity(communityId);
    setMessage("");
  };

  const toggleBookmark = async () => {
    await addBookmark(id);
    await fetchBookmark();
  };

  const sharePost = async () => {
    await shareThread(singleCommunity);
  };

  useEffect(() => {
    fetchBookmark();
  }, []);

  useEffect(() => {
    setColor(likeData?.liked ? "blue-500" : "gray-500");
  }, [likeData]);

  return (
    <div className="mt-2">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center space-x-1">
          <button onClick={handleLike}>
            <ThumbsUpIcon
              className={`text-${color} cursor-pointer size-6
               hover:animate-pulse`}
            />
          </button>
          <p className="font-medium">{likeData?.thread ?? 0}</p>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsComment(!isComment)}
            className="cursor-pointer hover:animate-pulse "
          >
            <MessageCircle className="size-6" />
          </button>
          {/* <p>{singleCommunity.threads?.length} </p> */}
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleBookmark}
            className="cursor-pointer hover:animate-pulse "
          >
            <Bookmark
              className={`size-6 ${
                isBookmarked ? "text-yellow-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={sharePost}
            className="cursor-pointer hover:animate-pulse "
          >
            <Share2Icon className="size-6" />
          </button>
        </div>
      </div>
      {isComment && (
        <div className="flex flex-col ">
          <div className="flex justify-center items-center gap-2 ">
            <span className="flex justify-center items-center">
              <MessageCircleCode className=" text-blue-500 " />
            </span>
            <input
              type="text"
              name="message"
              placeholder="Comment..."
              className="w-full py-2.5 border-0 border-b-2 outline-0 pl-2 "
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button
              className="h-fit w-fit font-medium text-[16px] px-4 py-1.5 hover:bg-gray-500 border-1 active:bg-gray-800 cursor-pointer rounded "
              onClick={sendComment}
            >
              Send
            </button>
          </div>
          <div className="h-fit md:min-h-[10vh] lg:min-h-[10vh] md:max-h-[100vh] lg:max-h-[100vh] overflow-y-scroll overflow-x-hidden ">
            {Array.isArray(singleCommunity?.threads) &&
            singleCommunity.threads.length > 0 ? (
              singleCommunity.threads
                .filter((thread) => thread._id === id)
                .flatMap((thread) =>
                  thread.replies
                    ?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((reply) => (
                      <div
                        key={reply._id}
                        className="my-2 p-2 border-0 border-b-1 border-gray-500 space-y-1 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <UserCircle2 className="w-5 h-5" />
                          <p className="font-semibold">Anonymous</p>
                        </div>
                        <div className="h-fit mt-1 overflow-hidden">
                          <p className="p-3">
                            {showFull || reply.message.length <= 150
                              ? reply.message
                              : `${reply.message.substring(0, 150)}...`}
                          </p>
                          {reply.message.length > 150 && (
                            <div className="px-3">
                              <button
                                onClick={() => setShowFull(!showFull)}
                                className="text-blue-500 text-sm hover:underline"
                              >
                                {showFull ? "See less" : "See more"}
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                )
            ) : (
              <p>No replies found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Controllers;
