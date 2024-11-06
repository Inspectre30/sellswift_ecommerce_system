import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import {toast} from 'react-toastify'
const AdminPanel = ({ token }) => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      if (!token) {
   
        setLoading(false);
        return;
      }
      const { data } = await axios.get(backendUrl + "/api/admin/get-users", {
        headers: { token },
      });
      if (data.success) {
        setUsers(data.users);
        setLoading(false);
        console.log(data.users);
      } else {
        setLoading(false);
        toast.error(data.error.msg);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message)
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  if (loading) {
    return <p>Loading users...</p>;
  }

  // Function to remove a user
  const handleRemoveUser = async (userId) => {
    try {
      const { data } = await axios.post(
        "/api/admin/rm-users",
        { userId },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } else {
        toast.error(data.error.msg)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">List of Users</h1>
    
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email Address</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleRemoveUser(user._id)}
                  >
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
