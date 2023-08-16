import {CreateFundraiserForm} from "@/frontend/components";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {createFundraiser} from "@/frontend/services";
import {useMutation} from "@tanstack/react-query";
import {Button, message} from "antd";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function CreateFundraiserPage() {
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const {mutate: mutateCreateFundraiser, isLoading: createFundraiserLoading} =
    useMutation({
      mutationFn: (data) => createFundraiser(data),
      mutationKey: "createFundraiser",
    });

  const handleCreateFundraiser = (values, form) => {
    const formData = new FormData();
    for (const key of Object.keys(values).filter(
      (value) => value !== "target_date" && value !== "image"
    )) {
      formData.append(key, values[key]);
    }
    formData.append("target_date", values.target_date.$d);
    formData.append("image", values.image[0].originFileObj);

    mutateCreateFundraiser(formData, {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        message.success(data);
        form.resetFields();
        router.push("/fundraiser/myfundraiser");
      },
    });
  };

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

  return (
    <DashboardLayout
      showLoader={createFundraiserLoading}
      setUserData={setUserData}
      menuKey="fundraiser"
    >
      <div className="-mx-8 px-8 py-6 bg-lightpink mb-8">
        <Button
          onClick={() => router.back()}
          className="mb-2 border-pink text-pink"
        >
          Go Back
        </Button>
        <h2 className="font-semibold text-2xl mb-2"> Create your Fundraiser</h2>
        <p className="text-sm sm:text-base">
          People around the world are raising money for what they are passionate
          about.
        </p>
      </div>
      <CreateFundraiserForm
        handleSubmit={handleCreateFundraiser}
        isLoading={createFundraiserLoading}
      />
    </DashboardLayout>
  );
}
