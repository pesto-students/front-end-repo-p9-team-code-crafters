import {
  ChangePasswordForm,
  ProfileInfoWithFormCard,
  UserBankDetailsForm,
  UserInfoForm,
} from "@/frontend/components";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {
  changePassword,
  logout,
  updateUserDetails,
  updateUserInformation,
  verifyUser,
} from "@/frontend/services";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Card, Tag, message} from "antd";
import moment from "moment";
import {useRouter} from "next/router";
import {useMemo, useState} from "react";

export default function MyProfile() {
  const router = useRouter();
  const [userInfoEditMode, setUserInfoEditMode] = useState(false);
  const [bankDetailsEditMode, setBankDetailsEditMode] = useState(false);

  const {
    data: userData,
    isLoading: loadingUserData,
    refetch,
  } = useQuery({
    queryFn: () => verifyUser(),
    queryKey: ["verifyUserData"],
  });

  const userInfoData = useMemo(() => {
    return userData
      ? [
          {
            label: "Name",
            value: userData.name,
          },
          {
            label: "Email",
            value: userData.email,
          },
          {
            label: "Contact",
            value: userData.contact,
          },
          {
            label: "Date of Birth",
            value: moment(userData.dob).format("YYYY-MM-DD"),
          },
        ]
      : [];
  }, [userData]);

  const userInfoBankData = useMemo(() => {
    return userData
      ? [
          {
            label: "Bank Name",
            value: userData?.bank_details?.bank_name || "-",
          },
          {
            label: "Holder Name",
            value: userData?.bank_details?.holder_name || "-",
          },
          {
            label: "IFSC Code",
            value: userData?.bank_details?.ifsc || "-",
          },
          {
            label: "Account Number",
            value: userData?.bank_details?.account_number || "-",
          },
        ]
      : [];
  }, [userData]);

  const userInfoInitialValues = useMemo(() => {
    return userData
      ? {
          name: userData.name,
          email: userData.email,
          contact: userData.contact,
          dob: moment(userData.dob),
        }
      : {};
  }, [userData]);

  const userInformationTitle = useMemo(() => {
    return (
      <div className="flex flex-col items-start md:flex-row md:items-center mb-2">
        <h3 className="text-2xl">User Information</h3>
        {userData?.is_user_verified ? (
          <Tag
            icon={<CheckCircleOutlined />}
            color="processing"
            bordered={false}
            className="md:ml-2 mt-1 md:mt-0"
          >
            verified
          </Tag>
        ) : null}
      </div>
    );
  }, [userData]);

  const accountDetailsTitle = useMemo(() => {
    return (
      <div className="flex flex-col items-start md:flex-row md:items-center mb-2">
        <h3 className="text-2xl">Account Details</h3>
        {userData?.are_bank_details_verified ? (
          <Tag
            icon={<CheckCircleOutlined />}
            color="processing"
            bordered={false}
            className="md:ml-2 mt-1 md:mt-0"
          >
            verified
          </Tag>
        ) : null}
      </div>
    );
  }, [userData]);

  const {mutate: mutateChangePassword, isLoading: loadingChangePassword} =
    useMutation({
      mutationFn: (data) => changePassword(data),
      mutationKey: "changepassword",
    });

  const {
    mutate: mutateUpdateUserInformation,
    isLoading: loadingUpdateUserInformation,
  } = useMutation({
    mutationFn: (data) => updateUserInformation(data),
    mutationKey: "updateuserinformation",
  });

  const {mutate: mutateUpdateUserDetails, isLoading: loadingUpdateUserDetails} =
    useMutation({
      mutationFn: (data) => updateUserDetails(data),
      mutationKey: "updateuserdetails",
    });

  const handleUserInfoSubmit = (values, form) => {
    mutateUpdateUserInformation(values, {
      onSuccess: (data) => {
        message.success(data);
        form.resetFields();
        setUserInfoEditMode(false);
        refetch();
      },
      onError: (error) => message.error(error),
    });
  };

  const handlebankDetailsSubmit = (values, form) => {
    mutateUpdateUserDetails(values, {
      onSuccess: (data) => {
        message.success(data);
        form.resetFields();
        setBankDetailsEditMode(false);
        refetch();
      },
      onError: (error) => message.error(error),
    });
  };

  const handleChangePassword = (values, form) => {
    mutateChangePassword(
      {
        currentPassword: values.currentPassword,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          message.success(data);
          form.resetFields();
          logout();
          router.push("/login");
        },
        onError: (error) => message.error(error),
      }
    );
  };

  return (
    <DashboardLayout
      showLoader={
        loadingChangePassword ||
        loadingUpdateUserDetails ||
        loadingUpdateUserInformation ||
        loadingUserData
      }
      menuKey="profile"
      // setUserData={setUserData}
    >
      <ProfileInfoWithFormCard
        stylesClass="mt-8"
        title={userInformationTitle}
        isEditable
        data={userInfoData}
        editMode={userInfoEditMode}
        setEditMode={setUserInfoEditMode}
        form={
          <UserInfoForm
            handleSubmit={handleUserInfoSubmit}
            isLoading={false}
            initialValues={userInfoInitialValues}
            showCancel={true}
            onCancelClick={() => setUserInfoEditMode(false)}
          />
        }
      />
      <Card className="mt-8 shadow-md">
        <h3 className="text-2xl mb-2">Security</h3>
        <p className="text-lg text-red-500 italic mb-4">
          Note : Resetting the password will log you out!
        </p>
        <ChangePasswordForm
          handleSubmit={handleChangePassword}
          isLoading={loadingChangePassword}
        />
      </Card>
      <ProfileInfoWithFormCard
        stylesClass="mt-8 mb-12"
        title={accountDetailsTitle}
        isEditable
        data={userInfoBankData}
        editMode={bankDetailsEditMode}
        setEditMode={setBankDetailsEditMode}
        form={
          <UserBankDetailsForm
            handleSubmit={handlebankDetailsSubmit}
            isLoading={false}
            initialValues={userData ? userData.bank_details : {}}
            showCancel={true}
            onCancelClick={() => setBankDetailsEditMode(false)}
          />
        }
      />
    </DashboardLayout>
  );
}
