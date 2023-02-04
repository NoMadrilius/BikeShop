import { Grid } from '@mui/material';
import WorkContent from 'features/workCatalogFunctional/workCatalogCont';
import React from 'react';
import './workCatalog.css';

const WorkCatalogContent: React.FC = () => {
  return (
    <Grid item xs={13}>
      <div className="Content">
        <WorkContent />
      </div>
    </Grid>
  );
};

export default WorkCatalogContent;
