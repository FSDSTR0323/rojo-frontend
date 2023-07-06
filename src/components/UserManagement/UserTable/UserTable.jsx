import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const UserTable = ({
  userList,
  openUserDetailsModalHandler,
  deleteUserHandler,
  openEditModalHandler,
}) => {
  const [sortColumn, setSortColumn] = useState(''); 
  const [sortDirection, setSortDirection] = useState('asc'); 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {      
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {      
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUserList = [...userList].sort((a, b) => {    
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 750 }}>
        <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '25%' }}>
              <TableSortLabel
                active={sortColumn === 'firstName'}
                direction={sortColumn === 'firstName' ? sortDirection : 'asc'}
                onClick={() => handleSort('firstName')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '25%' }}>
              <TableSortLabel
                active={sortColumn === 'lastName'}
                direction={sortColumn === 'lastName' ? sortDirection : 'asc'}
                onClick={() => handleSort('lastName')}
              >
                Surname
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', width: '20%' }}>
              <TableSortLabel
                active={sortColumn === 'role'}
                direction={sortColumn === 'role' ? sortDirection : 'asc'}
                onClick={() => handleSort('role')}
              >
                Role
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', width: '25%', paddingRight: '3%' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(sortedUserList) &&
            sortedUserList.map((user) => (
              <TableRow key={user._id}>
                <TableCell sx={{ textAlign: 'left' }}>
                  {user.firstName}
                </TableCell>
                <TableCell sx={{ textAlign: 'left' }}>
                  {user.lastName}
                </TableCell>
                <TableCell sx={{ textAlign: 'left' }}>
                  {capitalizeFirstLetter(user.role)}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      border: 'none',
                      justifyContent: 'space-around',
                      fontSize: '0.8rem',
                      color:"#277c27fb",                    
                    }}
                    onClick={() => openUserDetailsModalHandler(user)}
                  >
                    {user.role === 'owner' && (
                      <>
                        <Visibility />
                      </>
                    )}
                    {user.role !== 'owner' && <Visibility />}
                  </Button>

                  {user.role !== 'owner' && (
                    <Button
                      variant="outlined"
                      sx={{ textTransform: 'none', border: 'none', color:"#277c27fb" }}
                      onClick={() => deleteUserHandler(user)}
                    >
                      <Delete />
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none', border: 'none', color:"#277c27fb" }}
                    onClick={() => openEditModalHandler(user)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
