import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "../src/theme";
import { Global, css } from "@emotion/core";

const req = require.context("../src", true, /\.stories\.(ts|tsx)$/);

configure(() => {
  addDecorator(story => (
    <ThemeProvider>
      <Global
        styles={css`
          body {
            margin: 10px;
          }
        `}
      />
      {story()}
    </ThemeProvider>
  ));
  req.keys().forEach(filename => req(filename));
}, module);
