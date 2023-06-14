import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import CustomModal from '../components/Main/CustomModal';
import { CreateUserForm } from '../components/signUp/CreateUserForm';
import { EditUserForm } from '../components/EditUser/EditUser';
import Buttons from '../components/Buttons/buttons';
import SelectRoles from '../components/Buttons/SelectRoles';
import DeleteConfirmation from '../components/Buttons/DeleteConfirmation';
import { UserContext } from '../context/UserContext';

export const UserAdmin = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [originalUserList, setOriginalUserList] = useState([]);
  const [filterRole, setFilterRole] = useState('');

  const toggleAddUserModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openEditModalHandler = (user) => {
    if (user) {
      setSelectedUser(user);
      setIsEditModalOpen(true);
    }
  };

  const addUserHandler = (user) => {
    setUserList((prevUserList) => [...prevUserList, user]);
    setOriginalUserList((prevUserList) => [...prevUserList, user]);
    toggleAddUserModalHandler();
  };

  const confirmDeleteUserHandler = (userToDelete, filteredUsers) => {
    const updatedUserList = userList.filter((u) => u.id !== userToDelete.id);
    setUserList(filteredUsers);
    setOriginalUserList(filteredUsers);
    setDeleteConfirmationOpen(false);
  };

  const cancelDeleteUserHandler = () => {
    setDeleteConfirmationOpen(false);
  };

  const deleteUserHandler = (user) => {
    setSelectedUser(user);
    setDeleteConfirmationOpen(true);
  };

  const handleFilterRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleFilterChange = () => {
    if (filterRole === 'all') {
      setUserList(originalUserList);
    } else {
      const filteredUsers = originalUserList.filter((user) => user.role === filterRole);
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

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mx: 3, mb: 4, textAlign: 'left' }}>
          Panel de gestión de usuarios
        </Typography>
        <Buttons
          toggleAddUserModalHandler={toggleAddUserModalHandler}
          filterHandler={filterHandler}
          handleFilterChange={handleFilterChange}
          filterValue={filter}
        />

        <SelectRoles
          filterRole={filterRole}
          handleFilterRoleChange={handleFilterRoleChange}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0px 3%' }}>
          <TableContainer component={Paper} sx={{ marginTop: 20 }}>
            <Table sx={{ minWidth: 750 }}>
              <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '300px' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '300px' }}>Apellidos</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '250px' }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', width: '150px' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(userList) &&
                  userList.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell sx={{ textAlign: 'left' }}>
                        {user.firstName}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>
                        {user.lastName}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'left' }}>
                        {user.role}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Button
                          variant="outlined"
                          sx={{ textTransform: 'none', mr: 1, border: 'none' }}
                          onClick={() => openEditModalHandler(user)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ textTransform: 'none', border: 'none', maxWidth: '16px', minWidth: '16px' }}
                          onClick={() => deleteUserHandler(user)}
                        >
                          <Delete />
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
        <CustomModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <EditUserForm user={selectedUser} />
        </CustomModal>
      )}

      <DeleteConfirmation
        open={deleteConfirmationOpen}
        onCancel={cancelDeleteUserHandler}
        onConfirm={confirmDeleteUserHandler}
        userToDelete={selectedUser}
        filteredUsers={userList.filter((user) => user.role === filter)}
      />
    </>
  );
};





//TODO: fer funcional el botó filtrar i el buscador



