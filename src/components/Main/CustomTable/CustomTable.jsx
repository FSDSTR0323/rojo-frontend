import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Paper,
  Button,
} from '@mui/material';
import { Visibility, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';

const styles = {
  table: { minWidth: 750 },
  tableContainer: { marginTop: 4 },
  tableHead: { backgroundColor: '#f1f3f4' },
  actionsHeader: { fontWeight: 'bold', textAlign: 'center', width: '150px' },
  actionsCell: { textAlign: 'center' },
  tableRow: { height: '5em' },
  icon: { textTransform: 'none', border: 'none' },
};

const CustomTable = ({
  data,
  columns,
  onViewClick,
  onDeleteClick,
  onEditClick,
}) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = [...data].sort((a, b) => {
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

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const actions = [
    {
      icon: <Visibility />,
      onClick: onViewClick,
    },
    {
      icon: <Delete />,
      onClick: onDeleteClick,
    },
    {
      icon: <Edit />,
      onClick: onEditClick,
    },
  ];

  const isActionableTable = actions.every(
    (action) => action.onClick !== undefined
  );

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={styles.table}>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={column.key} sx={column.headerStyle}>
                {column.isSortable ? (
                  <TableSortLabel
                    active={sortColumn === column.key}
                    direction={
                      sortColumn === column.key ? sortDirection : 'asc'
                    }
                    onClick={() => handleSort(column.key)}
                  >
                    {column.header}
                  </TableSortLabel>
                ) : (
                  column.header
                )}
              </TableCell>
            ))}
            {isActionableTable && (
              <TableCell sx={styles.actionsHeader}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(sortedData) &&
            sortedData?.map((item) => (
              <TableRow key={item._id} sx={styles.tableRow}>
                {columns.map((column) => (
                  <TableCell key={column.key} sx={column.cellStyle}>
                    {column.renderCell
                      ? column.renderCell(item)
                      : item[column.key]}
                  </TableCell>
                ))}
                {isActionableTable && (
                  <TableCell sx={styles.actionsCell}>
                    {actions.map(
                      (action, index) =>
                        action.onClick && (
                          <Button
                            key={index}
                            variant="outlined"
                            sx={styles.icon}
                            onClick={() => action.onClick(item)}
                          >
                            {action.icon}
                          </Button>
                        )
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

export default CustomTable;
