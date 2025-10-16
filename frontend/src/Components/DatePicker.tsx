import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({
  title,
  callback,
  required = false,
}: {
  title: string;
  callback: (date: any) => void;
  required?: boolean;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={title}
          onChange={(date) => callback(date ? date.format("YYYY-MM-DD") : null)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
