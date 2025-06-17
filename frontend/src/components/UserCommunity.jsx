import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";

function UserCommunity({ activity }) {
  const navigate = useNavigate();
  const { authUser } = UseAuthStore();

  console.log(activity);

  return (
    <div className="space-y-4">
      { Array.isArray(activity) && activity.length > 0 ? (
        activity.slice(0, 50).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data) =>(
          <div key={data?._id} onClick={() => navigate(`/viewCommunity/${activity?._id}`)} className="border-0 border-b-1 "  >
            <h1>{data.title} </h1>
            <p>{data.description.length > 45 ? data.description.substring(0,45) + '...' : data.description } </p>
            { data.ownerId === authUser?.profile._id ? (
              <p className="text-[14px] text-gray-500 " >Created at { new Date(data.createdAt).toLocaleDateString() } </p>
            ) : (
              <p>Created at { new Date(data?.member.joined).toLocaleDateString() }</p>
            ) }
          </div>
        ))
      ) : (
        <p>No communites found </p>
      ) }
    </div>
  );
}

export default UserCommunity;
