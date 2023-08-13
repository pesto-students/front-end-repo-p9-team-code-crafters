import {WarningFilled} from "@ant-design/icons";
import {Button, Modal, Result} from "antd";
import {useRouter} from "next/router";
import {bool, func, object} from "prop-types";
import {DonationForm} from "../forms";
import {useMemo} from "react";

export const DonateModal = ({
  open,
  handleClose,
  userData,
  fundraiserData,
  handleDontation,
  donationLoading,
}) => {
  const router = useRouter();
  const donationAmount = useMemo(() => {
    return fundraiserData &&
      fundraiserData.donation &&
      fundraiserData.donation.length > 0
      ? fundraiserData.donation.reduce((sum, value) => sum + value?.amount, 0)
      : 0;
  }, [fundraiserData]);
  const isTargetDateExceeded = useMemo(() => {
    const targetDate =
      fundraiserData && fundraiserData.target_date
        ? new Date(fundraiserData.target_date).getTime()
        : 0;
    const currentDate = Date.now();
    return (
      fundraiserData && fundraiserData.target_date && currentDate > targetDate
    );
  }, [fundraiserData]);
  return (
    <Modal footer={null} title="Donation" open={open} onCancel={handleClose}>
      {userData &&
      fundraiserData &&
      userData._id === fundraiserData.created_by._id ? (
        <Result
          icon={<WarningFilled className="text-pink" />}
          title="Cannot donate"
          subTitle="Dontate option is unavailable for the creator."
        />
      ) : null}
      {userData ? null : (
        <Result
          title="Need to Sign in"
          subTitle="User needs to be signed in for making a donation"
          extra={
            <Button
              onClick={() =>
                router.push({
                  pathname: "/login",
                  query: {redirectTo: "fundraiser/" + fundraiserData._id},
                })
              }
              size="large"
              type="primary"
            >
              Sign in
            </Button>
          }
        />
      )}
      {userData &&
      fundraiserData &&
      isTargetDateExceeded &&
      userData._id !== fundraiserData.created_by._id ? (
        <Result
          icon={<WarningFilled className="text-pink" />}
          title="Cannot donate"
          subTitle="Target date for the donation is exceeded"
        />
      ) : null}
      {userData &&
      fundraiserData &&
      !isTargetDateExceeded &&
      userData._id !== fundraiserData.created_by._id ? (
        <DonationForm
          handleSubmit={handleDontation}
          isLoading={donationLoading}
          max={fundraiserData.target_amount - donationAmount}
        />
      ) : null}
    </Modal>
  );
};

DonateModal.propTypes = {
  open: bool,
  handleClose: func,
  userData: object,
  fundraiserData: object,
  handleDontation: func,
  donationLoading: bool,
};
