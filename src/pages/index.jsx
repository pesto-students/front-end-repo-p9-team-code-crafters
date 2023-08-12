import {MyFundraiserCard} from "@/frontend/components";
import {Hero, Stats} from "@/frontend/components/home";
import MainLayout from "@/frontend/layouts/main";
import {getFundraiserList} from "@/frontend/services";
import {useQuery} from "@tanstack/react-query";
import {Button, Col, Row} from "antd";
import {useRouter} from "next/router";
import {useState} from "react";

export default function Home() {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(null);

  const {data: fundraiserList, isSuccess} = useQuery({
    queryFn: () => getFundraiserList("home"),
    queryKey: ["getFundraiserList", "home"],
  });

  return (
    <MainLayout menuKey="home" setUserData={setUserData}>
      <Hero />
      <Stats />
      {isSuccess ? (
        <div
          id="recent-fundraisers-container"
          className="px-8 py-12 w-full bg-lightpink "
        >
          <div className="flex items-end justify-between mb-4">
            <h1 className="text-2xl md:text-4xl">Recent Fundraisers</h1>
            <Button
              onClick={() => router.push("/fundraiser")}
              className="hidden md:block"
              size="large"
              type="link"
            >
              <span className="underline">See All Fundraisers</span>
            </Button>
          </div>
          <p className="mb-4">
            Explore impactful initiatives driving real change in our community.
            Join the movement and make a difference!
          </p>
          <Row gutter={[24, 24]}>
            {fundraiserList.map((fundraiser) => (
              <Col key={fundraiser._id} xs={24} md={12} lg={6}>
                <MyFundraiserCard
                  {...fundraiser}
                  btnText="Donate"
                  clickHandler={() =>
                    router.push("/fundraiser/" + fundraiser?._id)
                  }
                />
              </Col>
            ))}
          </Row>

          <Button
            onClick={() => router.push("/fundraiser")}
            className="md:hidden !pl-0"
            size="large"
            type="link"
          >
            <span className="underline">See All Fundraisers</span>
          </Button>
        </div>
      ) : null}
    </MainLayout>
  );
}
