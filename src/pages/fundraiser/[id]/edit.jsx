import DashboardLayout from "@/frontend/layouts/dashboard";
import {message} from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function CreateFundraiserPage() {
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
      <h1>Edit Page</h1>
    </DashboardLayout>
  );
}
