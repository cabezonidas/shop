import styled from "@emotion/styled";

import {
  background,
  color,
  space,
  width,
  maxWidth,
  minWidth,
  minHeight,
  maxHeight,
  borders,
  justifySelf,
  alignSelf,
  order,
  flex,
  position,
  bottom,
  top,
  left,
  right,
  height,
  overflow,
  display,
  compose,
  gridArea,
  verticalAlign,
  BackgroundProps,
  MaxWidthProps,
  MinWidthProps,
  MinHeightProps,
  MaxHeightProps,
  WidthProps,
  HeightProps,
  SpaceProps,
  BordersProps,
  JustifySelfProps,
  AlignSelfProps,
  OrderProps,
  FlexProps,
  OverflowProps,
  TextAlignProps,
  ZIndexProps,
  PositionProps,
  BackgroundColorProps,
} from "styled-system";

type StyleBoxProps = WidthProps &
  MaxWidthProps &
  MinWidthProps &
  HeightProps &
  MinHeightProps &
  MaxHeightProps &
  BackgroundProps &
  BackgroundColorProps &
  SpaceProps &
  BordersProps &
  JustifySelfProps &
  AlignSelfProps &
  OrderProps &
  OverflowProps &
  TextAlignProps &
  ZIndexProps &
  PositionProps &
  FlexProps & {
    as?: string;
  };

const base = compose(
  background,
  color,
  space,
  width,
  borders,
  justifySelf,
  alignSelf,
  order,
  flex,
  position,
  bottom,
  top,
  left,
  right,
  height,
  gridArea,
  maxWidth,
  minWidth,
  minHeight,
  maxHeight,
  verticalAlign,
  overflow,
  display
);

export const Box = styled.div<StyleBoxProps>`
  box-sizing: border-box;
  position: relative;
  ::-webkit-scrollbar {
    height: 0.6rem;
    width: 0.6rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-track {
  }
  ${base};
`;

Box.displayName = "Box";

export default Box;
