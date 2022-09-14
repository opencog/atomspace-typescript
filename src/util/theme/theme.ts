import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { light } from './palette';
import {BreakpointOverrides} from "@mui/material/styles";
import React from "react";

const mode = sessionStorage.getItem('themeMode') || 'light';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

declare module '@mui/material/styles/createTheme' {
    interface Theme {
        layout: {
            contentWidth: React.CSSProperties['width']
            breakpoint: BreakpointOverrides
        }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        layout?: {
            contentWidth?: React.CSSProperties['width']
            breakpoint?: BreakpointOverrides
        },
    }
}


declare module '@mui/material/styles/createPalette' {

    interface TypeBackground {
        paper: string;
        default: string;
        level2: string;
        level1: string;
        footer: string;
    }

    interface Palette {
        cardShadow?: string;
        alternate: {
            main: string;
            dark: string;
        };
    }
    interface PaletteOptions {
        cardShadow?: string;
        alternate: {
            main: string;
            dark: string;
        };
    }
}
const theme = responsiveFontSizes(
    createTheme({
        palette: light,
        typography: {
            fontFamily: 'Lato',
        },
        layout: {
            contentWidth: 1236,
        },
        zIndex: {
            appBar: 1200,
            drawer: 1100,
        },
    }),
);
export const themeContentWidth = 1236;
export default theme;

