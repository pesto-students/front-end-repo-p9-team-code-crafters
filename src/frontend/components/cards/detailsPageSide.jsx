import {array, bool, func, number, string} from "prop-types";
import {FundraiserProgress} from "../progress";
import {Button} from "antd";

export const DetailsPageSideCard = ({
  target_amount,
  target_date,
  donation,
  onDonateClick,
  disableDonate = false,
}) => {
  return (
    <div className="md:bg-white md:p-6 md:min-h-0">
      <FundraiserProgress
        target_amount={target_amount}
        target_date={target_date}
        donation={donation}
      />
      <div className="flex flex-col mt-8">
        <Button
          onClick={onDonateClick}
          className="w-full mr-4 mb-4"
          type="primary"
          size="large"
          disabled={disableDonate}
        >
          Donate
        </Button>
        <Button
          className="w-full mb-2 md:mb-0 border-pink text-pink"
          size="large"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

DetailsPageSideCard.propTypes = {
  target_amount: number,
  target_date: string,
  donation: array,
  onDonateClick: func,
  disableDonate: bool,
};
