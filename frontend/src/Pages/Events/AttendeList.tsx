import DataTable from "../../Common/Table";
import type { GridColDef } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import {
  useGetEventByIdQuery,
  useAddPeopleToEventMutation,
  useDeletePeopleFromEventMutation,
} from "./EventApiSlice";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { SnackbarOrigin } from "@mui/material/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";

interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}

const AttendeList = () => {
  const { id } = useParams();

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const { vertical, horizontal, open, message } = state;

  // API CALLS

  const [attendeesName, setAttendeesName] = useState("");
  const [attendeesEmail, setAttendeesEmail] = useState("");

  const [
    addPeopleToEvent,
    {
      isLoading: isAdding,
      isSuccess: isAddSuccess,
      isError: isAddError,
      error: addError,
    },
  ] = useAddPeopleToEventMutation();

  const [deletePeopleFromEvent] = useDeletePeopleFromEventMutation();

  const { data, isLoading, isSuccess, isError, error } =
    useGetEventByIdQuery(id);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 500 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="rounded hover:bg-red-100"
            onClick={() => handleDelete(params.row.id)}
            title="Delete Attendee"
          >
            <DeleteIcon style={{ color: "red" }} />
          </button>
        </div>
      ),
    },
  ];

  let eventTitle = null;
  let people = [];

  if (isSuccess) {
    eventTitle = data.name;
    people = data.People || [];
  }

  const handleClick = (newState: any) => () => {
    setState((prev) => ({
      ...prev,
      ...newState,
      open: true,
      message: newState.message,
    }));
  };

  const handleDelete = async (attendeeId: number) => {
    try {
      await deletePeopleFromEvent({
        eventId: id,
        attendeeId,
      }).unwrap();
      handleClick({
        vertical: "top",
        horizontal: "center",
        message: "Attendee deleted successfully!",
      })();
    } catch (error) {
      console.log("Error deleting attendee:", error);
      handleClick({
        vertical: "top",
        horizontal: "center",
        message: "Failed to delete attendee!",
      })();
      console.error("Failed to delete attendee:", error);
    }
  };

  // useEffect(() => {}, [isAddSuccess]);

  const handleAddAttendee = async (e: any) => {
    e.preventDefault();
    const newAttendee = {
      name: attendeesName,
      email: attendeesEmail,
    };

    try {
      await addPeopleToEvent({
        eventId: id,
        attendee: newAttendee,
      }).unwrap();

      setAttendeesName("");
      setAttendeesEmail("");
      handleClick({
        vertical: "top",
        horizontal: "center",
        message: "Attendee added successfully!",
      })();
    } catch (error) {
      console.log("Error adding attendee:", error);
      handleClick({
        vertical: "top",
        horizontal: "center",
        message: error.data.error,
      })();
      console.error("Failed to add attendee:", error);
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <form onSubmit={handleAddAttendee}>
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

        <p className="text-primary">{isLoading ? "Loading..." : eventTitle}</p>
        <p className="text-secondary">
          Manage your event details and attendees below.
        </p>

        <div className="mt-5 p-5 border border-gray-400 rounded-2xl">
          <p className="text-primary">Add New Attendee</p>
          <div className="flex gap-5 ">
            <div className="flex flex-col gap-3 mt-3 flex-1">
              <label>Attendee name</label>
              <input
                required
                type="text"
                className="input-field"
                value={attendeesName}
                onChange={(e) => setAttendeesName(e.target.value)}
                placeholder="e.g., Jane Done"
              />
            </div>

            <div className="flex flex-col gap-3 mt-3 flex-1">
              <label>Attendee Email</label>
              <input
                required
                type="text"
                className="input-field"
                value={attendeesEmail}
                onChange={(e) => setAttendeesEmail(e.target.value)}
                placeholder="e.g., jane.doe@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-black px-5 py-2 rounded-md border border-black hover:bg-black hover:text-white transition cursor-pointer mt-5"
            disabled={isAdding}
          >
            Add Attendee
          </button>
        </div>
      </form>
      <DataTable
        callBack={() => null}
        height={400}
        rows={people}
        cols={columns}
      />
    </div>
  );
};

export default AttendeList;
