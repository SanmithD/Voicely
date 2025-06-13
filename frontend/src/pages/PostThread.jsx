import { File, X } from "lucide-react";
import { useRef, useState } from "react";
import { UseThreadStore } from "../store/UseThreadStore";

function PostThread({ communityId }) {
  const [threadData, setThreadData] = useState({
    title: "",
    communityId: communityId || "",
    content: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef(null);
  const { sendNewThread } = UseThreadStore();

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

  const sendThread = async () => {
    if (!threadData.title.trim() && !threadData.content && !imagePreview)
      return;
    try {
      await sendNewThread({
        data: {
          title: threadData.title.trim(),
          communityId,
          content: threadData.content.trim(),
          media: imagePreview,
        },
      });

      setThreadData({ title: "", content: "" });
      removeImage();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-4">
      <h1 className="text-center text-3xl font-bold">Post New Thought</h1>

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
            className="p-2 border rounded bg-gray-100 hover:bg-gray-200"
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
    </div>
  );
}

export default PostThread;
