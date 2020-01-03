import Input from "./input";

export const Select = Input.withComponent("select");

Select.defaultProps = {
  p: 2,
  mb: 4,
  borderRadius: 4,
  width: "100%",
};

export default Select;
