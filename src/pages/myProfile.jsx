import {
  AccountDetails,
  Security,
  UserInformation,
} from "@/frontend/components/myProfile";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {message} from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function MyProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (
      userData &&
      (!userData.is_user_verified || !userData.are_bank_details_verified)
    ) {
      message.error("User Bank details not verified!!");
      router.push("/");
    }
  }, [userData]);

  return (
    <DashboardLayout setUserData={setUserData} menuKey="fundraiser">
      <UserInformation userData={userData} />
      <Security />
      <AccountDetails userData={userData} />
      <div className="mt-16"></div>
    </DashboardLayout>
  );
}
