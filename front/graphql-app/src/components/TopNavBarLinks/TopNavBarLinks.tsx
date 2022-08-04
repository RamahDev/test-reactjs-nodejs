import {
  Button,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar/AppBar";
import PublicIcon from "@material-ui/icons/Public";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { languages } from "../../data/languages";
import { useStyles } from "./styles";

import "./TopNavBarLinks.scss";

const TopNavBarLinks: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const [value, setValue] = useState<any>(languages[0]);

  const setLanguage = (language: any) => {
    if (language) {
      setValue(language);
      sessionStorage.setItem("language", language.value);
      window.location.reload();
    }
  };

  const getLanguage = (value: any) => {
    return languages.find((language) => language.value === value);
  };

  useEffect(() => {
    if (sessionStorage.getItem("language")) {
      setValue(getLanguage(sessionStorage.getItem("language")));
    } else {
      setValue(languages[0]);
      sessionStorage.setItem("language", languages[0].value);
    }
  }, []);

  const renderAutoComplete = () => {
    if (value) {
      return (
        <>
          <div className={classes.languageContainer}>
            <PublicIcon className={classes.languageIcon} />
            <Autocomplete
              className={`${classes.autoComplete} auto-complete`}
              id="size-small-standard"
              size="small"
              onChange={(event, newValue) => {
                setLanguage(newValue);
              }}
              options={languages}
              getOptionLabel={(option: any) => option.title}
              getOptionSelected={(option: any) => option.title}
              value={value}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Langages"
                />
              )}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className={`${classes.root} root`}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Twitch Call React.js</Typography>
          <Typography variant="h6" className={classes.title}>
            <Button onClick={() => history.push("/")} color="default">
              <SportsEsportsIcon />
              Top Jeux
            </Button>
            <Button
              color="default"
              onClick={() => history.push("/streamers")}
            >
              <ViewStreamIcon />
              Streamers
            </Button>
            <Button
              color="default"
              onClick={() => history.push("/cron")}
            >
              <ViewStreamIcon />
              Cron
            </Button>
          </Typography>
          {renderAutoComplete()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavBarLinks;
