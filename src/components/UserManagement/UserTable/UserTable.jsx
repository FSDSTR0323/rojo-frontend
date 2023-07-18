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
  tableHead: { backgroundColor: '#f1f3f4' },
  actionsHeader: { fontWeight: 'bold', textAlign: 'center', width: '150px' },
  actionsCell: { textAlign: 'center' },
  viewIcon: { textTransform: 'none', border: 'none' },
  deleteIcon: { textTransform: 'none', border: 'none' },
  editIcon: { textTransform: 'none', border: 'none' },
};

const UserTable = ({
  data,
  columns,
  onViewClick,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sx={column.headerStyle}>
                {column.header}
              </TableCell>
            ))}
            {(onViewClick || onDeleteClick || onEditClick) && (
              <TableCell sx={styles.actionsHeader}>Actions</TableCell>
            )}
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
                {(onViewClick || onDeleteClick || onEditClick) && (
                  <TableCell sx={styles.actionsCell}>
                    {onViewClick && (
                      <Button
                        variant="outlined"
                        sx={styles.viewIcon}
                        onClick={() => onViewClick(item)}
                      >
                        <Visibility />
                      </Button>
                    )}
                    {onDeleteClick && (
                      <Button
                        variant="outlined"
                        sx={styles.deleteIcon}
                        onClick={() => onDeleteClick(item)}
                      >
                        <Delete />
                      </Button>
                    )}
                    {onEditClick && (
                      <Button
                        variant="outlined"
                        sx={styles.editIcon}
                        onClick={() => onEditClick(item)}
                      >
                        <Edit />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
