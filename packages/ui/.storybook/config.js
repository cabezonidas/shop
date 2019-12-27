import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { UiProvider } from "../src/ui-provider";
import { Global, css } from "@emotion/core";

const req = require.context("../src", true, /\.stories\.(ts|tsx)$/);

configure(() => {
  addDecorator(story => (
    <UiProvider>
      <Global
        styles={css`
          body {
            margin: 10px;
          }
        `}
      />
      {story()}
    </UiProvider>
  ));
  req.keys().forEach(filename => req(filename));
}, module);
