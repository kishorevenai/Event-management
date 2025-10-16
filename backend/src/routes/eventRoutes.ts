import express from "express";
import {
  getEvents,
  addEvent,
  getEventById,
  addAttendeeToEvent,
  deleteEvent,
  deleteAttendeeFromEvent,
} from "../Controllers/eventController";

export const EventRoute = express.Router();

EventRoute.route("/get-events").get(getEvents);
EventRoute.route("/get-events/:id").get(getEventById).delete(deleteEvent);
EventRoute.route("/add-events").post(addEvent);
EventRoute.route("/add-attendee/:eventId")
  .post(addAttendeeToEvent)
  .delete(deleteAttendeeFromEvent);
