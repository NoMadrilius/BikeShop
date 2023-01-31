import { Grid } from '@mui/material';
import WCnavbar from 'features/workCatalogFunctional/workCatalogNavbarButton';
import React from 'react';
import './workCatalog.css';

const WorkCatalogNavbar: React.FC = () => {
  return (
    <Grid item xs={3}>
      <div className="navbar">
        <div className="myButton">
          <WCnavbar />
        </div>
      </div>
    </Grid>
  );
};

export default WorkCatalogNavbar;
