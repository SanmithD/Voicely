import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";

function UserCommunity({ activity }) {
  const navigate = useNavigate();
  const { authUser } = UseAuthStore();
  return (
    <div className="space-y-4">
      {activity ? (
        <div className="border p-4 cursor-pointer rounded shadow" onClick={()=>navigate(`/viewCommunity/${activity?._id}`)} >
          <h1 className="text-xl font-bold text-blue-700">{activity.title}</h1>
          <p className="text-gray-700">{activity.description}</p>
          { activity.ownerId === authUser?.profile._id ? (
          <p className="text-sm text-gray-500">
            Created: {new Date(activity.createdAt).toLocaleString()}
          </p>
          ) : (
            <p className="text-sm text-gray-500">
            Joined: {new Date(activity.members.createdAt).toLocaleString()}
          </p>
          )}
          <p className="text-sm text-gray-500">
            Members:{" "}
            {Array.isArray(activity.members) ? activity.members.length : 0}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Not found community</p>
      )}
    </div>
  );
}

export default UserCommunity;
