// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import LinkAtomEdge from "../LinkAtomEdge";
import LinkAtomEdgeProps from "../LinkAtomEdge.types";

describe("LinkAtomEdge Component Test", () => {
  let props: LinkAtomEdgeProps;

  beforeEach(() => {
    props = {
      testId: "epsilon-linkatomedge"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <LinkAtomEdge {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("linkatomedge");

    expect(component).not.toBe(undefined);
  });
});
