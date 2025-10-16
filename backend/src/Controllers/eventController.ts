import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: "desc", // latest startDate first
      },
    });
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("called delete event with id:", id);

  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.json(deletedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { People: true },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export const addEvent = async (req: Request, res: Response) => {
  const { name, startDate, endDate, location, maxAttendees } = req.body;

  try {
    const newEvent = await prisma.event.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const addAttendeeToEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { name, email } = req.body;

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.maxAttendees) {
      const attendeeCount = await prisma.people.count({
        where: { eventId: Number(eventId) },
      });
      if (attendeeCount >= event.maxAttendees) {
        return res
          .status(400)
          .json({ error: "Event has reached maximum number of attendees" });
      }
    }

    const attendee = await prisma.people.create({
      data: {
        name,
        email,
        event: {
          connect: { id: Number(eventId) },
        },
      },
    });
    res.status(201).json(attendee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add attendee" });
  }
};

export const deleteAttendeeFromEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { attendeeId } = req.body;

  console.log("Deleting attendee:", { attendeeId });

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const attendee = await prisma.people.delete({
      where: { id: Number(attendeeId) },
    });
    res.status(200).json(attendee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete attendee" });
  }
};
