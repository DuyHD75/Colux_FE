import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   colors: [
//     {id: 1, name: "Red", code: "#ff0000", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 2, name: "Yellow", code: "#ffff00", listCode: ["#ffb801", "#f8c452", "#ffe298", "#f4d77f", "#efd59c"]},
//     {id: 3, name: "Blue", code: "#0000ff", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 4, name: "Green", code: "#008000", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 5, name: "Pink", code: "#ffc0cb", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 6, name: "Pink", code: "#ffc0cb", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 7, name: "Pink", code: "#ffc0cb", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 8, name: "Pink", code: "#ffc0cb", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
//     {id: 9, name: "Pink", code: "#ffc0cb", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]}
//   ],
// };
const initialState = {
  colorFamilies: [
    {
      "id": 1,
      "name": "Red",
      "code": "#ff0000",
      "collections": [
        {
          "id": 1,
          "name": "Dark Red",
          "colors": [
            { "id": 1, "name": "Crimson", "code": "#dc143c" },
            { "id": 2, "name": "Maroon", "code": "#800000" },
            { "id": 3, "name": "Burgundy", "code": "#800020" },
            { "id": 4, "name": "Dark Scarlet", "code": "#560319" },
            { "id": 5, "name": "Blood Red", "code": "#660000" },
            { "id": 6, "name": "Ruby", "code": "#e0115f" },
            { "id": 7, "name": "Wine", "code": "#722f37" },
            { "id": 8, "name": "Cardinal", "code": "#c41e3a" },
            { "id": 9, "name": "Raspberry", "code": "#e30b5d" },
            { "id": 10, "name": "Dark Cherry", "code": "#900020" }
          ]
        },
        {
          "id": 2,
          "name": "Light Red",
          "colors": [
            { "id": 11, "name": "Pink", "code": "#ffc0cb" },
            { "id": 12, "name": "Salmon", "code": "#fa8072" },
            { "id": 13, "name": "Coral", "code": "#ff7f50" },
            { "id": 14, "name": "Rose", "code": "#ff007f" },
            { "id": 15, "name": "Tomato", "code": "#ff6347" },
            { "id": 16, "name": "Cherry Blossom", "code": "#ffb7c5" },
            { "id": 17, "name": "Watermelon", "code": "#fc6c85" },
            { "id": 18, "name": "Strawberry", "code": "#ff5470" },
            { "id": 19, "name": "Blush", "code": "#de5d83" },
            { "id": 20, "name": "Carnation", "code": "#ff69b4" }
          ]
        },
        {
          "id": 3,
          "name": "Deep Red",
          "colors": [
            { "id": 21, "name": "Scarlet", "code": "#ff2400" },
            { "id": 22, "name": "Fire Brick", "code": "#b22222" },
            { "id": 23, "name": "Dark Crimson", "code": "#8b0000" },
            { "id": 24, "name": "Bordeaux", "code": "#800020" },
            { "id": 25, "name": "Rust", "code": "#b7410e" },
            { "id": 26, "name": "Mahogany", "code": "#420a1d" },
            { "id": 27, "name": "Blood Orange", "code": "#d1001c" },
            { "id": 28, "name": "Vermilion", "code": "#d9381e" },
            { "id": 29, "name": "Pomegranate", "code": "#c11b17" },
            { "id": 30, "name": "Ruby Red", "code": "#9b111e" }
          ]
        },
        {
          "id": 4,
          "name": "Rich Red",
          "colors": [
            { "id": 31, "name": "Ruby", "code": "#e0115f" },
            { "id": 32, "name": "Garnet", "code": "#733635" },
            { "id": 33, "name": "Wine Red", "code": "#8b0000" },
            { "id": 34, "name": "Maroon", "code": "#800000" },
            { "id": 35, "name": "Brick Red", "code": "#b22222" },
            { "id": 36, "name": "Fire Engine Red", "code": "#ce2029" },
            { "id": 37, "name": "Crimson Red", "code": "#990000" },
            { "id": 38, "name": "Raspberry Red", "code": "#e30b5d" },
            { "id": 39, "name": "Deep Red", "code": "#8b0000" },
            { "id": 40, "name": "Burgundy", "code": "#800020" }
          ]
        },
        {
          "id": 5,
          "name": "Vibrant Red",
          "colors": [
            { "id": 41, "name": "Vermilion", "code": "#d9381e" },
            { "id": 42, "name": "Coral", "code": "#ff7f50" },
            { "id": 43, "name": "Tomato Red", "code": "#ff6347" },
            { "id": 44, "name": "Crimson", "code": "#dc143c" },
            { "id": 45, "name": "Ruby", "code": "#e0115f" },
            { "id": 46, "name": "Scarlet", "code": "#ff2400" },
            { "id": 47, "name": "Fire Engine Red", "code": "#ce2029" },
            { "id": 48, "name": "Cherry Red", "code": "#ff0800" },
            { "id": 49, "name": "Pomegranate", "code": "#c11b17" },
            { "id": 50, "name": "Blood Red", "code": "#660000" }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Blue",
      "code": "#0000ff",
      "collections": [
        {
          "id": 6,
          "name": "Ocean Blue",
          "colors": [
            { "id": 51, "name": "Deep Ocean", "code": "#00008b" },
            { "id": 52, "name": "Aqua", "code": "#00ffff" },
            { "id": 53, "name": "Marine Blue", "code": "#000080" },
            { "id": 54, "name": "Aquamarine", "code": "#7fffd4" },
            { "id": 55, "name": "Cerulean Blue", "code": "#007ba7" },
            { "id": 56, "name": "Cyan", "code": "#00ffff" },
            { "id": 57, "name": "Turquoise", "code": "#40e0d0" },
            { "id": 58, "name": "Deep Sky Blue", "code": "#00bfff" },
            { "id": 59, "name": "Pacific Blue", "code": "#1ca9c9" },
            { "id": 60, "name": "Blueberry", "code": "#1f75fe" }
          ]
        },
        {
          "id": 7,
          "name": "Pastel Blue",
          "colors": [
            { "id": 61, "name": "Baby Blue", "code": "#89cff0" },
            { "id": 62, "name": "Powder Blue", "code": "#b0e0e6" },
            { "id": 63, "name": "Sky Blue", "code": "#87ceeb" },
            { "id": 64, "name": "Ice Blue", "code": "#afeeee" },
            { "id": 65, "name": "Periwinkle", "code": "#c5d0e6" },
            { "id": 66, "name": "Cornflower Blue", "code": "#6495ed" },
            { "id": 67, "name": "Robin Egg Blue", "code": "#00cccc" },
            { "id": 68, "name": "Glacier Blue", "code": "#71a6d2" },
            { "id": 69, "name": "Azure Blue", "code": "#007fff" },
            { "id": 70, "name": "Misty Blue", "code": "#8cbedd" }
          ]
        },
        {
          "id": 8,
          "name": "Nautical Blue",
          "colors": [
            { "id": 71, "name": "Navy Blue", "code": "#000080" },
            { "id": 72, "name": "Slate Blue", "code": "#6a5acd" },
            { "id": 73, "name": "Steel Blue", "code": "#4682b4" },
            { "id": 74, "name": "Cadet Blue", "code": "#5f9ea0" },
            { "id": 75, "name": "Denim Blue", "code": "#1560bd" },
            { "id": 76, "name": "Cerulean Blue", "code": "#007ba7" },
            { "id": 77, "name": "Teal Blue", "code": "#367588" },
            { "id": 78, "name": "Blue Gray", "code": "#6699cc" },
            { "id": 79, "name": "Powder Blue", "code": "#b0e0e6" },
            { "id": 80, "name": "Stormy Blue", "code": "#507786" }
          ]
        },
        {
          "id": 9,
          "name": "Electric Blue",
          "colors": [
            { "id": 81, "name": "Electric Blue", "code": "#7df9ff" },
            { "id": 82, "name": "Neon Blue", "code": "#00ccff" },
            { "id": 83, "name": "Light Sky Blue", "code": "#87cefa" },
            { "id": 84, "name": "Bright Blue", "code": "#0073e6" },
            { "id": 85, "name": "Vivid Blue", "code": "#005aff" },
            { "id": 86, "name": "Deep Sky Blue", "code": "#00bfff" },
            { "id": 87, "name": "Azure Blue", "code": "#007fff" },
            { "id": 88, "name": "Dodger Blue", "code": "#1e90ff" },
            { "id": 89, "name": "Cerulean Blue", "code": "#007ba7" },
            { "id": 90, "name": "Turquoise Blue", "code": "#00ced1" }
          ]
        },
        {
          "id": 10,
          "name": "Metallic Blue",
          "colors": [
            { "id": 91, "name": "Silver Blue", "code": "#8a8c8e" },
            { "id": 92, "name": "Steel Blue", "code": "#4682b4" },
            { "id": 93, "name": "Titanium Blue", "code": "#0f69af" },
            { "id": 94, "name": "Cobalt Blue", "code": "#0047ab" },
            { "id": 95, "name": "Cerulean Blue", "code": "#007ba7" },
            { "id": 96, "name": "Sapphire Blue", "code": "#0f52ba" },
            { "id": 97, "name": "Royal Blue", "code": "#4169e1" },
            { "id": 98, "name": "Indigo Blue", "code": "#4b0082" },
            { "id": 99, "name": "Electric Blue", "code": "#7df9ff" },
            { "id": 100, "name": "Midnight Blue", "code": "#191970" }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Green",
      "code": "#008000",
      "collections": [
        {
          "id": 11,
          "name": "Dark Green",
          "colors": [
            { "id": 101, "name": "Forest Green", "code": "#228b22" },
            { "id": 102, "name": "Hunter Green", "code": "#355e3b" },
            { "id": 103, "name": "Dark Olive Green", "code": "#556b2f" },
            { "id": 104, "name": "Army Green", "code": "#4b5320" },
            { "id": 105, "name": "Deep Green", "code": "#056608" },
            { "id": 106, "name": "Jungle Green", "code": "#29ab87" },
            { "id": 107, "name": "Pine Green", "code": "#01796f" },
            { "id": 108, "name": "Teal Green", "code": "#006d5b" },
            { "id": 109, "name": "Emerald Green", "code": "#50c878" },
            { "id": 110, "name": "Viridian", "code": "#40826d" }
          ]
        },
        {
          "id": 12,
          "name": "Light Green",
          "colors": [
            { "id": 111, "name": "Lime Green", "code": "#32cd32" },
            { "id": 112, "name": "Chartreuse", "code": "#7fff00" },
            { "id": 113, "name": "Spring Green", "code": "#00ff7f" },
            { "id": 114, "name": "Mint Green", "code": "#98ff98" },
            { "id": 115, "name": "Seafoam Green", "code": "#2e8b57" },
            { "id": 116, "name": "Light Sea Green", "code": "#20b2aa" },
            { "id": 117, "name": "Pale Green", "code": "#98fb98" },
            { "id": 118, "name": "Aquamarine", "code": "#7fffd4" },
            { "id": 119, "name": "Light Cyan", "code": "#e0ffff" },
            { "id": 120, "name": "Turquoise", "code": "#40e0d0" }
          ]
        },
        {
          "id": 13,
          "name": "Deep Green",
          "colors": [
            { "id": 121, "name": "Forest Green", "code": "#228b22" },
            { "id": 122, "name": "Dark Green", "code": "#006400" },
            { "id": 123, "name": "Hunter Green", "code": "#355e3b" },
            { "id": 124, "name": "Deep Forest Green", "code": "#014421" },
            { "id": 125, "name": "Olive Drab", "code": "#6b8e23" },
            { "id": 126, "name": "Evergreen", "code": "#05472a" },
            { "id": 127, "name": "Teal Green", "code": "#006d5b" },
            { "id": 128, "name": "Emerald Green", "code": "#50c878" },
            { "id": 129, "name": "Pine Green", "code": "#01796f" },
            { "id": 130, "name": "Viridian", "code": "#40826d" }
          ]
        },
        {
          "id": 14,
          "name": "Rich Green",
          "colors": [
            { "id": 131, "name": "Emerald Green", "code": "#50c878" },
            { "id": 132, "name": "Jade Green", "code": "#00a86b" },
            { "id": 133, "name": "Sea Green", "code": "#2e8b57" },
            { "id": 134, "name": "Forest Green", "code": "#228b22" },
            { "id": 135, "name": "Dark Green", "code": "#006400" },
            { "id": 136, "name": "Teal Green", "code": "#006d5b" },
            { "id": 137, "name": "Hunter Green", "code": "#355e3b" },
            { "id": 138, "name": "Deep Forest Green", "code": "#014421" },
            { "id": 139, "name": "Olive Drab", "code": "#6b8e23" },
            { "id": 140, "name": "Evergreen", "code": "#05472a" }
          ]
        },
        {
          "id": 15,
          "name": "Vibrant Green",
          "colors": [
            { "id": 141, "name": "Lime Green", "code": "#32cd32" },
            { "id": 142, "name": "Chartreuse", "code": "#7fff00" },
            { "id": 143, "name": "Spring Green", "code": "#00ff7f" },
            { "id": 144, "name": "Emerald Green", "code": "#50c878" },
            { "id": 145, "name": "Sea Green", "code": "#2e8b57" },
            { "id": 146, "name": "Forest Green", "code": "#228b22" },
            { "id": 147, "name": "Teal Green", "code": "#006d5b" },
            { "id": 148, "name": "Hunter Green", "code": "#355e3b" },
            { "id": 149, "name": "Jade Green", "code": "#00a86b" },
            { "id": 150, "name": "Dark Green", "code": "#006400" }
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "Yellow",
      "code": "#ffff00",
      "collections": [
        {
          "id": 16,
          "name": "Dark Yellow",
          "colors": [
            { "id": 151, "name": "Goldenrod", "code": "#daa520" },
            { "id": 152, "name": "Dark Gold", "code": "#b8860b" },
            { "id": 153, "name": "Mustard", "code": "#ffdb58" },
            { "id": 154, "name": "Olive", "code": "#808000" },
            { "id": 155, "name": "Brass", "code": "#b5a642" },
            { "id": 156, "name": "Amber", "code": "#ffbf00" },
            { "id": 157, "name": "Saffron", "code": "#f4c430" },
            { "id": 158, "name": "Topaz", "code": "#ff9933" },
            { "id": 159, "name": "Butterscotch", "code": "#fdb147" },
            { "id": 160, "name": "Honey", "code": "#ffd700" }
          ]
        },
        {
          "id": 17,
          "name": "Light Yellow",
          "colors": [
            { "id": 161, "name": "Lemon", "code": "#fff700" },
            { "id": 162, "name": "Cornsilk", "code": "#fff8dc" },
            { "id": 163, "name": "Light Gold", "code": "#ffec8b" },
            { "id": 164, "name": "Pale Yellow", "code": "#ffff84" },
            { "id": 165, "name": "Vanilla", "code": "#f3e5ab" },
            { "id": 166, "name": "Cream", "code": "#ffffcc" },
            { "id": 167, "name": "Champagne", "code": "#fad6a5" },
            { "id": 168, "name": "Butter", "code": "#fffdd0" },
            { "id": 169, "name": "Banana", "code": "#ffe135" },
            { "id": 170, "name": "Wheat", "code": "#f5deb3" }
          ]
        },
        {
          "id": 18,
          "name": "Deep Yellow",
          "colors": [
            { "id": 171, "name": "Golden Yellow", "code": "#ffdf00" },
            { "id": 172, "name": "Sunflower", "code": "#ffac33" },
            { "id": 173, "name": "Dandelion", "code": "#f0e130" },
            { "id": 174, "name": "Marigold", "code": "#eaa221" },
            { "id": 175, "name": "School Bus Yellow", "code": "#ffd800" },
            { "id": 176, "name": "Yellow Ochre", "code": "#baba00" },
            { "id": 177, "name": "Goldenrod", "code": "#daa520" },
            { "id": 178, "name": "Dark Gold", "code": "#b8860b" },
            { "id": 179, "name": "Butterscotch", "code": "#fdb147" },
            { "id": 180, "name": "Honey", "code": "#ffd700" }
          ]
        },
        {
          "id": 19,
          "name": "Rich Yellow",
          "colors": [
            { "id": 181, "name": "Golden Yellow", "code": "#ffdf00" },
            { "id": 182, "name": "Sunflower", "code": "#ffac33" },
            { "id": 183, "name": "Dandelion", "code": "#f0e130" },
            { "id": 184, "name": "Marigold", "code": "#eaa221" },
            { "id": 185, "name": "School Bus Yellow", "code": "#ffd800" },
            { "id": 186, "name": "Yellow Ochre", "code": "#baba00" },
            { "id": 187, "name": "Goldenrod", "code": "#daa520" },
            { "id": 188, "name": "Dark Gold", "code": "#b8860b" },
            { "id": 189, "name": "Butterscotch", "code": "#fdb147" },
            { "id": 190, "name": "Honey", "code": "#ffd700" }
          ]
        },
        {
          "id": 20,
          "name": "Vibrant Yellow",
          "colors": [
            { "id": 191, "name": "Lemon", "code": "#fff700" },
            { "id": 192, "name": "Saffron", "code": "#f4c430" },
            { "id": 193, "name": "Amber", "code": "#ffbf00" },
            { "id": 194, "name": "Goldenrod", "code": "#daa520" },
            { "id": 195, "name": "Sunflower", "code": "#ffac33" },
            { "id": 196, "name": "Dandelion", "code": "#f0e130" },
            { "id": 197, "name": "Marigold", "code": "#eaa221" },
            { "id": 198, "name": "School Bus Yellow", "code": "#ffd800" },
            { "id": 199, "name": "Yellow Ochre", "code": "#baba00" },
            { "id": 200, "name": "Golden Yellow", "code": "#ffdf00" }
          ]
        }
      ]
    },
    {
      "id": 5,
      "name": "Orange",
      "code": "#ffa500",
      "collections": [
        {
          "id": 21,
          "name": "Dark Orange",
          "colors": [
            { "id": 201, "name": "Burnt Orange", "code": "#cc5500" },
            { "id": 202, "name": "Rust", "code": "#b7410e" },
            { "id": 203, "name": "Bronze", "code": "#cd7f32" },
            { "id": 204, "name": "Tangerine", "code": "#f28500" },
            { "id": 205, "name": "Copper", "code": "#b87333" },
            { "id": 206, "name": "Mahogany", "code": "#420a1d" },
            { "id": 207, "name": "Terracotta", "code": "#e2725b" },
            { "id": 208, "name": "Sienna", "code": "#a0522d" },
            { "id": 209, "name": "Clay", "code": "#b66a50" },
            { "id": 210, "name": "Umber", "code": "#635147" }
          ]
        },
        {
          "id": 22,
          "name": "Light Orange",
          "colors": [
            { "id": 211, "name": "Apricot", "code": "#ffb347" },
            { "id": 212, "name": "Peach", "code": "#ffe5b4" },
            { "id": 213, "name": "Coral", "code": "#ff7f50" },
            { "id": 214, "name": "Salmon", "code": "#fa8072" },
            { "id": 215, "name": "Pumpkin", "code": "#ff7518" },
            { "id": 216, "name": "Melon", "code": "#ffad99" },
            { "id": 217, "name": "Cantaloupe", "code": "#ff7e00" },
            { "id": 218, "name": "Mango", "code": "#ff8243" },
            { "id": 219, "name": "Creamsicle", "code": "#ffbc48" },
            { "id": 220, "name": "Peachy Pink", "code": "#ff9a8a" }
          ]
        },
        {
          "id": 23,
          "name": "Deep Orange",
          "colors": [
            { "id": 221, "name": "Burnt Orange", "code": "#cc5500" },
            { "id": 222, "name": "Rust", "code": "#b7410e" },
            { "id": 223, "name": "Copper", "code": "#b87333" },
            { "id": 224, "name": "Tangerine", "code": "#f28500" },
            { "id": 225, "name": "Dark Orange", "code": "#ff8c00" },
            { "id": 226, "name": "Terracotta", "code": "#e2725b" },
            { "id": 227, "name": "Sienna", "code": "#a0522d" },
            { "id": 228, "name": "Clay", "code": "#b66a50" },
            { "id": 229, "name": "Mahogany", "code": "#420a1d" },
            { "id": 230, "name": "Umber", "code": "#635147" }
          ]
        },
        {
          "id": 24,
          "name": "Rich Orange",
          "colors": [
            { "id": 231, "name": "Tangerine", "code": "#f28500" },
            { "id": 232, "name": "Coral", "code": "#ff7f50" },
            { "id": 233, "name": "Salmon", "code": "#fa8072" },
            { "id": 234, "name": "Pumpkin", "code": "#ff7518" },
            { "id": 235, "name": "Burnt Orange", "code": "#cc5500" },
            { "id": 236, "name": "Dark Orange", "code": "#ff8c00" },
            { "id": 237, "name": "Apricot", "code": "#ffb347" },
            { "id": 238, "name": "Peach", "code": "#ffe5b4" },
            { "id": 239, "name": "Copper", "code": "#b87333" },
            { "id": 240, "name": "Rust", "code": "#b7410e" }
          ]
        },
        {
          "id": 25,
          "name": "Vibrant Orange",
          "colors": [
            { "id": 241, "name": "Tangerine", "code": "#f28500" },
            { "id": 242, "name": "Apricot", "code": "#ffb347" },
            { "id": 243, "name": "Coral", "code": "#ff7f50" },
            { "id": 244, "name": "Salmon", "code": "#fa8072" },
            { "id": 245, "name": "Pumpkin", "code": "#ff7518" },
            { "id": 246, "name": "Burnt Orange", "code": "#cc5500" },
            { "id": 247, "name": "Dark Orange", "code": "#ff8c00" },
            { "id": 248, "name": "Peach", "code": "#ffe5b4" },
            { "id": 249, "name": "Copper", "code": "#b87333" },
            { "id": 250, "name": "Rust", "code": "#b7410e" }
          ]
        }
      ]
    },
    {
      "id": 6,
      "name": "Purple",
      "code": "#800080",
      "collections": [
        {
          "id": 26,
          "name": "Dark Purple",
          "colors": [
            { "id": 251, "name": "Indigo", "code": "#4b0082" },
            { "id": 252, "name": "Eggplant", "code": "#614051" },
            { "id": 253, "name": "Plum", "code": "#8e4585" },
            { "id": 254, "name": "Grape", "code": "#6f2da8" },
            { "id": 255, "name": "Blackberry", "code": "#4d0a4d" },
            { "id": 256, "name": "Mulberry", "code": "#c54b8c" },
            { "id": 257, "name": "Aubergine", "code": "#3d0734" },
            { "id": 258, "name": "Mauve", "code": "#915f6d" },
            { "id": 259, "name": "Tyrian Purple", "code": "#66023c" },
            { "id": 260, "name": "Regal Purple", "code": "#6a287e" }
          ]
        },
        {
          "id": 27,
          "name": "Light Purple",
          "colors": [
            { "id": 261, "name": "Lavender", "code": "#e6e6fa" },
            { "id": 262, "name": "Lilac", "code": "#c8a2c8" },
            { "id": 263, "name": "Periwinkle", "code": "#ccccff" },
            { "id": 264, "name": "Amethyst", "code": "#9966cc" },
            { "id": 265, "name": "Orchid", "code": "#da70d6" },
            { "id": 266, "name": "Thistle", "code": "#d8bfd8" },
            { "id": 267, "name": "Mauve", "code": "#915f6d" },
            { "id": 268, "name": "Wisteria", "code": "#c9a0dc" },
            { "id": 269, "name": "Heather", "code": "#b7c3d0" },
            { "id": 270, "name": "Heather", "code": "#b7c3d0" }
          ]
        },
        {
          "id": 28,
          "name": "Deep Purple",
          "colors": [
            { "id": 271, "name": "Indigo", "code": "#4b0082" },
            { "id": 272, "name": "Eggplant", "code": "#614051" },
            { "id": 273, "name": "Plum", "code": "#8e4585" },
            { "id": 274, "name": "Grape", "code": "#6f2da8" },
            { "id": 275, "name": "Blackberry", "code": "#4d0a4d" },
            { "id": 276, "name": "Mulberry", "code": "#c54b8c" },
            { "id": 277, "name": "Aubergine", "code": "#3d0734" },
            { "id": 278, "name": "Mauve", "code": "#915f6d" },
            { "id": 279, "name": "Tyrian Purple", "code": "#66023c" },
            { "id": 280, "name": "Regal Purple", "code": "#6a287e" }
          ]
        },
        {
          "id": 29,
          "name": "Rich Purple",
          "colors": [
            { "id": 281, "name": "Plum", "code": "#8e4585" },
            { "id": 282, "name": "Grape", "code": "#6f2da8" },
            { "id": 283, "name": "Blackberry", "code": "#4d0a4d" },
            { "id": 284, "name": "Mulberry", "code": "#c54b8c" },
            { "id": 285, "name": "Aubergine", "code": "#3d0734" },
            { "id": 286, "name": "Mauve", "code": "#915f6d" },
            { "id": 287, "name": "Tyrian Purple", "code": "#66023c" },
            { "id": 288, "name": "Regal Purple", "code": "#6a287e" },
            { "id": 289, "name": "Indigo", "code": "#4b0082" },
            { "id": 290, "name": "Eggplant", "code": "#614051" }
          ]
        },
        {
          "id": 30,
          "name": "Vibrant Purple",
          "colors": [
            { "id": 291, "name": "Amethyst", "code": "#9966cc" },
            { "id": 292, "name": "Orchid", "code": "#da70d6" },
            { "id": 293, "name": "Lavender", "code": "#e6e6fa" },
            { "id": 294, "name": "Lilac", "code": "#c8a2c8" },
            { "id": 295, "name": "Periwinkle", "code": "#ccccff" },
            { "id": 296, "name": "Thistle", "code": "#d8bfd8" },
            { "id": 297, "name": "Wisteria", "code": "#c9a0dc" },
            { "id": 298, "name": "Heather", "code": "#b7c3d0" },
            { "id": 299, "name": "Heather", "code": "#b7c3d0" },
            { "id": 300, "name": "Regal Purple", "code": "#6a287e" }
          ]
        }
      ]
    },
    {
      "id": 7,
      "name": "Pink",
      "code": "#ffc0cb",
      "collections": [
        {
          "id": 31,
          "name": "Dark Pink",
          "colors": [
            { "id": 301, "name": "Fuchsia", "code": "#ff00ff" },
            { "id": 302, "name": "Magenta", "code": "#ff00ff" },
            { "id": 303, "name": "Deep Pink", "code": "#ff1493" },
            { "id": 304, "name": "Hot Pink", "code": "#ff69b4" },
            { "id": 305, "name": "Rose", "code": "#ff007f" },
            { "id": 306, "name": "Raspberry", "code": "#e30b5d" },
            { "id": 307, "name": "Ruby", "code": "#e0115f" },
            { "id": 308, "name": "Crimson", "code": "#dc143c" },
            { "id": 309, "name": "Cerise", "code": "#de3163" },
            { "id": 310, "name": "Burgundy", "code": "#800020" }
          ]
        },
        {
          "id": 32,
          "name": "Light Pink",
          "colors": [
            { "id": 311, "name": "Bubble Gum Pink", "code": "#ffc1cc" },
            { "id": 312, "name": "Cotton Candy Pink", "code": "#ffbcd9" },
            { "id": 313, "name": "Baby Pink", "code": "#f4c2c2" },
            { "id": 314, "name": "Cherry Blossom Pink", "code": "#ffc3cd" },
            { "id": 315, "name": "Salmon Pink", "code": "#ff91a4" },
            { "id": 316, "name": "Flamingo Pink", "code": "#fc8eac" },
            { "id": 317, "name": "Peachy Pink", "code": "#ff9a8a" },
            { "id": 318, "name": "Rose Quartz Pink", "code": "#bd559c" },
            { "id": 319, "name": "Orchid Pink", "code": "#f2bdc7" },
            { "id": 320, "name": "Strawberry Pink", "code": "#ff6090" }
          ]
        },
        {
          "id": 33,
          "name": "Deep Pink",
          "colors": [
            { "id": 321, "name": "Fuchsia", "code": "#ff00ff" },
            { "id": 322, "name": "Magenta", "code": "#ff00ff" },
            { "id": 323, "name": "Deep Pink", "code": "#ff1493" },
            { "id": 324, "name": "Hot Pink", "code": "#ff69b4" },
            { "id": 325, "name": "Rose", "code": "#ff007f" },
            { "id": 326, "name": "Raspberry", "code": "#e30b5d" },
            { "id": 327, "name": "Ruby", "code": "#e0115f" },
            { "id": 328, "name": "Crimson", "code": "#dc143c" },
            { "id": 329, "name": "Cerise", "code": "#de3163" },
            { "id": 330, "name": "Burgundy", "code": "#800020" }
          ]
        },
        {
          "id": 34,
          "name": "Rich Pink",
          "colors": [
            { "id": 331, "name": "Hot Pink", "code": "#ff69b4" },
            { "id": 332, "name": "Rose", "code": "#ff007f" },
            { "id": 333, "name": "Raspberry", "code": "#e30b5d" },
            { "id": 334, "name": "Ruby", "code": "#e0115f" },
            { "id": 335, "name": "Crimson", "code": "#dc143c" },
            { "id": 336, "name": "Cerise", "code": "#de3163" },
            { "id": 337, "name": "Burgundy", "code": "#800020" },
            { "id": 338, "name": "Deep Pink", "code": "#ff1493" },
            { "id": 339, "name": "Fuchsia", "code": "#ff00ff" },
            { "id": 340, "name": "Magenta", "code": "#ff00ff" }
          ]
        },
        {
          "id": 35,
          "name": "Vibrant Pink",
          "colors": [
            { "id": 341, "name": "Hot Pink", "code": "#ff69b4" },
            { "id": 342, "name": "Bubble Gum Pink", "code": "#ffc1cc" },
            { "id": 343, "name": "Cotton Candy Pink", "code": "#ffbcd9" },
            { "id": 344, "name": "Baby Pink", "code": "#f4c2c2" },
            { "id": 345, "name": "Cherry Blossom Pink", "code": "#ffc3cd" },
            { "id": 346, "name": "Flamingo Pink", "code": "#fc8eac" },
            { "id": 347, "name": "Peachy Pink", "code": "#ff9a8a" },
            { "id": 348, "name": "Rose Quartz Pink", "code": "#bd559c" },
            { "id": 349, "name": "Orchid Pink", "code": "#f2bdc7" },
            { "id": 350, "name": "Strawberry Pink", "code": "#ff6090" }
          ]
        }
      ]
    },
    {
      "id": 8,
      "name": "Grey",
      "code": "#808080",
      "collections": [
        {
          "id": 36,
          "name": "Dark Grey",
          "colors": [
            { "id": 351, "name": "Charcoal", "code": "#36454f" },
            { "id": 352, "name": "Graphite", "code": "#434c52" },
            { "id": 353, "name": "Slate", "code": "#708090" },
            { "id": 354, "name": "Gunmetal", "code": "#2a3439" },
            { "id": 355, "name": "Ash", "code": "#b2beb5" },
            { "id": 356, "name": "Lead", "code": "#2e3d46" },
            { "id": 357, "name": "Taupe", "code": "#483c32" },
            { "id": 358, "name": "Stormy Grey", "code": "#717d7e" },
            { "id": 359, "name": "Ebony", "code": "#555d50" },
            { "id": 360, "name": "Thunder", "code": "#191970" }
          ]
        },
        {
          "id": 37,
          "name": "Light Grey",
          "colors": [
            { "id": 361, "name": "Silver", "code": "#c0c0c0" },
            { "id": 362, "name": "Platinum", "code": "#e5e4e2" },
            { "id": 363, "name": "Smoke", "code": "#738276" },
            { "id": 364, "name": "Mist", "code": "#c4c4c4" },
            { "id": 365, "name": "Pearl", "code": "#eae0c8" },
            { "id": 366, "name": "Cloud", "code": "#f0f8ff" },
            { "id": 367, "name": "Dove", "code": "#e1e1e1" },
            { "id": 368, "name": "Fog", "code": "#dfe2e5" },
            { "id": 369, "name": "Lunar Grey", "code": "#b2beb5" },
            { "id": 370, "name": "Gainsboro", "code": "#dcdcdc" }
          ]
        },
        {
          "id": 38,
          "name": "Warm Grey",
          "colors": [
            { "id": 371, "name": "Taupe", "code": "#483c32" },
            { "id": 372, "name": "Stormy Grey", "code": "#717d7e" },
            { "id": 373, "name": "Pewter", "code": "#8e8e8e" },
            { "id": 374, "name": "Driftwood", "code": "#af937d" },
            { "id": 375, "name": "Warm Grey", "code": "#808080" },
            { "id": 376, "name": "Battleship Grey", "code": "#848482" },
            { "id": 377, "name": "Cement", "code": "#8e8e8e" },
            { "id": 378, "name": "Cobblestone", "code": "#8b8378" },
            { "id": 379, "name": "Ash Grey", "code": "#b2beb5" },
            { "id": 380, "name": "Nickel", "code": "#727472" }
          ]
        },
        {
          "id": 39,
          "name": "Cool Grey",
          "colors": [
            { "id": 381, "name": "Silver", "code": "#c0c0c0" },
            { "id": 382, "name": "Platinum", "code": "#e5e4e2" },
            { "id": 383, "name": "Smoke", "code": "#738276" },
            { "id": 384, "name": "Mist", "code": "#c4c4c4" },
            { "id": 385, "name": "Pearl", "code": "#eae0c8" },
            { "id": 386, "name": "Cloud", "code": "#f0f8ff" },
            { "id": 387, "name": "Dove", "code": "#e1e1e1" },
            { "id": 388, "name": "Fog", "code": "#dfe2e5" },
            { "id": 389, "name": "Lunar Grey", "code": "#b2beb5" },
            { "id": 390, "name": "Gainsboro", "code": "#dcdcdc" }
          ]
        },
        {
          "id": 40,
          "name": "Neutral Grey",
          "colors": [
            { "id": 391, "name": "Ash", "code": "#b2beb5" },
            { "id": 392, "name": "Lead", "code": "#2e3d46" },
            { "id": 393, "name": "Stormy Grey", "code": "#717d7e" },
            { "id": 394, "name": "Ebony", "code": "#555d50" },
            { "id": 395, "name": "Taupe", "code": "#483c32" },
            { "id": 396, "name": "Slate", "code": "#708090" },
            { "id": 397, "name": "Charcoal", "code": "#36454f" },
            { "id": 398, "name": "Gunmetal", "code": "#2a3439" },
            { "id": 399, "name": "Graphite", "code": "#434c52" },
            { "id": 400, "name": "Silver", "code": "#c0c0c0" }
          ]
        }
      ]
    },
    {
      "id": 9,
      "name": "Black",
      "code": "#000000",
      "collections": [
        {
          "id": 41,
          "name": "Dark Black",
          "colors": [
            { "id": 401, "name": "Jet Black", "code": "#080808" },
            { "id": 402, "name": "Midnight Black", "code": "#2b2b2b" },
            { "id": 403, "name": "Ebony", "code": "#555d50" },
            { "id": 404, "name": "Charcoal", "code": "#36454f" },
            { "id": 405, "name": "Onyx", "code": "#353839" },
            { "id": 406, "name": "Pitch Black", "code": "#000000" },
            { "id": 407, "name": "Obsidian", "code": "#191970" },
            { "id": 408, "name": "Coal", "code": "#080808" },
            { "id": 409, "name": "Raven", "code": "#0e0e10" },
            { "id": 410, "name": "Soot", "code": "#1a1a1a" }
          ]
        },
        {
          "id": 42,
          "name": "Light Black",
          "colors": [
            { "id": 411, "name": "Shadow", "code": "#212121" },
            { "id": 412, "name": "Night", "code": "#2c3e50" },
            { "id": 413, "name": "Coal", "code": "#080808" },
            { "id": 414, "name": "Pitch Black", "code": "#000000" },
            { "id": 415, "name": "Ebony", "code": "#555d50" },
            { "id": 416, "name": "Charcoal", "code": "#36454f" },
            { "id": 417, "name": "Onyx", "code": "#353839" },
            { "id": 418, "name": "Jet Black", "code": "#080808" },
            { "id": 419, "name": "Midnight Black", "code": "#2b2b2b" },
            { "id": 420, "name": "Obsidian", "code": "#191970" }
          ]
        },
        {
          "id": 43,
          "name": "Pure Black",
          "colors": [
            { "id": 421, "name": "Pitch Black", "code": "#000000" },
            { "id": 422, "name": "Jet Black", "code": "#080808" },
            { "id": 423, "name": "Midnight Black", "code": "#2b2b2b" },
            { "id": 424, "name": "Ebony", "code": "#555d50" },
            { "id": 425, "name": "Charcoal", "code": "#36454f" },
            { "id": 426, "name": "Onyx", "code": "#353839" },
            { "id": 427, "name": "Obsidian", "code": "#191970" },
            { "id": 428, "name": "Coal", "code": "#080808" },
            { "id": 429, "name": "Raven", "code": "#0e0e10" },
            { "id": 430, "name": "Soot", "code": "#1a1a1a" }
          ]
        },
        {
          "id": 44,
          "name": "Deep Black",
          "colors": [
            { "id": 431, "name": "Pitch Black", "code": "#000000" },
            { "id": 432, "name": "Jet Black", "code": "#080808" },
            { "id": 433, "name": "Midnight Black", "code": "#2b2b2b" },
            { "id": 434, "name": "Ebony", "code": "#555d50" },
            { "id": 435, "name": "Charcoal", "code": "#36454f" },
            { "id": 436, "name": "Onyx", "code": "#353839" },
            { "id": 437, "name": "Obsidian", "code": "#191970" },
            { "id": 438, "name": "Coal", "code": "#080808" },
            { "id": 439, "name": "Raven", "code": "#0e0e10" },
            { "id": 440, "name": "Soot", "code": "#1a1a1a" }
          ]
        },
        {
          "id": 45,
          "name": "Matte Black",
          "colors": [
            { "id": 441, "name": "Pitch Black", "code": "#000000" },
            { "id": 442, "name": "Jet Black", "code": "#080808" },
            { "id": 443, "name": "Midnight Black", "code": "#2b2b2b" },
            { "id": 444, "name": "Ebony", "code": "#555d50" },
            { "id": 445, "name": "Charcoal", "code": "#36454f" },
            { "id": 446, "name": "Onyx", "code": "#353839" },
            { "id": 447, "name": "Obsidian", "code": "#191970" },
            { "id": 448, "name": "Coal", "code": "#080808" },
            { "id": 449, "name": "Raven", "code": "#0e0e10" },
            { "id": 450, "name": "Soot", "code": "#1a1a1a" }
          ]
        }
      ]
    },
    {
      "id": 10,
      "name": "White",
      "code": "#ffffff",
      "collections": [
        {
          "id": 46,
          "name": "Pure White",
          "colors": [
            { "id": 451, "name": "Snow White", "code": "#fffafa" },
            { "id": 452, "name": "Ivory", "code": "#fffff0" },
            { "id": 453, "name": "Cream", "code": "#fffdd0" },
            { "id": 454, "name": "Pearl White", "code": "#f9f9f9" },
            { "id": 455, "name": "Eggshell", "code": "#f0ead6" },
            { "id": 456, "name": "Linen White", "code": "#faf0e6" },
            { "id": 457, "name": "Ghost White", "code": "#f8f8ff" },
            { "id": 458, "name": "Chiffon", "code": "#f0f8ff" },
            { "id": 459, "name": "Magnolia", "code": "#f8f4ff" },
            { "id": 460, "name": "Lily", "code": "#f8f8f8" }
          ]
        },
        {
          "id": 47,
          "name": "Bright White",
          "colors": [
            { "id": 461, "name": "Snow White", "code": "#fffafa" },
            { "id": 462, "name": "Ivory", "code": "#fffff0" },
            { "id": 463, "name": "Cream", "code": "#fffdd0" },
            { "id": 464, "name": "Pearl White", "code": "#f9f9f9" },
            { "id": 465, "name": "Eggshell", "code": "#f0ead6" },
            { "id": 466, "name": "Linen White", "code": "#faf0e6" },
            { "id": 467, "name": "Ghost White", "code": "#f8f8ff" },
            { "id": 468, "name": "Chiffon", "code": "#f0f8ff" },
            { "id": 469, "name": "Magnolia", "code": "#f8f4ff" },
            { "id": 470, "name": "Lily", "code": "#f8f8f8" }
          ]
        },
        {
          "id": 48,
          "name": "Soft White",
          "colors": [
            { "id": 471, "name": "Snow White", "code": "#fffafa" },
            { "id": 472, "name": "Ivory", "code": "#fffff0" },
            { "id": 473, "name": "Cream", "code": "#fffdd0" },
            { "id": 474, "name": "Pearl White", "code": "#f9f9f9" },
            { "id": 475, "name": "Eggshell", "code": "#f0ead6" },
            { "id": 476, "name": "Linen White", "code": "#faf0e6" },
            { "id": 477, "name": "Ghost White", "code": "#f8f8ff" },
            { "id": 478, "name": "Chiffon", "code": "#f0f8ff" },
            { "id": 479, "name": "Magnolia", "code": "#f8f4ff" },
            { "id": 480, "name": "Lily", "code": "#f8f8f8" }
          ]
        },
        {
          "id": 49,
          "name": "Warm White",
          "colors": [
            { "id": 481, "name": "Snow White", "code": "#fffafa" },
            { "id": 482, "name": "Ivory", "code": "#fffff0" },
            { "id": 483, "name": "Cream", "code": "#fffdd0" },
            { "id": 484, "name": "Pearl White", "code": "#f9f9f9" },
            { "id": 485, "name": "Eggshell", "code": "#f0ead6" },
            { "id": 486, "name": "Linen White", "code": "#faf0e6" },
            { "id": 487, "name": "Ghost White", "code": "#f8f8ff" },
            { "id": 488, "name": "Chiffon", "code": "#f0f8ff" },
            { "id": 489, "name": "Magnolia", "code": "#f8f4ff" },
            { "id": 490, "name": "Lily", "code": "#f8f8f8" }
          ]
        },
        {
          "id": 50,
          "name": "Cool White",
          "colors": [
            { "id": 491, "name": "Snow White", "code": "#fffafa" },
            { "id": 492, "name": "Ivory", "code": "#fffff0" },
            { "id": 493, "name": "Cream", "code": "#fffdd0" },
            { "id": 494, "name": "Pearl White", "code": "#f9f9f9" },
            { "id": 495, "name": "Eggshell", "code": "#f0ead6" },
            { "id": 496, "name": "Linen White", "code": "#faf0e6" },
            { "id": 497, "name": "Ghost White", "code": "#f8f8ff" },
            { "id": 498, "name": "Chiffon", "code": "#f0f8ff" },
            { "id": 499, "name": "Magnolia", "code": "#f8f4ff" },
            { "id": 500, "name": "Lily", "code": "#f8f8f8" }
          ]
        }
      ]
    }    
  ],
};

export const colorSlice = createSlice({
  name: "Colors",
  initialState: initialState,
  reducers: {
  }
})

export default colorSlice.reducer;