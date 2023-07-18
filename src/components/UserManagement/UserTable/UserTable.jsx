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

const styles = {
  actionsHeader: { fontWeight: 'bold', textAlign: 'center', width: '150px' },
  actionsCell: { textAlign: 'center' },
  viewIcon: { textTransform: 'none', border: 'none', mr: 1 },
  deleteIcon: { textTransform: 'none', mr: 1, border: 'none' },
  editIcon: { textTransform: 'none', mr: 1, border: 'none' },
};

const UserTable = ({
  data,
  columns,
  onRowClick,
  onDeleteClick,
  onEditClick,
}) => {
  console.log(columns[columns.length - 1].headerStyle);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f1f3f4' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sx={column.headerStyle}>
                {column.header}
              </TableCell>
            ))}
            <TableCell sx={styles.actionsHeader}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.map((item) => (
              <TableRow key={item._id} sx={{ height: '5em' }}>
                {columns.map((column) => (
                  <TableCell key={column.key} sx={column.cellStyle}>
                    {column.renderCell
                      ? column.renderCell(item)
                      : item[column.key]}
                  </TableCell>
                ))}
                <TableCell sx={styles.actionsCell}>
                  <Button
                    variant="outlined"
                    sx={styles.viewIcon}
                    onClick={() => onRowClick(item)}
                  >
                    <Visibility />
                  </Button>

                  <Button
                    variant="outlined"
                    sx={styles.deleteIcon}
                    onClick={() => onDeleteClick(item)}
                  >
                    <Delete />
                  </Button>

                  <Button
                    variant="outlined"
                    sx={styles.editIcon}
                    onClick={() => onEditClick(item)}
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
