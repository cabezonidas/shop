import React, { forwardRef, ComponentProps } from "react";
import styled from "@emotion/styled";
import Box from "./box";

export const Input = styled(Box.withComponent("input"))`
  border-width: 1px;
  border-style: solid;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  &::after {
    content: " test";
  }
  &:focus + span,
  &:active + span {
    opacity: 1 !important;
    z-index: 1;
  }
  &:focus + svg,
  &:active + svg {
    opacity: 1 !important;
    z-index: 1;
  }
`;

Input.defaultProps = {
  maxLength: 255,
  type: "text",
  p: 2,
  mb: 4,
  borderRadius: 4,
  width: "100%",
};

export default Input;
