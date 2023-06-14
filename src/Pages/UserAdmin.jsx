import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Edit, Delete, Filter } from '@mui/icons-material';
import CustomModal from '../components/Main/CustomModal';
import { CreateUserForm } from '../components/SignUp/CreateUserForm';
import { EditUserForm } from '../components/EditUser/EditUser';
import Buttons from '../components/Buttons/buttons';

export const UserAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('');

  const toggleAddUserModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openEditModalHandler = (user) => {
    if (user) {
      setSelectedUser(user);
      setIsEditModalOpen(true);
      console.log('Edit modal opened');
    }
  };

  const addUserHandler = (user) => {
    setUserList((prevUserList) => [...prevUserList, user]);
    toggleAddUserModalHandler();
  };

  const deleteUserHandler = (user) => {
    const updatedUserList = userList.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          deleted: true,
        };
      }
      return u;
    });
    setUserList(updatedUserList);
  };

  const filterHandler = () => {
    const filteredUsers = userList.filter((user) => user.role === filter);
    setUserList(filteredUsers);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0px 3%',
          }}
        >
          <TableContainer component={Paper} sx={{ marginTop: 20 }}>
            <Table sx={{ minWidth: 750 }}>
              <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'left',
                      width: '300px',
                    }}
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'left',
                      width: '300px',
                    }}
                  >
                    Apellidos
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'left',
                      width: '250px',
                    }}
                  >
                    Rol
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'right',
                      width: '150px',
                    }}
                  >
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
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
                        sx={{
                          textTransform: 'none',
                          border: 'none',
                          maxWidth: '16px',
                          minWidth: '16px',
                        }}
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Exemple d'usuaris per esborrar quan poguem testejar desde front */}
                <TableRow>
                  <TableCell sx={{ textAlign: 'left' }}>Marisa</TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>
                    Vicente Chamorro
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>Chef</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        mr: 1,
                        border: 'none',
                        maxWidth: '16px',
                        minWidth: '16px',
                      }}
                      onClick={() =>
                        openEditModalHandler({
                          id: 1,
                          firstName: 'Marisa',
                          lastName: 'Vicente Chamorro',
                          role: 'Chef',
                        })
                      }
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        border: 'none',
                        maxWidth: '16px',
                        minWidth: '16px',
                      }}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: 'left' }}>Test2</TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>Test2</TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>Chef</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        mr: 1,
                        border: 'none',
                        maxWidth: '16px',
                        minWidth: '16px',
                      }}
                      onClick={() =>
                        openEditModalHandler({
                          id: 1,
                          firstName: 'Marisa',
                          lastName: 'Vicente Chamorro',
                          role: 'Chef',
                        })
                      }
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        border: 'none',
                        maxWidth: '16px',
                        minWidth: '16px',
                      }}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <CustomModal open={isModalOpen} onClose={toggleAddUserModalHandler}>
        <CreateUserForm onUserAdd={addUserHandler} />
      </CustomModal>

      {/* Pop up d'edició */}
      {selectedUser && (
        <CustomModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditUserForm user={selectedUser} />
        </CustomModal>
      )}
    </>
  );
};

//TODO: fer funcional el botó filtrar i el buscador
