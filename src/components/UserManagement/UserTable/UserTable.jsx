import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import { Visibility, Delete, Edit } from '@mui/icons-material';

// Styles object
const styles = {
  tableContainer: {
    marginTop: 20,
  },
  table: {
    minWidth: 750,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  nameCell: {
    textAlign: 'left',
  },
  actionsCell: {
    textAlign: 'right',
  },
  button: {
    textTransform: 'none',
    border: 'none',
    justifyContent: 'space-around',
    fontSize: '0.8rem',
  },
  deleteButton: {
    textTransform: 'none',
    mr: 1,
    border: 'none',
  },
};

const UserTable = ({
  userList,
  openUserDetailsModalHandler,
  deleteUserHandler,
  openEditModalHandler,
}) => {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={styles.table}>
        <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
          <TableRow>
            <TableCell sx={{ ...styles.tableHeaderCell, width: '300px' }}>
              Name
            </TableCell>
            <TableCell sx={{ ...styles.tableHeaderCell, width: '300px' }}>
              Surname
            </TableCell>
            <TableCell sx={{ ...styles.tableHeaderCell, width: '250px' }}>
              Role
            </TableCell>
            <TableCell sx={{ ...styles.tableHeaderCell, width: '220px' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(userList) &&
            userList.map((user) => (
              <TableRow key={user._id} sx={{ height: '5em' }}>
                <TableCell sx={styles.nameCell}>{user.firstName}</TableCell>
                <TableCell sx={styles.nameCell}>{user.lastName}</TableCell>
                <TableCell sx={styles.nameCell}>{user.role}</TableCell>
                <TableCell sx={styles.actionsCell}>
                  <Button
                    variant="outlined"
                    sx={styles.button}
                    onClick={() => openUserDetailsModalHandler(user)}
                  >
                    {user.role === 'owner' && (
                      <>
                        <Visibility sx={{ marginRight: '0.5rem' }} />
                        Your details
                      </>
                    )}
                    {user.role !== 'owner' && <Visibility />}
                  </Button>

                  {user.role !== 'owner' && (
                    <Button
                      variant="outlined"
                      sx={styles.deleteButton}
                      onClick={() => deleteUserHandler(user)}
                    >
                      <Delete />
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    sx={styles.deleteButton}
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
