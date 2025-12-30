import { Request, Response } from "express";
import Table from "../models/Table";

export const getTables = async (req: Request, res: Response) => {
  const tables = await Table.find().sort({ tableNumber: 1 });
  res.json(tables);
};
