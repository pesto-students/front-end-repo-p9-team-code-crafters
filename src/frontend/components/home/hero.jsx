import {HeroImage} from "@/assets/images";
import {Button} from "antd";
import {useRouter} from "next/router";

const HeroCopy = (router) => (
  <div
    id="copy-container"
    className="flex flex-col w-80 xs:w-[30rem] sm:w-[36rem] h-auto absolute top-[15%] sm:top-[25%]  pl-8 gap-4"
  >
    <h1 className="text-white text-xl xs:text-3xl  md:text-5xl">
      The measure of life is not it&apos;s duration, but it&apos;s donation
    </h1>
    <p className="text-white sm:text-sm md:text-base hidden sm:block">
      Together, let&apos;s create a legacy of kindness, compassion, and social
      impact. Together, we can change lives and make the world a better place.
    </p>
    <Button
      type="primary"
      onClick={() => router.push("/fundraisers")}
      // style={{ height: "auto", width: "max-content", padding: "12px, 24px" }}
      className="h-auto w-max px-2 py-1 xs:px-4 xs:py-2 sm:px-6 sm:py-3"
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
