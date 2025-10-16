import DataTable from "../../Common/Table";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetEventsQuery } from "./EventApiSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteEventMutation } from "./EventApiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarOrigin } from "@mui/material/Snackbar";
import { useState } from "react";
import Alert from "@mui/material/Alert";

type Event = {
  id: number;
  name: string;
  location: string;
  maxAttendees: number | null;
};

interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}

const EventLists = () => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const handleClick = (newState: any) => () => {
    setState((prev) => ({
      ...prev,
      ...newState,
      open: true,
      message: newState.message,
    }));
  };

  const { vertical, horizontal, open, message } = state;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "Events", headerName: "Event Name", width: 500 },
    { field: "Location", headerName: "Location", width: 200 },
    { field: "Max Attendees", headerName: "Max Attendees", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="rounded hover:bg-red-100"
            onClick={() => handleDelete(params.row.id)}
            title="Delete Event"
          >
            <DeleteIcon style={{ color: "red" }} />
          </button>

          <button
            className="rounded hover:bg-blue-100"
            onClick={() => handleRoute(params.row)}
            title="View Attendees"
          >
            <EmojiPeopleIcon style={{ color: "black" }} />
          </button>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  let rows = [];

  const { data, isLoading, isSuccess, isError, error } = useGetEventsQuery({});
  const [deleteEvent] = useDeleteEventMutation();

  if (isSuccess) {
    console.log("data:", data);
    rows = data.map((event: Event) => ({
      id: event.id,
      Events: event.name,
      Location: event.location,
      "Max Attendees": event.maxAttendees,
    }));
  }

  const handleRoute = (data: any) => {
    navigate(`/Attendee-List/${data.id}`);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id).unwrap();
      handleClick({
        vertical: "top",
        horizontal: "center",
        message: "Event deleted successfully",
      })();
    } catch (err) {
      console.error("Failed to delete the event: ", err);
      handleClick({
        vertical: "top",
        horizontal: "center",
        message: "Failed to delete the event",
      })();
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000} // optional: auto-close after 3 seconds
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.includes("success") ? "success" : "error"} // sets color based on message
          sx={{ width: "100%" }} // full width
        >
          {message}
        </Alert>
      </Snackbar>

      <p className="text-primary my-5 ml-5 w-[80%]">Event lists</p>
      <DataTable
        error={isError ? error : null}
        loading={isLoading}
        height={600}
        rows={rows}
        cols={columns}
        callBack={() => null}
      />
    </div>
  );
};

export default EventLists;
