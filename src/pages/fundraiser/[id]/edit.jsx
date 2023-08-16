import {CreateFundraiserForm} from "@/frontend/components";
import DashboardLayout from "@/frontend/layouts/dashboard";
import {editFundraiser, getFundraiserById} from "@/frontend/services";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Button, message, notification} from "antd";
import dayjs from "dayjs";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";

export default function CreateFundraiserPage() {
  const router = useRouter();
  const {id} = router.query;
  const [userData, setUserData] = useState(null);

  const {
    data: fundraiserData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: () => getFundraiserById(id),
    queryKey: ["getfundraiser", id],
    enabled: !!id,
    onSuccess: (data) => {
      if (data && userData && userData._id !== data.created_by._id) {
        message.error("Edit access is denied!");
        router.push("/");
      }
    },
  });

  const {mutate: mutateEditFundraiser, isLoading: editFundraiserLoading} =
    useMutation({
      mutationFn: (data) => editFundraiser(id, data),
      mutationKey: "createFundraiser",
    });

  const handleEditForm = (values, form) => {
    const formData = new FormData();
    for (const key of Object.keys(values).filter(
      (value) => value !== "target_date" && value !== "image"
    )) {
      formData.append(key, values[key]);
    }
    if (values && values.target_date && values.target_date.$d)
      formData.append("target_date", values.target_date.$d);
    if (values && values.image[0] && values.image[0].originFileObj) {
      formData.append("image", values.image[0].originFileObj);
      formData.append("oldImageKey", fundraiserData.image);
    }
    mutateEditFundraiser(formData, {
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

  const initialFormValues = useMemo(() => {
    return fundraiserData
      ? {
          title: fundraiserData.title,
          description: fundraiserData.description,
          short_description: fundraiserData.short_description,
          category: fundraiserData.category,
          target_amount: fundraiserData.target_amount,
          target_date: dayjs(fundraiserData.target_date),
          image: [
            {
              uid: "1",
              name: fundraiserData.image,
              url: process.env.NEXT_PUBLIC_S3_URL + fundraiserData.image,
            },
          ],
        }
      : {};
  }, [fundraiserData]);

  useEffect(() => {
    if (
      userData &&
      (!userData.is_user_verified ||
        !userData.bank_details ||
        !userData.bank_details.account_number)
    ) {
      notification.error({
        message: "Cannot Create Fundraiser",
        description: "Please update your bank details to create a fundraiser!",
        duration: 2,
      });
      router.push("/profile");
    }
  }, [userData]);

  return (
    <DashboardLayout
      showLoader={isLoading}
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
        <h2 className="font-semibold text-2xl mb-2"> Edit Fundraiser</h2>
      </div>

      {isSuccess && fundraiserData ? (
        <CreateFundraiserForm
          initialValues={{...initialFormValues}}
          handleSubmit={handleEditForm}
          isLoading={editFundraiserLoading}
          submitButtonText="Edit"
        />
      ) : null}
    </DashboardLayout>
  );
}
