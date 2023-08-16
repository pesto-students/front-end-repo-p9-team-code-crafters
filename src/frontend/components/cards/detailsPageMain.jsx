import moment from "moment";
import {array, bool, func, number, object, string} from "prop-types";
import {RichText} from "../inputs";
import {FundraiserProgress} from "../progress";
import {Button} from "antd";

export const DetailsPageMainCard = ({
  title,
  image,
  created_by,
  createdAt,
  description,
  target_amount,
  target_date,
  donation,
  onDonateClick,
  disableDonate = false,
}) => {
  return (
    <div className="md:bg-white md:p-6 min-h-[700px] md:min-h-0">
      <h1 className="mb-4 md:mb-6 text-2xl md:text-3xl font-semibold">
        {title}
      </h1>
      <div className="flex bg-gray-300 items-center justify-center h-60 md:h-80">
        <img
          src={process.env.NEXT_PUBLIC_S3_URL + image}
          alt="fundraiser"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 text-lg">
        <p className="mb-1 md:mb-0">{`Created By: ${
          created_by.name || "-"
        }`}</p>
        <p>{moment(createdAt).format("DD MMMM, YYYY")}</p>
      </div>
      <div className="md:hidden mt-8">
        <FundraiserProgress
          target_amount={target_amount}
          target_date={target_date}
          donation={donation}
        />
      </div>
      <div className="mt-8">
        <RichText value={description} />
      </div>
      <div className="flex flex-col md:flex-row mt-8">
        <Button
          onClick={onDonateClick}
          className="w-full md:w-64 mr-4 mb-4 md:mb-0"
          type="primary"
          size="large"
          disabled={disableDonate}
        >
          Donate
        </Button>
        <Button
          className="w-full md:w-64 mb-2 md:mb-0 border-pink text-pink"
          size="large"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

DetailsPageMainCard.propTypes = {
  title: string,
  image: string,
  created_by: object,
  createdAt: string,
  description: string,
  target_amount: number,
  target_date: string,
  donation: array,
  onDonateClick: func,
  disableDonate: bool,
};
