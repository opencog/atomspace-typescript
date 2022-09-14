// Generated with util/templates/component.js
import React, {PropsWithChildren} from 'react';
import {styles} from "./styles"
import {withStyles} from "@mui/styles";
import LinkAtomEdgeProps from "./LinkAtomEdge.types";
import {getBezierPath} from "react-flow-renderer";
import {DefaultClass, TypesClass} from "../../util/EdgeTypesStyle";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const LinkAtomEdge: React.FC<LinkAtomEdgeProps> = ({
  testId,
  classes,
  className,
  children,
  ...props
}: PropsWithChildren<LinkAtomEdgeProps>) => {
  const TypesClasses = useSelector((state:RootState) => state.atomspaceVisualizerState.typesClasses);
  const edgeProps = props

  const edgePath = getBezierPath(
    edgeProps
  );

  let typeClass: TypesClass | undefined = TypesClasses.get(edgeProps.data.atomType);
  if(!typeClass){
    typeClass = DefaultClass;
  }

  return (

      <path
          id={edgeProps.id}
          style = {typeClass.class}
          className="react-flow__edge-path"
          d={edgePath}
          markerEnd={edgeProps.markerEnd}
      />
    
  )

}


export default withStyles(styles)(LinkAtomEdge);

