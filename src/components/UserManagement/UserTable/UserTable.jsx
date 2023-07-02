import { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

class UserTable extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userList !== this.props.userList) {
      console.log('UserTable userList:', this.props.userList);
    }
  }

  render() {
    const {
      userList,
      openUserDetailsModalHandler,
      deleteUserHandler,
      openEditModalHandler,
    } = this.props;
    console.log('UserTable userList:', userList);

    return (
      <TableContainer component={Paper} sx={{ marginTop: 20 }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', textAlign: 'left', width: '300px' }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', textAlign: 'left', width: '300px' }}
              >
                Surname
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', textAlign: 'left', width: '250px' }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', textAlign: 'right', width: '220px' }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(userList) &&
              userList.map((user) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ textAlign: 'left' }}>
                    {user.firstName}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>
                    {user.lastName}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'left' }}>{user.role}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        border: 'none',
                        justifyContent: 'space-around',
                      }}
                      onClick={() => openUserDetailsModalHandler(user)}
                    >
                      {user.role === 'owner' && (
                        <>
                          <Visibility sx={{ marginRight: '0.5rem' }} />
                          See your own details
                        </>
                      )}
                      {user.role !== 'owner' && <Visibility />}
                    </Button>

                    {user.role !== 'owner' && (
                      <Button
                        variant="outlined"
                        sx={{ textTransform: 'none', mr: 1, border: 'none' }}
                        onClick={() => deleteUserHandler(user)}
                      >
                        <Delete />
                      </Button>
                    )}

                    {user.role !== 'owner' && (
                      <Button
                        variant="outlined"
                        sx={{ textTransform: 'none', mr: 1, border: 'none' }}
                        onClick={() => openEditModalHandler(user)}
                      >
                        <Edit />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default UserTable;
