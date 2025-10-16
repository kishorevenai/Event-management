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

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the event
 *         name:
 *           type: string
 *           description: The name of the event
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the event
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date and time of the event
 *         location:
 *           type: string
 *           description: The location of the event
 *         maxAttendees:
 *           type: integer
 *           nullable: true
 *           description: Maximum number of attendees allowed
 *         People:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attendee'
 *       example:
 *         id: 1
 *         name: Tech Conference 2025
 *         startDate: 2025-11-01T09:00:00Z
 *         endDate: 2025-11-01T17:00:00Z
 *         location: San Francisco, CA
 *         maxAttendees: 100
 *
 *     Attendee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the attendee
 *         name:
 *           type: string
 *           description: The name of the attendee
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the attendee
 *         eventId:
 *           type: integer
 *           description: The id of the event
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 *         eventId: 1
 *
 *     CreateEvent:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *         - location
 *       properties:
 *         name:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         maxAttendees:
 *           type: integer
 *           nullable: true
 *       example:
 *         name: Tech Conference 2025
 *         startDate: 2025-11-01T09:00:00Z
 *         endDate: 2025-11-01T17:00:00Z
 *         location: San Francisco, CA
 *         maxAttendees: 100
 *
 *     CreateAttendee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *       example:
 *         name: John Doe
 *         email: john@example.com
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management API
 */

/**
 * @swagger
 * /events/get-events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     description: Retrieve a list of all events ordered by start date (latest first)
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Failed to fetch events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
EventRoute.route("/get-events").get(getEvents);

/**
 * @swagger
 * /events/get-events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     description: Retrieve a specific event by its ID, including all attendees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details with attendees
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to fetch event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     description: Delete a specific event by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Failed to delete event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
EventRoute.route("/get-events/:id").get(getEventById).delete(deleteEvent);

/**
 * @swagger
 * /events/add-events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     description: Create a new event with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvent'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Failed to create event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
EventRoute.route("/add-events").post(addEvent);

/**
 * @swagger
 * /events/add-attendee/{eventId}:
 *   post:
 *     summary: Add an attendee to an event
 *     tags: [Events]
 *     description: Add a new attendee to a specific event. Returns error if event is at max capacity.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID to add attendee to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAttendee'
 *     responses:
 *       201:
 *         description: Attendee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendee'
 *       400:
 *         description: Event has reached maximum number of attendees
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to add attendee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Remove an attendee from an event
 *     tags: [Events]
 *     description: Delete a specific attendee from an event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attendeeId
 *             properties:
 *               attendeeId:
 *                 type: integer
 *                 description: The ID of the attendee to remove
 *             example:
 *               attendeeId: 1
 *     responses:
 *       200:
 *         description: Attendee removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendee'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to delete attendee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
EventRoute.route("/add-attendee/:eventId")
  .post(addAttendeeToEvent)
  .delete(deleteAttendeeFromEvent);
