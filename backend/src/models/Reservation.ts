import { Schema, model, Types } from "mongoose";

const reservationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    tableIds: [
      {
        type: Types.ObjectId,
        ref: "Table",
        required: true,
      },
    ],

    date: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default model("Reservation", reservationSchema);
