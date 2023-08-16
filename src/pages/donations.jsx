import {DataSkeletonCard, DonationStatsCard} from "@/frontend/components";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {getDonationListByUser} from "@/frontend/services";
import {
  DollarCircleOutlined,
  LikeOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {useQuery} from "@tanstack/react-query";
import {Col, Row, Table, message} from "antd";
import moment from "moment";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";

const columns = [
  {
    title: "Title",
    dataIndex: "fundraiser",
    key: "fundraiser",
    render: (value) => value.title,
    width: 175,
    fixed: "left",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (value) => "₹ " + value,
    width: 100,
  },
  {
    title: "Date",
    dataIndex: "date_of_donation",
    key: "date_of_donation",
    render: (value) => moment(value).format("DD-MM-YYYY"),
    width: 120,
  },
];

export default function MyDonationsPage() {
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const {data, isLoading, isSuccess} = useQuery({
    queryFn: () => getDonationListByUser(),
    queryKey: ["getDonationListByUser"],
    enabled: !!userData && userData.is_user_verified,
  });

  const totalDonated = useMemo(() => {
    return data ? data.reduce((sum, value) => sum + value.amount, 0) : 0;
  }, [data]);

  const totalContributed = useMemo(() => {
    return data ? new Set(data.map((value) => value.fundraiser._id)).size : 0;
  }, [data]);

  const maxDonated = useMemo(() => {
    if (data) {
      return Math.max(...data.map((value) => value.amount)) ===
        Number.NEGATIVE_INFINITY
        ? 0
        : Math.max(...data.map((value) => value.amount));
    }
    return 0;
  }, [data]);

  useEffect(() => {
    if (userData && !userData.is_user_verified) {
      message.error("User is not verified!!");
      router.push("/");
    }
  }, [userData]);

  return (
    <DashboardLayout setUserData={setUserData} menuKey="donation">
      <h3 className="md:hidden font-semibold text-2xl mt-4">My Donations</h3>
      {isLoading ? (
        <div className="mt-6">
          <DataSkeletonCard />
        </div>
      ) : null}
      {isSuccess && data ? (
        <Row className="mt-6" gutter={[24, 24]}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <DonationStatsCard
              icon={<SmileOutlined />}
              value={`₹ ${totalDonated}`}
              label="Donated"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <DonationStatsCard
              icon={<LikeOutlined />}
              value={`${totalContributed} Campaigns`}
              label="Contributed"
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <DonationStatsCard
              icon={<DollarCircleOutlined />}
              value={`₹ ${maxDonated}`}
              label="Biggest Donation"
            />
          </Col>
        </Row>
      ) : null}
      <div className="mt-8">
        <Table
          scroll={{
            x: 150,
          }}
          columns={columns}
          dataSource={data || []}
        />
      </div>
    </DashboardLayout>
  );
}
