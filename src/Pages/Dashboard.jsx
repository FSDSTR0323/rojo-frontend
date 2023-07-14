import { useState, useEffect } from 'react';

import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Kpi } from '../components/Widgets/Kpi/Kpi';

import axios from 'axios';
import { useUser } from '../hooks/useUser';

export const Dashboard = () => {
  const { user } = useUser();
  const [kpis, setKpis] = useState({});

  const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_HOST_URL;

  const kpiMetrics = [
    { name: 'Recipes', endpoint: 'recipe' },
    { name: 'Validations', endpoint: 'validation' },
    { name: 'Users', endpoint: 'user/list' },
  ];

  const getKpiData = async (endpoint) => {
    try {
      const response = await axios.get(baseUrl + endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data.length || 1;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllKpisData = async () => {
    try {
      const kpiPromises = kpiMetrics.map(async (metric) => {
        const kpi = await getKpiData(metric.endpoint);
        return { [metric.name]: kpi };
      });

      const resolvedKpis = await Promise.all(kpiPromises);
      const mergedKpis = Object.assign({}, ...resolvedKpis);
      setKpis(mergedKpis);

      console.log(kpis);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllKpisData();
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
        {Object.entries(kpis).map(([name, value]) => (
          <Kpi key={name} title={name} data={value}></Kpi>
        ))}
      </Box>
      <Box sx={styles.charts}></Box>
      <Box sx={styles.table}></Box>
    </Container>
  );
};
