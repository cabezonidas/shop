import Box from "./box";

export const Input = Box.withComponent("input");

Input.defaultProps = {
  maxLength: 255,
  type: "text",
  p: 2,
  mb: 4,
  borderRadius: 4,
  width: "100%",
  borderWidth: "1px",
  borderStyle: "solid",
};

export default Input;
