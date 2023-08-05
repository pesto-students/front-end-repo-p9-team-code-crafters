import Image from "next/image";

export const HeroImage = (properties) => (
  <Image
    width={0}
    height={0}
    sizes="100vw"
    style={{width: "100%", height: "auto"}}
    src="/images/placeholder.png"
    alt="Hero"
    {...properties}
  />
);
