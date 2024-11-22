// userLists.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersAsync,
  selectAllUserLists,
} from "../UsersLists/components/userListsSlice"; // Import your slice actions and selector

function UserLists() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUserLists); // Get users list from Redux state
  const status = useSelector((state) => state.userLists.status); // To handle loading state
  const error = useSelector((state) => state.userLists.error); // To handle error state

  // Fetch users on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllUsersAsync()); // Dispatch the async thunk to fetch users
    }
  }, [dispatch, status]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        User List
      </h1>

      {/* Display the user list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            style={{
              borderImage: "linear-gradient(to right, #6EE7B7, #3B82F6) 1", // Gradient border effect
            }}
          >
            {/* Status badge */}
            <div
              className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium uppercase rounded-md ${
                user.isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </div>

            {/* Avatar and name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-200 text-white font-bold text-lg">
                {user.name[0].toUpperCase()}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
            </div>

            {/* Details */}
            <div className="mt-4 text-gray-600 text-sm">
              <p className="flex items-center gap-2">
                <span className="material-icons text-gray-500">badge</span>
                {user.id}
              </p>
              <p className="flex items-center gap-2 mt-2">
                <span className="material-icons text-gray-500">email</span>
                {user.email}
              </p>
              <p className="flex items-center gap-2 mt-2">
                <span className="material-icons text-gray-500">person</span>
                {user.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserLists;
