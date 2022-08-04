import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  autoComplete: {
    width: "150px",
    color: "white",
    textAlign: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  languageContainer: {
    display: "flex",
  },
  languageIcon: {
    marginRight: "1rem",
  },
}));
