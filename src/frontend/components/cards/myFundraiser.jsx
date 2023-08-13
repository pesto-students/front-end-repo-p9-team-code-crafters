import {Button, Card, Tag, Typography} from "antd";
import {array, func, number, string} from "prop-types";
import {FundraiserProgress} from "../progress";

const {Title, Paragraph} = Typography;

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
        <FundraiserProgress
          donation={donation}
          target_amount={target_amount}
          target_date={target_date}
        />
        <div className="flex w-full items-center mt-6">
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
