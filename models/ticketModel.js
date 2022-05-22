import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - resolutionDue
 *        - responseDue
 *        - resolutuonDue
 *        - agent
 *       properties:
 *         title:
 *           type: string
 *           example: "Title 1"
 *         description:
 *           type: string
 *           example: "Title 1 description"
 *         resolutionDue:
 *           type: string
 *           format: date
 *           example: "2022-05-18"
 *         responseDue:
 *           type: string
 *           format: date
 *           example: "2022-05-18"
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Urgent]
 *           default: Low
 *         status:
 *           type: string
 *           enum: [Open, Closed]
 *           default: Open
 *         agent:
 *           type: string
 *           example: "Agent 1"
 */

const ticketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: new Date(new Date().setUTCHours(0, 0, 0, 0)),
    },
    resolutionDue: {
      type: Date,
      required: true,
    },
    responseDue: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    agent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
