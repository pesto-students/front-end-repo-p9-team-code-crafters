import {Col, Typography} from "antd";

export const StatsCard = ({category, value}) => {
  const {Text} = Typography;
  //need to check for width at 375 px screen size
  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      xl={6}
      className="flex flex-col justify-center items-center gap-6"
    >
      <h1 className="text-2xl sm:text-5xl text-pink font-light">{value}</h1>
      <Text className=" text-xs font-semibold">{category} </Text>
    </Col>
  );
};
