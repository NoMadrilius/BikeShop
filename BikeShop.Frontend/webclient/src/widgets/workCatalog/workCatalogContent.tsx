import { Grid } from "@mui/material";
import React from "react";
import "./workCatalog.css"





const WorkCatalogContent:React.FC =()=>{



    return(
        <Grid item xs={13}>
        <div className="Content">
         Артикул 
         <div>Артикул </div>
         <div>Название</div>
         <div>Описание</div>
         <div>Цена</div>
        </div>
        </Grid>

    )
}

export default WorkCatalogContent