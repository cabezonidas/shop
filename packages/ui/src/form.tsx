import Box from "./box";

export const Form = Box.withComponent("form");

Form.defaultProps = {
  width: "100%",
  noValidate: true,
  autoComplete: "off",
};

export default Form;
