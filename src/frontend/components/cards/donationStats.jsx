import {Card} from "antd";
import {node, string} from "prop-types";

export const DonationStatsCard = ({label, icon, value}) => {
  return (
    <Card bodyStyle={{padding: 24}} className="flex flex-col items-center">
      <div className="flex justify-center text-pink text-6xl mb-4">{icon}</div>
      <p className="text-center text-xl mb-4 font-light text-pink">{value}</p>
      <p className="font-semibold text-center text-xl">{label}</p>
    </Card>
  );
};

DonationStatsCard.propTypes = {
  label: string,
  icon: node,
  value: string,
};
