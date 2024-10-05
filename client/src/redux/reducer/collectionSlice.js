import { createSlice } from "@reduxjs/toolkit";


// content thay bằng description
const initialState = {
  collections: [
    {
      id: 1,
      name: "Designer Color Collection",
      title: "Designer Color Collection",
      content:
        "The Designer Color Collection makes finding the just-right white easier than ever, with our brightest, purest whites and the exquisite colors designers have been asking for. Available in select products.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/dcc-hero-middle?qlt=82&wid=1280&ts=1724081470606&$PNG-Fit$&dpr=off",
      hex: "#e9e8e3",
      colors: [
        { id: 1, name: "Crimson", hex: "#dc143c" },
        { id: 2, name: "Maroon", hex: "#800000" },
        { id: 3, name: "Burgundy", hex: "#800020" },
        { id: 4, name: "Dark Scarlet", hex: "#560319" },
        { id: 5, name: "Blood Red", hex: "#660000" },
        { id: 6, name: "Ruby", hex: "#e0115f" },
        { id: 7, name: "Wine", hex: "#722f37" },
        { id: 8, name: "Cardinal", hex: "#c41e3a" },
        { id: 9, name: "Raspberry", hex: "#e30b5d" },
        { id: 10, name: "Dark Cherry", hex: "#900020" },
      ],
    },
    {
      id: 2,
      name: "Living Well",
      title: "Living Well",
      content:
        "A collection of colors and paints carefully chosen to invite a sense of comfort, style and well-being into your home.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/CoJo_CollectionPage_LivingWell_Hero1_646x343_hybrid_2x?qlt=82&wid=1280&ts=1705607731118&dpr=off",
      hex: "#c8bcab",
      colors: [
        { id: 61, name: "Baby Blue", hex: "#89cff0" },
        { id: 62, name: "Powder Blue", hex: "#b0e0e6" },
        { id: 63, name: "Sky Blue", hex: "#87ceeb" },
        { id: 64, name: "Ice Blue", hex: "#afeeee" },
        { id: 65, name: "Periwinkle", hex: "#c5d0e6" },
        { id: 66, name: "Cornflower Blue", hex: "#6495ed" },
        { id: 67, name: "Robin Egg Blue", hex: "#00cccc" },
        { id: 68, name: "Glacier Blue", hex: "#71a6d2" },
        { id: 69, name: "Azure Blue", hex: "#007fff" },
        { id: 70, name: "Misty Blue", hex: "#8cbedd" },
      ],
    },
    {
      id: 3,
      name: "Finest Whites & Neutrals",
      title: "Finest Whites & Neutrals",
      content:
        "Create a space that is quiet and understated or bold and striking. Our most exquisite shades of white and neutral colors come together into a collection versatile enough to do it all, and with stunning coverage you have to see to believe.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/sw-7005-pure-white-living-room-h1?qlt=82&wid=1280&ts=1707336664262&dpr=off",
      hex: "#edeae5",
      colors: [
        { id: 121, name: "Forest Green", hex: "#228b22" },
        { id: 122, name: "Dark Green", hex: "#006400" },
        { id: 123, name: "Hunter Green", hex: "#355e3b" },
        { id: 124, name: "Deep Forest Green", hex: "#014421" },
        { id: 125, name: "Olive Drab", hex: "#6b8e23" },
        { id: 126, name: "Evergreen", hex: "#05472a" },
        { id: 127, name: "Teal Green", hex: "#006d5b" },
        { id: 128, name: "Emerald Green", hex: "#50c878" },
        { id: 129, name: "Pine Green", hex: "#01796f" },
        { id: 130, name: "Viridian", hex: "#40826d" },
      ],
    },
    {
      id: 4,
      name: "Colormix Forecast",
      title: "Colormix Forecast",
      content:
        "In this ever-evolving world of color, Kolux keeps you in the know and ahead of the trend. Our annual Colormix Forecast explores the rising influences and movements shaping tomorrow's designs through a curated collection of color.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/archive-desktop-hero?qlt=82&wid=1920&ts=1722428648062&dpr=off",
      hex: "#71343c",
      colors: [
        { id: 161, name: "Lemon", hex: "#fff700" },
        { id: 162, name: "Cornsilk", hex: "#fff8dc" },
        { id: 163, name: "Light Gold", hex: "#ffec8b" },
        { id: 164, name: "Pale Yellow", hex: "#ffff84" },
        { id: 165, name: "Vanilla", hex: "#f3e5ab" },
        { id: 166, name: "Cream", hex: "#ffffcc" },
        { id: 167, name: "Champagne", hex: "#fad6a5" },
        { id: 168, name: "Butter", hex: "#fffdd0" },
        { id: 169, name: "Banana", hex: "#ffe135" },
        { id: 170, name: "Wheat", hex: "#f5deb3" },
      ],
    },
    {
      id: 5,
      name: "Top 50 Colors",
      title: "Top 50 Colors",
      content:
        "Explore our 50 most popular paint colors. Among these loved and trusted hues, you'll find favored grays, whites, neutrals and even some unexpected colors.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/top-50-middle-hero?qlt=82&wid=1280&ts=1716218691266&fmt=png-alpha&bfc=on&fit=constrain&dpr=off",
      hex: "#d1cbc1",
      colors: [
        { id: 201, name: "Burnt Orange", hex: "#cc5500" },
        { id: 202, name: "Rust", hex: "#b7410e" },
        { id: 203, name: "Bronze", hex: "#cd7f32" },
        { id: 204, name: "Tangerine", hex: "#f28500" },
        { id: 205, name: "Copper", hex: "#b87333" },
        { id: 206, name: "Mahogany", hex: "#420a1d" },
        { id: 207, name: "Terracotta", hex: "#e2725b" },
        { id: 208, name: "Sienna", hex: "#a0522d" },
        { id: 209, name: "Clay", hex: "#b66a50" },
        { id: 210, name: "Umber", hex: "#635147" },
      ],
    },
    {
      id: 6,
      name: "Rejuvenation",
      title: "Rejuvenation",
      content:
        "Rewrite the story of your home with the enduring beauty of Rejuvenation’s color palette. Curated with the brand’s timeless style in mind, this collection of hues pairs seamlessly with Rejuvenation’s customizable lighting and hardware designs.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/rejuvenation-middle-hero?qlt=82&wid=1280&ts=1713799217367&fmt=png-alpha&bfc=on&fit=constrain&dpr=off",
      hex: "#666d69",
      colors: [
        { id: 331, name: "Hot Pink", hex: "#ff69b4" },
        { id: 332, name: "Rose", hex: "#ff007f" },
        { id: 333, name: "Raspberry", hex: "#e30b5d" },
        { id: 334, name: "Ruby", hex: "#e0115f" },
        { id: 335, name: "Crimson", hex: "#dc143c" },
        { id: 336, name: "Cerise", hex: "#de3163" },
        { id: 337, name: "Burgundy", hex: "#800020" },
        { id: 338, name: "Deep Pink", hex: "#ff1493" },
        { id: 339, name: "Fuchsia", hex: "#ff00ff" },
        { id: 340, name: "Magenta", hex: "#ff00ff" },
      ],
    },
    {
      id: 7,
      name: "West Elm",
      title: "West Elm",
      content:
        "Feel bold with West Elm’s color palette. These carefully curated neutrals and refreshing accent tones will help you design a fresh space that coordinates with their latest collection of modern furnishings.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/Middle-Hero-WE?qlt=82&wid=1280&ts=1714766540304&fmt=png-alpha&bfc=on&fit=constrain&dpr=off",
      hex: "#7d9b89",
      colors: [
        { id: 361, name: "Silver", hex: "#c0c0c0" },
        { id: 362, name: "Platinum", hex: "#e5e4e2" },
        { id: 363, name: "Smoke", hex: "#738276" },
        { id: 364, name: "Mist", hex: "#c4c4c4" },
        { id: 365, name: "Pearl", hex: "#eae0c8" },
        { id: 366, name: "Cloud", hex: "#f0f8ff" },
        { id: 367, name: "Dove", hex: "#e1e1e1" },
        { id: 368, name: "Fog", hex: "#dfe2e5" },
        { id: 369, name: "Lunar Gray", hex: "#b2beb5" },
        { id: 370, name: "Gainsboro", hex: "#dcdcdc" },
      ],
    },
    {
      id: 8,
      name: "Pottery Barn",
      title: "Pottery Barn",
      content:
        "Make every day beautiful with Pottery Barn brand’s curated color collections. Each palette features hand-selected hues that coordinate with their latest designs, so you can craft a home where color and furniture are paired perfectly.",
      img: "https://s7d2.scene7.com/is/image/sherwinwilliams/pb-mini-palette-middle-hero?qlt=82&wid=1280&ts=1723572963576&dpr=off",
      hex: "#cdd2d2",
      colors: [
        { id: 421, name: "Pitch Black", hex: "#000000" },
        { id: 422, name: "Jet Black", hex: "#080808" },
        { id: 423, name: "Midnight Black", hex: "#2b2b2b" },
        { id: 424, name: "Ebony", hex: "#555d50" },
        { id: 425, name: "Charcoal", hex: "#36454f" },
        { id: 426, name: "Onyx", hex: "#353839" },
        { id: 427, name: "Obsidian", hex: "#191970" },
        { id: 428, name: "Coal", hex: "#080808" },
        { id: 429, name: "Raven", hex: "#0e0e10" },
        { id: 430, name: "Soot", hex: "#1a1a1a" },
      ],
    },
  ],
};

export const collectionSlice = createSlice({
  name: "Collections",
  initialState: initialState,
  reducers: {},
});

export default collectionSlice.reducer;
