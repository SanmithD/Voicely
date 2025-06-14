import Controllers from "./Controllers";
import MediaRenderer from "./MediaRenderer";

function UserThread({ activity }) {
  return (
    <div className="w-full px-4 py-6">
      {Array.isArray(activity) && activity.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-4 space-y-4">
          {activity
            .slice(0, 50)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((data) => (
              <div
                key={data?._id}
                className="break-inside-avoid border border-zinc-300 rounded-xl shadow-md p-4 mb-4"
              >
                <h1 className="font-bold text-xl mb-1">{data.title}</h1>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(data.createdAt).toLocaleString()}
                </p>
                <p className="mb-2">{data.content}</p>
                {data.media && <MediaRenderer url={data.media} />}
                <Controllers id={data?._id} />
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No threads found</p>
      )}
    </div>
  );
}

export default UserThread;
