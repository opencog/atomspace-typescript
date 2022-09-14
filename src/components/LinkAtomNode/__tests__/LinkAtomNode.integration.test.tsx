// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme/theme";
import LinkAtomNode from "../LinkAtomNode";

describe("LinkAtomNode Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<LinkAtomNodeIntegration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("epsilon-linkatomnode");

    expect(component).not.toBe(undefined);
  });
});

const LinkAtomNodeIntegration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <LinkAtomNode testId="linkatomnode" />
      </React.Fragment>
    </ThemeProvider>
  )

}
