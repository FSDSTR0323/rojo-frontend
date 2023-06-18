import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import CustomModal from '../components/Main/CustomModal';
import { CreateUserForm } from '../components/signUp/CreateUserForm';
import { EditUserForm } from '../components/EditUser/EditUser';
import Buttons from '../components/Buttons/buttons';
import { UserContext } from '../context/UserContext';
import DeleteConfirmation from '../components/Buttons/Delete';
import { UserDetails } from '../components/UserDetails/UserDetails';

export const UserAdmin = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
    setIsModalOpen(true);
  };

  const openEditModalHandler = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const deleteUserHandler = (user) => {
    setSelectedUser(user);
    console.log('linea 45, ', user)
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteUserHandler = () => {
    const updatedUserList = userList.filter((u) => u._id !== selectedUser._id);
    console.log('linea 51', updatedUserList)
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

  useEffect(() => {
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

    fetchUsers();
  }, [user.token]);
  console.log('linea 92', userList)
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
          <TableContainer component={Paper} sx={{ marginTop: 20 }}>
            <Table sx={{ minWidth: 750 }}>
              <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '300px' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '300px' }}>Surname</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '250px' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', width: '150px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(userList) &&
                  userList.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell sx={{ textAlign: 'left' }}>{user.firstName}</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>{user.lastName}</TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>{user.role}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Button
                          variant="outlined"
                          sx={{ textTransform: 'none', mr: 1, border: 'none' }}
                          onClick={() => openEditModalHandler(user)}
                        >
                          <Edit />
                        </Button>
                        {user.role !== 'owner' && (
                          <Button
                            variant="outlined"
                            sx={{ textTransform: 'none', border: 'none', maxWidth: '16px', minWidth: '16px' }}
                            onClick={() => deleteUserHandler(user)}
                          >
                            <Delete />
                          </Button>
                        )}
                        <Button
                          variant="text"
                          sx={{ textTransform: 'none', border: 'none' }}
                          onClick={() => openUserDetailsModalHandler(user)}
                        >
                          {user.role !== 'owner' ? 'View Details' : 'View Owner Details'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <CustomModal open={isModalOpen} onClose={toggleAddUserModalHandler}>
        <CreateUserForm onUserAdd={addUserHandler} />
      </CustomModal>

      {selectedUser && (
        <UserDetails
          open={isUserDetailsModalOpen}
          onClose={() => setIsUserDetailsModalOpen(false)}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <CustomModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <EditUserForm userId={selectedUser._id} />
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












//TODO: fer funcional el botó filtrar i el buscador



