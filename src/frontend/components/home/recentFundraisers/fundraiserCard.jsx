import {HeroImage} from "@/assets/images";
import {getDaysToGo} from "@/frontend/utlis";
import {Button, Card, Col, Progress, Row, Tag, Typography} from "antd";

const {Title, Text, Paragraph} = Typography;

export const FundraiserCard = ({fundraiserDetails}) => {
  const {
    category,
    title,
    short_description,
    target_amount,
    target_date,
    donation,
  } = fundraiserDetails;

  const percent = Math.round((donation / target_amount) * 100);
  const daysToGo = getDaysToGo(target_date);

  return (
    <>
      <Card
        hoverable
        className="w-80"
        cover={<HeroImage />}
        bodyStyle={{padding: "12px 24px"}}
      >
        <Tag className="bg-pink text-white rounded-full border-none font-normal px-2 my-2">
          {category}
        </Tag>

        <Title level={4} ellipsis>
          {title}
        </Title>
        <Row className="h-14">
          <Paragraph ellipsis={{rows: 2}}>{short_description}</Paragraph>
        </Row>
        <Row>
          <Col xs={24} className="flex justify-end">
            <Text className="text-pink">{`${percent}%`}</Text>
          </Col>
        </Row>
        <Progress
          percent={percent || 0}
          status="active"
          showInfo={false}
          className="mb-0"
        />
        <Row gutter={[32]}>
          <Col xs={12}>
            <Text>{`${daysToGo} days to go`}</Text>
          </Col>
          <Col xs={12} className="flex justify-end">
            <Text>{`Goal: ₹${target_amount}`}</Text>
          </Col>
        </Row>
        <Button className="my-6" type="primary">
          Donate Now
        </Button>
      </Card>
    </>
  );
};
