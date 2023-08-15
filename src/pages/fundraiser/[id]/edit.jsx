import DashboardLayout from "@/frontend/layouts/dashboard";
import {getFundraiserById} from "@/frontend/services";
import {useQuery} from "@tanstack/react-query";
import {message} from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function CreateFundraiserPage() {
  const router = useRouter();
  const {id} = router.query;
  const [userData, setUserData] = useState(null);
  const [callQuery, setCallQuery] = useState(true);

  const {data: fundraiserData, isLoading} = useQuery({
    queryFn: () => getFundraiserById(id),
    queryKey: ["getfundraiser", id],
    enabled: !!id && !!userData && callQuery,
    cacheTime: Number.POSITIVE_INFINITY,
    onSuccess: (data) => {
      if (data && userData._id !== data.created_by._id) {
        message.error("Edit access is denied!");
      }
    },
  });

  useEffect(() => {
    if (
      userData &&
      (!userData.is_user_verified ||
        !userData.bank_details ||
        !userData.bank_details.account_number)
    ) {
      message.error("User Bank details not verified!!");
      router.push("/");
    }
  }, [userData]);

  useEffect(() => {
    setCallQuery(false);
  }, []);

  return (
    <DashboardLayout
      showLoader={isLoading}
      setUserData={setUserData}
      menuKey="fundraiser"
    >
      <h1>{fundraiserData ? fundraiserData.title : "-"}</h1>
    </DashboardLayout>
  );
}
