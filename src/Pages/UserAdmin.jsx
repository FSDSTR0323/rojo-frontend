import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import CustomModal from '../components/Main/CustomModal';
import { CreateUserForm } from '../components/signUp/CreateUserForm';
import { EditUserForm } from '../components/UserManagement/EditUser/EditUser';
import Buttons from '../components/UserManagement/Buttons/buttons';
import { UserContext } from '../context/UserContext';
import DeleteConfirmation from '../components/UserManagement/Buttons/Delete';
import { UserDetails } from '../components/UserManagement/UserDetails/UserDetails';
import UserTable from '../components/UserManagement/UserTable/UserTable';

export const UserAdmin = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [originalUserList, setOriginalUserList] = useState([]);

  const toggleAddUserModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addUserHandler = (user) => {
    setUserList((prevUserList) => [...prevUserList, user]);
    setOriginalUserList((prevUserList) => [...prevUserList, user]);
    toggleAddUserModalHandler();
  };

  const openUserDetailsModalHandler = (user) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
  };

  const openEditModalHandler = (user) => {
    console.log('este es el user qu estoy inyectando', user)

    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const deleteUserHandler = (user) => {
    setSelectedUser(user);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteUserHandler = () => {
    const updatedUserList = userList.filter((u) => u._id !== selectedUser._id);
    setUserList(updatedUserList);
    setOriginalUserList(updatedUserList);
    setDeleteConfirmationOpen(false);
  };

  const cancelDeleteUserHandler = () => {
    setDeleteConfirmationOpen(false);
  };

  const filterHandler = (value) => {
    setFilter(value);
    handleFilterChange(value);
  };

  const handleFilterChange = (value) => {
    if (value === 'all') {
      setUserList(originalUserList);
    } else {
      const filteredUsers = originalUserList.filter((user) => user.role === value);
      setUserList(filteredUsers);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/list', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserList(response.data);
      setOriginalUserList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log('linea 91', selectedUser);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mx: 3, mb: 4, textAlign: 'left' }}>
          User management
        </Typography>
        <Buttons
          toggleAddUserModalHandler={toggleAddUserModalHandler}
          filterHandler={filterHandler}
          handleFilterChange={handleFilterChange}
          filterValue={filter}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0px 3%' }}>
          <UserTable
            userList={userList}
            openUserDetailsModalHandler={openUserDetailsModalHandler}
            deleteUserHandler={deleteUserHandler}
            openEditModalHandler={openEditModalHandler}
          />
        </Box>
      </Box>

      <CustomModal open={isModalOpen} onClose={toggleAddUserModalHandler}>
        <CreateUserForm onUserAdd={addUserHandler} />
      </CustomModal>

      {selectedUser && (
        <CustomModal
          open={isUserDetailsModalOpen}
          onClose={() => setIsUserDetailsModalOpen(false)}
        >
          <UserDetails selectedUser={selectedUser} />
        </CustomModal>
      )}

      {selectedUser && (
        <CustomModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <EditUserForm selectedUser={selectedUser} userId={selectedUser._id} />
        </CustomModal>
      )}

      <DeleteConfirmation
        open={deleteConfirmationOpen}
        onCancel={cancelDeleteUserHandler}
        onConfirm={confirmDeleteUserHandler}
      />
    </>
  );
};

export default UserAdmin;