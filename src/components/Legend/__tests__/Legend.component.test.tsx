// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import Legend from "../Legend";
import LegendProps from "../Legend.types";

describe("Legend Component Test", () => {
  let props: LegendProps;

  beforeEach(() => {
    props = {
      testId: "epsilon-legend"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <Legend {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("legend");

    expect(component).not.toBe(undefined);
  });
});
