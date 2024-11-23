import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser, editUser, removeUser } from "../userSlice";

function UserManagement() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);
  // const permissions = Array.isArray(user.permissions) ? user.permissions.join(", ") : "No Permissions";

  const [formMode, setFormMode] = useState("add");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "active", // Default status
    permissions: [], // Permissions as an empty array initially
  });

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formMode === "add") {
      dispatch(addUser(currentUser));
    } else {
      dispatch(editUser({ id: currentUser.id, user: currentUser }));
    }

    setCurrentUser({
      name: "",
      email: "",
      role: "",
      status: "active",
      permissions: [],
    });
    setFormMode("add");
  };

  const handleEdit = (user) => {
    setFormMode("edit");
    setCurrentUser(user);
  };

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setCurrentUser((prevState) => {
      if (checked) {
        return { ...prevState, permissions: [...prevState.permissions, value] };
      } else {
        return {
          ...prevState,
          permissions: prevState.permissions.filter((perm) => perm !== value),
        };
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        User Management
      </h2>


      <form
  onSubmit={handleSubmit}
  className="bg-white shadow-xl rounded-lg p-8 space-y-6 max-w-lg mx-auto"
>
  <div className="flex flex-col space-y-4">
    {/* Name Input */}
    <input
      type="text"
      placeholder="Name"
      value={currentUser.name}
      onChange={(e) =>
        setCurrentUser({ ...currentUser, name: e.target.value })
      }
      className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
    />

    {/* Email Input */}
    <input
      type="email"
      placeholder="Email"
      value={currentUser.email}
      onChange={(e) =>
        setCurrentUser({ ...currentUser, email: e.target.value })
      }
      className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
    />

    {/* Role Select */}
    <select
      value={currentUser.role}
      onChange={(e) =>
        setCurrentUser({ ...currentUser, role: e.target.value })
      }
      className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
    >
      <option value="">Select Role</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    {/* Status Select */}
    <select
      value={currentUser.status}
      onChange={(e) =>
        setCurrentUser({ ...currentUser, status: e.target.value })
      }
      className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    {/* Permissions Section */}
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Permissions</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            value="view"
            checked={currentUser.permissions.includes("view")}
            onChange={handlePermissionChange}
            className="h-5 w-5 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-lg">View</span>
        </label>
        {/* Add more permission checkboxes here */}
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform ${
      currentUser.name &&
      currentUser.email &&
      currentUser.role &&
      currentUser.status &&
      currentUser.permissions.length > 0
        ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
    disabled={
      !(
        currentUser.name &&
        currentUser.email &&
        currentUser.role &&
        currentUser.status &&
        currentUser.permissions.length > 0
      )
    }
  >
    {formMode === "add" ? "Add User" : "Update User"}
  </button>
</form>


      {status === "loading" && (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-500 mt-4">Error: {error}</p>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.status === "active" ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {Array.isArray(user.permissions)
                    ? user.permissions.join(", ")
                    : "No Permissions"}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto mb-2 sm:mb-0"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
