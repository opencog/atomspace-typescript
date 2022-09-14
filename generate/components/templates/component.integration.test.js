module.exports = (componentName, componentType) => ({
  content: `// Generated with util/templates/componentIntegration.test.js
// @ts-ignore
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../util/theme";
import ${componentName} from "../${componentName}";

describe("${componentName} Integration Test", () => {

  beforeEach(() => {
  });

  const renderComponent = () => render(<${componentName}Integration />);

  it("Should render integration correctly", () => {

    const { getByTestId } = renderComponent();

    const component = getByTestId("epsilon-${componentName.toLowerCase()}");

    expect(component).not.toBe(undefined);
  });
});

const ${componentName}Integration: React.FC = ({...props}) => {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <${componentName} testId="${componentName.toLowerCase()}" />
      </React.Fragment>
    </ThemeProvider>
  )

}
`,
  extension: `.test.tsx`,
  integrationTest: true
});
