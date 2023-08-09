import {FUNDRAISER_STATUS} from "@/appData";
import {createFundraiserSchema} from "@/backend/validators";
import {Fundraiser} from "@/models";

export const createFundraiserController = async (request, response) => {
  const {data} = request.body;
  if (!data) return response.status(400).end("data is missing!");
  try {
    let fundraiserObject = await createFundraiserSchema.validate(data);
    const {title} = fundraiserObject;
    const {userData} = request;
    try {
      const fundraiserData = await Fundraiser.create({
        title,
        status: FUNDRAISER_STATUS.DRAFT,
        created_by: userData._id,
      });
      return response.status(200).send({data: {_id: fundraiserData._id}});
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const getFundraiserByIdController = async (request, response) => {
  const {id} = request.query;
  if (!id) return response.status(400).end("data is missing!");
  try {
    const fundraiserData = await Fundraiser.findOne({
      _id: id,
      is_active: true,
    });
    return response.status(200).send({data: fundraiserData});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
