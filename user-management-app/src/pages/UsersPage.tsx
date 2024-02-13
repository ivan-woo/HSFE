import { useState, useEffect } from "react";
import EditForm from "../components/EditForm";
import Modal from "../components/Modal";
import TableHeader from "../components/table/TableHead";
import TableCell from "../components/table/TableCell";

interface SelectedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: "male" | "female";
  address: {
    state: string;
  };
}

interface User extends SelectedUser {
  image: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<SelectedUser>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "male",
    address: {
      state: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const editSelectedUser = (selectedUser: User) => {
    setEditUser({
      id: selectedUser.id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      birthDate: selectedUser.birthDate,
      gender: selectedUser.gender,
      address: {
        state: selectedUser.address.state,
      },
    });
    setIsEditUser(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://dummyjson.com/users?limit=20");
      const usersData = await response.json();
      setUsers(usersData.users);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-gray-700 text-lg">Loading Users...</div>
    );
  }

  return (
    <div>
      <table className="min-w-full leading-normal">
        <caption className="text-lg p-4 text-gray-700">Users</caption>
        <thead>
          <tr>
            <TableHeader>Photo</TableHeader>
            <TableHeader>User</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Edit</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableCell>
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.image}
                  alt="User profile"
                />
              </TableCell>
              <TableCell>
                <div className="text-gray-900 whitespace-no-wrap">
                  {user.firstName + " " + user.lastName}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-gray-900 whitespace-no-wrap">
                  {user.email}
                </div>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => editSelectedUser(user)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditUser && (
        <Modal closeModal={() => setIsEditUser(false)}>
          <EditForm
            selectedUser={editUser}
            closeModal={() => setIsEditUser(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;
