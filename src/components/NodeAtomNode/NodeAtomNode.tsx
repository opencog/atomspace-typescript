// Generated with util/templates/component.js
import React, {PropsWithChildren} from 'react';
import clsx from "clsx";
import {styles} from "./styles"
import {withStyles} from "@mui/styles";
import NodeAtomNodeProps from "./NodeAtomNode.types";
import {DefaultClass, TypesClass} from "../../util/EdgeTypesStyle";
import {Handle, Position} from "react-flow-renderer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const NodeAtomNode: React.FC<NodeAtomNodeProps> = ({
  testId,
  classes,
  className,
  children,
    data,
  ...props
}: PropsWithChildren<NodeAtomNodeProps>) => {
    const TypesClasses = useSelector((state:RootState) => state.atomspaceVisualizerState.typesClasses);
  let typeClass: TypesClass | undefined = TypesClasses.get(data.atomType);
  //console.log(atomType.toString())
  //console.log(atomType.toString())
  if(!typeClass){
    typeClass = DefaultClass;
  }

  return (
    <div data-testid={testId} className={clsx(classes?.root, className)} style={typeClass.class}>
      <Handle
          type="target"
          position={Position.Top}
          id={`${data.id}.left`}
          style={{ borderRadius: 0 }}
      />
      <div>{data.label}</div>
      <div>{data.info}</div>
      <Handle
          type="source"
          position={Position.Right}
          id={`${data.id}.right1`}
          style={{ top: "30%", borderRadius: 0 }}
      />
      <Handle
          type="source"
          position={Position.Right}
          id={`${data.id}.right2`}
          style={{ top: "70%", borderRadius: 0 }}
      />
    </div>
  )

}


export default withStyles(styles)(NodeAtomNode);

