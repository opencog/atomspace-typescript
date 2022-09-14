module.exports = (componentName, componentType) => ({
  content: `// Generated with util/templates/component.js
import React, { PropsWithChildren } from 'react';
import clsx from "clsx";
import { styles } from "./styles"
import { withStyles } from "@mui/styles";
import ${componentName}Controller from "./${componentName}.controller";
import ${componentName}Props from "./${componentName}.types";

const ${componentName}: React.FC<${componentName}Props> = ({
  testId,
  classes,
  className,
  children,
  style,
  ...props
}: PropsWithChildren<${componentName}Props>) => {
  
  return (
    <div data-testid={testId} className={clsx(classes.root, className)}>
        {children}
    </div>
  )

}


export default withStyles(styles)(${componentName});

`,
  extension: `.tsx`,
});
