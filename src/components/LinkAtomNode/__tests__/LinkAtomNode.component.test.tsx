// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import LinkAtomNode from "../LinkAtomNode";
import LinkAtomNodeProps from "../LinkAtomNode.types";

describe("LinkAtomNode Component Test", () => {
  let props: LinkAtomNodeProps;

  beforeEach(() => {
    props = {
      testId: "epsilon-linkatomnode"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <LinkAtomNode {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("linkatomnode");

    expect(component).not.toBe(undefined);
  });
});
