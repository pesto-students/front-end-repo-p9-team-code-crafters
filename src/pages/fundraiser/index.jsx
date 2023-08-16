import {FUNDRAISER_CATEGORY} from "@/appData";
import {
  DataSkeletonCard,
  FundraiserNotAvailableCard,
  MyFundraiserCard,
} from "@/frontend/components";
import MainLayout from "@/frontend/layouts/main";
import {getFundraiserList} from "@/frontend/services";
import {useQuery} from "@tanstack/react-query";
import {Col, Input, Row, Select} from "antd";
import {useRouter} from "next/router";
import {useMemo, useState} from "react";

export default function FundraiserListPage() {
  const router = useRouter();
  const [fundraiserFilter, setFundraiserFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const {data, isLoading, isError, isSuccess} = useQuery({
    queryFn: () => getFundraiserList(),
    queryKey: ["getFundraiserList"],
  });

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
    const temporaryList = data && data.length > 0 ? [...data] : [];
    return temporaryList
      .filter((value) => value.created_by && value.created_by.is_active)
      .filter((value) =>
        fundraiserFilter === "all" ? true : value.category === fundraiserFilter
      )
      .filter((value) =>
        !searchText || searchText === ""
          ? true
          : value.title.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [data, fundraiserFilter, searchText]);

  return (
    <MainLayout menuKey="discover">
      <div
        id="recent-fundraisers-container"
        className="px-8 pt-4 pb-4 md:pb-8 w-full bg-lightpink "
      >
        {isLoading ? <DataSkeletonCard /> : null}
        {!isLoading && (!data || data.length === 0 || isError) ? (
          <FundraiserNotAvailableCard />
        ) : null}
        {!isLoading && isSuccess && data.length > 0 ? (
          <>
            <h3 className="md:hidden font-semibold text-2xl mt-4">
              My Fundraisers
            </h3>
            <div className="flex flex-col md:flex-row w-full md:items-center justify-between mt-4 mb-8">
              <Input.Search
                placeholder="Search"
                onChange={(event) => setSearchText(event.target.value)}
                enterButton
                allowClear
                size="large"
                className="flex-1 mr-0 md:mr-20"
              />
              <Select
                className="primary w-40 mt-4 md:mt-0"
                defaultValue="all"
                onChange={(value) => setFundraiserFilter(value)}
                options={filterOptions}
                value={fundraiserFilter}
                size="large"
              />
            </div>
            <Row gutter={[24, 24]}>
              {filteredFundraiserList.map((fundraiser) => (
                <Col key={fundraiser._id} xs={24} md={12} lg={8} xl={6}>
                  <MyFundraiserCard
                    {...fundraiser}
                    onCardClick={() =>
                      router.push("/fundraiser/" + fundraiser?._id)
                    }
                  />
                </Col>
              ))}
            </Row>
            {!filteredFundraiserList || filteredFundraiserList.length === 0 ? (
              <FundraiserNotAvailableCard />
            ) : null}
          </>
        ) : null}
      </div>
    </MainLayout>
  );
}
