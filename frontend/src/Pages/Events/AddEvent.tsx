import BasicDatePicker from "../../Components/DatePicker";
import { useState } from "react";
import { useAddEventMutation } from "./EventApiSlice";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [addEvent, { isLoading, isSuccess, isError, error }] =
    useAddEventMutation();

  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState<number | undefined>();

  const handleSaveEvent = async (e: any) => {
    e.preventDefault();
    try {
      await addEvent({
        name: eventName,
        location,
        maxAttendees,
        startDate,
        endDate,
      }).unwrap();

      navigate("/");
    } catch (error) {
      console.log("Failed to save the event:", error);
    }
  };

  return (
    <form
      onSubmit={handleSaveEvent}
      className="max-w-[1000px] mx-auto mt-[50px] px-[20px]"
    >
      <div className="mb-10">
        <p className="text-primary">CREATE EVENT</p>
        <p className="text-secondary">
          Fill in the details below to create your new event.
        </p>
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="event-name" className="font-medium">
          Event Name
        </label>
        <input
          required
          onChange={(e) => setEventName(e.target.value)}
          type="text"
          id="event-name"
          placeholder="e.g., Tech Conference 2023"
          className="input-field"
        />
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="event-location" className="font-medium">
          Location
        </label>
        <input
          required
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="event-location"
          placeholder="e.g., Online or San Francisco, CA"
          className="input-field"
        />
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="event-max-attendees" className="font-medium">
          Max Attendees
        </label>
        <input
          required
          onChange={(e) => setMaxAttendees(Number(e.target.value))}
          type="number"
          id="event-max-attendees"
          placeholder="e.g., 100"
          className="input-field"
        />
      </div>

      <div className="flex gap-10 mb-5">
        <BasicDatePicker
          required={true}
          callback={setStartDate}
          title={"Start date"}
        />
        <BasicDatePicker
          required={true}
          callback={setEndDate}
          title={"End date"}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded text-white font-semibold ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Creating Event..." : "Create Event"}
      </button>

      {isError && (
        <p className="text-red-500 mt-2">
          {error?.data?.message || "Something went wrong"}
        </p>
      )}
      {isSuccess && (
        <p className="text-green-500 mt-2">Event created successfully!</p>
      )}
    </form>
  );
};

export default AddEvent;
