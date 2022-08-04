import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { FilterSectionProps } from "../../models/FilterSectionProps";
import CsvExport from "../CsvExport/CsvExport";
import CustomSelect from "../CustomSelect/CustomSelect";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    margin: "2em 0",
  },
}));

const FilterSection: React.FC<FilterSectionProps> = ({
  customSelectProps,
  csvReport,
  isLoading,
}) => {
  const classes = useStyles();

  const renderDownloadButton = () => {
    if (!isLoading) {
      return <CsvExport {...csvReport} />;
    }
  };

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={4} className={classes.center}>
          <CustomSelect {...customSelectProps}></CustomSelect>
        </Grid>
        {customSelectProps.stream && <Grid item xs={4} className={classes.center}>
          <CustomSelect {...customSelectProps} isStreamer={true} ></CustomSelect>
        </Grid>}
        <Grid item xs={4}>
          {renderDownloadButton()}
        </Grid>
      </Grid>
    </>
  );
};
export default FilterSection;
