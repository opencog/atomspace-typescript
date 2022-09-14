// Generated with util/templates/component.js
import React, {PropsWithChildren} from 'react';
import clsx from "clsx";
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import {styles} from "./styles"
import {withStyles} from "@mui/styles";
import LinkTypeDialogProps from "./LinkTypeDialog.types";

const LinkTypeDialog: React.FC<LinkTypeDialogProps> = ({
  testId,
  classes,
  className,
  children,
  initialValue,
  onSubmit,
  onCancel,
  options,
  open,
  ...props
}: PropsWithChildren<LinkTypeDialogProps>) => {

  const [value, setValue] = React.useState(initialValue ? initialValue : "");

  return (
    <div data-testid={testId} className={clsx(classes?.root, className)}>
      <Dialog
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
          maxWidth={"xs" as Breakpoint}
          // TransitionProps={{ onEntering: handleEntering }}
          // ^^ What is this for??
          open={open}
          {...props}
      >
        <DialogTitle>Select Link Type</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <InputLabel>Link Type</InputLabel>
            <Select
                value={value}
                label="Link Type"
                onChange={(event: SelectChangeEvent) => {
                  setValue(event.target.value);
                }}
            >
              {options.map((option,index) => (
                  <MenuItem
                      value={option}
                      key={index}
                  >
                    {option}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={()=>{
            onSubmit(value);
          }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}


export default withStyles(styles)(LinkTypeDialog);