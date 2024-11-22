import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser, editUser, removeUser } from "../userSlice";
function UserManagement() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  const [formMode, setFormMode] = useState("add");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "",
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

    setCurrentUser({ name: "", email: "", role: "" });
    setFormMode("add");
  };

  const handleEdit = (user) => {
    setFormMode("edit");
    setCurrentUser(user);
  };

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        User Management
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={currentUser.name}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, name: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={currentUser.email}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={currentUser.role}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, role: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

      <table className="mt-6 w-full table-auto border-collapse border border-gray-200">
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
