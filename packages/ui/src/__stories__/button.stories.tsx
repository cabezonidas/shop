import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "../button";
import { Box } from "../box";

storiesOf("Buttons", module).add("Default", () => (
  <Button bg="green" width="250px">
    <Box bg="green">{String("Test")}</Box>
  </Button>
));
