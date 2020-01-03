import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";

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
  fontSize,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  letterSpacing,
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  fontStyle,
  zIndex,
  gridGap,
  gridColumn,
  gridRow,
  gridTemplateColumns,
  gridTemplateRows,
  GridGapProps,
  GridColumnProps,
  GridRowProps,
  GridTemplateColumnsProps,
  GridTemplateRowsProps,
  DisplayProps,
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
  OverflowProps,
  TextAlignProps,
  ZIndexProps,
  PositionProps,
  BackgroundColorProps,
  FlexProps,
  FontSizeProps,
  FontFamilyProps,
  FontWeightProps,
  LineHeightProps,
  FontStyleProps,
  LetterSpacingProps,
  AlignItemsProps,
  AlignContentProps,
  JustifyContentProps,
  FlexWrapProps,
  FlexBasisProps,
  FlexDirectionProps,
  FlexGrowProps,
  FlexShrinkProps,
  TopProps,
  RightProps,
  BottomProps,
  LeftProps,
} from "styled-system";

export type StyleBoxProps = WidthProps &
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
  FontSizeProps &
  FontFamilyProps &
  FontWeightProps &
  LineHeightProps &
  FontStyleProps &
  LetterSpacingProps &
  AlignItemsProps &
  AlignContentProps &
  JustifyContentProps &
  FlexWrapProps &
  FlexBasisProps &
  FlexDirectionProps &
  FlexGrowProps &
  FlexShrinkProps &
  TopProps &
  RightProps &
  BottomProps &
  LeftProps &
  FlexProps &
  GridGapProps &
  GridColumnProps &
  GridRowProps &
  GridTemplateColumnsProps &
  GridTemplateRowsProps &
  DisplayProps & {
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
  display,
  fontSize,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  letterSpacing,
  minHeight,
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  fontStyle,
  zIndex,
  gridGap,
  gridColumn,
  gridRow,
  gridTemplateColumns,
  gridTemplateRows
);

export const Box = styled("div", {
  shouldForwardProp: prop => isPropValid(prop),
})<StyleBoxProps>`
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

export default Box;
