import { makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { SelectProps } from "../../models/CustomSelectProps";
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

const Select: React.FC<SelectProps> = ({
  item,
  setItem,
  options
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
            setItem(newValue);
          }
        }}
        options={options}
        getOptionLabel={(option: any) => option.title}
        getOptionSelected={(option: any) => option.title}
        value={item}
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

export default Select;
