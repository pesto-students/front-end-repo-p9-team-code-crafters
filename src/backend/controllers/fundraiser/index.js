import {FUNDRAISER_STATUS} from "@/appData";
import {s3Client} from "@/backend/services/aws";
import {generate16BitCode} from "@/backend/utils";
import {createFundraiserSchema} from "@/backend/validators";
import {Fundraiser} from "@/models";
import formidable from "formidable";
import fs from "node:fs";

const data_is_missing = "data is missing!";

export const createFundraiserController = async (request, response) => {
  const {userData} = request;
  const form = new formidable.IncomingForm({});
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response
        .status(500)
        .send("An error occurred while processing the form.");
    }
    const filename =
      generate16BitCode() + "." + files.image.mimetype.split("/")[1];
    try {
      let fundraiserObject = await createFundraiserSchema.validate(fields);
      try {
        s3Client.putObject(
          {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: filename,
            Body: fs.createReadStream(files.image.filepath),
            ACL: "public-read",
          },
          async (error) => {
            if (error) {
              return response.status(500).send(error.message);
            }
            fundraiserObject.status = FUNDRAISER_STATUS.DRAFT;
            fundraiserObject.image = filename;
            fundraiserObject.created_by = userData._id;
            try {
              await Fundraiser.create(fundraiserObject);
              return response.status(200).send("Fundraiser created!!");
            } catch (error) {
              return response.status(500).send(error.message);
            }
          }
        );
      } catch (error) {
        return response.status(500).send(error.message);
      }
    } catch (error) {
      return response.status(400).send(error.message);
    }
  });
};

export const deleteFundraiserController = async (request, response) => {
  const {id} = request.query;
  if (!id) return response.status(400).end(data_is_missing);
  try {
    const fundraiser = await Fundraiser.findById(id);
    if (!fundraiser) return response.status(400).end("data not found");
    if (fundraiser.donation.length > 0)
      return response.status(400).end("fundraiser cannot be deleted");

    s3Client.deleteObject(
      {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fundraiser.image,
      },
      async (error) => {
        if (error) {
          return response.status(500).send(error.message);
        }
        await Fundraiser.deleteOne({_id: id});
        return response.status(200).send("Fundraiser deleted");
      }
    );
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const getFundraiserByIdController = async (request, response) => {
  const {id} = request.query;
  if (!id) return response.status(400).end(data_is_missing);
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

export const getFundraiserListByUserIdController = async (
  request,
  response
) => {
  const {userId} = request.query;
  if (!userId) return response.status(400).end(data_is_missing);
  try {
    const fundraiserData = await Fundraiser.find({
      created_by: userId,
      is_active: true,
    });
    return response.status(200).send({data: fundraiserData});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
