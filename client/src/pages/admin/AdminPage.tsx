import React, { useState, useEffect, ChangeEvent } from "react";
import EWasteHubImage from "../../assets/EWasteHub.jpg";
import {
  RiUserSettingsFill,
  RiUserSharedLine,
  RiFilter3Line,
  RiLogoutBoxRLine,
  RiShieldUserLine,
} from "react-icons/ri";
import { API_URL } from "../../constants/constant";
import { useNavigate } from "react-router-dom";
import emptyListImage from "../../assets/empty_list.svg";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

type UserType = "employee" | "endUser" | "admin";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserType;
}

const AdminDashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdminAndStaff = urlParams.get("isAdminAndStaff") === "true";
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [currentList, setCurrentList] = useState<
    "employees" | "endUsers" | "admins"
  >("employees");

  const getUserType = () => {
    switch (currentList) {
      case "employees":
        return "Employees";
      case "endUsers":
        return "Customers";
      case "admins":
        return "Admins";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/getAllUsers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data); // Update your state with the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSortOrderChange = (newSortOrder: "asc" | "desc") => {
    setSortOrder(newSortOrder);
  };

  // Define a type that includes all possible filter keys
  type FilterKeys = "name" | "email" | "phone";

  // Type guard to check if a string is a key of User
  function isFilterKey(key: any): key is FilterKeys {
    return ["name", "email", "phone"].includes(key);
  }

  const getSortedAndFilteredUsers = (users: User[]) => {
    return users
      .filter((user) => {
        if (isFilterKey(filterBy)) {
          const value = user[filterBy].toString().toLowerCase();
          return value.includes(searchQuery);
        }
        return false;
      })
      .sort((a, b) => {
        if (isFilterKey(filterBy)) {
          let firstValue = a[filterBy].toString().toLowerCase();
          let secondValue = b[filterBy].toString().toLowerCase();

          if (sortOrder === "asc") {
            return firstValue.localeCompare(secondValue);
          } else if (sortOrder === "desc") {
            return secondValue.localeCompare(firstValue);
          }
        }
        return 0;
      });
  };

  const handleRoleChange = async (userId: number, newRole: UserType) => {
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return;

    let endpoint = "";
    switch (newRole) {
      case "admin":
        endpoint = `${API_URL}/api/updateUserToAdmin`;
        break;
      case "employee":
        endpoint = `${API_URL}/api/updateUserToStaff`;
        break;
      case "endUser":
        endpoint = `${API_URL}/api/downgradeToUser`;
        break;
      default:
        console.log("Invalid role");
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: users[userIndex].email }),
      });

      if (response.ok) {
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], role: newRole };
        setUsers(updatedUsers);
        console.log("Role updated successfully");
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const filteredAndSortedUsers = getSortedAndFilteredUsers(users).filter(
    (user) => {
      switch (currentList) {
        case "employees":
          return user.role === "employee";
        case "endUsers":
          return user.role === "endUser";
        case "admins":
          return user.role === "admin";
        default:
          return false;
      }
    }
  );

  const handleDeleteUser = async (email: string): Promise<void> => {
    if (!email) {
      alert("Invalid email address.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/deleteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("User deleted successfully!");
        // Filter out the deleted user from the local state to update the UI
        setUsers(users.filter((user) => user.email !== email));
      } else {
        const result = await response.json();
        alert(`Failed to delete user: ${result.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.");
    }
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showList = (listType: "employees" | "endUsers" | "admins") => {
    setCurrentList(listType);
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 shadow bg-primary ">
          <img
            src={EWasteHubImage}
            alt="E-Waste Hub Logo"
            className=" w-16 h-16 rounded-full shadow-2xl  "
          />
          <h3 className="text-white text-3xl font-medium flex-1 text-center">
            Admin Dashboard
          </h3>

          <button
            className="btn btn-accent   ml-4"
            onClick={() => setShowLogoutModal(true)}
          >
            <RiLogoutBoxRLine className="text-lg mr-2" /> Logout
          </button>
        </div>

        {/* Header with search input and filter button */}
        <header className="flex justify-between items-center p-4 shadow bg-gray-100">
          <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Search"
              className="input input-bordered bg-white text-black w-full border-2 border-primary"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>

          <div className="dropdown dropdown-end ml-4">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className=" select select-bordered btn btn-ghost cursor-pointer border-2 border-primary"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div className="dropdown dropdown-end ml-4">
            <label
              tabIndex={0}
              className="btn btn-ghost cursor-pointer border-2 border-primary"
            >
              <RiFilter3Line className="text-lg" /> Sort
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => handleSortOrderChange("asc")}>Ascending</a>
              </li>
              <li>
                <a onClick={() => handleSortOrderChange("desc")}>Descending</a>
              </li>
            </ul>
          </div>
        </header>

        <div
          role="tablist"
          className="tabs tabs-lifted tabs-lg  shadow-2xl mx-5"
        >
          <a
            role="tab"
            className={`tab mx-1 border border-black ${
              currentList === "employees"
                ? "bg-primary text-white"
                : "text-primary  "
            }`}
            onClick={() => showList("employees")}
          >
            <RiUserSharedLine className="text-lg mr-4" /> Employees
          </a>
          <a
            role="tab"
            className={`tab mx-1 border border-black ${
              currentList === "endUsers"
                ? " bg-primary text-white"
                : "text-primary "
            }`}
            onClick={() => showList("endUsers")}
          >
            <RiUserSettingsFill className="text-lg mr-2" /> Customers
          </a>
          <a
            role="tab"
            className={`tab  mx-1 border border-black ${
              currentList === "admins"
                ? " bg-primary text-white"
                : "text-primary  "
            }`}
            onClick={() => showList("admins")}
          >
            <RiShieldUserLine className="text-lg mr-2" /> Admins
          </a>
        </div>
        {/* Main content */}
        <main className="overflow-x-hidden overflow-y-auto mx-5">
          <div className="px-6 py-8">
            <h5 className="text-black text-3xl font-medium mb-6">
              {getUserType()}
            </h5>
            {filteredAndSortedUsers.length == 0 ? (
              <div className="flex flex-col  w-full h-full items-center mt-16">
                <h3 className="text-4xl font-bold text-center mb-5 ">
                  No {getUserType()} Found
                </h3>
                <img src={emptyListImage} className="h-80 w-80" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full text-black">
                  <thead>
                    <tr>
                      <th className="text-black text-lg font-bold min-w-[250px]">
                        Name
                      </th>
                      <th className="text-black text-lg font-bold min-w-[250px]">
                        Email
                      </th>
                      <th className="text-black text-lg font-bold min-w-[200px]">
                        Phone
                      </th>

                      <th className="text-black text-lg font-bold min-w-[200px]">
                        Role
                      </th>
                      <th className="text-black text-lg font-bold "></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedUsers.map((user) => (
                      <tr key={user.id} className="text-lg">
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {user.role === "endUser" && (
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleRoleChange(user.id, "employee")
                              }
                            >
                              Upgrade to Employee
                            </button>
                          )}
                          {user.role === "employee" && (
                            <button
                              className="btn btn-success"
                              onClick={() => handleRoleChange(user.id, "admin")}
                            >
                              Promote to Admin
                            </button>
                          )}
                          {user.role === "admin" && (
                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                handleRoleChange(user.id, "employee")
                              }
                            >
                              Downgrade to Employee
                            </button>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-circle bg-red-700 text-white ">
                            <MdOutlineDelete size={35}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to logout?
            </h3>
            <div className="modal-action flex flex-row">
              <button
                className="btn btn-primary w-1/2 mr-1"
                onClick={() => {
                  window.location.href = "/";
                }} // Close modal on 'Yes'
              >
                Yes
              </button>
              <button
                className="btn btn-ghost w-1/2  border-primary border-2"
                onClick={() => setShowLogoutModal(false)} // Close modal on 'No'
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-4 flex flex-col ">
        {isAdminAndStaff ? (
          <button
            className="btn  shadow-2xl btn-ghost text-primary h-20 mb-3 rounded-full rounded-full border-primary border-2"
            onClick={() =>
              (window.location.href = "/staff?isAdminAndStaff=true")
            }
          >
            <AiOutlineUserSwitch size={40} />
            <div className="pl-2 text-lg ">Switch to Staff</div>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
