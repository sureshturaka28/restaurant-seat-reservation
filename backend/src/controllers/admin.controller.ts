import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import Table from "../models/Table";



// View all reser
export const getAllReservations = async (_: Request, res: Response) => {
  const reservations = await Reservation.find()
    .populate("userId", "email")
    .populate("tableIds");

  res.json(reservations);
};

//View reservations by date
export const getReservationsByDate = async (
  req: Request,
  res: Response
) => {
  const { date } = req.query;

  if (!date) {
    return res
      .status(400)
      .json({ message: "Date is required" });
  }

  const reservations = await Reservation.find({ date })
    .populate("userId", "email")
    .populate("tableIds");

  res.json(reservations);
};

// Cancel any reservation 
export const cancelReservationByAdmin = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return res
      .status(404)
      .json({ message: "Reservation not found" });
  }

  reservation.status = "CANCELLED";
  await reservation.save();

  res.json({ message: "Reservation cancelled" });
};

// update
export const updateReservationByAdmin = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { date, timeSlot, tableIds, guests } = req.body;

  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return res
      .status(404)
      .json({ message: "Reservation not found" });
  }

  if (date) reservation.date = date;
  if (timeSlot) reservation.timeSlot = timeSlot;
  if (tableIds) reservation.tableIds = tableIds;
  if (guests) reservation.guests = guests;

  await reservation.save();

  res.json(reservation);
};



//View all tables
export const getTables = async (_: Request, res: Response) => {
  const tables = await Table.find().sort({ tableNumber: 1 });
  res.json(tables);
};


export const createTable = async (req: Request, res: Response) => {
  let { tableNumber, capacity } = req.body;

  tableNumber = Number(tableNumber);
  capacity = Number(capacity);

  if (
    isNaN(tableNumber) ||
    isNaN(capacity) ||
    tableNumber <= 0 ||
    capacity <= 0
  ) {
    return res.status(400).json({
      message: "Table number and capacity must be valid numbers",
    });
  }

  const exists = await Table.findOne({ tableNumber });
  if (exists) {
    return res
      .status(400)
      .json({ message: "Table already exists" });
  }

  const table = await Table.create({
    tableNumber,
    capacity,
  });

  res.status(201).json(table);
};


export const toggleReservationStatusByAdmin = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return res
      .status(404)
      .json({ message: "Reservation not found" });
  }

  reservation.status =
    reservation.status === "ACTIVE"
      ? "CANCELLED"
      : "ACTIVE";

  await reservation.save();

  res.json({
    message: `Reservation marked ${reservation.status}`,
    reservation,
  });
};

//Update table 
export const updateTableByAdmin = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  let { tableNumber, capacity } = req.body;

  tableNumber = Number(tableNumber);
  capacity = Number(capacity);

  if (
    isNaN(tableNumber) ||
    isNaN(capacity) ||
    tableNumber <= 0 ||
    capacity <= 0
  ) {
    return res.status(400).json({
      message: "Table number and capacity must be valid numbers",
    });
  }

  const table = await Table.findById(id);
  if (!table) {
    return res
      .status(404)
      .json({ message: "Table not found" });
  }

  // prevent duplicate table number
  const exists = await Table.findOne({
    tableNumber,
    _id: { $ne: id },
  });

  if (exists) {
    return res
      .status(400)
      .json({ message: "Table number already exists" });
  }

  table.tableNumber = tableNumber;
  table.capacity = capacity;
  await table.save();

  res.json(table);
};


export const createReservationByAdmin = async (
  req: Request,
  res: Response
) => {
  const { userId, date, timeSlot, guests, tableIds } = req.body;

  if (!userId || !date || !timeSlot || !guests || !tableIds?.length) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }


  const conflict = await Reservation.findOne({
    date,
    timeSlot,
    tableIds: { $in: tableIds },
    status: "ACTIVE",
  });

  if (conflict) {
    return res.status(400).json({
      message: "One or more tables already booked",
    });
  }

  const reservation = await Reservation.create({
    userId,
    date,
    timeSlot,
    guests,
    tableIds,
  });

  res.status(201).json(reservation);
};


// Delete table
export const deleteTable = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await Table.findByIdAndDelete(id);
  res.json({ message: "Table deleted" });
};
