import Please from "./ColorPlease"



export interface TypesClass {
    class: any
}
export const DefaultClass = {
    class: {stroke:"red"}
}
const TypesClasses: Map<string, TypesClass> = new Map<string,TypesClass>(
    [
        ["ListLink", {
            class: {
                stroke:"red",
            },
        }],
        ["ExecutionLink", {
            class: {
                stroke:"orange",
            },
        }],
        ["UnorderedLink", {
            class: {
                stroke:"yellow",
            },
        }],
        ["EvaluatableLink", {
            class: {
                stroke:"green",
            },
        }],
        ["NumericOutputLink", {
            class: {
                stroke:"blue",
            },
        }],
        ["BooleanLink", {
            class: {
                stroke:"grey",
            },
        }],
        ["NumericInputLink", {
            class: {
                stroke:"maroon",
            },
        }],
        ["TypeInputLink", {
            class: {
                stroke:"tan",
            },
        }],
        ["TypeOutputLink", {
            class: {
                stroke:"lime",
            },
        }],
        ["AlphaConvertibleLink", {
            class: {
                stroke:"cyan",
            },
        }],
        ["CollectionLink", {
            class: {
                stroke:"purple",
            },
        }],
        ["ForeignAst", {
            class: {
                stroke:"pink",
            },
        }],
        ["DirectlyEvaluatableLink", {
            class: {
                stroke:"teal",
            },
        }],
        ["MemberLink", {
            class: {
                stroke:"DarkGoldenRod",
            },
        }],
        ["ValueOfLink", {
            class: {
                stroke:"DodgerBlue",
            },
        }],
    ]
)

const SeedColors = [
    "IndianRed","LightCoral","Salmon","DarkSalmon","LightSalmon","Crimson","Red","FireBrick","DarkRed"
]

export default TypesClasses;