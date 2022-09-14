// Generated with util/templates/component.stories.js
// @ts-ignore
import React from "react";
import Legend from "../Legend";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import StorybookWrapper from "../../../util/StorybookWrapper";
export default {
    title: "undefined/Legend"
};

export const Default = () => 
<ThemeProvider theme={theme}>
  <StorybookWrapper fill>
     <Legend />
  </StorybookWrapper>;
</ThemeProvider>;
