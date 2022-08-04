import { CsvReport } from "./CsvReport";
import { CustomSelectProps } from "./CustomSelectProps";

export interface FilterSectionProps {
  customSelectProps: CustomSelectProps;
  csvReport: CsvReport;
  isLoading: boolean;
}
