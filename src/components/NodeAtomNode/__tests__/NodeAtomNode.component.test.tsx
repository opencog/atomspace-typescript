// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import NodeAtomNode from "../NodeAtomNode";
import NodeAtomNodeProps from "../NodeAtomNode.types";

describe("NodeAtomNode Component Test", () => {
  let props: NodeAtomNodeProps;

  beforeEach(() => {
    props = {
      testId: "epsilon-nodeatomnode"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <NodeAtomNode {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("nodeatomnode");

    expect(component).not.toBe(undefined);
  });
});
