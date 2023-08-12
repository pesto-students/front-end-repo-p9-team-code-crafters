import {FUNDRAISER_CATEGORY} from "@/appData";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Select, Tooltip, message, notification} from "antd";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";

export default function MyFundraiserPage() {
  const [userData, setUserData] = useState(null);
  const [fundraiserFilter, setFundraiserFilter] = useState("all");

  const router = useRouter();

  const onClickCreateFundraiser = () => {
    if (userData.are_bank_details_verified) {
      router.push("/fundraiser/create");
    } else {
      notification.error({
        message: "Cannot Create Fundraiser",
        description: "Please verify your bank details to create a fundraiser!",
        duration: 2,
      });
    }
  };

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

  return (
    <DashboardLayout setUserData={setUserData} menuKey="fundraiser">
      <h3 className="md:hidden font-semibold text-2xl mt-4">My Fundraisers</h3>
      <div className="flex w-full items-center justify-between mt-4">
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
    </DashboardLayout>
  );
}
