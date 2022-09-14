// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme/theme";
import NodeAtomNode from "../NodeAtomNode";

describe("NodeAtomNode Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<NodeAtomNodeIntegration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("epsilon-nodeatomnode");

    expect(component).not.toBe(undefined);
  });
});

const NodeAtomNodeIntegration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <NodeAtomNode testId="nodeatomnode" />
      </React.Fragment>
    </ThemeProvider>
  )

}
