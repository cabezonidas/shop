import Box from "./box";

export const Button = Box.withComponent("button");

Button.defaultProps = {
  py: 2,
  px: 4,
  borderRadius: 4,
};

export default Button;
