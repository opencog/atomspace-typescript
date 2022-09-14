export interface TypesClass {
    class: any
}
export const DefaultClass = {
    class: {stroke:"Red"}
}
const TypesClasses: Map<string, TypesClass> = new Map<string,TypesClass>(
    [
        ["ListLink", {
            class: {
                stroke:"Orange",
            },
        }]
    ]
)


//Red,Green,Yellow,Purple,Green,Blue,Brown,Pink,Grey,Purple,Orange,Blue
export const SeedColors = [
    "IndianRed","Lime","Gold","Thistle","GreenYellow","Aquamarine","RosyBrown","LightPink","Lightgray","Lavender","Coral","Cyan",
    "Salmon","LightGreen","Yellow","Violet","SpringGreen","MediumTurquoise","Chocolate","HotPink","DarkGray","Fuchsia","Tomato","CadetBlue",
    "LightSalmon","SeaGreen","Moccasin","MediumOrchid","DarkGreen","SteelBlue","SaddleBrown","DeepPink","DimGray","MediumPurple","OrangeRed","PowderBlue",
    "Red","OliveDrab","Khaki","DarkViolet","Olive","DeepSkyBlue","Sienna","MediumVioletRed","SlateGray","Purple","DarkOrange","DodgerBlue",
    "DarkRed","DarkOliveGreen","DarkKhaki","Indigo","Teal","Blue","Brown","PaleVioletRed","DarkSlateGrey","DarkSlateBlue","Orange","Navy","BurlyWood"
]

export default TypesClasses;