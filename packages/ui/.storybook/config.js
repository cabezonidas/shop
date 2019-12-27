import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "../src/theme";

const req = require.context("../src", true, /\.stories\.(ts|tsx)$/);

configure(() => {
  addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);
  req.keys().forEach(filename => req(filename));
}, module);
