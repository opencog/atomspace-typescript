// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme/theme";
import LinkTypeDialog from "../LinkTypeDialog";

describe("LinkTypeDialog Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<LinkTypeDialogIntegration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("linktypedialog");

    expect(component).not.toBe(undefined);
  });
});

const LinkTypeDialogIntegration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <LinkTypeDialog testId="linktypedialog"
                        open={false}
                        options={[]}
                        onCancel={()=>{}}
                        onSubmit={()=>{}} />
      </React.Fragment>
    </ThemeProvider>
  )

}
