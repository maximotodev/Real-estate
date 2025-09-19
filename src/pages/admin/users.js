import React, { useState } from 'react';
import Head from 'next/head';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Guest', status: 'Active', joined: '2024-01-15', lastActive: '2024-05-18' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'Host', status: 'Active', joined: '2024-02-20', lastActive: '2024-05-17' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', type: 'Guest', status: 'Inactive', joined: '2024-03-10', lastActive: '2024-03-20' },
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
  };

  const filteredUsers = users.filter(u => {
    if (filter === 'active') return u.status === 'Active';
    if (filter === 'inactive') return u.status === 'Inactive';
    return true;
  });

  return (
    <>
      <Head>
        <title>User Management - Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Export Users</button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Filters</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Users', value: '12,547' },
              { label: 'Active', value: '10,234' },
              { label: 'Inactive', value: '2,313' },
              { label: 'New (30d)', value: '234' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
            {['all', 'active', 'inactive'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Type</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Joined</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{user.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;
