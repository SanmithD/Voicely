import { Loader2, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";
import { UseBookmarkStore } from "../store/UseBookmarkStore";

function Profile() {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { authUser, deleteUser, profile, logout, isProfile } = UseAuthStore();
  const { fetchBookmark } = UseBookmarkStore();

  useEffect(() => {
    profile();
    fetchBookmark();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteUser();
    navigate("/login");
  };

  if (isProfile) {
    return (
      <div className="text-white text-center mt-10">
        <h1><Loader2 className="size-4 animate-spin" /> </h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="flex flex-col space-y-6" >
        <div className="flex items-center gap-4">
          <UserCircle2 className="size-10" />
          <h2 className="text-lg font-semibold">
            {authUser?.profile.username || "Anonymous A"}
          </h2>
        </div>
        <h2 className="text-base-content/40" >Joined at {authUser?.profile.createdAt ? new Date(authUser.profile.createdAt).toLocaleDateString() : new Date().toLocaleDateString()} </h2>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleDeleteClick}
          className="bg-red-600 px-6 py-2 rounded-2xl"
        >
          Delete Account
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-700 px-6 py-2 rounded-2xl"
        >
          Logout
        </button>
      </div>

      {confirmDelete && (
        <div className="bg-gray-800 rounded-2xl py-6 px-6 w-fit space-y-6">
          <h1 className="text-center font-medium">
            Are you sure you want to delete your account?
          </h1>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-600 px-6 py-2 rounded-2xl"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="bg-gray-600 px-6 py-2 rounded-2xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
