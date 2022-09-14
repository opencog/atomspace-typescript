// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme/theme";
import LinkAtomEdge from "../LinkAtomEdge";

describe("LinkAtomEdge Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<LinkAtomEdgeIntegration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("epsilon-linkatomedge");

    expect(component).not.toBe(undefined);
  });
});

const LinkAtomEdgeIntegration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <LinkAtomEdge testId="linkatomedge" />
      </React.Fragment>
    </ThemeProvider>
  )

}
