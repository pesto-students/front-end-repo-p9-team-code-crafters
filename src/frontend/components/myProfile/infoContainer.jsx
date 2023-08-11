import {EditFilled} from "@ant-design/icons";
import {Button, Col, Row, Tooltip, Typography} from "antd";
import {bool, func, string} from "prop-types";

const {Title} = Typography;
export const InfoContainer = ({
  children,
  title,
  editable = false,
  setInEditMode,
  inEditMode,
}) => {
  return (
    <>
      <div id="container" className="h-max w-full bg-white mt-10 p-6 shadow-md">
        <Row id="title-container">
          <Col xs={20} className="flex align-middle">
            <Title level={3} style={{fontWeight: 700, fontSize: "1.5rem"}}>
              {" "}
              {title}
            </Title>
          </Col>
          {editable && (
            <Col xs={4} className="flex justify-end">
              <Tooltip title="edit">
                <Button
                  type="text"
                  icon={<EditFilled height={36} />}
                  onClick={() => setInEditMode(!inEditMode)}
                />
              </Tooltip>
            </Col>
          )}
        </Row>
        {children}
      </div>
    </>
  );
};

InfoContainer.propTypes = {
  title: string,
  editable: bool,
  setInEditMode: func,
  inEditMode: bool,
};
