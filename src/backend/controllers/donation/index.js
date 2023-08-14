/* eslint-disable unicorn/prefer-date-now */
import {Donation, Fundraiser} from "@/models";
import moment from "moment";

const data_is_missing = "data is missing!";

export const createDonationController = async (request, response) => {
  const {data} = request.body;
  const {id: fundraiserId} = request.query;
  if (!data || !data.amount) return response.status(400).end(data_is_missing);
  if (!fundraiserId) return response.status(400).end(data_is_missing);
  try {
    const fundraiserInfo = await Fundraiser.findOne({
      _id: fundraiserId,
    }).populate("donation", "amount");
    if (!fundraiserInfo)
      return response.status(400).end("fundraiser not found!");
    const donationAmount = fundraiserInfo.donation.reduce(
      (sum, value) => sum + value.amount,
      0
    );
    if (data.amount > fundraiserInfo.target_amount - donationAmount)
      return response.status(400).end("donation amount exceeds target!");
    const targetDate = new Date(fundraiserInfo.target_date).getTime();
    const currentDate = new Date().getTime();
    if (currentDate > targetDate)
      return response.status(400).end("target date exceeded!");
    try {
      const newDonation = await Donation.create({
        amount: data.amount,
        user: request.userData._id,
        fundraiser: fundraiserId,
        date_of_donation: moment(new Date()),
      });
      if (newDonation) {
        await Fundraiser.findByIdAndUpdate(fundraiserId, {
          $push: {donation: newDonation._id},
        });
      }
      return response.status(200).send("Donation recieved");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const getDonationsByUserController = async (request, response) => {
  const {userData} = request;
  try {
    const donationList = await Donation.find({user: userData._id}).populate(
      "fundraiser",
      "_id title"
    );
    return response.status(200).send({data: donationList});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
