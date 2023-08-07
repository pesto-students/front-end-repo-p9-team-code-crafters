import {Row} from "antd";
import {StatsCard} from "./statsCard";
import {statsItems} from "@/frontend/utlis";

export const Stats = () => {
  return (
    <Row
      gutter={[32, 32]}
      justify={"space-evenly"}
      className="px-8 py-10 w-full"
    >
      {statsItems.map((stats) => {
        return (
          <StatsCard
            key={stats.category}
            category={stats.category}
            value={stats.value}
          />
        );
      })}
    </Row>
  );
};
