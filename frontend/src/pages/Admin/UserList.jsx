import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      setEditableUserId(null);
      toast.success("User updated successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto ">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Users</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto border overflow-y-auto bg-white rounded-xl">
          <table className="w-full  ">
            <thead>
              <tr className="bg-gray-200 
              ">
                <th className="p-4 text-left hidden md:table-cell">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left hidden md:table-cell">Email</th>
                
                <th className="p-4 text-center hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b transition duration-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  {/* ID - Hidden on Mobile */}
                  <td className="p-4 hidden md:table-cell text-gray-600">
                    {user._id}
                  </td>

                  {/* Name Field */}
                  <td className="p-4 flex items-center">
                    {editableUserId === user._id ? (
                      <div className="flex w-full">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="p-2 border rounded-md flex-grow"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-800">
                        {user.username}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="ml-2 text-gray-500 hover:text-blue-500"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Email Field */}
                  <td className="p-4 flex items-center">
                    {editableUserId === user._id ? (
                      <div className="flex w-full">
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="p-2 border rounded-md flex-grow"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {user.email}
                        </a>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="ml-2 text-gray-500 hover:text-blue-500"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Admin Status (Hidden on Mobile) */}
                  <td className="p-4 text-center hidden md:table-cell">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex justify-end space-x-3">
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
