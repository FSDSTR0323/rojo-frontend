import { useState, useEffect } from 'react';

import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Kpi } from '../components/Widgets/Kpi/Kpi';

import axios from 'axios';
import { useUser } from '../hooks/useUser';

export const Dashboard = () => {
  const { user } = useUser();
  const [data, setData] = useState({});

  const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL;

  const getData = async () => {
    try {
      const response = await axios.get(baseUrl + 'analytics', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData(response.data);
      console.log('data api', data);
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
    },
    kpis: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      width: '100%',
    },
    charts: {},
    table: {},
  };

  return (
    <Container maxWidth="2xl" sx={styles.container}>
      <Box sx={styles.kpis}>
        {Object.entries(data.kpis || {}).map(([name, value]) => (
          <Kpi key={name} title={name} data={value}></Kpi>
        ))}
        {!data.kpis && (
          <Typography variant="body1">Loading Data...</Typography>
        )}
      </Box>
      <Box sx={styles.charts}></Box>
      <Box sx={styles.table}></Box>
    </Container>
  );
};
