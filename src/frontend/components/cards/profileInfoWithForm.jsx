import {EditFilled} from "@ant-design/icons";
import {Button, Card, Tooltip} from "antd";
import {array, bool, func, node, string} from "prop-types";

export const ProfileInfoWithFormCard = ({
  isEditable,
  title,
  data,
  form,
  stylesClass,
  editMode,
  setEditMode,
}) => {
  return (
    <Card className={stylesClass + " shadow-md"}>
      <div className="flex items-end justify-between mb-4">
        {title}
        {isEditable && !editMode ? (
          <Tooltip title="edit">
            <Button
              type="text"
              icon={<EditFilled className="text-4xl" />}
              onClick={() => setEditMode(true)}
            />
          </Tooltip>
        ) : null}
      </div>
      {editMode ? (
        <div>{form}</div>
      ) : (
        <div>
          {data.map((info) => (
            <div className="mb-2" key={info.label}>
              <p>{info.label}</p>
              <p className="text-lg">{info.value}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

ProfileInfoWithFormCard.propTypes = {
  isEditable: bool,
  title: node,
  stylesClass: string,
  data: array,
  form: node,
  editMode: bool,
  setEditMode: func,
};
