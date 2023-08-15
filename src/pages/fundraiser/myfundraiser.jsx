import {FUNDRAISER_CATEGORY} from "@/appData";
import {
  DataSkeletonCard,
  FundraiserNotAvailableCard,
  MyFundraiserCard,
} from "@/frontend/components";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {getFundraiserListByUserId} from "@/frontend/services";
import {PlusOutlined} from "@ant-design/icons";
import {useQuery} from "@tanstack/react-query";
import {Button, Col, Row, Select, Tooltip, message, notification} from "antd";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";

export default function MyFundraiserPage() {
  const [userData, setUserData] = useState(null);
  const [fundraiserFilter, setFundraiserFilter] = useState("all");

  const router = useRouter();

  const onClickCreateFundraiser = () => {
    if (
      userData &&
      userData.bank_details &&
      userData.bank_details.account_number
    ) {
      router.push("/fundraiser/create");
    } else {
      notification.error({
        message: "Cannot Create Fundraiser",
        description: "Please verify your bank details to create a fundraiser!",
        duration: 2,
      });
    }
  };

  const {
    data: fundraiserData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryFn: () => getFundraiserListByUserId(userData?._id),
    queryKey: ["getfundraiserListById", userData?._id],
    enabled: !!userData && userData.is_user_verified,
  });

  useEffect(() => {
    if (userData && !userData.is_user_verified) {
      message.error("User is not verified!!");
      router.push("/");
    }
  }, [userData]);

  const filterOptions = useMemo(() => {
    return [
      {value: "all", label: "All Fundraiser"},
      ...Object.values(FUNDRAISER_CATEGORY).map((value) => ({
        value,
        label: value,
      })),
    ];
  }, []);

  const filteredFundraiserList = useMemo(() => {
    const temporaryList =
      fundraiserData && fundraiserData.length > 0 ? [...fundraiserData] : [];
    return temporaryList.filter((value) =>
      fundraiserFilter === "all" ? true : value.category === fundraiserFilter
    );
  }, [fundraiserData, fundraiserFilter]);

  return (
    <DashboardLayout setUserData={setUserData} menuKey="fundraiser">
      <h3 className="md:hidden font-semibold text-2xl mt-4">My Fundraisers</h3>
      <div className="flex w-full items-center justify-between mt-4 mb-8">
        <Select
          className="primary w-40"
          defaultValue="all"
          onChange={(value) => setFundraiserFilter(value)}
          options={filterOptions}
          value={fundraiserFilter}
          size="large"
        />
        <Button
          onClick={onClickCreateFundraiser}
          className="hidden md:block"
          type="primary"
          size="large"
        >
          <span>Create Fundraiser</span>
        </Button>
        <Tooltip title="Create Fundraiser">
          <Button
            onClick={onClickCreateFundraiser}
            className="md:hidden"
            type="primary"
            size="large"
          >
            <PlusOutlined />
          </Button>
        </Tooltip>
      </div>
      <div className="mb-8">
        {(isError && !isLoading && !isSuccess) ||
        (filteredFundraiserList &&
          filteredFundraiserList.length === 0 &&
          !isLoading &&
          !isSuccess) ? (
          <FundraiserNotAvailableCard />
        ) : null}
        {!isError && !isSuccess && isLoading ? <DataSkeletonCard /> : null}
        {isSuccess && filteredFundraiserList.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredFundraiserList.map((fundraiser) => (
              <Col key={fundraiser._id} xs={24} md={12} lg={8} xl={6}>
                <MyFundraiserCard
                  {...fundraiser}
                  btnText="EDIT"
                  clickHandler={() =>
                    router.push("/fundraiser/" + fundraiser?._id + "/edit")
                  }
                />
              </Col>
            ))}
          </Row>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
