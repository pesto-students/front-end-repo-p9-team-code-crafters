import {Button} from "antd";
import {func, string} from "prop-types";

export const LinkButton = ({text, onClickHandler}) => (
  <Button
    className="h-10 flex items-center justify-center w-full"
    type="primary"
    onClick={onClickHandler}
  >
    {text}
  </Button>
);

LinkButton.propTypes = {
  text: string,
  onClickHandler: func,
};
