import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import CustomModal from '../components/Main/CustomModal';
import { CreateUserForm } from '../components/signUp/CreateUserForm';
import { EditUserForm } from '../components/UserManagement/EditUser/EditUser';
import Buttons from '../components/UserManagement/Buttons/buttons';
import DeleteConfirmation from '../components/UserManagement/Buttons/DeleteConfirmation';
import { UserDetails } from '../components/UserManagement/UserDetails/UserDetails';
import UserTable from '../components/UserManagement/UserTable/UserTable';
import { useUser } from '../hooks/useUser';

export const UserAdmin = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
  const [originalUserList, setOriginalUserList] = useState([]);
  const [searchText, setSearchText] = useState('');

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
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const deleteUserHandler = (user) => {
    setSelectedUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const cancelDeleteUserHandler = () => {
    setDeleteConfirmationOpen(false);
    setSelectedUserToDelete(null);
  };

  const confirmDeleteUserHandler = async () => {
    try {
      if (selectedUserToDelete) {
        console.log('selected user to delete', selectedUserToDelete);
        await axios.delete(
          `http://localhost:3000/user/${selectedUserToDelete._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(response => {
          console.log('User deleted:', response);
          setDeleteConfirmationOpen(false);
          setSelectedUserToDelete(null);
          fetchUsers();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
      } else {
        console.error('No user selected for deletion');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  

  const filterHandler = (value) => {
    setFilter(value);
    handleFilterChange(value);
  };
  
  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
    console.log('Search text:', searchText);
  };

  const handleFilterChange = (value) => {
    if (value === 'all') {
      setUserList(userList);
    } else {
      const filteredUsers = userList.filter((user) => user.role === value);
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
      console.log('Updated user list:', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  useEffect(() => {
    const filteredUsers = originalUserList.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchText.toLowerCase())
    );
    setUserList(filteredUsers);
  }, [searchText]);

  //console.log('selected user', selectedUser);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mx: 6, mb: 4, textAlign: 'left' }}>
          User management
        </Typography>
        <Buttons
          toggleAddUserModalHandler={toggleAddUserModalHandler}
          filterHandler={filterHandler}
          handleFilterChange={handleFilterChange}
          handleSearchChange={handleSearchChange} 
          filterValue={filter}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0px 3%',
          }}
        >
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
        <CustomModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <EditUserForm
          selectedUser={selectedUser}
          userId={selectedUser._id}
          onClose={() => setIsEditModalOpen(false)}
        />
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