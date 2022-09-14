// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme/theme";
import Legend from "../Legend";

describe("Legend Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<LegendIntegration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("epsilon-legend");

    expect(component).not.toBe(undefined);
  });
});

const LegendIntegration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Legend testId="legend" />
      </React.Fragment>
    </ThemeProvider>
  )

}
