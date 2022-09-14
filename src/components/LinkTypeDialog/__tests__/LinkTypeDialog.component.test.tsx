// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme/theme";
import LinkTypeDialog from "../LinkTypeDialog";
import LinkTypeDialogProps from "../LinkTypeDialog.types";

describe("LinkTypeDialog Component Test", () => {
  let props: LinkTypeDialogProps;

  beforeEach(() => {
    props = {
      classes: undefined,
      onCancel(): void {
      },
      onSubmit(value: string): void {
      },
      open: false,
      options: [],
      testId: "linktypedialog"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <LinkTypeDialog {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("linktypedialog");

    expect(component).not.toBe(undefined);
  });
});
