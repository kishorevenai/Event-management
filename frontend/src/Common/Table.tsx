import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({
  rows = [],
  cols = [],
  height = 400,
  loading = false,
  error = null,
  callBack = () => {},
}: {
  rows?: any;
  cols?: any;
  height?: any;
  loading?: boolean;
  error?: any;
  callBack: (data: any) => void | null;
}) {
  return (
    <Paper sx={{ height, width: "100%" }}>
      {error && (
        <Typography
          color="error"
          variant="body1"
          sx={{ p: 2, textAlign: "center" }}
        >
          {error?.data?.message || error?.message || "Something went wrong"}
        </Typography>
      )}
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        loading={loading} // <-- show loading overlay when true
        disableRowSelectionOnClick
        onRowClick={(id, row) => callBack(id)}
        sx={{
          border: "none",
          width: "100%",
          margin: "auto",
          marginTop: "50px",
        }}
      />
    </Paper>
  );
}
