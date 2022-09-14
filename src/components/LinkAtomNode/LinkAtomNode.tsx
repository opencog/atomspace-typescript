// Generated with util/templates/component.js
import React, {PropsWithChildren} from 'react';
import clsx from "clsx";
import {styles} from "./styles"
import {withStyles} from "@mui/styles";
import LinkAtomNodeProps from "./LinkAtomNode.types";
import {DefaultClass, TypesClass} from "../../util/EdgeTypesStyle";
import {Handle, Position} from "react-flow-renderer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const LinkAtomNode: React.FC<LinkAtomNodeProps> = ({
  testId,
  classes,
  className,
  children,
  data,
  ...props
}: PropsWithChildren<LinkAtomNodeProps>) => {
  const TypesClasses = useSelector((state:RootState) => state.atomspaceVisualizerState.typesClasses);
  let typeClass: TypesClass | undefined = TypesClasses.get(data.atomType);
  if(!typeClass){
    typeClass = DefaultClass;
  }

  return (
    <div data-testid={testId} className={`${clsx(classes?.root, className)} circle-node`} style={typeClass.class}>
        <Handle
            type="target"
            position={Position.Top}
            style={{ borderRadius: 0}}
        />
        <div id={data.id} className="circle-node-text">
          {data.label}
        </div>
        <Handle
            type="source"
            position={Position.Bottom}
            style={{ borderRadius: 0}}
        />
    </div>
  )

}


export default withStyles(styles)(LinkAtomNode);

