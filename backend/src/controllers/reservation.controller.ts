import { Response } from "express";
import Reservation from "../models/Reservation";
import Table from "../models/Table";
import { AuthRequest } from "../middleware/auth.middleware";

export const createReservation = async (
  req: AuthRequest,
  res: Response
) => {
  const { date, timeSlot, guests, tableIds } = req.body;
  const userId = req.user!.userId;

  if (!date || !timeSlot || !guests || !tableIds?.length) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const tables = await Table.find({
    _id: { $in: tableIds },
  });

  const totalSeats = tables.reduce(
    (sum, t) => sum + t.capacity,
    0
  );

  if (totalSeats < guests) {
    return res.status(400).json({
      message: "Selected tables do not meet guest count",
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
    tableIds,
    date,
    timeSlot,
    guests,
  });

  res.status(201).json(reservation);
};



export const getMyReservations = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user!.userId;

  const reservations = await Reservation.find({
    userId,
    status: "ACTIVE",
  })
    .populate("tableIds") // ✅ FIXED
    .sort({ createdAt: -1 });

  res.json(reservations);
};



export const cancelMyReservation = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.params;
  const userId = req.user!.userId;

  const reservation = await Reservation.findOne({
    _id: id,
    userId,
    status: "ACTIVE",
  });

  if (!reservation) {
    return res
      .status(404)
      .json({ message: "Reservation not found" });
  }

  reservation.status = "CANCELLED";
  await reservation.save();

  res.json({ message: "Reservation cancelled" });
};

export const getReservationsBySlot = async (
  req: AuthRequest,
  res: Response
) => {
  const { date, timeSlot } = req.query;

  if (!date || !timeSlot) {
    return res.status(400).json({
      message: "Date and time slot required",
    });
  }

  const reservations = await Reservation.find({
    date,
    timeSlot,
    status: "ACTIVE",
  }).populate("tableIds"); 

  res.json(reservations);
};

