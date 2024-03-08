import React, { useState, useEffect, ChangeEvent } from 'react';
import EWasteHubImage from "../../assets/EWasteHub.jpg";
import { RiUserSettingsFill, RiUserSharedLine, RiFilter3Line, RiLogoutBoxRLine, RiShieldUserLine } from 'react-icons/ri'; 
import { API_URL } from "../../constants/constant";
import { useNavigate } from 'react-router-dom';

type UserType = 'employee' | 'endUser' | 'admin';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserType;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [currentList, setCurrentList] = useState<'employees' | 'endUsers' | 'admins'>('employees');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/getAllUsers`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
  
        const data = await response.json();
        setUsers(data); // Update your state with the fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSortOrderChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
  };

  // Define a type that includes all possible filter keys
  type FilterKeys = 'name' | 'email' | 'phone';

  // Type guard to check if a string is a key of User
  function isFilterKey(key: any): key is FilterKeys {
    return ['name', 'email', 'phone'].includes(key);
  }

  const getSortedAndFilteredUsers = (users: User[]) => {
    return users
      .filter(user => {
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

          if (sortOrder === 'asc') {
            return firstValue.localeCompare(secondValue);
          } else if (sortOrder === 'desc') {
            return secondValue.localeCompare(firstValue);
          }
        }
        return 0;
      });
  };

  
  const handleRoleChange = async (userId: number, newRole: UserType) => {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return;
    
    let endpoint = '';
    switch (newRole) {
      case 'admin':
        endpoint = `${API_URL}/api/updateUserToAdmin`;
        break;
      case 'employee':
        endpoint = `${API_URL}/api/updateUserToStaff`;
        break;
      case 'endUser':
        endpoint = `${API_URL}/api/downgradeToUser`;
        break;
      default:
        console.log('Invalid role');
        return;
    }
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: users[userIndex].email }),
      });
  
      if (response.ok) {
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], role: newRole };
        setUsers(updatedUsers);
        console.log('Role updated successfully');
      } else {
        console.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  

  const filteredAndSortedUsers = getSortedAndFilteredUsers(users).filter(user => {
    switch (currentList) {
      case 'employees':
        return user.role === 'employee';
      case 'endUsers':
        return user.role === 'endUser';
      case 'admins':
        return user.role === 'admin';
      default:
        return false;
    }
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showList = (listType: 'employees' | 'endUsers' | 'admins') => {
    setCurrentList(listType);
  };

  const navigate = useNavigate();


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
          <button onClick={() => showList('admins')} className={`btn ${currentList === 'admins' ? 'btn-primary' : 'btn-ghost'} btn-block normal-case`}>
            <RiShieldUserLine className="text-lg mr-2" /> Admins
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
        <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search"
            className="input input-bordered bg-white text-black w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <div className="dropdown dropdown-end ml-4">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="select select-bordered"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost cursor-pointer">
            <RiFilter3Line className="text-lg" /> Sort
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => handleSortOrderChange('asc')}>Ascending</a></li>
            <li><a onClick={() => handleSortOrderChange('desc')}>Descending</a></li>
          </ul>
        </div>
      </header>


        {/* Main content */}
        <main className="overflow-x-hidden overflow-y-auto">
          <div className="px-6 py-8">
            <h5 className="text-black text-3xl font-medium mb-6">
              {currentList === 'employees' ? 'Employees' : 'End Users'}
            </h5>

            <div className="overflow-x-auto">
              <table className="table w-full text-black">
                <thead>
                  <tr>
                    <th className="text-black min-w-[200px]">Name</th>
                    <th className="text-black min-w-[200px]">Email</th>
                    <th className="text-black min-w-[150px]">Phone</th>
                    <th className="text-black min-w-[150px]">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as UserType)}
                          className="select select-bordered select-primary w-full max-w-xs"
                        >
                          <option value="employee">Employee</option>
                          <option value="endUser">End User</option>
                          <option value="admin">Admin</option>
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
                  setShowLogoutModal(false);
                  navigate('/');
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowLogoutModal(false)} // Close modal on 'No'
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