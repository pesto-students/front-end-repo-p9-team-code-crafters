/* eslint-disable @next/next/no-img-element */

import {Col, Row, Typography} from "antd";
import {
  FacebookIcon,
  HomeIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/assets/icons";

const {Title, Paragraph, Text} = Typography;

export const MainFooter = () => {
  return (
    <footer>
      <Row
        gutter={[0, 40]}
        id="footer-1"
        justify={"space-between"}
        className="bg-white hidden px-8 py-16 sm:flex"
      >
        <Col xs={24} md={10} className="flex flex-col">
          <span className="font-semibold text-2xl tracking-wide text-pink mb-6">
            ImpactHub
          </span>
          <Paragraph>
            At ImpactHub, we are committed to creating a positive change in our
            society by connecting volunteers, donors, and NGOs through our
            user-friendly online platform. Our mission is to simplify the
            process of finding donations and volunteering opportunities, making
            it easier for you to support various social causes close to your
            heart.
          </Paragraph>
          <div id="social-container" className="flex">
            <FacebookIcon className="mr-2" />
            <TwitterIcon className="mr-2" />
            <YoutubeIcon className="mr-2" />
            <LinkedinIcon className="mr-2" />
          </div>
        </Col>
        <Col
          xs={{span: 24}}
          md={{span: 10, offset: 4}}
          className="max-w-lg flex flex-col"
        >
          <Title level={4} className="">
            Contact Us
          </Title>
          <div id="contact-us-container" className="flex flex-col mt-4">
            <div id="address" className="flex">
              <HomeIcon className="mr-3" />
              <Text className="mb-4">Mumbai, Maharashtra, India - 400001</Text>
            </div>
            <div id="telephone" className="flex">
              <PhoneIcon className="mr-3" />
              <Text className="mb-4">+91 12345 67890</Text>
            </div>
            <div id="telephone" className="flex">
              <MailIcon className="mr-3" />
              <Text className="mb-4">info@impacthub.com</Text>
            </div>
          </div>
        </Col>
      </Row>

      <Row
        id="footer-2"
        className="h-16 px-6 text-white bg-pink w-full flex items-center justify-center"
      >
        <span className="text-xs tracking-wide text-center sm:text-left">
          © 2022 ImpactHub All Rights Reserved. With love by ImpactHub
        </span>
      </Row>
    </footer>
  );
};
