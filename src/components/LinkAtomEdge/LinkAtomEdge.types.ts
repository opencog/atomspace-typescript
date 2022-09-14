// Generated with util/templates/component.types.js
import { BaseProps } from "../../util/BaseProps";
import {StyledComponentProps} from "@mui/styles";
import {Position} from "react-flow-renderer/dist/esm/types/utils";
import {CSSProperties} from "react";
import {EdgeProps} from "react-flow-renderer";

interface LinkAtomEdgeProps extends BaseProps, StyledComponentProps, EdgeProps<any> {
  testId?: string;
  children?: React.ReactNode;
  className?: string;
}

interface CustomEdgeInterface {
  id: string,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: Position,
  targetPosition: Position,
  style: CSSProperties,
  data: any,
  markerEnd: string
}

export default LinkAtomEdgeProps;
