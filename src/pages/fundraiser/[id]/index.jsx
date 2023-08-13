import {DetailsPageMainCard, DetailsPageSideCard} from "@/frontend/components";
import MainLayout from "@/frontend/layouts/main";
import {getFundraiserById} from "@/frontend/services";
import {useQuery} from "@tanstack/react-query";
import {Button, Card, Col, Result, Row, Skeleton} from "antd";
import {useRouter} from "next/router";
import {useState} from "react";

export default function FundraiserPage() {
  const router = useRouter();
  const {id: fundraiserId} = router.query;
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(null);

  const {data, isSuccess, isLoading, isError} = useQuery({
    queryFn: () => getFundraiserById(fundraiserId),
    queryKey: ["getFundraiserById", fundraiserId],
    enabled: !!fundraiserId,
  });

  return (
    <MainLayout menuKey="discover" setUserData={setUserData}>
      {isSuccess ? (
        <div
          id="recent-fundraisers-container"
          className="px-8 pt-4 pb-4 md:pb-8 w-full bg-lightpink "
        >
          <div className="flex items-end justify-between mb-4">
            <Button onClick={() => router.back()} type="link" className="p-0">
              Go Back
            </Button>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={15} lg={18}>
              {isLoading ? (
                <Card>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </Card>
              ) : null}
              {!data || isError ? (
                <Card>
                  <Result title="Fundraiser not available!" />
                </Card>
              ) : null}
              {isSuccess && data ? <DetailsPageMainCard {...data} /> : null}
            </Col>
            <Col className="hidden md:block" xs={24} md={9} lg={6}>
              {isSuccess && data ? (
                <DetailsPageSideCard
                  donation={data.donation}
                  target_amount={data.target_amount}
                  target_date={data.target_date}
                />
              ) : null}
            </Col>
          </Row>
        </div>
      ) : null}
    </MainLayout>
  );
}
