import { File, X } from "lucide-react";
import { useRef, useState } from "react";
import SingleThread from "../components/SingleThread";
import { UseThreadStore } from "../store/UseThreadStore";

function PostThread({ communityId, name = "Post Thread" }) {
  const [threadData, setThreadData] = useState({
    title: "",
    communityId: communityId || null,
    content: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef(null);
  const { sendNewThread, postSingleThread } = UseThreadStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (imageRef.current) imageRef.current.value = "";
  };

  // const sendThread = async () => {
  //   if (!threadData.title.trim() && !threadData.content && !imagePreview)
  //     return;
  //   try {
  //     await sendNewThread({
  //       data: {
  //         title: threadData.title.trim(),
  //         communityId,
  //         content: threadData.content.trim(),
  //         media: imagePreview,
  //       },
  //     });

  //     if (!communityId) {
  //       await postSingleThread({
  //         data: {
  //           title: threadData.title.trim(),
  //           communityId: null,
  //           content: threadData.content.trim(),
  //           media: imagePreview,
  //         },
  //       });
  //     }

  //     setThreadData({ title: "", content: "" });
  //     removeImage();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const sendThread = async () => {
  if (!threadData.title.trim() && !threadData.content && !imagePreview) return;

  try {
    const payload = {
      title: threadData.title.trim(),
      communityId: communityId || null,
      content: threadData.content.trim(),
      media: imagePreview,
    };

    if (communityId) {
      await sendNewThread({ data: payload });
    } else {
      await postSingleThread({ data: payload });
    }

    setThreadData({ title: "", content: "" });
    removeImage();
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="px-6 py-4 flex justify-between flex-col gap-4">
      <h1 className="text-center text-3xl font-bold">{name} </h1>

      {imagePreview && (
        <div className="mb-3">
          <div className="relative w-24 h-24">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 shadow"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="h-fit px-3 py-2.5 flex flex-1/2 gap-[70px] ">
        <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={threadData.title}
              onChange={(e) =>
                setThreadData({ ...threadData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="file"
              ref={imageRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => imageRef.current?.click()}
              className="p-2 border rounded hover:animate-pulse cursor-pointer "
            >
              <File size={20} />
            </button>
          </div>

          <textarea
            name="content"
            placeholder="Description..."
            rows={4}
            value={threadData.content}
            onChange={(e) =>
              setThreadData({ ...threadData, content: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          />

          <button
            onClick={sendThread}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Share
          </button>
        </div>
        <div className="hidden md:flex lg:flex flex-1/4 px-2 font-medium leading-[30px] ">
          Sharing personal thoughts is a way to express your inner ideas,
          feelings, or experiences with others. It can build trust, deepen
          relationships, and invite meaningful conversations. Whether spoken or
          written, being open helps others understand your perspective — but
          it’s important to balance honesty with respect, and to know your
          audience. Vulnerability is powerful, but sharing wisely is key.
        </div>
      </div>
      { !communityId ? (
      <div>
        <SingleThread />
      </div>

      ) : '' }
    </div>
  );
}

export default PostThread;
