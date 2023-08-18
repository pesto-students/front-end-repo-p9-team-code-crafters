import {Button, Col, Row} from "antd";
import Image from "next/image";
import {useRouter} from "next/router";

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden bg-slate-100 p-8">
      <Row gutter={[40, 24]} id="hero">
        <Col xs={24} md={12} lg={10} className="min-h-[320px] md:min-h-[480px]">
          <Image
            className="object-contain w-full h-auto"
            src={"/banner.png"}
            alt="banner"
            fill="layout"
          />
        </Col>
        <Col xs={24} md={12}>
          <div id="copy-container lg:w-10/12">
            <h1 className="text-xl xs:text-3xl mb-8 md:mt-16">
              The measure of life is not it&apos;s duration, but it&apos;s
              donation
            </h1>
            <p className="sm:text-sm mb-8">
              Together, let&apos;s create a legacy of kindness, compassion, and
              social impact. Together, we can change lives and make the world a
              better place.
            </p>
            <Button
              type="primary"
              onClick={() => router.push("/fundraiser")}
              className="h-auto w-max px-2 py-1 xs:px-4 xs:py-2 sm:px-6 sm:py-3"
            >
              Donate Now
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
