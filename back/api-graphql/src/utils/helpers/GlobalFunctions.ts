import { MODULE_TOKEN } from "../../data/constants";

export const GetModuleToken = async (): Promise<string | null | boolean> => MODULE_TOKEN;

export const IsJsonString = (str: string | boolean | null) => {
  try {
    if (typeof str !== 'string') return false;
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
