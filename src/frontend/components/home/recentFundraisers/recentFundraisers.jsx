import {Button, Col, Row, Typography} from "antd";
import {FundraiserCard} from "./fundraiserCard";
import {fundraiserData} from "@/frontend/utlis";

const {Title, Paragraph} = Typography;

const RecentFundraisersTitle = () => (
  <Row justify={"space-between"}>
    <Col sm={24} md={12} className="w-[32rem]">
      <Title level={1} style={{fontSize: "2rem", fontWeight: 700}}>
        Recent Fundraisers
      </Title>
      <Paragraph>
        Explore impactful initiatives driving real change in our community. Join
        the movement and make a difference!
      </Paragraph>
    </Col>
    <Col sm={24} md={12} className=" justify-end items-center hidden md:flex">
      <Button
        type="link"
        className="border-b"
        style={{borderBottom: "1px solid", padding: "0 "}}
      >
        {" "}
        See All Fundraisers
      </Button>
    </Col>
  </Row>
);

const FundraiserCards = () => (
  <Row gutter={[32, 32]} justify={"space-between"} className="px-4">
    {fundraiserData.map((fundraiser) => {
      return <FundraiserCard key={fundraiser.title} {...fundraiser} />;
    })}
  </Row>
);

const SeeAllFundraisersLink = () => (
  <Row className="md:hidden">
    <Col sm={24} md={12} className=" justify-start items-center flex mt-4">
      <Button
        type="link"
        className="border-b"
        style={{borderBottom: "1px solid", padding: "0 "}}
      >
        {" "}
        See All Fundraisers
      </Button>
    </Col>
  </Row>
);

export const RecentFundraisers = () => {
  return (
    <div
      id="recent-fundraisers-container"
      className="px-8 py-12 w-full bg-lightpink "
    >
      <RecentFundraisersTitle />
      <FundraiserCards />
      <SeeAllFundraisersLink />
    </div>
  );
};
