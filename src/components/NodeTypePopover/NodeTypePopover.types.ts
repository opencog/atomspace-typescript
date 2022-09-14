// Generated with util/templates/component.types.js
import { BaseProps } from "../../util/BaseProps";
import {StyledComponentProps} from "@mui/styles";

interface NodeTypePopoverProps extends BaseProps, StyledComponentProps {
  testId?: string;
  children?: React.ReactNode;
  className?: string;
  popoverState?: {
    open: boolean,
    location: any,
    atomType: string,
  }
}

export default NodeTypePopoverProps;
