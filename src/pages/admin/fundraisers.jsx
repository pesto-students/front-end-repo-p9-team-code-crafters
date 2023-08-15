import {FUNDRAISER_STATUS, USER_ROLES} from "@/appData";

import DashboardLayout from "@/frontend/layouts/dashboard";
import {
  getAdminFundraiserList,
  updateFundraiserActivation,
  updateFundraiserStatus,
} from "@/frontend/services";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Button, Card, Checkbox, Modal, Result, Table, Tag, message} from "antd";
import moment from "moment";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const getRowClassName = (data) => {
  if (!data.is_active) return "bg-red-200";
  if (data.status === FUNDRAISER_STATUS.VERIFIED) return "bg-green-200";
  return "";
};

const getColumns = ({router, markFundraiserActive, markFundraiserStatus}) => [
  {
    key: "title",
    dataIndex: "title",
    title: "Title",
    width: 300,
    fixed: "left",
  },
  {
    key: "short_description",
    dataIndex: "short_description",
    title: "Short Description",
    width: 300,
  },
  {
    key: "category",
    dataIndex: "category",
    title: "Category",
    render: (value) => <Tag>{value.split("_").join(" ")}</Tag>,
    width: 100,
  },
  {
    key: "target_date",
    dataIndex: "target_date",
    title: "Target Date",
    render: (value) => moment(value).format("DD-MM-YYYY"),
    width: 150,
  },
  {
    key: "target_amount",
    dataIndex: "target_amount",
    title: "Target Amount",
    render: (value) => "₹ " + value,
    width: 100,
  },
  {
    key: "created_by",
    dataIndex: "created_by",
    title: "Created By",
    render: (value) => (value && value.name ? value.name : "-"),
    width: 200,
  },
  {
    key: "actions",
    title: "View",
    render: (value) => (
      <Button
        type="link"
        onClick={() => router.push("/fundraiser/" + value._id)}
      >
        view
      </Button>
    ),
    width: 200,
  },
  {
    key: "status",
    dataIndex: "status",
    title: "Verify Fundraiser",
    render: (value, item) => (
      <Checkbox
        checked={value === FUNDRAISER_STATUS.VERIFIED}
        onChange={(event) =>
          markFundraiserStatus(event.target.checked, item._id)
        }
      />
    ),
    width: 150,
  },
  {
    key: "is_active",
    dataIndex: "is_active",
    title: "Is Fundrasier Active",
    render: (value, item) => (
      <Checkbox
        checked={value}
        onChange={(event) =>
          markFundraiserActive(event.target.checked, item._id)
        }
      />
    ),
    width: 150,
  },
];

export default function AdminFundraiser() {
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const {
    data: fundraiserList,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryFn: () => getAdminFundraiserList(),
    queryKey: ["getAdminFundraiserList"],
    enabled: !!userData && userData.is_user_verified,
  });

  const {
    isLoading: updateFundraiserActivationLoading,
    mutate: mutateUpdateFundraiserActivation,
  } = useMutation({
    mutationFn: (data) => updateFundraiserActivation(data),
    mutationKey: "updateFundraiserActivation",
    onSuccess: (data) => {
      message.success(data);
      refetch();
    },
    onError: (error) => message.error(error),
  });

  const {
    isLoading: updateFundraiserStatusLoading,
    mutate: mutateUpdateFundraiserStatus,
  } = useMutation({
    mutationFn: (data) => updateFundraiserStatus(data),
    mutationKey: "updateFundraiserStatus",
    onSuccess: (data) => {
      message.success(data);
      refetch();
    },
    onError: (error) => message.error(error),
  });

  const markFundraiserActive = (value, id) => {
    Modal.confirm({
      title: "Are you sure ?",
      content: <div>Do you want to change Activation of fundraiser ?</div>,
      onOk: () => {
        mutateUpdateFundraiserActivation({id: id, value: value.toString()});
      },
      cancelButtonProps: {
        className: "border-pink text-pink !hover:border-pink !hover:text-pink",
      },
      okButtonProps: {
        className: "bg-pink !hover:bg-pink !focus:bg-pink",
      },
    });
  };

  const markFundraiserStatus = (value, id) => {
    Modal.confirm({
      title: "Are you sure ?",
      content: <div>Do you want to change status of fundraiser ?</div>,
      onOk: () => {
        mutateUpdateFundraiserStatus({
          id: id,
          status: value
            ? FUNDRAISER_STATUS.VERIFIED
            : FUNDRAISER_STATUS.VERIFICATION_PENDING,
        });
      },
      cancelButtonProps: {
        className: "border-pink text-pink !hover:border-pink !hover:text-pink",
      },
      okButtonProps: {
        className: "bg-pink !hover:bg-pink !focus:bg-pink",
      },
    });
  };

  useEffect(() => {
    if (userData && userData.role !== USER_ROLES.ADMIN) {
      message.error("Access Denied !!");
      router.push("/");
    }
  }, [userData]);

  return (
    <DashboardLayout
      showLoader={
        updateFundraiserActivationLoading || updateFundraiserStatusLoading
      }
      setUserData={setUserData}
      menuKey="adminFundraisers"
    >
      <h3 className="md:hidden font-semibold text-2xl mt-4">Fundraiser List</h3>
      <Card className="md:hidden mt-8">
        <Result title="Use a bigger screen for full functionality!" />
      </Card>
      <div className="hidden md:block mt-4">
        <Table
          size="small"
          columns={getColumns({
            router,
            markFundraiserStatus,
            markFundraiserActive,
          })}
          dataSource={
            isSuccess && !isLoading
              ? fundraiserList.map((value) => ({...value, key: value._id}))
              : []
          }
          rowClassName={getRowClassName}
          loading={isLoading}
          scroll={{x: 300}}
        />
      </div>
    </DashboardLayout>
  );
}
