import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "../components/button";
import { Box } from "../components/box";

storiesOf("Buttons", module).add("Default", () => (
  <Button bg="green" width="250px">
    <Box bg="green">{String("Test")}</Box>
  </Button>
));
