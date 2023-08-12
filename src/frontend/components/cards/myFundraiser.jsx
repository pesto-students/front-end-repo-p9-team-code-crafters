import {getDaysToGo} from "@/frontend/utlis";
import {Button, Card, Progress, Tag, Tooltip, Typography} from "antd";
import {array, func, number, string} from "prop-types";
import {useMemo} from "react";

const {Title, Text, Paragraph} = Typography;

const ImageWithBackground = ({src}) => (
  <div className="flex bg-gray-300 items-center justify-center h-48 ">
    <img src={src} alt="fundraiser" className="object-contain w-full h-full" />
  </div>
);

export const MyFundraiserCard = ({
  category,
  title,
  short_description,
  target_amount,
  target_date,
  image,
  donation = [],
  clickHandler,
  btnText,
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
      <Card
        hoverable
        cover={
          <ImageWithBackground src={process.env.NEXT_PUBLIC_S3_URL + image} />
        }
        bodyStyle={{padding: "12px"}}
      >
        <Tag className="bg-pink text-white rounded-full border-none font-normal px-2 mb-2">
          {category}
        </Tag>

        <Title level={4} ellipsis>
          {title}
        </Title>
        <Paragraph className="h-11 !mb-2" ellipsis={{rows: 2}}>
          {short_description}
        </Paragraph>
        <Text className="text-pink text-right block">{`${percent}%`}</Text>
        <Tooltip className="text-xs" title={`Recieved: ₹${donationAmount}`}>
          <Progress
            percent={percent || 0}
            status="active"
            showInfo={false}
            className="mb-0"
          />
        </Tooltip>
        <div className="flex items-center justify-between">
          <Text className="text-xs">{`${daysToGo} days to go`}</Text>
          <Text className="text-xs">{`Goal: ₹${target_amount}`}</Text>
        </div>
        <div className="flex w-full items-center justify-center mt-6">
          <Button onClick={clickHandler} type="primary">
            {btnText}
          </Button>
        </div>
      </Card>
    </>
  );
};

ImageWithBackground.propTypes = {
  src: string,
};

MyFundraiserCard.propTypes = {
  category: string,
  title: string,
  short_description: string,
  target_amount: number,
  target_date: string,
  donation: array,
  image: string,
  clickHandler: func,
  btnText: string,
};
