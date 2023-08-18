/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/no-array-callback-reference */
import {FUNDRAISER_STATUS} from "@/appData";
import {s3Client} from "@/backend/services/aws";
import {generate16BitCode} from "@/backend/utils";
import {
  createFundraiserSchema,
  editFundraiserSchema,
} from "@/backend/validators";
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
            fundraiserObject.status = FUNDRAISER_STATUS.VERIFICATION_PENDING;
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

export const editFundraiserController = async (request, response) => {
  const form = new formidable.IncomingForm({});
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response
        .status(500)
        .send("An error occurred while processing the form.");
    }
    try {
      let fundraiserObject = await editFundraiserSchema.validate(fields);
      let editObject = {
        ...fundraiserObject,
        status: FUNDRAISER_STATUS.VERIFICATION_PENDING,
      };
      delete editObject.oldImageKey;
      let filename = "";
      try {
        if (files && files.image) {
          filename =
            generate16BitCode() + "." + files.image.mimetype.split("/")[1];
          s3Client.deleteObject(
            {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: fundraiserObject.oldImageKey,
            },
            async (error) => {
              if (error) {
                return response.status(500).send(error.message);
              }
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
                  editObject.image = filename;
                  try {
                    await Fundraiser.findByIdAndUpdate(
                      request.query.id,
                      editObject
                    );
                    return response.status(200).send("Fundraiser Updated!!");
                  } catch (error) {
                    return response.status(500).send(error.message);
                  }
                }
              );
            }
          );
        } else {
          try {
            await Fundraiser.findByIdAndUpdate(request.query.id, editObject);
            return response.status(200).send("Fundraiser Updated!!");
          } catch (error) {
            return response.status(500).send(error.message);
          }
        }
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
    }).populate([
      {
        path: "created_by",
        select: "_id name email contact is_active",
        model: "User",
      },
      {
        path: "donation",
        select: "_id amount",
        model: "Donation",
      },
    ]);

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
    }).populate([
      {
        path: "created_by",
        select: "_id name email contact is_active",
        model: "User",
      },
      {
        path: "donation",
        select: "_id amount",
        model: "Donation",
      },
    ]);
    return response.status(200).send({data: fundraiserData});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const getFundraiserListController = async (request, response) => {
  const {page} = request.query;
  try {
    let fundraiserData = [];
    const queryObject = {is_active: true, status: FUNDRAISER_STATUS.VERIFIED};
    fundraiserData = await (page === "home"
      ? Fundraiser.find(queryObject)
          .populate([
            {
              path: "created_by",
              select: "_id name email contact is_active",
              model: "User",
            },
            {
              path: "donation",
              select: "_id amount",
              model: "Donation",
            },
          ])
          .sort({createdAt: "desc"})
          .limit(4)
      : Fundraiser.find(queryObject).populate([
          {
            path: "created_by",
            select: "_id name email contact is_active",
            model: "User",
          },
          {
            path: "donation",
            select: "_id amount",
            model: "Donation",
          },
        ]));

    return response.status(200).send({data: fundraiserData});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const getAdminFundraiserListController = async (_request, response) => {
  try {
    const fundraiserData = await Fundraiser.find(
      {},
      "-description -image -donation -__v"
    ).populate([
      {
        path: "created_by",
        select: "_id name email contact is_active",
        model: "User",
      },
      {
        path: "donation",
        select: "_id amount",
        model: "Donation",
      },
    ]);
    return response.status(200).send({data: fundraiserData});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const updateFundraiserActivationController = async (
  request,
  response
) => {
  const {data} = request.body;
  if (!data || !data.id || !data.value)
    return response.status(400).end("data is missing");
  try {
    const fundraiserData = await Fundraiser.findByIdAndUpdate(data.id, {
      is_active: data.value === "true",
    });
    if (!fundraiserData)
      return response.status(200).send("Fundraiser Not found !");
    return response.status(200).send("Fundraiser is updated!");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const updateFundraiserStatusController = async (request, response) => {
  const {data} = request.body;
  if (!data || !data.id || !data.status)
    return response.status(400).end("data is missing");
  try {
    const fundraiserData = await Fundraiser.findByIdAndUpdate(data.id, {
      status: data.status,
    });
    if (!fundraiserData)
      return response.status(200).send("Fundraiser Not found !");
    return response.status(200).send("Fundraiser is updated!");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
