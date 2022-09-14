// Generated with util/templates/component.types.js
import {BaseProps} from "../../util/BaseProps";
import {StyledComponentProps} from "@mui/styles";
import React from "react";

interface LinkTypeDialogProps extends BaseProps, StyledComponentProps {
  testId?: string;
  children?: React.ReactNode;
  className?: string;
  options: string[];
  initialValue?: string;
  open: boolean;

  // Spliting up onCancel and onSubmit is the ideal approach.
  onCancel: () => void;
  onSubmit: (value: string) => void;
}

export default LinkTypeDialogProps;