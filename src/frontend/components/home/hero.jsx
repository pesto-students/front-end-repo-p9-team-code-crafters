import {HeroImage} from "@/assets/images";
import {Button, Typography} from "antd";
import {useRouter} from "next/router";

const {Title, Paragraph} = Typography;

const HeroCopy = (router) => (
  <div
    id="copy-container"
    className="flex flex-col w-60 sm:w-[36rem] h-auto absolute top-[25%]  pl-8"
  >
    <Title level={1} style={{color: "#fff", fontSize: "3rem"}}>
      The measure of life is not it&apos;s duration, but it&apos;s donation
    </Title>
    <Paragraph style={{color: "#fff", fontSize: "16px"}}>
      Together, let&apos;s create a legacy of kindness, compassion, and social
      impact. Together, we can change lives and make the world a better place.
    </Paragraph>
    <Button
      type="primary"
      onClick={() => router.push("/fundraisers")}
      style={{height: "auto", width: "max-content", padding: "12px 24px"}}
    >
      Donate Now
    </Button>
  </div>
);

export const Hero = () => {
  const router = useRouter();
  return (
    <div id="hero" className="relative w-full overflow-hidden ">
      <HeroImage />
      <HeroCopy router={router} />
    </div>
  );
};
