// Generated with util/templates/component.js
import React, { PropsWithChildren } from 'react';
import clsx from "clsx";
import { styles } from "./styles"
import { withStyles } from "@mui/styles";
import LegendController from "./Legend.controller";
import LegendProps from "./Legend.types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Divider, ListItemButton, MenuItem} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import List from "@mui/material/List";
import SmallCircleIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
import {DefaultClass, TypesClass} from "../../util/EdgeTypesStyle";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Legend: React.FC<LegendProps> = ({
  testId,
  classes,
  className,
  children,
  nodeTypeList,
  linkTypeList,
  ...props
}: PropsWithChildren<LegendProps>) => {
    const TypesClasses = useSelector((state:RootState) => state.atomspaceVisualizerState.typesClasses);
    if(!nodeTypeList){
        nodeTypeList=["No Node Types Found"];
    }
    if(!linkTypeList){
        linkTypeList=["No Link Types Found"];
    }

    const nodeTypeListItems = nodeTypeList.map((nodeType, index) => {
      let typeClass: TypesClass | undefined = TypesClasses.get(nodeType);
      if(!typeClass){
          typeClass = DefaultClass;
      }
    return(
      <ListItemButton
          disableGutters={true}>
        <ListItemIcon>
            <SquareTwoToneIcon
                sx={{
                    color: `${typeClass.class.borderColor}`,
                }}
            />
        </ListItemIcon>
        <ListItemText
            primary={nodeType}
        />
      </ListItemButton>
    )
    })

    const linkTypeListItems = linkTypeList.map((linkType, index) => {
        let typeClass: TypesClass | undefined = TypesClasses.get(linkType);
        if(!typeClass){
            typeClass = DefaultClass;
        }
        return(
            <ListItemButton
                dense={true}
                disableGutters={true}>
                <ListItemIcon>
                    <SmallCircleIcon
                        sx={{
                            color: `${typeClass.class.borderColor}`,
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={linkType}
                />
            </ListItemButton>
        )
    })


  return (
    <div data-testid={testId} className={clsx(classes?.root, className)}>
      <List
          dense={true}
          disablePadding
      >
        <ListItem disablePadding={false}>
          <ListItemText
              primary="Node and Link Legend"
          />
        </ListItem>
        <Divider />
          {nodeTypeListItems}
          <Divider />
          {linkTypeListItems}
      </List>
    </div>
  )

}


export default withStyles(styles)(Legend);

