import {Card, Tag, Typography} from "antd";
import {array, bool, func, node, number, string} from "prop-types";
import {FundraiserProgress} from "../progress";
import {FUNDRAISER_STATUS} from "@/appData";

const {Title, Paragraph} = Typography;

const ImageWithBackground = ({src}) => (
  <div className="flex bg-gray-300 items-center justify-center h-48 ">
    <img src={src} alt="fundraiser" className="object-contain w-full h-full" />
  </div>
);

const statusColors = {
  [FUNDRAISER_STATUS.DRAFT]: "default",
  [FUNDRAISER_STATUS.CLOSED]: "green",
  [FUNDRAISER_STATUS.VERIFICATION_PENDING]: "gold",
  [FUNDRAISER_STATUS.VERIFIED]: "blue",
  [FUNDRAISER_STATUS.REQUESTED_WITHDRAWAL]: "cyan",
  [FUNDRAISER_STATUS.FUNDS_PROCESSED]: "purple",
};

export const MyFundraiserCard = ({
  category,
  title,
  short_description,
  target_amount,
  target_date,
  image,
  status,
  donation = [],
  onCardClick,
  cta = null,
  showStatus = false,
}) => {
  return (
    <>
      <Card
        hoverable
        cover={
          <ImageWithBackground src={process.env.NEXT_PUBLIC_S3_URL + image} />
        }
        bodyStyle={{padding: "24px 12px"}}
        onClick={onCardClick}
      >
        <div>
          <Tag className="bg-pink text-white rounded-full border-none font-normal px-2 mb-2">
            {category}
          </Tag>
          {showStatus ? <Tag color={statusColors[status]}>{status}</Tag> : null}
        </div>

        <Title level={4} ellipsis>
          {title}
        </Title>
        <Paragraph className="h-11 !mb-2" ellipsis={{rows: 2}}>
          {short_description}
        </Paragraph>
        <FundraiserProgress
          donation={donation}
          target_amount={target_amount}
          target_date={target_date}
        />
        {cta}
        {/* <div className="flex w-full items-center mt-6">
          <Button onClick={clickHandler} type="primary">
            {btnText}
          </Button>
        </div> */}
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
  status: string,
  onCardClick: func,
  cta: node,
  showStatus: bool,
};
