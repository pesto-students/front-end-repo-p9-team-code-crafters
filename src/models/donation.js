import {Schema} from "mongoose";

export const donationSchema = new Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: [true, "user id is missing"],
    },
    fundraiser: {
      type: String,
      ref: "Fundraiser",
      required: [true, "fundraiser id is missing"],
    },
    amount: {
      type: Number,
      required: [true, "amount is missing"],
    },
    payment_reciept: {
      type: String,
    },
    date_of_donation: {
      type: Date,
    },
    payment_status: {
      type: String,
      default: "Done",
    },
  },
  {timestamps: true}
);
