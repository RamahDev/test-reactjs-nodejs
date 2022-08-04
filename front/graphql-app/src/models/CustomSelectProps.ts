export interface CustomSelectProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setDataCount: Function;
  dataCount: any;
  isStreamer?: boolean
  stream?: any;
  setStream?: any;
}

export interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setItem: Function;
  item: any;
  options: any[];
}
