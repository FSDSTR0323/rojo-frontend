import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { Box } from '@mui/system';
import { Kpi } from '../components/Widgets/Kpi/Kpi';

import axios from 'axios';
import { useUser } from '../hooks/useUser';
import { Loader } from '../components/Main/Loader/Loader';
import { LineChart } from '../components/Widgets/LineChart/LineChart';
import { PieChart } from '../components/Widgets/PieChart/PieChart';

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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      '> *': {
        marginBottom: '2em',
      },
    },
    kpis: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      width: '100%',
    },
    charts: {
      display: 'flex',
      gap: '10px',
      width: '50%',
      maxHeight: '50vh',
    },
    table: {},
  };

  return (
    <>
      <Loader data={data} />
      <Container maxWidth="2xl" sx={styles.container}>
        <Box sx={styles.kpis}>
          {Object.entries(data?.kpis || {}).map(([name, value]) => (
            <Kpi key={name} title={name} data={value} />
          ))}
        </Box>
        <Box sx={styles.charts}>
          <LineChart />
          <PieChart />
        </Box>
        <Box sx={styles.table}></Box>
      </Container>
    </>
  );
};
