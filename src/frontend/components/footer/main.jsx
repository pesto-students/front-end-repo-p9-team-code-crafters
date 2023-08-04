/* eslint-disable @next/next/no-img-element */

import {Typography} from "antd";
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
      <div id="footer-1" className="bg-white hidden px-40 py-16 sm:flex">
        <section className="max-w-lg flex flex-col">
          <span className="font-semibold text-2xl tracking-wide text-pink mb-6">
            ImpactHub
          </span>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor{" "}
          </Paragraph>
          <div id="social-container" className="flex">
            <FacebookIcon className="mr-2" />
            <TwitterIcon className="mr-2" />
            <YoutubeIcon className="mr-2" />
            <LinkedinIcon className="mr-2" />
          </div>
        </section>
        <section className="max-w-lg ml-48 flex flex-col">
          <Title level={4} className="">
            Contact Us
          </Title>
          <div id="contact-us-container" className="flex flex-col mt-4">
            <div id="address" className="flex">
              <HomeIcon className="mr-3" />
              <Text className="mb-4">Mumbai</Text>
            </div>
            <div id="telephone" className="flex">
              <PhoneIcon className="mr-3" />
              <Text className="mb-4">+91 999 999 999</Text>
            </div>
            <div id="telephone" className="flex">
              <MailIcon className="mr-3" />
              <Text className="mb-4">info@impacthub.com</Text>
            </div>
          </div>
        </section>
      </div>

      <div
        id="footer-2"
        className="h-16 px-6 text-white bg-pink w-full flex items-center justify-center"
      >
        <span className="text-xs tracking-wide text-center sm:text-left">
          © 2022 ImpactHub All Rights Reserved. With love by ImpactHub
        </span>
      </div>
    </footer>
  );
};
