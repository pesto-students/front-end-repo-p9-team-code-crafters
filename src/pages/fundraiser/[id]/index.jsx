import {
  DataSkeletonCard,
  DetailsPageMainCard,
  DetailsPageSideCard,
  DonateModal,
  FundraiserNotAvailableCard,
} from "@/frontend/components";
import MainLayout from "@/frontend/layouts/main";
import {createDonation, getFundraiserById} from "@/frontend/services";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/router";
import {useState} from "react";

export default function FundraiserPage() {
  const router = useRouter();
  const {id: fundraiserId} = router.query;
  const [userData, setUserData] = useState(null);
  const [showDonationModal, setShowDonationModal] = useState(false);

  const {data, isSuccess, isLoading, isError, refetch} = useQuery({
    queryFn: () => getFundraiserById(fundraiserId),
    queryKey: ["getFundraiserById", fundraiserId],
    enabled: !!fundraiserId,
  });

  const {mutate: mutateCreateDonate, isLoading: createDonationLoading} =
    useMutation({
      mutationFn: (data) => createDonation(fundraiserId, data),
      mutationKey: "createdonation",
    });

  const handleDonation = (values, form) => {
    mutateCreateDonate(values, {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        message.success(data);
        form.resetFields();
        setShowDonationModal(false);
        refetch();
      },
    });
  };

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
              {isLoading ? <DataSkeletonCard /> : null}
              {!data ||
              isError ||
              !data.created_by ||
              !data.created_by.is_active ? (
                <FundraiserNotAvailableCard />
              ) : null}
              {isSuccess &&
              data &&
              data.created_by &&
              data.created_by.is_active ? (
                <DetailsPageMainCard
                  onDonateClick={() => setShowDonationModal(true)}
                  {...data}
                />
              ) : null}
            </Col>
            <Col className="hidden md:block" xs={24} md={9} lg={6}>
              {isSuccess &&
              data &&
              data.created_by &&
              data.created_by.is_active ? (
                <DetailsPageSideCard
                  donation={data.donation}
                  target_amount={data.target_amount}
                  target_date={data.target_date}
                  onDonateClick={() => setShowDonationModal(true)}
                />
              ) : null}
            </Col>
          </Row>
        </div>
      ) : null}
      {showDonationModal ? (
        <DonateModal
          open={showDonationModal}
          handleClose={() => setShowDonationModal(false)}
          userData={userData}
          fundraiserData={data}
          handleDontation={handleDonation}
          donationLoading={createDonationLoading}
        />
      ) : null}
    </MainLayout>
  );
}
