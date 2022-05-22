import Ticket from "../models/ticketModel.js";

export const createTicket = async (req, res) => {
  const {
    title,
    description,
    dateCreated,
    resolutionDue,
    responseDue,
    priority,
    status,
    agent,
  } = req.body;

  if (!title || !description || !resolutionDue || !responseDue || !agent) {
    return res.status(400).json({
      message:
        "Please provide title, description, resolution and response dates and agent for ticket",
    });
  }
  try {
    const newTicket = await Ticket.create({
      title,
      description,
      dateCreated,
      resolutionDue,
      responseDue,
      status,
      priority,
      agent,
    });
    //const savedPost = await newPost.save();
    return res.status(200).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTickets = async (req, res) => {
  const { agent, created, priority, status, resolutionDue, responseDue } =
    req.query;
  try {
    let tickets;
    // if (!(Object.keys(req.query).length === 0)) {
    if (
      agent ||
      created ||
      priority ||
      status ||
      resolutionDue ||
      responseDue
    ) {
      tickets = await filter(req.query);
    } else {
      tickets = await paginatedResults(Ticket, req.query);
      // tickets = await Ticket.find();
    }

    if (!tickets || tickets.length == 0) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    return res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.length == 0) {
      return res.status(404).json({ message: "No tickets found." });
    }
    return res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.length == 0)
      return res.status(404).json({ message: "Ticket not found" });
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    try {
      await ticket.delete();
      return res.status(200).json("Ticket has been deleted");
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

async function filter(query) {
  let qry = {};
  query.agent && (qry.agent = query.agent);
  query.status && (qry.status = query.status);
  query.priority && (qry.priority = query.priority);
  query.created && (qry.dateCreated = query.created);
  query.responseDue && (qry.responseDue = query.responseDue);
  query.resolutionDue && (qry.resolutionDue = query.resolutionDue);

  if (query.sort) {
    const sort = handleQuerySort(query.sort);
    return await paginatedResults(Ticket, query, qry, sort);
    // return await Ticket.find(qry).sort(sort);
  } else {
  }
  return await paginatedResults(Ticket, query, qry);
}

const handleQuerySort = (query) => {
  try {
    // if order value doesnt have sort provided (order=value:1), it adds asc order by default
    if (query.indexOf(":") == -1) {
      query += ":1";
    }
    // convert the string to look like json object
    // example "id: -1, name: 1" to "{ "id": -1, "name": 1 }"
    const toJSONString = ("{" + query + "}").replace(
      /(\w+:)|(\w+ :)/g,
      (matched) => {
        return '"' + matched.substring(0, matched.length - 1) + '":';
      }
    );
    console.log(JSON.parse(toJSONString));
    return JSON.parse(toJSONString);
  } catch (err) {
    return JSON.parse("{}"); // parse empty json if the clients input wrong query format
  }
};

async function paginatedResults(model, query, qry = null, sort = null) {
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  try {
    if (sort && qry) {
      results.results = await model
        .find(qry)
        .sort(sort)
        .limit(limit)
        .skip(startIndex)
        .exec();
    } else if (qry) {
      results.results = await model
        .find(qry)
        .limit(limit)
        .skip(startIndex)
        .exec();
    } else {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
    }

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    return results;
  } catch (e) {
    return { message: e.message };
  }
}
