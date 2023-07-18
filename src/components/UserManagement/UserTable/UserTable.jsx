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
  tableRow: { height: '5em' },
  icon: { textTransform: 'none', border: 'none' },
};

const UserTable = ({
  data,
  columns,
  onViewClick,
  onDeleteClick,
  onEditClick,
}) => {
  const isActionableTable = onViewClick || onDeleteClick || onEditClick;

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
            {isActionableTable && (
              <TableCell sx={styles.actionsHeader}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.map((item) => (
              <TableRow key={item._id} sx={styles.tableRow}>
                {columns.map((column) => (
                  <TableCell key={column.key} sx={column.cellStyle}>
                    {column.renderCell
                      ? column.renderCell(item)
                      : item[column.key]}
                  </TableCell>
                ))}
                <TableCell sx={styles.actionsCell}>
                  {isActionableTable &&
                    actions.map(
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
