import { HashMap } from "../models/HashMap";

export const checkLanguage = () => {
  if (sessionStorage.getItem("language")) {
    return sessionStorage.getItem("language") !== "all";
  }
};

export const checkIfAllToFetch = (dataCount: HashMap) => {
  return dataCount.value === "all";
};
