import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import {makeStyles} from "@mui/styles";
import {BaseProps} from "./BaseProps";



interface StorybookWrapperProps extends BaseProps  {
    className?: string;
    fill?: boolean;
    flat?: boolean;
    thin?: boolean;
    height?: string;
    width?: string;
}

const StorybookWrapper: React.FC<StorybookWrapperProps> = (
    props: PropsWithChildren<StorybookWrapperProps>) => {

    const classes = makeStyles({
        root: {
            ...CalculateDimensions(props)
        }
    })();

    return (
        <div className={clsx(classes.root, props.className)}>
    {props.children}
        </div>
)

}

const CalculateDimensions = (props: StorybookWrapperProps): {height: string, width: string}  => {
    let preset = {
        height: "50vh",
        width: "50vw"
    };

    if (props.fill) {
        preset = {
            height: "95vh",
            width: "94vw"
        }
    }
    else if (props.flat) {
        preset = {
            height: "47vh",
            width: "94vw"
        }
    }
    else if (props.thin) {
        preset = {
            height: "95vh",
            width: "47vw"
        }
    }
    if(props.height){
        preset.height = props.height;
    }
    if(props.width){
        preset.width = props.width;
    }
    return preset;
}


export default StorybookWrapper;