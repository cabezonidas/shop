import Box from "./box";
import styled from "../theme/styled";

export const Button = Box.withComponent("button");

Button.defaultProps = {
  py: 2,
  px: 4,
  borderRadius: 4,
};

export const PrimaryButton = styled(Button)(
  ({ theme }) => `
  background-color: ${theme.colors.primary.medium};
`
);

export default Button;
