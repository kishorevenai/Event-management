"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttendeeFromEvent = exports.addAttendeeToEvent = exports.addEvent = exports.getEventById = exports.deleteEvent = exports.getEvents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield prisma.event.findMany({
            orderBy: {
                startDate: "desc", // latest startDate first
            },
        });
        res.json(events);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});
exports.getEvents = getEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("called delete event with id:", id);
    try {
        const deletedEvent = yield prisma.event.delete({
            where: { id: Number(id) },
        });
        res.json(deletedEvent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete event" });
    }
});
exports.deleteEvent = deleteEvent;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield prisma.event.findUnique({
            where: { id: Number(id) },
            include: { People: true },
        });
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(event);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch event" });
    }
});
exports.getEventById = getEventById;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, startDate, endDate, location, maxAttendees } = req.body;
    try {
        const newEvent = yield prisma.event.create({
            data: {
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                maxAttendees: maxAttendees ? Number(maxAttendees) : null,
                location,
                People: { create: [] },
            },
            include: { People: true },
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create event" });
    }
});
exports.addEvent = addEvent;
const addAttendeeToEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const { name, email } = req.body;
    console.log("Adding attendee:", { name, email });
    try {
        const event = yield prisma.event.findUnique({
            where: { id: Number(eventId) },
        });
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        if (event.maxAttendees) {
            const attendeeCount = yield prisma.people.count({
                where: { eventId: Number(eventId) },
            });
            if (attendeeCount >= event.maxAttendees) {
                return res
                    .status(400)
                    .json({ error: "Event has reached maximum number of attendees" });
            }
        }
        const attendee = yield prisma.people.create({
            data: {
                name,
                email,
                event: {
                    connect: { id: Number(eventId) },
                },
            },
        });
        res.status(201).json(attendee);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add attendee" });
    }
});
exports.addAttendeeToEvent = addAttendeeToEvent;
const deleteAttendeeFromEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const { attendeeId } = req.body;
    console.log("Deleting attendee:", { attendeeId });
    try {
        const event = yield prisma.event.findUnique({
            where: { id: Number(eventId) },
        });
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        const attendee = yield prisma.people.delete({
            where: { id: Number(attendeeId) },
        });
        res.status(200).json(attendee);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete attendee" });
    }
});
exports.deleteAttendeeFromEvent = deleteAttendeeFromEvent;
