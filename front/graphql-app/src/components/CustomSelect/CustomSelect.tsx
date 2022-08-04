import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { dataCountList, dataStream } from "../../data/dataCountList";
import { CustomSelectProps } from "../../models/CustomSelectProps";

import "./CustomSelect.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  autoComplete: {
    width: "150px",
    color: "white",
    textAlign: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const CustomSelect: React.FC<CustomSelectProps> = ({
  dataCount,
  setDataCount,
  isStreamer,
  stream,
  setStream,
}) => {
  const classes = useStyles();

  return (
    <>
      <Autocomplete
        className={`${classes.autoComplete} auto-complete`}
        id="size-small-standard"
        size="small"
        onChange={(event, newValue) => {
          if (newValue) {
            if (isStreamer) {
              setStream(newValue);
            } else {
              setDataCount(newValue);
            }
          }
        }}
        options={isStreamer ? dataStream : dataCountList}
        getOptionLabel={(option: any) => option.title || ""}
        getOptionSelected={(option: any) => option.title}
        value={isStreamer ? stream : dataCount}
        renderInput={(params: any) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Données par scroll"
          />
        )}
      />
    </>
  );
};

export default CustomSelect;
