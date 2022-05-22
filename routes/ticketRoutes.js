import { Router } from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = Router();

/**
 * @swagger
 * '/api/tickets':
 *  post:
 *     tags:
 *     - Ticket
 *     summary: Create a ticket
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Ticket'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ticket'
 *      500:
 *        description: Something went wrong
 */
router.post("/", createTicket);

/**
 * @swagger
 * '/api/tickets':
 *  get:
 *     tags:
 *     - Ticket
 *     summary: Get all tickets
 *     parameters:
 *      - name: agent
 *        in: query
 *        schema:
 *          type: string
 *        description: query parameter to filter tickets by agent name
 *        required: false
 *      - name: status
 *        in: query
 *        schema:
 *          type: string
 *          enum: ["Open", "Closed"]
 *        description: query parameter to filter tickets by ticket status
 *        required: false
 *      - name: priority
 *        in: query
 *        schema:
 *          type: string
 *          enum: ["Low", "Medium", "High", "Urgent"]
 *        description: query parameter to filter tickets by ticket priority
 *        required: false
 *      - name: created
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: query parameter to filter tickets by date created
 *        required: false
 *      - name: resolutionDue
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: query parameter to filter tickets by resolution due date
 *        required: false
 *      - name: responseDue
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: query parameter to filter tickets by response due date
 *        required: false
 *      - name: sort
 *        in: query
 *        schema:
 *          type: array
 *          collectionFormat: csv
 *          items:
 *            type: string
 *        description: query parameter to sort by specific value. Sorts ascending by default, unless added :-1 after the value that the collection is being sorted by
 *        required: false
 *      - name: page
 *        in: query
 *        schema:
 *          type: number
 *        description: query parameter to filter tickets by page
 *        required: false
 *      - name: limit
 *        in: query
 *        schema:
 *          type: number
 *        description: query parameter to filter ticket results by page
 *        required: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: No tickets found
 *       500:
 *         description: Something went wrong
 */
router.get("/", getTickets);

/**
 * @swagger
 * '/api/tickets/{ticketId}':
 *  get:
 *     tags:
 *     - Ticket
 *     summary: Get a single ticket by the ticketId
 *     parameters:
 *      - name: ticketId
 *        in: path
 *        description: The id of the ticket
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", getTicket);

/**
 * @swagger
 * '/api/tickets/{ticketId}':
 *  put:
 *     tags:
 *     - Ticket
 *     summary: Update a ticket
 *     parameters:
 *      - name: ticketId
 *        in: path
 *        description: The id of the ticket
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/Ticket'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ticket'
 *      404:
 *        description: Ticket not found
 *      500:
 *        description: Something went wrong
 */
router.put("/:id", updateTicket);

/**
 * @swagger
 * '/api/tickets/{ticketId}':
 *  delete:
 *     tags:
 *     - Ticket
 *     summary: Delete a ticket
 *     parameters:
 *      - name: ticketId
 *        in: path
 *        description: The id of the ticket
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ticket'
 *      404:
 *        description: Ticket not found
 *      500:
 *        description: Something went wrong
 */
router.delete("/:id", deleteTicket);

export default router;
