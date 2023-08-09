import {FUNDRAISER_CATEGORY, FUNDRAISER_STATUS} from "@/appData";
import {Schema} from "mongoose";

export const fundraiserSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is missing"],
    },
    description: {
      type: String,
    },
    short_description: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: Object.values(FUNDRAISER_CATEGORY),
    },
    target_amount: {
      type: Number,
    },
    target_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(FUNDRAISER_STATUS),
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    donation: [
      {
        type: String,
        ref: "Donation",
      },
    ],
    created_by: {
      type: String,
      ref: "User",
    },
  },
  {timestamps: true}
);
