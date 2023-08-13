import {getDaysToGo} from "@/frontend/utlis";
import {Progress, Typography} from "antd";
import {array, number, string} from "prop-types";
import {useMemo} from "react";

const {Text} = Typography;

export const FundraiserProgress = ({
  donation = [],
  target_amount,
  target_date,
}) => {
  const donationAmount = useMemo(() => {
    return donation && donation.length > 0
      ? donation.reduce((sum, value) => sum + value?.amount, 0)
      : 0;
  }, [donation]);
  const percent = useMemo(() => {
    return Math.round((donationAmount / target_amount) * 100);
  }, [donationAmount, target_amount]);
  const daysToGo = getDaysToGo(target_date);

  return (
    <>
      <div className="flex items-center justify-between">
        <Text className="text-xs">{`Recieved: ₹${donationAmount}`}</Text>
        <Text className="text-pink text-right block">{`${percent}%`}</Text>
      </div>
      <Progress
        percent={percent || 0}
        status="active"
        showInfo={false}
        className="mb-0"
      />
      <div className="flex items-center justify-between">
        <Text className="text-xs">{`Goal: ₹${target_amount}`}</Text>
        <Text className="text-xs">{`${daysToGo} days to go`}</Text>
      </div>
    </>
  );
};

FundraiserProgress.propTypes = {
  donation: array,
  target_amount: number,
  target_date: string,
};
