"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoute = void 0;
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../Controllers/eventController");
exports.EventRoute = express_1.default.Router();
exports.EventRoute.route("/get-events").get(eventController_1.getEvents);
exports.EventRoute.route("/get-events/:id").get(eventController_1.getEventById).delete(eventController_1.deleteEvent);
exports.EventRoute.route("/add-events").post(eventController_1.addEvent);
exports.EventRoute.route("/add-attendee/:eventId")
    .post(eventController_1.addAttendeeToEvent)
    .delete(eventController_1.deleteAttendeeFromEvent);
