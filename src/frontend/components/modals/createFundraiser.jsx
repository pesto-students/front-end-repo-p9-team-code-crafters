import {Modal} from "antd";
import {CreateFundraiserForm} from "../forms";
import {bool, func} from "prop-types";

export const CreateFundraiserModal = ({
  isModalOpen,
  handleCancel,
  handleSubmit,
  isLoading,
}) => {
  return (
    <Modal
      title="Create Fundraiser"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <CreateFundraiserForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </Modal>
  );
};

CreateFundraiserModal.propTypes = {
  isModalOpen: bool,
  handleCancel: func,
  handleSubmit: func,
  isLoading: bool,
};
