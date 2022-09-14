// Generated with util/templates/component.js
import React, { PropsWithChildren } from 'react';
import clsx from "clsx";
import { styles } from "./styles"
import { withStyles } from "@mui/styles";
import NodeTypePopoverController from "./NodeTypePopover.controller";
import NodeTypePopoverProps from "./NodeTypePopover.types";
import {Popover} from "@mui/material";

const NodeTypePopover: React.FC<NodeTypePopoverProps> = ({
  testId,
  classes,
  className,
  children,
  popoverState,
  ...props
}: PropsWithChildren<NodeTypePopoverProps>) => {
    if(!popoverState){
        popoverState={
            open: false,
            location: null,
            atomType: ""
        }
    }

  return (
    <div data-testid={testId} className={clsx(classes?.root, className)}>
      <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={popoverState.open}
          anchorEl={popoverState.location}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableRestoreFocus
      >
          {popoverState.atomType}
      </Popover>
    </div>
  )

}


export default withStyles(styles)(NodeTypePopover);

