import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

const Loader: React.FC = () => {
  return (
    <Grid item xs={12} container>
      <CircularProgress />
    </Grid>
  );
};
export default Loader;
