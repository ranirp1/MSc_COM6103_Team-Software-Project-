import React, { useState, ChangeEvent  } from 'react';
import EWasteHubImage from "../../assets/EWasteHub.jpg";
import { RiUserSettingsFill } from 'react-icons/ri';
import { RiUserSharedLine } from 'react-icons/ri';
import { RiFilter3Line } from 'react-icons/ri';
import { RiLogoutBoxRLine } from 'react-icons/ri'; 

type UserType = 'employee' | 'endUser';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  isActive: boolean;
  role: UserType;
}

//Added data for testing
const AdminDashboard = () => {
  const [employees, setEmployees] = useState<User[]>([
    {
      id: 1,
      name: 'Mario Luigi',
      email: 'info@jomamanagement.co',
      phone: '09876543210',
      createdAt: '31 Jul 2022, 07:13 PM',
      isActive: true,
      role: 'employee',
    },
    {
      id: 2,
      name: 'Esther Miles',
      email: 'eoporia.vounp@example.com',
      phone: '09865874728',
      createdAt: '11 Jan 2023 at 01:49 pm',
      isActive: true,
      role: 'employee',
    },
  ]);

  const [endUsers, setEndUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Damon Spectre',
      email: 'info@jomamanagement.co',
      phone: '09876543210',
      createdAt: '31 Jul 2022, 07:13 PM',
      isActive: true,
      role: 'endUser',
    },
    {
      id: 2,
      name: 'Miles Morales',
      email: 'eoporia.vounp@example.com',
      phone: '09865874728',
      createdAt: '11 Jan 2023 at 01:49 pm',
      isActive: true,
      role: 'endUser',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
    // Function to handle search input changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toLowerCase());
    };
  
    // Filtered users based on search query
    const filteredEmployees = employees.filter((user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.phone.includes(searchQuery)
    );
  
    const filteredEndUsers = endUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.phone.includes(searchQuery)
    );

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
      // No action is taken after preventing the default form behavior
    };
    

    const [filterOpen, setFilterOpen] = useState(false);

    // Function to toggle filter dropdown
    const toggleFilterDropdown = () => {
      setFilterOpen(!filterOpen);
    };

    const handleFilterOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      const option = event.target.value; // Extract the value from the event target
      console.log(option); // Log the selected filter option value
    
      setFilterOpen(false); // Close the filter dropdown
    };
    
    const [showLogoutModal, setShowLogoutModal] = useState(false);


  const [currentList, setCurrentList] = useState<'employees' | 'endUsers'>('employees');

  const showList = (listType: 'employees' | 'endUsers') => {
    setCurrentList(listType);
  };

  const handleRoleChange = (userId: number, listType: 'employees' | 'endUsers', newRole: UserType) => {
    const updateFunction = listType === 'employees' ? setEmployees : setEndUsers;
    updateFunction((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="sidebar bg-white text-black w-60 py-7 px-0 relative">
          <div className="flex items-center justify-center pb-10">
            <img src={EWasteHubImage} alt="E-Waste Hub Logo" className="w-28 h-28" />
          </div>

          {/* Position nav at the bottom of the sidebar */}
          <nav className="absolute top-56 w-full">
            <h5 className="text-xl font-medium mb-4 text-center">Users</h5>
            <button onClick={() => showList('employees')} className={`btn ${currentList === 'employees' ? 'btn-primary' : 'btn-ghost'} btn-block normal-case`}>
              <RiUserSharedLine className="text-lg mr-4" /> Employees
            </button>
            <button onClick={() => showList('endUsers')} className={`btn ${currentList === 'endUsers' ? 'btn-primary' : 'btn-ghost'} btn-block normal-case`}>
              <RiUserSettingsFill className="text-lg mr-2" /> End Users
            </button>
          </nav>
        </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4 shadow bg-gray-100">
        <h3 className="text-gray-700 text-3xl font-medium flex-1 text-center">Admin Dashboard</h3>
        <button
          className="btn btn-ghost ml-4"
          onClick={() => setShowLogoutModal(true)}
        >
          <RiLogoutBoxRLine className="text-lg mr-2" /> Logout
        </button>
      </div>

      {/* Header with search input and filter button */}
      <header className="flex justify-between items-center p-4 shadow bg-gray-100">
        <form className="flex-1" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search"
            className="input input-bordered bg-white text-black w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost cursor-pointer">
            <RiFilter3Line className="text-lg" /> Filter
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <label className="label cursor-pointer flex items-center">
                <input type="radio" name="filter" className="radio radio-primary" value="asc" onChange={handleFilterOptionChange} />
                <span className="label-text ml-2">Ascending</span>
              </label>
            </li>
            <li>
              <label className="label cursor-pointer flex items-center">
                <input type="radio" name="filter" className="radio radio-primary" value="desc" onChange={handleFilterOptionChange} />
                <span className="label-text ml-2">Descending</span>
              </label>
            </li>
            {/* Additional filter options */}
          </ul>
        </div>
      </header>   

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <h5 className="text-black text-3xl font-medium mb-6">{currentList === 'employees' ? 'Employees' : 'End Users'}</h5>

            <div className="overflow-x-auto">
              <table className="table w-full text-black">
                <thead>
                  <tr>
                    <th className="text-black min-w-[200px]">Name</th>
                    <th className="text-black min-w-[200px]">Email</th>
                    <th className="text-black min-w-[150px]">Phone</th>
                    <th className="text-black min-w-[200px]">Created At</th>
                    <th className="text-black min-w-[150px]">Role</th>
                  </tr>
                </thead>
                <tbody>
                {(currentList === 'employees' ? filteredEmployees : filteredEndUsers).map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.createdAt}</td>
                      <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, currentList, e.target.value as UserType)}
                        className="select select-bordered select-primary w-full max-w-xs"
                      >
                        {currentList === 'employees' && (
                          <>
                            <option value="employee">Employee</option>
                            <option value="endUser">End User</option>
                            <option value="admin">Admin</option>
                          </>
                        )}
                        {currentList === 'endUsers' && (
                          <>
                            <option value="endUser">End User</option>
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                          </>
                        )}
                      </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
     {/* Logout Confirmation Modal */}
     {showLogoutModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure you want to logout?</h3>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  // Handle the logout logic here
                  setShowLogoutModal(false);
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowLogoutModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;