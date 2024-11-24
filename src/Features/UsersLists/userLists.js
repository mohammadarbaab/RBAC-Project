import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersAsync,
  selectAllUserLists,
} from "../UsersLists/components/userListsSlice"; // Import your slice actions and selector
import Pagination from "../../Pages/Pagination";
import { PuffLoader } from 'react-spinners';  // Importing the spinner


function UserLists() {
  const dispatch = useDispatch();
  const employeeData = useSelector(selectAllUserLists); // Get users list from Redux state
  const status = useSelector((state) => state.userLists.status); // To handle loading state
  const error = useSelector((state) => state.userLists.error); // To handle error state
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once data is fetched
    if (employeeData.length > 0) {
      setLoading(false);
    }
  }, [employeeData]);  // Re-run when employeeData changes

  const filteredData = employeeData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // pagination code

  // Fetch users on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllUsersAsync()); // Dispatch the async thunk to fetch users
    }
  }, [dispatch, status]);

  // Filter users based on search query
  // useEffect(() => {
  //   if (searchQuery === "") {
  //     setFilteredUsers(users); // If no search query, show all users
  //   } else {
  //     setFilteredUsers(
  //       users.filter((user) =>
  //         user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     ); // Filter users by name
  //   }
  // }, [searchQuery, users]);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Employees
      </h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
      </div>

      {/* Display the user list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 mx-auto max-w-6xl">
      {loading ? (
        // Show loading spinner if data is being fetched
        <div className="col-span-full text-center">
          <PuffLoader size={60} color="#4F46E5" loading={loading} />
          <p className="mt-4 text-gray-600">Loading... Please wait 2 minutes.Data fetch from (non production server)</p>
        </div>
      ) : currentItems.length > 0 ? (
        currentItems.map((user) => (
          <div
            key={user.id}
            className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            style={{
              borderImage: "linear-gradient(to right, #6EE7B7, #3B82F6) 1", // Gradient border effect
            }}
          >
            {/* Status Badge */}
            <div
              className={`absolute top-4 right-4 px-4 py-1 text-xs font-medium uppercase rounded-full ${
                user.status === "active"
                  ? "bg-green-200 text-green-800 shadow-md"
                  : "bg-red-200 text-red-800 shadow-md"
              }`}
            >
              {user.status === "active" ? "Active" : "Inactive"}
            </div>

            {/* Avatar and Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-2xl shadow-md">
                {user.name[0].toUpperCase()}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>
            </div>

            {/* Details */}
            <div className="text-gray-600 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <span className="material-icons text-gray-500">badge</span>
                {user.id}
              </p>
              <p className="flex items-center gap-2">
                <span className="material-icons text-gray-500">email</span>
                {user.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="material-icons text-gray-500">person</span>
                {user.role}
              </p>
            </div>

            {/* Permissions */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Permissions
              </h3>
              <div className="flex flex-wrap gap-3">
                {user.permissions && user.permissions.length > 0 ? (
                  user.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-full transition-all duration-200 ease-in-out hover:bg-blue-600 cursor-pointer"
                    >
                      {permission}
                    </span>
                  ))
                ) : (
                  <span className="px-4 py-1 text-sm font-medium text-white bg-gray-400 rounded-full">
                    No Permissions
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          No users found
        </p>
      )}
      </div>
      <Pagination
        handlePagination={handlePagination}
        currentPage={currentPage}
        totalPages={totalPages}
      ></Pagination>
    </div>
  );
}

export default UserLists;
