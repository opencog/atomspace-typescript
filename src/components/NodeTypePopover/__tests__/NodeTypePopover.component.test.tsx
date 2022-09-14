// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme";
import NodeTypePopover from "../NodeTypePopover";
import NodeTypePopoverProps from "../NodeTypePopover.types";

describe("NodeTypePopover Component Test", () => {
  let props: NodeTypePopoverProps;

  beforeEach(() => {
    props = {
      testId: "epsilon-nodetypepopover"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <NodeTypePopover {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("nodetypepopover");

    expect(component).not.toBe(undefined);
  });
});
