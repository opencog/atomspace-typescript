module.exports = (componentName, componentType) => ({
  content: `// Generated with util/templates/component.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/styles";
import theme from "../../../util/theme";
import ${componentName} from "../${componentName}";
import ${componentName}Props from "../${componentName}.types";

describe("${componentName} Component Test", () => {
  let props: ${componentName}Props;

  beforeEach(() => {
    props = {
      testId: "epsilon-${componentName.toLowerCase()}"
    };
  });

  const renderComponent = () => render(<ThemeProvider theme={theme}>
    <${componentName} {...props} />
  </ThemeProvider>);

  it("Should render default component", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("${componentName.toLowerCase()}");

    expect(component).not.toBe(undefined);
  });
});
`,
  extension: `.test.tsx`
});
