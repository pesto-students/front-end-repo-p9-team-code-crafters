import {FUNDRAISER_CATEGORY} from "@/appData";
import {CreateFundraiserModal} from "@/frontend/components";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {createFundraiser} from "@/frontend/services";
import {PlusOutlined} from "@ant-design/icons";
import {useMutation} from "@tanstack/react-query";
import {Button, Select, Tooltip, message, notification} from "antd";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";

export default function MyFundraiserPage() {
  const [userData, setUserData] = useState(null);
  const [fundraiserFilter, setFundraiserFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const router = useRouter();
  const {mutate: mutateCreateFundraiser, isLoading: createFundraiserLoading} =
    useMutation({
      mutationFn: (data) => createFundraiser(data),
      mutationKey: "createFundraiser",
    });

  const onClickCreateFundraiser = () => {
    if (userData.are_bank_details_verified) {
      setShowCreateModal(true);
    } else {
      notification.error({
        message: "Cannot Create Fundraiser",
        description: "Please verify your bank details to create a fundraiser!",
        duration: 2,
      });
    }
  };

  const handleCreateForm = (values, form) => {
    mutateCreateFundraiser(values, {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        message.success("Fundraiser Created!");
        form.resetFields();
        setShowCreateModal(false);
        router.push(`/fundraiser/${data._id}/edit`);
      },
    });
  };

  useEffect(() => {
    if (userData && !userData.is_user_verified) {
      message.error("User Bank details not verified!!");
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
    <DashboardLayout
      showLoader={createFundraiserLoading}
      setUserData={setUserData}
      menuKey="fundraiser"
    >
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
      {showCreateModal ? (
        <CreateFundraiserModal
          isModalOpen={showCreateModal}
          handleCancel={() => setShowCreateModal(false)}
          handleSubmit={handleCreateForm}
          isLoading={createFundraiserLoading}
        />
      ) : null}
    </DashboardLayout>
  );
}
