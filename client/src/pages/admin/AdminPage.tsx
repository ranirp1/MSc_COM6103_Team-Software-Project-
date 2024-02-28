import React, { useState } from 'react';
import EWasteHubImage from "../../assets/EWasteHub.jpg";
import { RiUserSettingsFill } from 'react-icons/ri';
import { RiUserSharedLine } from 'react-icons/ri';

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
      <div className="sidebar bg-white text-black w-60 space-y-6 py-7 px-2">
        <div className="flex items-center space-x-2 px-4">
          <img src={EWasteHubImage} alt="E-Waste Hub Logo" className="w-28 h-28 mx-auto" />
        </div>

        <nav>
          <br></br><br></br><h5 className="text-black text-xl font-medium px-4 mb-4">Users</h5>
          <button onClick={() => showList('employees')} className={`btn ${currentList === 'employees' ? 'btn-primary' : 'btn-ghost'} btn-block`}>
            <RiUserSharedLine className="mr-2" /> Employees
          </button>
          <button onClick={() => showList('endUsers')} className={`btn ${currentList === 'endUsers' ? 'btn-primary' : 'btn-ghost'} btn-block`}>
            <RiUserSettingsFill className="mr-2" /> End Users
          </button>
        </nav>
      </div>

         {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
      <br/><br/><h3 className="text-gray-700 text-3xl font-medium text-center">Admin Dashboard</h3><br/>
        {/* Header with search input */}
        <header className="flex justify-between items-center p-4 shadow bg-gray-100">
          <form className="flex-1 min-w-0" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Search"
              className="input input-bordered bg-white text-black border-2 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
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
                        className="select select-bordered w-full max-w-xs bg-blue-200 text-black"
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
    </div>
  );
};

export default AdminDashboard;