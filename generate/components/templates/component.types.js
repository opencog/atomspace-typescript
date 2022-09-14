module.exports = (componentName, componentType) => ({
  content: `// Generated with util/templates/component.types.js
import { BaseProps } from "../../util/BaseProps";
import {StyledComponentProps} from "@mui/styles";

interface ${componentName}Props extends BaseProps, StyledComponentProps {
  testId?: string;
  children?: React.ReactNode;
  className?: string;
}

export default ${componentName}Props;
`,
  extension: `.types.ts`
});
