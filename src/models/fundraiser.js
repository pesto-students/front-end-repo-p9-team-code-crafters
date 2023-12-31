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
      required: [true, "description is missing"],
    },
    short_description: {
      type: String,
      required: [true, "short description is missing"],
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: Object.values(FUNDRAISER_CATEGORY),
      required: [true, "category is missing"],
    },
    target_amount: {
      type: Number,
      required: [true, "target amount is missing"],
    },
    target_date: {
      type: Date,
      required: [true, "target date is missing"],
    },
    status: {
      type: String,
      enum: Object.values(FUNDRAISER_STATUS),
      required: [true, "status is missing"],
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
