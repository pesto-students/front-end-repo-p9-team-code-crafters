import {FUNDRAISER_CATEGORY, FUNDRAISER_STATUS} from "@/appConstants";
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
  },
  {timestamps: true}
);
