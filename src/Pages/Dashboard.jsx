import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { Box } from '@mui/system';
import { Kpi } from '../components/Widgets/Kpi/Kpi';

import axios from 'axios';
import { useUser } from '../hooks/useUser';
import { Loader } from '../components/Main/Loader/Loader';
import { LineChart } from '../components/Widgets/LineChart/LineChart';
import { PieChart } from '../components/Widgets/PieChart/PieChart';
import CustomTable from '../components/Main/CustomTable/CustomTable';
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';

export const Dashboard = () => {
  const { user } = useUser();
  const [data, setData] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(() => {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - 30); // Setting last 30 days by default
    return tempDate;
  });

  const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL;

  const getData = async () => {
    try {
      const response = await axios.get(baseUrl + 'analytics', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          start: startDate,
          end: endDate,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const styles = {
  //   container: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     width: '100%',
  //     '> *': {
  //       marginBottom: '2em',
  //     },
  //   },
  //   kpisContainer: {
  //     display: 'flex',
  //     gap: '1.25em',
  //   },
  //   kpis: {
  //     flex: '1',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     gap: '2em',
  //   },
  //   chartsContainer: {
  //     display: 'flex',
  //     justifyContent: 'flex-start',
  //     flex: '1',
  //     gap: '10px',
  //     width: '20%',
  //   },
  //   chart: {
  //     boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  //     padding: 4,
  //     borderRadius: '20px',
  //     flex: '1',
  //   },
  //   table: {
  //     width: '100%',
  //   },
  // };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    dataContainer: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'space-between',
    },
    kpis: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '30px',
      width: '15%'
    },
    chartsContainer: {
      display: 'flex',
      gap: '10px',
      flex: 1,
      '.chart': {
        minWidth: '0',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding: 4,
        borderRadius: '20px',
      },
      '.line': {
        width: '70%'
      },
      '.pie': {
        width: '30%',
      }
    },
    table: {
      marginBottom: '2em',
    },
  };

  const validationColumns = [
    {
      key: 'createdAt',
      header: 'Creation Date',
      headerStyle: { fontWeight: 'bold', textAlign: 'left', width: '15%' },
      cellStyle: { textAlign: 'left' },
    },
    {
      key: 'name',
      header: 'RecipeName',
      headerStyle: { fontWeight: 'bold', textAlign: 'left', width: '30%' },
      cellStyle: { textAlign: 'left' },
    },
    {
      key: 'createdBy',
      header: "Chef's Name",
      headerStyle: { fontWeight: 'bold', textAlign: 'left', width: '20%' },
      cellStyle: { textAlign: 'left' },
    },
    {
      key: 'nickname',
      header: "Chef's Nickname",
      headerStyle: { fontWeight: 'bold', textAlign: 'left', width: '20%' },
      cellStyle: { textAlign: 'left' },
    },
    {
      key: 'status',
      header: 'Status',
      headerStyle: { fontWeight: 'bold', textAlign: 'center', width: '20%' },
      cellStyle: { textAlign: 'center' },
      renderCell: (item) => {
        return item.status ? (
          <DoneIcon sx={{ color: '#0b8218de', fontSize: '3em' }} />
        ) : (
          <DangerousIcon sx={{ color: '#ff0000', fontSize: '3em' }} />
        );
      },
    },
  ];

  return (
    <>
      <Loader data={data} />
      {data && (
        <Container maxWidth="2xl" sx={styles.container}>
          <Box sx={styles.dataContainer}>
            <Box sx={styles.kpis}>
              {Object.entries(data?.kpis || {}).map(([name, value]) => (
                <Kpi key={name} title={name} data={value} />
              ))}
            </Box>
            <Box sx={styles.chartsContainer}>
              <Box className=" chart line">
                <LineChart />
              </Box>
              <Box className="chart pie">
                <PieChart />
              </Box>
            </Box>
          </Box>
          <Box sx={styles.table}>
            <CustomTable
              data={data?.validationList}
              columns={validationColumns}
            />
          </Box>
        </Container>
      )}
    </>
  );
};
