// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme";
import NodeTypePopover from "../NodeTypePopover";

describe("NodeTypePopover Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<NodeTypePopoverIntegration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("epsilon-nodetypepopover");

    expect(component).not.toBe(undefined);
  });
});

const NodeTypePopoverIntegration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <NodeTypePopover testId="nodetypepopover" />
      </React.Fragment>
    </ThemeProvider>
  )

}
