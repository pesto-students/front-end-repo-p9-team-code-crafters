import {USER_ROLES} from "@/appData";

import DashboardLayout from "@/frontend/layouts/dashboard";
import {
  getUserList,
  markUserActivation,
  verifyBankDetails,
} from "@/frontend/services";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Card, Checkbox, Modal, Result, Table, Tag, message} from "antd";
import moment from "moment";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const getRowClassName = (data) => {
  if (!data.is_active) return "bg-red-200";
  if (data.are_bank_details_verified) return "bg-green-200";
  return "";
};

const getColumns = ({markBankDetailsVerified, markUserActive}) => [
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
    width: 200,
    fixed: "left",
  },
  {key: "email", dataIndex: "email", title: "Email", width: 300},
  {key: "contact", dataIndex: "contact", title: "Contact", width: 150},
  {
    key: "role",
    dataIndex: "role",
    title: "Role",
    render: (value) => <Tag>{value}</Tag>,
    width: 75,
  },
  {
    key: "dob",
    dataIndex: "dob",
    title: "DOB",
    render: (value) => moment(value).format("DD-MM-YYYY"),
    width: 150,
  },
  {
    title: "Bank Details",
    children: [
      {
        key: "bank_name",
        dataIndex: "bank_name",
        title: "Bank Name",
        width: 150,
      },
      {
        key: "holder_name",
        dataIndex: "holder_name",
        title: "Holder Name",
        width: 150,
      },
      {
        key: "ifsc",
        dataIndex: "ifsc",
        title: "IFSC Code",
        width: 150,
      },
      {
        key: "account_number",
        dataIndex: "account_number",
        title: "Account Number",
        width: 150,
      },
    ],
  },
  {
    key: "are_bank_details_verified",
    dataIndex: "are_bank_details_verified",
    title: "Verify Bank Details",
    render: (value, item) => (
      <Checkbox
        checked={value}
        onChange={(event) =>
          markBankDetailsVerified(event.target.checked, item._id)
        }
      />
    ),
    width: 150,
  },
  {
    key: "is_active",
    dataIndex: "is_active",
    title: "Is User Active",
    render: (value, item) => (
      <Checkbox
        checked={value}
        onChange={(event) => markUserActive(event.target.checked, item._id)}
      />
    ),
    width: 150,
  },
];

export default function AdminUsers() {
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const {
    data: userList,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryFn: () => getUserList(),
    queryKey: ["getUserList"],
    enabled: !!userData && userData.is_user_verified,
  });

  const {isLoading: verifyBankDetailsLoading, mutate: mutateVerifyBankDetails} =
    useMutation({
      mutationFn: (data) => verifyBankDetails(data),
      mutationKey: "verifyBankDetails",
      onSuccess: (data) => {
        message.success(data);
        refetch();
      },
      onError: (error) => message.error(error),
    });

  const {
    isLoading: markUserActivationLoading,
    mutate: mutateMarkUserActivation,
  } = useMutation({
    mutationFn: (data) => markUserActivation(data),
    mutationKey: "markUserActivation",
    onSuccess: (data) => {
      message.success(data);
      refetch();
    },
    onError: (error) => message.error(error),
  });

  const markBankDetailsVerified = (value, id) => {
    Modal.confirm({
      title: "Are you sure ?",
      content: (
        <div>Do you want to change Bank detail verification of the user ?</div>
      ),
      onOk: () => {
        mutateVerifyBankDetails({userId: id, value: value.toString()});
      },
      cancelButtonProps: {
        className: "border-pink text-pink !hover:border-pink !hover:text-pink",
      },
      okButtonProps: {
        className: "bg-pink !hover:bg-pink !focus:bg-pink",
      },
    });
  };

  const markUserActive = (value, id) => {
    Modal.confirm({
      title: "Are you sure ?",
      content: (
        <div>Do you want to change Account Activation of the user ?</div>
      ),
      onOk: () => {
        mutateMarkUserActivation({userId: id, value: value.toString()});
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
      showLoader={verifyBankDetailsLoading || markUserActivationLoading}
      setUserData={setUserData}
      menuKey="users"
    >
      <h3 className="md:hidden font-semibold text-2xl mt-4">My Fundraisers</h3>
      <Card className="md:hidden mt-8">
        <Result title="Use a bigger screen for full functionality!" />
      </Card>
      <div className="hidden md:block mt-4">
        <Table
          size="small"
          columns={getColumns({markBankDetailsVerified, markUserActive})}
          dataSource={
            isSuccess && !isLoading
              ? userList.map((value) => ({...value, ...value.bank_details}))
              : []
          }
          rowClassName={getRowClassName}
          loading={isLoading}
          scroll={{x: 200}}
        />
      </div>
    </DashboardLayout>
  );
}
