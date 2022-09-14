// This is temporary placement for functions while we continue to refactor.
import tinycolor from "tinycolor2";
import {SeedColors, TypesClass} from "./util/EdgeTypesStyle";

export const generateTypeClassMap = (nodeSuperTypes: string[], linkSuperTypes: string[] ): Map<string,TypesClass> => {
    let seedColorOffset = nodeSuperTypes.length-1;
    let numColors = SeedColors.length;
    let typesClasses: Map<string,TypesClass> = new Map<string,TypesClass>();
    nodeSuperTypes.forEach((nodeParentType, index) => {
        let nextColor = tinycolor(SeedColors[index%numColors]).toHexString();
        let darkColor = tinycolor(nextColor).darken(15);
        let lightColor =tinycolor(nextColor).lighten(12);
        typesClasses.set(
            nodeParentType,
            {
                class:{
                    background: lightColor,
                    border: `2px solid ${darkColor}`,
                    borderColor: darkColor,
                    padding: "10px",
                }
            }
        )
    });

    linkSuperTypes.forEach((linkParentType, index) => {
        let nextColor = tinycolor(SeedColors[(index+seedColorOffset+1)%numColors]).toHexString();
        let darkColor = tinycolor(nextColor).darken(15);
        let lightColor =tinycolor(nextColor).lighten(17);
        typesClasses.set(
            linkParentType,
            {
                class:{
                    background: lightColor,
                    border: `2px solid ${darkColor}`,
                    borderColor: darkColor,
                    padding: "10px",
                    stroke: darkColor
                }
            }
        )
    });

    return typesClasses;
}