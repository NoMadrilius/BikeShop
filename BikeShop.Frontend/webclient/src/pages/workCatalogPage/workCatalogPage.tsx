import { Grid } from '@mui/material';
import React from 'react';
import WorkCatalogContent from '../../widgets/workCatalog/workCatalogContent';
import WorkCatalogNavbar from '../../widgets/workCatalog/workCatalogNavbar';

const WorkCatalogPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#cccac6', height: '100vh' }}>
      <Grid container spacing={1} columns={16}>
        <WorkCatalogNavbar />
        <WorkCatalogContent />
      </Grid>
    </div>
  );
};

export default WorkCatalogPage;
